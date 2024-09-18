const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Product, AboutInfo } = require("./dataschema.js"); 
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use('/images', express.static('images'));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://localhost:27017/finalproject", {
  dbName: "finalproject",
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});

app.get('/about', async (req, res) => {
  try {
    const aboutData = await AboutInfo.find();
    res.json(aboutData);
  } catch (error) {
    res.status(500).send('Error fetching About Us data');
  }
});
  
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // Use .json() for direct JSON response
  } catch (err) {
    console.log("Error while fetching all products: " + err);
    res.status(500).json({ error: err.message }); // Send back a JSON error response
  }
});

  app.get("/products/:id", async (req, resp) => {
    const id = req.params.id;
    console.log("This is the ID", id);
    const query = { id: id };
    const oneProduct = await Product.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
  });

app.post("/insert", async (req, res) => {
    console.log(req.body);
    const pid = req.body.id;
    const pname = req.body.name;
    const pprice = req.body.price;
    const pdescription = req.body.description;
    const pimage = req.body.image;

    const formData = new Product({
      id: pid,
      name: pname,
      price: pprice,
      description: pdescription,
      image: pimage,
    });
    try {
      await Product.create(formData);
      const messageResponse = { message: `Product ${pid} added correctly` }; // Template literals use backticks
      res.send(JSON.stringify(messageResponse));
    } catch (err) {
      console.log("Error while adding a new product:" + err);
      res.status(500).send(err); // Send an HTTP 500 error on catch.
    }
  });
  
  app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
      const query = { id: req.body.id };
      await Product.deleteOne(query);
      const messageResponse = 
      { message: `Product ${req.body.id} deleted correctly` };
      res.send(JSON.stringify(messageResponse));
    } catch (err) {
      console.log("Error while deleting :" + req.body.id + " " + err);
    }
  });
  
  app.put("/update", async (req, res) => {
    try {
      const updatedProduct = req.body;
      const query = { id: updatedProduct.id };
      await Product.findOneAndUpdate(query, updatedProduct, { new: true });
      const messageResponse = {
        message: `Product ${updatedProduct.id} updated correctly`, // Template literals must be enclosed with backticks
      };
      res.send(JSON.stringify(messageResponse));
    } catch (err) {
      console.log("Error while updating product: " + err);
      res.status(500).send({ error: err.message }); // Send an HTTP 500 error on catch.
    }
  });
  
  const port = process.env.PORT || 3001;
  const host = "localhost";
  
  app.listen(port, host, () => {
    console.log(`App listening at http://${host}:${port}`); // Template literals with backticks
  });
  














import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from "./Cart";
import { PageContext } from "./Page";
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import './Items.css'; // Import your CSS file


export const Items = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { setPage } = useContext(PageContext);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [idToGet, setIdToGet] = useState("");
  const [idToDelete, setIdToDelete] = useState(""); // Declaration of idToDelete state
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://10.26.27.230:3001/products');
        if (!response.ok) {
          // Check if the response was not successful
          throw new Error(`Error: ${response.status} (${response.statusText})`);
        }
  
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Received non-JSON response from server");
        }
  
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };
    fetchItems();
  }, []);
  


  useEffect(() => {
    fetchAboutUsData();
  }, []);

  const fetchAboutUsData = async () => {
    try {
      const response = await fetch('http://10.26.27.230:3001/about');
      const data = await response.json();
      if (data && data.length > 0) {
        // Assuming the first document has the teamMembers array
        setAboutUsData(data[0].teamMembers);
      }
    } catch (error) {
      console.error('Error fetching About Us data:', error);
    }
  };



  const toggleProductForm = () => {
    setShowProductForm(!showProductForm);
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://10.26.27.230:3001/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch('http://10.26.27.230:3001/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct) // Assuming newProduct has the updated details
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };


  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (item) => {
    addToCart(item);
    setToastMessage(`Successfully Added ${item.name} to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    setToastMessage(`Successfully removed ${item.name} from cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGetById = async () => {
    if (!idToGet) {
      console.error("No ID provided");
      return;
    }

    try {
      const response = await fetch(`http://10.26.27.230:3001/products/${idToGet}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems([data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (!idToDelete) {
      console.error("No ID provided for delete");
      return;
    }

    try {
      const response = await fetch(`http://10.26.27.230:3001/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: idToDelete }) // Send the ID in the request body
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get more details about the error
        console.error('Error Response:', errorText); // Log the detailed error
        throw new Error('Network response was not ok');
      }

      // const data = await response.json();
      setItems(items.filter(item => item.id !== idToDelete));
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('https://cdn.osxdaily.com/wp-content/uploads/2017/06/get-ios-11-default-wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className="bg-white text-black p-2 flex justify-between items-center">
        <div></div> {/* Empty div for spacing */}
        <h1 className="text-xl font-bold flex-grow text-center">IPHONE STORE</h1>
        <button
          onClick={() => setPage("cart")}
          className="flex items-center px-3.5 py-1.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800"
        >
          <ShoppingCartIcon className="h-4 w-4 mr-2 text-white" aria-hidden="true" />
          Cart ({cart.length})
        </button>
        <button
          onClick={() => setShowAboutUs(true)}
          className="flex items-center px-3.5 py-1.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800"
        >
          About Us
        </button>
      </header>
      {showAboutUs && (
        <div className="about-us-modal">
          <div className="about-us-content">
            <button
              onClick={() => setShowAboutUs(false)}
              className="close-button"
            >
              &#10005;
            </button>

            <h2 className="font-bold">ABOUT US</h2> 
            {/* ... display team members ... */}
            {aboutUsData.map((member, index) => (
              <div key={index}>
                <p>Name: {member.name}</p>
                <p>Net ID: {member.netId}</p>
                <p>Team Number: {member.teamNumber}</p>
                <p>Course Number: {member.courseNumber}</p>
                <p>Course Name: {member.courseName}</p>
                <p>Date: {member.date}</p>
                <p>Professor Name: {member.professorName}</p>
                <p>Student Info: {member.studentInfo}</p>
                {member.image && <img src={member.image} alt={`${member.name}`} />}
              </div>
            ))}
          </div>
        </div>
      )}


      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded bg-black text-white z-50">
          {toastMessage}
        </div>
      )}
      <div className="flex-grow" style={{ marginBottom: '9px' }}>
        <div className="flex items-center justify-between mb-6">
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            className="form-input w-full max-w-lg border-gray-300 rounded-md shadow-sm"
            placeholder="Search for iPhones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-contain bg-white"
              />
              <h3 className="mt-2 text-gray-900 font-bold">{item.name}</h3>
              <p className="text-gray-900 text-xl font-bold">${item.price}</p>
              <p className="text-gray-600 text-xs font-bold">
                {item.description}
              </p>

              <div className="mt-3 flex gap-2 w-full">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 bg-green-500 text-white rounded-full py-1 text-sm hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="flex-1 bg-green-500 text-white rounded-full py-1 text-sm hover:bg-green-600"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Footer with button to toggle product form */}
      <footer className="bg-white text-center text-xs p-3 w-full">
        <button
          onClick={toggleProductForm}
          className="bg-black text-white rounded-full py-1 px-3 mx-2 hover:bg-gray-700"
        >
          Manage Products
        </button>
      </footer>

      {/* Manage Products Modal */}
      {showProductForm && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col space-y-4 p-4 bg-white rounded shadow-lg relative">
            <button
              onClick={() => {
                toggleProductForm();
                window.location.reload(); // Add this line to reload the page
              }}
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
            >
              &#10005;
            </button>

            {/* Get, Add, Update, Delete Product Forms */}
            <div className="space-y-4">
              {/* Get Product by ID */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={idToGet}
                  onChange={(e) => setIdToGet(e.target.value)}
                  placeholder="Enter ID to get"
                  className="form-input border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  onClick={handleGetById}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Get Item by ID
                </button>
              </div>

              {/* Delete Product by ID */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={idToDelete}
                  onChange={(e) => setIdToDelete(e.target.value)}
                  placeholder="Enter ID to delete"
                  className="form-input border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Delete Item
                </button>
              </div>

              {/* Add/Update Product Form */}
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Product ID"
                  value={newProduct.id}
                  onChange={e => setNewProduct({ ...newProduct, id: e.target.value })}
                  className="form-input border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="form-input border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="text"
                  placeholder="Product Price"
                  value={newProduct.price}
                  onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="form-input border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="text"
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="form-input border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="text"
                  placeholder="Product Image URL"
                  value={newProduct.image}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="form-input border border-gray-300 rounded-md shadow-sm"
                />

                <div className="flex space-x-2">
                  <button
                    onClick={handleAddProduct}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={handleUpdateProduct}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

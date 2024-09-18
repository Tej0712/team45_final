import { useContext } from "react";
import { PageContext } from "./Page";
import { Items } from "./Items";
import { Cart } from "./CartView";
import { Confirmation } from "./ConfirmationView";

export const App = () => {
  const { page } = useContext(PageContext);

  if (page === "items") {
    return <Items />;
  }

  if (page === "cart") {
    return <Cart />;
  }

  if (page === "confirmation") {
    return <Confirmation />;
  }

  return <div>Page not found.</div>;
};

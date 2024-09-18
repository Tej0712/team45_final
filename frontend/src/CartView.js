import { useContext, Fragment, useState } from "react";
import { CartContext } from "./Cart";
import { PageContext } from "./Page";
import { Popover, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline"; // Import the icon from Heroicons
import { ShoppingBagIcon } from "@heroicons/react/24/outline"; // Ensure this path matches your Heroicons version
import './CartView.css'; // Make sure to import the CSS file

export const Cart = () => {
  const {
    cart,
    cardNumber,
    custName,
    expirationDate,
    setName,
    setExpirationDate,
    setStreetAddress,
    setCity,
    setState,
    setZip,
    setCardNumber,
    total,
    subtotal,
    taxes,
  } = useContext(CartContext);
  const { setPage } = useContext(PageContext);

  const [errors, setErrors] = useState({});

  const validateForm = (fieldName, value) => {
    const newErrors = { ...errors }; // Copy the existing errors

    switch (fieldName) {
      case "custName":
        if (!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(value)) {
          newErrors.custName = 'Name should be in the format "First Last".';
        } else {
          delete newErrors.custName;
        }
        break;

      case "cardNumber":
        if (!/^(\d{4}-){3}\d{4}$/.test(value)) {
          newErrors.cardNumber =
            "Card number format should be XXXX-XXXX-XXXX-XXXX.";
        } else {
          delete newErrors.cardNumber;
        }
        break;

      case "expirationDate":
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          newErrors.expirationDate = "Expiration date format should be MM/YY.";
        } else {
          delete newErrors.expirationDate;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen bg-white">
      <div
        className="fixed left-0 top-0 h-full w-1/2 lg:block"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url('http://10.26.27.230:3001/images/image11.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-black-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <div className="flex justify-between items-end mb-4">
              <h2
                id="summary-heading"
                className="text-lg font-medium text-black-900"
              >
                Order summary
              </h2>
              <button
                onClick={() => setPage("items")}
                type="button"
                className="flex items-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                <ShoppingBagIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Keep shopping
              </button>
            </div>

            <ul
              // role="list"
              className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
            >
              {cart.map((product) => (
                <li
                  key={product.id}
                  className="flex items-start space-x-4 py-6"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900 font-bold">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  <p className="flex-none text-base font-medium text-gray-900">
                    ${product.price}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium lg:block bg-white">
              <div className="flex items-center justify-between">
                <dt className="text-black">Subtotal</dt>{" "}
                <dd>${subtotal.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-black">Taxes</dt>{" "}
                <dd>${taxes.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-black">Total</dt>{" "}
                <dd className="text-black">${total.toFixed(2)}</dd>{" "}
              </div>
            </dl>

            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                <div className="mx-auto max-w-lg">
                  <Popover.Button className="flex w-full items-center py-6 font-medium">
                    <span className="mr-auto text-base">Total</span>
                    <span className="mr-2 text-base">$361.80</span>
                  </Popover.Button>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  ></Transition.Child>
                </div>
              </Transition.Root>
            </Popover>
          </div>
        </section>

        <form className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="payment-heading" className="mt-10">
              <button
                type="button"
                className="flex items-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                PAYMENT
              </button>



              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      value={custName}
                      onChange={(e) => {
                        setName(e.target.value);
                        validateForm("custName", e.target.value);
                      }}
                      onBlur={() => validateForm()}
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      maxLength="40"
                      autoComplete="cc-name"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.custName && (
                    <p className="text-red-500">{errors.custName}</p>
                  )}
                </div>

                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="card-number"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      value={cardNumber}
                      onChange={(e) => {
                        let cleaned = e.target.value.replace(/[^\d-]/g, "");
                        let formatted = cleaned.replace(
                          /(\d{4})(?=\d)/g,
                          "$1-"
                        );
                        setCardNumber(formatted);
                        validateForm("cardNumber", formatted);
                      }}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      onBlur={() => validateForm()}
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      maxLength="19"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />

                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      value={expirationDate}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length === 2 && !value.includes("/")) {
                          value += "/";
                        }
                        setExpirationDate(value);
                        validateForm("expirationDate", value);
                      }}
                      onBlur={() => validateForm()}
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      maxLength="5"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.expirationDate && (
                    <p className="text-red-500">{errors.expirationDate}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      maxLength="3"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2
                id="shipping-heading"
                className="text-lg font-bold text-black" // Add text-white and font-bold here
              >
              </h2>
              <button
                // onClick={() => setPage("items")}
                type="button"
                className="flex items-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                {/* <ShoppingBagIcon className="h-5 w-5 mr-2" aria-hidden="true" /> */}
                Shipping Address
              </button>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setStreetAddress(e.target.value)}
                      maxLength="60"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="apartment"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    Apartment, suite, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      maxLength="12"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      maxLength="24"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      maxLength="2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="text-lg font-bold text-black" // Add text-white and font-bold here
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setZip(e.target.value)}
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md bg-white text-black border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      maxLength="5"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
              <button
                onClick={() => setPage("confirmation")}
                type="submit"
                disabled={Object.keys(errors).length > 0 || !cardNumber || !custName || !expirationDate}
                className="w-full flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:w-auto"
              >
                <CheckCircleIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                Checkout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import ContactList from "./components/contact/contactList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/home";
import ContactForm from "./components/Home/ContactForm";
import UpdateContactForm from "./components/contact/UpdateContact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  //creating router
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/contactlist",
      element: <ContactList />,
    },
    {
      path: "/createContact",
      element: <ContactForm />,
    },
    {
      path: "/updateContact",
      element: <UpdateContactForm />,
    },
  ]);
  return (
    <>
      
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContacts,
  dataSelector,
  statusSelector,
  errorSelector,
  deleteContact,
  setData,
} from "../../features/Redux/contactRedux";
import Styles from "./contactList.module.css";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(dataSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContacts());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    toast.success("Contact has been deleted");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={Styles.container}>
      <NavLink to={"/"}>
        <button className={Styles.homebtn}>Home</button>
      </NavLink>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>User Name</th>
            <th>Website</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>{contact.username}</td>
              <td>{contact.website}</td>
              <td>
                <Link to={"/updateContact"}>
                  <button
                    className={Styles.edit}
                    onClick={() => dispatch(setData(contact))}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </Link>
                &ensp;
                <button
                  className={Styles.delete}
                  onClick={() => handleDelete(contact.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;

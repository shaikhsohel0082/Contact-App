import { Link, NavLink } from "react-router-dom";
import Styles from "./ContactForm.module.css";
import { useEffect, useState } from "react";
import { addContact } from "../../features/Redux/contactRedux";
import { useDispatch, useSelector } from "react-redux";
import { dataSelector } from "../../features/Redux/contactRedux";
import { addData } from "../../features/Redux/contactRedux";
import { toast } from "react-toastify";

export default function ContactForm() {
  const stateData = useSelector(dataSelector);

  const [data, setData] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    username: "",
    website: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.id === null) {
      setData((prevData) => ({ ...prevData, id: stateData.length + 1 }));
    }
  }, [stateData.length, data.id]);

  //hndle submit function
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addContact(data));
    dispatch(addData(data));
    console.log(stateData);
    setData({
      id: null,
      name: "",
      phone: "",
      email: "",
      username: "",
      website: "",
    });
    toast.success("New Contact has been Added");
  }

  return (
    <>
      <NavLink to={"/"}>
        <button type="button" className="btn btn-danger ms-5 mt-5">
          Home
        </button>
      </NavLink>
      <div className={Styles.formContainer}>
        <h1>Add a Contact</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077012.png"
                alt="Name Icon"
              />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={data.name}
              aria-label="Name"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <img
                src="https://cdn-icons-png.flaticon.com/128/186/186239.png"
                alt="Phone Icon"
              />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Mobile Number"
              value={data.phone}
              aria-label="Mobile Number"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, phone: e.target.value });
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <img
                src="https://cdn-icons-png.flaticon.com/128/732/732200.png"
                alt="Email Icon"
              />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={data.email}
              aria-label="Email"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={data.username}
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
            />
          </div>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              https://example.com/users/
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Website"
              value={data.website}
              id="basic-url"
              aria-describedby="basic-addon3 basic-addon4"
              onChange={(e) => {
                setData({ ...data, website: e.target.value });
              }}
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="btn btn-success me-4">
              Add
            </button>
            <Link to={"/"}>
              <button type="button" className="btn btn-danger ms-4">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

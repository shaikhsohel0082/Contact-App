import { NavLink } from "react-router-dom";
import Styles from './home.module.css'
export default function Home() {
  return (
    <>
      <div className={Styles.home}>
        <NavLink to={"/contactlist"}>
          <div className={Styles.contactList}></div>
          <h3>Contact List</h3>
        </NavLink>
        <NavLink to={"/createContact"}>
          <div className={Styles.contactForm}></div>
          <h3>Create Contact</h3>
        </NavLink>
      </div>
    </>
  );
}

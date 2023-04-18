import React from "react";
import classes from "./ContactList.module.css";

const ContactList = (props) => {
  const { contacts, onDelete } = props;

  const onClickHandler = (id) => {
    onDelete(id);
  };

  return contacts.map((contact) => {
    return (
      <li key={contact.id}>
        <div className={classes.contact}>
          <span>
            {contact.name} - {contact.number}
          </span>
          <button onClick={() => onClickHandler(contact.id)}>Delete</button>
        </div>
      </li>
    );
  });
};

export default ContactList;

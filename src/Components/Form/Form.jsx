import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import classes from "./Form.module.css";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";

import { save, load } from "../../scripts/localStorage";

const DUMMY_CONTACTS = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const Form = () => {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const sucess = () => toast.success("added contact successfully");

  const delsucess = () => toast.success("contact removed successfully");

  const error = () => toast.error("this contacts is the list");

  useEffect(() => {
    let loadContacts = load("contacts");
    if (!loadContacts) {
      save("contacts", DUMMY_CONTACTS);
      loadContacts = load("contacts");
    }
    setContacts(loadContacts);
  }, []);

  const filterContacts = (filterContacts) => {
    setFiltered(filterContacts ? filterContacts : load("contacts"));
  };

  const onDeleteContact = (selectedContact) => {
    const newContacts = contacts.filter(
      (contact) => contact.id !== selectedContact
    );
    setContacts(newContacts);
    setFiltered(newContacts);
    save("contacts", newContacts);
    delsucess();
  };

  const submitHandler = (newContact) => {
    const isExist = contacts.some((contact) =>
      contact.name.toLowerCase().includes(newContact.name.toLowerCase())
    );
    if (!isExist) {
      const newContacts = [...contacts, newContact];
      save("contacts", newContacts);
      setContacts(newContacts);
      setFiltered(newContacts);
      sucess();
    } else {
      error();
    }
  };

  return (
    <>
      <ContactForm
        getContact={submitHandler}
        className={classes.form}
        childClassName={classes.form__field}
      />

      <Toaster />

      <div>
        {contacts.length > 0 && (
          <Filter
            contacts={contacts}
            className={classes.form__field}
            filterContacts={filterContacts}
          />
        )}
        <ul>
          <ContactList contacts={filtered} onDelete={onDeleteContact} />
        </ul>
      </div>
    </>
  );
};

export default Form;

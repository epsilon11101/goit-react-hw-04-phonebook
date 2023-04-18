import React, { useState } from "react";
import { nanoid } from "nanoid";

const ContactForm = (props) => {
  const { getContact, childClassName, classes } = props;

  const [formState, setFormState] = useState({
    name: "",
    number: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const contact = {
      name: formState.name,
      number: formState.number,
      id: nanoid(),
    };
    getContact(contact);
    reset();
  };

  const reset = () => {
    setFormState({
      name: "",
      number: "",
    });
  };

  return (
    <form className={classes} onSubmit={submitHandler}>
      <div className={childClassName}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formState.name}
          onChange={onChangeHandler}
        />
      </div>
      <div className={childClassName}>
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formState.number}
          onChange={onChangeHandler}
        />
      </div>
      <button type="submit">Add contact</button>
    </form>
  );
};
export default ContactForm;

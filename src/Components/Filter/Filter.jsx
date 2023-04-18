import React, { Component, useState, useEffect } from "react";

const Filter = (props) => {
  const { className: classes, filterContacts, contacts } = props;
  const [filterData, setFilterData] = useState("");

  const onFilterHandler = (e) => {
    setFilterData(e.target.value);
  };

  useEffect(() => {
    const filterContact = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterData.toLowerCase())
    );

    filterContacts(filterContact);
  }, [filterData]);

  return (
    <div className={classes}>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="filter may contain only letters, apostrophe, dash and spaces"
        value={filterData}
        onChange={onFilterHandler}
      />
    </div>
  );
};

export default Filter;

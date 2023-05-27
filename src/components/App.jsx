import { useState, useEffect } from 'react';
import Form from './Form/Form.jsx';
import Contact from './Contacts/contact.jsx';
import Filter from './Filter/filter.jsx';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsList = JSON.parse(localStorage.getItem('contacts-list'));
    if (contactsList) {
      setContacts([...contacts, ...contactsList]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts-list', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = idContact => {
    setContacts(contacts.filter(contact => contact.id !== idContact));
  };
  const handleChangeFilter = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const addContact = data => {
    const { name, number } = data;
    const normalizedname = name.toLocaleLowerCase();

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedname)
    ) {
      Notiflix.Notify.warning(`${name} is already in contacts`);
      return;
    }

    let contactsValue = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([...contacts, contactsValue]);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        padding: '30px',
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <Form addContacts={addContact} />
        <h2>Contacts</h2>
        <Filter handleChangeFilter={handleChangeFilter} value={filter} />
        <Contact
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
};

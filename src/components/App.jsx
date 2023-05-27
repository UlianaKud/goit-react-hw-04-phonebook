import { Component } from 'react';
import Form from './Form/Form.jsx';
import Contact from './Contacts/contact.jsx';
import Filter from './Filter/filter.jsx';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const { contacts } = this.state;
    const contactsList = JSON.parse(localStorage.getItem('contacts-list'));
    if (contactsList) {
      this.setState({ contacts: [...contacts, ...contactsList] });
    }
  }

  deleteContact = idContact => {
    const { contacts } = this.state;
    console.log(idContact, contacts);
    console.log(contacts.filter(contact => contact.id !== idContact));

    this.setState(
      {
        contacts: contacts.filter(contact => contact.id !== idContact),
      },
      () =>
        localStorage.setItem(
          'contacts-list',
          JSON.stringify(this.state.contacts)
        )
    );
  };
  handleChangeFilter = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };
  addContact = data => {
    const { name, number } = data;
    const { contacts } = this.state;
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
    this.setState({ contacts: [...contacts, contactsValue] }, () => {
      localStorage.setItem(
        'contacts-list',
        JSON.stringify(this.state.contacts)
      );
    });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

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
          <Form
            handleChange={this.handleChange}
            addContacts={this.addContact}
          />
          <h2>Contacts</h2>
          <Filter
            handleChangeFilter={this.handleChangeFilter}
            value={this.state.filter}
          />
          <Contact
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

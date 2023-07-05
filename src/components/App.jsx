import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import styles from './App.module.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    const { contacts } = this.state;
    const isContactExists = contacts.find(
      (c) => c.name.toLowerCase() === contact.name.toLowerCase() || c.number === contact.number
    );

    if (isContactExists) {
      window.alert('Contact with this name or number already exists!');
      return;
    }

    const newContact = {
      ...contact,
      id: nanoid(),
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  handleFilterChange = (value) => {
    this.setState({
      filter: value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
  
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={filter} setFilter={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
  
}



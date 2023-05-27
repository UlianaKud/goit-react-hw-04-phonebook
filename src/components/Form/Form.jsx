import { Component } from 'react';
import scss from './form.module.scss';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { addContacts } = this.props;
    const { name, number } = this.state;
    e.preventDefault();
    e.stopPropagation();
    addContacts({ name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={scss.form}>
        <label htmlFor="name" className={scss.label}>
          <span>Name</span>
          <input
            className={scss.input}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="number" className={scss.label}>
          <span>Number</span>
          <input
            className={scss.input}
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={scss.button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;

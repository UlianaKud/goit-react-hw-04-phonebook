import React from 'react';
import PropTypes from 'prop-types';
import scss from './contact.module.scss';

const Contact = ({ contacts = [], onDeleteContact }) => {
  return (
    <ul className={scss.contactList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={number} className={scss.contactItem}>
            <div className={scss.contactWrapper}>
              <span>{name}:</span>
              <span className={scss.number}>{number}</span>
              <button type="button" className={scss.button} onClick={() => onDeleteContact(id)}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Contact;

Contact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

import React,{useRef} from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { contactsCrudContext } from '../context/ContactsCrudContext'
import ContactCard from './ContactCard'

const ContactList = ({ term, searchKeyword}) => {
  const {contacts} = useContext(contactsCrudContext)
  const inputEl = useRef(null)

    const renderContacts = contacts.map((contact) => {
        return (
           <ContactCard 
             contact={contact}
              key={contact.id}
             />
        )
    })

    const getSearchTerm = () => {
      searchKeyword(inputEl.current.value)
    }
  return (
    <div className="main">
        <h2 style={{marginTop:'80px'}}>Contact List
            <Link to='/add' >
                <button className='ui button blue right' style={{marginLeft:'62rem'}}>Add Contact</button>
            </Link>
        </h2>
        <div className="ui search">
          <div className="ui icon input">
            <input 
              type="text" 
              placeholder='Search Contacts' 
              ref={inputEl}
              className="prompt"
              value={term}
              onChange={getSearchTerm}
               />
            <i className="ui icon search"></i>
          </div>
        </div>
        <div className='ui celled list'>
        {renderContacts.length > 0 ? renderContacts : "No contacts Available!!!"}
        </div>
   </div>
  )
}

export default ContactList
import React from 'react'
import user from '../images/user.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { contactsCrudContext } from '../context/ContactsCrudContext'

const ContactCard = ({contact}) => {
    const {removeContactHandler} = useContext(contactsCrudContext)

    const deleteContact = (id) => {
        removeContactHandler(id)
    }

    
  return (
    <div className="item">
        <div className="content">
            <Link to={`/contact/${contact.id}`}>
                <div className="header"> <img src={user} alt="user" className="ui avatar image" />{contact.name}</div>
                <div>{contact.email}</div>
            </Link>
        </div>
        <i className="trash alternate outline icon"
            style={{color:'red', marginTop: '7px', marginLeft: '10px'}}
            onClick={() => deleteContact(contact.id)}
        ></i>
        <Link to={`/edit`}>
            <i className="edit alternate outline icon"
                style={{color:'blue', marginTop: '0', marginLeft: '0'}}
            ></i>
        </Link>
    </div>
  )
}

export default ContactCard
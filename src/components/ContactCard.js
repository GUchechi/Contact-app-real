import React from 'react'
import user from '../images/user.png'
import { Link } from 'react-router-dom'

const ContactCard = ({clickHandler,contact}) => {
    // const {id, name, email} = props.contact;
    
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
            onClick={() => clickHandler(contact.id)}
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
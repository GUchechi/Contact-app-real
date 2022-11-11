import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { contactsCrudContext } from '../context/ContactsCrudContext'


const AddContact = () => {
  const {addContactHandler} = useContext(contactsCrudContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault()
        if(name === "" || email === ""){
          alert("All fields are required!")
          return;
        }
        addContactHandler({name, email})
        setName('')
        setEmail("")
        navigate("/")
    }
  return (
    <div className='ui main'>
        <h2>Add Contact</h2>
        <form className='ui form' onSubmit={add}>
            <div className="field">
                <label>Name</label>
                <input 
                  type="text" 
                  name='name' 
                  value={name}
                  placeholder='Name'
                  onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="field">
                <label>Email</label>
                <input 
                  type="email" 
                  name='email' 
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button className='ui button blue'>Add</button>
        </form>
    </div>
  )
}

export default AddContact
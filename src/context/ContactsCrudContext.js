import React, { useState, createContext, useEffect } from "react";
import api from "../api/contacts";
import { v4 as uuidv4 } from 'uuid'

export const contactsCrudContext = createContext({});

export const ContactsCrudContextProvider = ({ children }) => {
    const [contacts, setContacts] = useState([])

    //  Fetch All Data and Retrieve All Data
    const retrieveContacts = async() => {
    const response = await api.get("/contacts")
    if(response.data) setContacts(response.data)
  }
  
  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    //   if(retrieveContacts) setContacts(retrieveContacts)
  
     const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
     };
  
     getAllContacts();
  },[])

  //  Delete Data
 const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
  
    setContacts(newContactList);
   }

   // Create/Add Data
 const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(), 
      ...contact,
    }
    const response = await api.post("/contacts", request)
      setContacts([...contacts, response.data])
   }

//    Values
        const value = {
            contacts,
            retrieveContacts,
            removeContactHandler,
            addContactHandler
        }

   return (
      <contactsCrudContext.Provider value={ value}>
          {children}
      </contactsCrudContext.Provider>
   );
};
import React, { useState, createContext, useEffect } from "react";
import api from "../api/contacts";
import { v4 as uuidv4 } from 'uuid'

export const contactsCrudContext = createContext({});

export const ContactsCrudContextProvider = ({ children }) => {
    const [contacts, setContacts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])

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

   //  UpdateContact 
    const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`,contact)
    const id = response.data
    setContacts(
        contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact}))
  }
  
  // Search contacts
const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
     const newContactList = contacts.filter((contact) => {
       return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
     })
     setSearchResult(newContactList);
    } else {
     setSearchResult(contacts);
    }
 }
 


//    Values
        const value = {
            contacts,
            retrieveContacts,
            removeContactHandler,
            addContactHandler,
            updateContactHandler,
            searchResult, 
            setSearchResult,
            searchTerm, 
            setSearchTerm,
            searchHandler,
            setContacts
        }

   return (
      <contactsCrudContext.Provider value={ value}>
          {children}
      </contactsCrudContext.Provider>
   );
};
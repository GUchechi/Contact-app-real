import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import './App.css';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import ContactDetails from './components/ContactDetails';
import api from "../src/api/contacts";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
 const [contacts, setContacts] = useState([])
 const [searchTerm, setSearchTerm] = useState("")
 const [searchResult, setSearchResult] = useState([])

//  Fetch All Data
const retrieveContacts = async() => {
  const response = await api.get("/contacts")
  return response.data;
}

// Create Data
 const addContactHandler = async (contact) => {
  const request = {
    id: uuidv4(), 
    ...contact,
  }
  const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data])
 }

//  Delete Data
 const removeContactHandler = async (id) => {
  await api.delete(`/contacts/${id}`);
  const newContactList = contacts.filter((contact) => {
    return contact.id !== id;
  })

  setContacts(newContactList);
 }

//  UpdateContact 
const updateContactHandler = async (contact) => {
  const response = await api.put(`/contacts/${contact.id}`,contact)
  const {id, name, email} = response.data
  setContacts(
      contacts.map((contact) => {
    return contact.id === id || contact.name === name|| contact.email ===email ? {...response.data} : contact}))
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

 useEffect(() => {
  // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   if(retrieveContacts) setContacts(retrieveContacts)

   const getAllContacts = async () => {
    const allContacts = await retrieveContacts();
    if(allContacts) setContacts(allContacts);
   };

   getAllContacts();
},[])

 useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
 },[contacts])

  return (
    <div className="ui container">
      <Header />
      <Router>
        <Routes>
          <Route 
            exact
            path="/"
            element={<ContactList 
            contacts={searchTerm.length < 1 ? contacts : searchResult}
            getContactId={removeContactHandler}    
            term={searchTerm}
            searchKeyword={searchHandler}         
           />}
          />
          <Route 
            path="/add"
            element={<AddContact 
              addContactHandler={addContactHandler}/>}
          />    
          <Route 
              path='/contact/:id' 
              element={<ContactDetails 
              contacts={contacts}/>} 
            />
          <Route 
            path="/edit"
            element={<EditContact 
              updateContactHandler={updateContactHandler}
            />}
          />    
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';

import './App.css';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import ContactDetails from './components/ContactDetails';
import { ContactsCrudContextProvider } from './context/ContactsCrudContext';
import api from '../src/api/contacts'

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
 const [contacts, setContacts] = useState([])
 const [searchTerm, setSearchTerm] = useState("")
 const [searchResult, setSearchResult] = useState([])





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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
 },[contacts])

  return (
    <div className="ui container">
      <Header />
      <Router>
      <ContactsCrudContextProvider>
        <Routes>
          <Route 
            exact
            path="/"
            element={<ContactList 
            contacts={searchTerm.length < 1 ? contacts : searchResult}    
            term={searchTerm}
            searchKeyword={searchHandler}         
           />}
          />
          <Route 
            path="/add"
            element={<AddContact/>}
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
        </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;

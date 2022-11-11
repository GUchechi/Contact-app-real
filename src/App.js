import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';

import './App.css';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import ContactDetails from './components/ContactDetails';
import { ContactsCrudContextProvider } from './context/ContactsCrudContext';

function App() {
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
           />}
          />
          <Route 
            path="/add"
            element={<AddContact/>}
          />    
          <Route 
              path='/contact/:id' 
              element={<ContactDetails/>} 
            />
          <Route 
            path="/edit"
            element={<EditContact />}
          />    
        </Routes>
        </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;

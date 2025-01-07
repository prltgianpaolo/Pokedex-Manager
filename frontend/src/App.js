import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import MyCollection from './pages/MyCollection';
import Navbar from './components/Navbar';

const App = () => {
  return (
      <Router>
          <Navbar /> 
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pokemon/:id" element={<PokemonDetails />} />
              <Route path="/my-collection" element={<MyCollection />} />
          </Routes>
      </Router>
  );
};

export default App;
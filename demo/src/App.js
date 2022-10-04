import React from 'react';
import Dashboard from './routes/dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NavBar from './routes/navigation/NavBar';


const App = () => {
  return (
    <div className="w-screen h-screen bg-gray-200 px-5">
      <Router>
        {<NavBar/>}
        {
          //<Routes>
          //  <Route 
          //    path={"/"}
          //    element = {<Dashboard/>}
          //  />
          //</Routes>
        }
      </Router> 
    </div>     
  );
}

export default App;

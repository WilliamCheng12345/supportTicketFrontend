import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/reset.css'; 
import SupportTicketForm from './SupportTicketForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path= "/admin" element={<AdminPanel/>}></Route>
        <Route path="/" element={<SupportTicketForm/>}></Route>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
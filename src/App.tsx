import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import CabecalhoComponent from './components/cabecalho';
import ConsultaCreditoComponent from './components/ConsultaCreditoComponent';

const ConsultaCredito = () => <ConsultaCreditoComponent />
   const Home = () => <div>Home</div>;
   const About = () => <div>About</div>;
   const Contact = () => <div>Contact</div>;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CabecalhoComponent />
      <nav>
        <ul>
          <li><Link to="/consultarcredito">Consultar</Link></li>
          <li><Link to="/">Home</Link></li>
             <li><Link to="/about">About</Link></li>
             <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav> 

        <Routes>
          <Route path="/consultarcredito" element={<ConsultaCreditoComponent />} />
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
         </Routes>   

      
    </BrowserRouter>
  )
}

export default App;

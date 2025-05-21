import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import CabecalhoComponent from './components/cabecalho';
import LoginComponet from './components/LoginComponent';
import ConsultaCreditoComponent from './components/ConsultaCreditoComponent';
import SimulacaoCreditoComponent from './components/SimulacaoCreditoComponent';
import MelhorOfertaComponent from './components/MelhorOfertaComponent';

const App: React.FC = () => {

  /*const consultarCredito = (cpf: string) => {
    console.log('teste')
  }*/

  return (
    <BrowserRouter>
      <CabecalhoComponent />      
        <Routes>
          <Route path="/login" element={<LoginComponet />} />
          <Route path="/consultarcredito" element={<ConsultaCreditoComponent />} />
          <Route path="/simularcredito/:id/:cod" element={<SimulacaoCreditoComponent />} />
          <Route path="/melhoroferta" element={<MelhorOfertaComponent />} />
         </Routes>         
    </BrowserRouter>
  )
}

export default App;

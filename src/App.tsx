import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import CabecalhoComponent from './components/cabecalho';
import LoginComponet from './components/LoginComponent';
import ConsultaCreditoComponent from './components/ConsultaCreditoComponent';
import SimulacaoCreditoComponent from './components/SimulacaoCreditoComponent';
import MelhorOfertaComponent from './components/MelhorOfertaComponent';
import OfertaComponent from './components/OfertaComponent';

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
          <Route path="/simularcredito/:id/:cod/:nome/:modalidade" element={<SimulacaoCreditoComponent />} />
          <Route path="/melhoroferta" element={<MelhorOfertaComponent />} />
          <Route path="/oferta/:id/:cod/:nome/:modalidade" element={<OfertaComponent />} />
        </Routes>         
    </BrowserRouter>
  )
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CabecalhoComponent from './components/cabecalho';
import MenuComponent from './components/menu';
import ConsultaCreditoComponent from './components/ConsultaCreditoComponent';
import SimulacaoCreditoComponent from './components/SimulacaoCreditoComponent';

const App: React.FC = () => {

  /*const consultarCredito = (cpf: string) => {
    console.log('teste')
  }*/

  return (
    <BrowserRouter>
      <CabecalhoComponent />
      <MenuComponent />
      <div className='d-flex float-start'>
        <Routes>
          <Route path="/consultarcredito" element={<ConsultaCreditoComponent />} />
          <Route path="/simularcredito" element={<SimulacaoCreditoComponent />} />
         </Routes>   
      </div> 
    </BrowserRouter>
  )
}

export default App;

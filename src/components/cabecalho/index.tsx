import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function CabecalhoComponent (): ReactElement {
  return(
          <>
              <Navbar bg='primary' className='menu_superior'>                
                  <Container>
                      <h3 className='text-white'>Sistema de Crédito</h3>
                      <div className='navbar-nav'>
                          <ul className='navbar-nav'>
                              <li className='nav-item'>
                                  <Link to="/sair" className='nav-link sair'>Sair</Link>                                
                              </li>
                          </ul>
                      </div>
                  </Container>
              </Navbar>    
          </>
      )
}
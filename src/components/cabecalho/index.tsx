import React, { ReactElement } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function CabecalhoComponent (): ReactElement {

    const navigate = useNavigate();

    function logout() {
        axios.get(`http://localhost:8000/api/v1/simulacao/logout`)
          .then(() => {                                			 
			 sessionStorage.removeItem('token');
			 sessionStorage.removeItem('cpf');

			 navigate('/login', {replace: true});
          })
          .catch((erro) => {
              console.log(erro)             
          });
    }
  return(
          <>
              <Navbar bg='primary' className='menu_superior'>                
                  <Container>
                      <h3 className='text-white'>Sistema de Crédito</h3>
                      <div className='navbar-nav'>
                          <ul className='navbar-nav'>
                              <li className='nav-item'>
                                <button type="submit" className="btn btn-primary" 
							        onClick={logout}>Sair</button>                                                               
                              </li>
                          </ul>
                      </div>
                  </Container>
              </Navbar>    
          </>
      )
}
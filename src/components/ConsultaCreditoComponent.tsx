import React, { ReactElement, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import MenuComponent from './menu';

import axios from 'axios';

type Modalidade = {
  nome: string,
  cod: string
}

export default function ConsultaCreditoComponent (): ReactElement {
  
  const [consultaOferta,setConsultaOferta] = useState([]);
  const [loading,setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    if(sessionStorage.getItem('token') === null) {            
      navigate('/login');
    } 

    let data = {
      'cpf': sessionStorage.getItem('cpf')
    }

    axios.post(`http://localhost:8000/api/v1/simulacao/consultacredito`,data,    
          {
              headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem('token')}`,                  
              }
          })
          .then((response) => {                                        
              setConsultaOferta(response.data['instituicoes']); 
              setLoading(false);              
          })
          .catch((erro) => {
               toast.error('Ocorreu um erro e a operação não foi realizada');               
          });          
  },[]);

  return (
    <div>
      <div className='d-flex mt-3'>
        <MenuComponent />
        <div className="container-fluid">
          <div>
            <div>
                <ToastContainer />
            </div>
          {
            loading
            ?
              <div className="spinner-border text-primary mt-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            :
              consultaOferta.length === 0
              ?
                  <Alert variant='info'>
                      Não existem dados para exibir
                  </Alert>
              :
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                        <th scope='col'>Instituição</th>                        
                        <th scope='col'>Modalidades</th>
                        <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>                                     
                      {                        
                        consultaOferta.map((c,i) => 
                          (
                             <tr key={c['id']}>
                                 <td>{c['nome']}</td>
                                 <td>{
                                    (c as any).modalidades.map((m: Modalidade) =>(
                                      <>
                                      <td>{m['nome']}</td>
                                      <td>
                                        <Link to={`/simularcredito/${c['id']}/${m['cod']}/${c['nome']}/${m['nome']}`} 
                                          className="btn btn-sm btn-info text-white float-start me-4">Simular
                                        </Link>                                                                                                          
                                      </td>
                                    </>
                                    ))
                                  }</td>                                  
                             </tr>
                          ))
                      }                    
                  </tbody>
                </Table>
          }
          </div>          
        </div>
        
      </div>
    </div>
  );
}
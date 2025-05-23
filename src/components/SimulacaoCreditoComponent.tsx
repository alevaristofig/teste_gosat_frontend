import React, { ReactElement, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

import MenuComponent from './menu';

export default function SimulacaoCreditoComponent (): ReactElement {

  const { id, cod, nome, modalidade } = useParams();
  const [simulaOferta,setSimulaOferta] = useState<any>();
  const [loading,setLoading] = useState(true);

  const navigate = useNavigate();

    useEffect(() => {

      if(sessionStorage.getItem('token') === null) {            
        navigate('/login');
      } 

    let data = {
      'cpf': sessionStorage.getItem('cpf'),
      'instituicao_id': id,
      'codModalidade': cod
    }

    axios.post(`http://localhost:8000/api/v1/simulacao/simulacredito`,data,
          {
              headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem('token')}`,                  
              }
          })
          .then((response) => {
            setSimulaOferta(Object.entries(response.data));             
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
              <ToastContainer />
          </div>
          {
            loading
            ?
              <div className="spinner-border text-primary mt-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            :
              typeof simulaOferta === 'string'
              ?
                <Alert variant='info'>
                  Não existem dados para exibir
                </Alert>
              :
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th scope='col'>Quantidade Mínima de Parcelas</th>                        
                      <th scope='col'>Quantidade Máxima de Parcelas</th>
                      <th scope='col'>Valor Mínima</th>
                      <th scope='col'>Valor Máxima</th>
                      <th scope='col'>Juros Mês</th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>                    
                      <tr>
                      { 
                           simulaOferta.map((e: any, i: number) => {
                            return(                               
                                  <td>
                                    {
                                      simulaOferta[i][0] === 'valorMin' || 'valorMax'
                                      ?
                                        simulaOferta[i][1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                      :
                                        simulaOferta[i][1]
                                    }
                                  </td>                                 
                              )
                            })                                                                                                                                                                 
                      }
                      <td>
                        <Link to={`/oferta/${id}/${cod}/${nome}/${modalidade}`} 
                              className="btn btn-sm btn-info text-white float-start me-4">Simular
                        </Link>
                      </td>
                      </tr>
                  </tbody>
              </Table>
          }
        </div>
      </div>
    </div>
  );
}
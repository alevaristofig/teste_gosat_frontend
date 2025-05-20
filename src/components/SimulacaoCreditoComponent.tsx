import React, { ReactElement, useState, useEffect } from 'react';
import Card  from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

export default function SimulacaoCreditoComponent (): ReactElement {

  const [simulaOferta,setSimulaOferta] = useState<any>();
  const [loading,setLoading] = useState(true);
  const [token] = useState('4|gfyAYTwb4vLs06RxdHLUekfTYAHPWOGT4XQtgQt0319c6616');

    useEffect(() => {

    let data = {
      'cpf': '11111111111',
      'instituicao_id': 2,
      'codModalidade': 'a50ed2ed-2b8b-4cc7-ac95-71a5568b34ce'
    }

    axios.post(`http://localhost:8000/api/v1/simulacao/simulacredito`,data,
          {
              headers: {
                  "Authorization": `Bearer ${token}`,                  
              }
          })
          .then((response) => {
            setSimulaOferta(Object.entries(response.data));             
            setLoading(false);           
          })
          .catch((erro) => {
              console.log(erro)
          });          
  },[])

  return (
    <div>
      <div className='d-flex'>
        <div className="container-fluid">
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
                    </tr>
                  </thead>
                  <tbody>                    
                      <tr>
                      { 
                           simulaOferta.map((e: any, i: any) => {
                            return(                               
                                  <td>{simulaOferta[i][1]}</td>                                 
                              )
                            })                                                                                                                                                                 
                      }
                      </tr>
                  </tbody>
              </Table>
          }
        </div>
      </div>
    </div>
  );
}
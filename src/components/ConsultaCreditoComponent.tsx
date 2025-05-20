import React, { ReactElement, useState, useEffect } from 'react';
import Card  from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import { ICredito } from '../interfaces/Credito';
import axios from 'axios';

interface Props {
  listaOfertasCredito: ICredito[],
}

type Modalidade = {
  nome: string;
  // outros campos, se houver
}

//export default function ConsultaCreditoComponent ({listaOfertasCredito}): Props {
export default function ConsultaCreditoComponent (): ReactElement {
  
  const [consultaOferta,setConsultaOferta] = useState([]);
  const [loading,setLoading] = useState(true);
  const [token] = useState('4|gfyAYTwb4vLs06RxdHLUekfTYAHPWOGT4XQtgQt0319c6616');

  useEffect(() => {

    let data = {
      'cpf': '11111111111'
    }

    axios.post(`http://localhost:8000/api/v1/simulacao/consultacredito`,data,
          {
              headers: {
                  "Authorization": `Bearer ${token}`,                  
              }
          })
          .then((response) => {                               
              setConsultaOferta(response.data['instituicoes']); 
              setLoading(false);              
          })
          .catch((erro) => {
              console.log(erro)
              setConsultaOferta([]);
          });          
  },[])

  return (
    <div>
      <div className='d-flex'>
        <div className="container-fluid">
          <div>
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
                                      <td>{m['nome']},</td>
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
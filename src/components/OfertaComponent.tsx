import React, { ReactElement, useState, useEffect, MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Card  from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

import MenuComponent from './menu';

export default function OfertaComponent (): ReactElement {

    const { id, cod } = useParams();

    const [ofertas,setOfertas] = useState([]);
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

    axios.post(`http://localhost:8000/api/v1/simulacao/calcularoferta`,data,
          {
              headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem('token')}`,                  
              }
          })
          .then((response) => {
            console.log(response.data)

            setOfertas(response.data);             
            setLoading(false);           
          })
          .catch((erro) => {
              toast.error('Ocorreu um erro e a operação não foi realizada');     
          });          
    },[]);

    const salvar = (e: React.MouseEvent<HTMLButtonElement>,indice: number) => {}
    

    return(
        <>
            <div className='d-flex'>
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
                            typeof ofertas === 'string'
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
                                            <th scope='col'>Valor Solicitado</th>
                                            <th scope='col'>Valor a Pagar</th>
                                            <th scope='col'>Taxa de Juros</th>
                                            <th scope='col'>Quantidade de Parcelas</th>
                                            <th scope=''></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {                        
                                            ofertas.map((o,i) => 
                                            (
                                                <tr key={i}>
                                                    <td>{o['instituicaoFinanceira']}</td>
                                                    <td>{o['modalidadeCredito']}</td> 
                                                    <td>
                                                        {(o['oferta1']['valorSolicitado'] as number)
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </td>   
                                                    <td>
                                                        {(o['oferta1']['valorAPagar'] as number)
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}                                                        
                                                    </td> 
                                                    <td>
                                                        {(o['oferta1']['taxaJuros'] as number)
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}                                                        
                                                    </td> 
                                                    <td>{o['oferta1']['qntParcelas']}</td>  
                                                    <td>
                                                        <button className="btn btn-sm btn-info" 
                                                            onClick={(e) => salvar(e, i)}>
                                                            Confirmar Oferta
                                                        </button>                                                                                                                
                                                    </td>                                               
                                                </tr>
                                            ))
                                        }  
                                    </tbody>
                                </Table>
                    }
                </div>
            </div>
        </>
    )
}
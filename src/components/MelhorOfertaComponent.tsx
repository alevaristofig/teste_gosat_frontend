import React, { ReactElement, useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

import MenuComponent from './menu';

export default function MelhorOfertaComponent (): ReactElement {

    const [ofertas,setOfertas] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem('token') === null) {            
            navigate('/login');
        } 

        let data = {
            'cpf': sessionStorage.getItem('cpf')
        }

        axios.post(`http://localhost:8000/api/v1/simulacao/melhoresofertas`,data,
          {
              headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem('token')}`,                  
              }
          })
          .then((response) => {                                            
              setOfertas(response.data); 
              setLoading(false);              
          })
          .catch((erro) => {
              toast.error('Ocorreu um erro e a operação não foi realizada');              
          }); 
    },[]);

    const salvar = (e: React.MouseEvent<HTMLButtonElement>,indice: number) => {

        let data = {
            'cpf': ofertas[indice]['cpf'],
            'id_instiuicao': ofertas[indice]['id'],
            'instituicao_financeira': ofertas[indice]['instituicaoFinanceira'],
            'modalidade_credito': ofertas[indice]['modalidadeCredito'],
            'valor_a_pagar': ofertas[indice]['oferta']['valorAPagar'],
            'valor_solicitado': ofertas[indice]['oferta']['valorSolicitado'],
            'taxa_juros': ofertas[indice]['oferta']['valorSolicitado'],
            'qnt_parcelas': ofertas[indice]['oferta']['qntParcelas']
        }

        axios.post(`http://localhost:8000/api/v1/simulacao/salvaoferta`,data,
          {
              headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem('token')}`,                  
              }
          })
          .then((response) => {                                    
              toast.success("Oferta cadastrada com Sucesso!");              
          })
          .catch((erro) => {
              toast.error('Ocorreu um erro e a oferta não foi cadastrada');           
          }); 
    }

    return (
        <>
            <div className='d-flex'>
                <MenuComponent />
                <div className="container-fluid">
                    <div>
                        <ToastContainer />
                    </div>
                    <div>
                        {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :
                            ofertas.length === 0
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
                                                    <td>{o['oferta']['valorSolicitado']}</td>   
                                                    <td>{o['oferta']['valorAPagar']}</td> 
                                                    <td>{o['oferta']['taxaJuros']}</td> 
                                                    <td>{o['oferta']['qntParcelas']}</td>  
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
            </div>
        </>
    )
}
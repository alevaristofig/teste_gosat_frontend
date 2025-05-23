import React, { ReactElement, useState, useEffect, MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Alert  from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

import MenuComponent from './menu';

export default function OfertaComponent (): ReactElement {

    const { id, cod, nome, modalidade } = useParams();

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

    //axios.post(`http://localhost:8000/api/v1/simulacao/calcularoferta`,data,
    axios.post(`http://ec2-54-242-207-206.compute-1.amazonaws.com:8000/api/v1/simulacao/calcularoferta`,data,
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

    const salvar = (e: React.MouseEvent<HTMLButtonElement>, idOferta: number) => {

        setLoading(true); 
        
        let data = {
            'cpf': sessionStorage.getItem('cpf'),
            'id_instiuicao': id,
            'instituicao_financeira': nome,
            'modalidade_credito': modalidade,
            'valor_a_pagar': ofertas[0][`oferta${idOferta}`]['valorAPagar'],
            'valor_solicitado': ofertas[0][`oferta${idOferta}`]['valorSolicitado'],
            'taxa_juros': ofertas[0][`oferta${idOferta}`]['taxaJuros'],
            'qnt_parcelas': ofertas[0][`oferta${idOferta}`]['qntParcelas']
        }

        //axios.post(`http://localhost:8000/api/v1/simulacao/salvaoferta`,data,
        axios.post(`http://ec2-54-242-207-206.compute-1.amazonaws.com:8000/api/v1/simulacao/salvaoferta`,data,
          {
              headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem('token')}`,                  
              }
          })
          .then((response) => {                                    
              toast.success("Oferta cadastrada com Sucesso!"); 
              setLoading(false);              
          })
          .catch((erro) => {
              toast.error('Ocorreu um erro e a oferta não foi cadastrada');   
              setLoading(false);         
          }); 
    }
    

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
                                                <>
                                                <tr key={i}>
                                                    <td>{nome}</td>
                                                    <td>{modalidade}</td> 
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
                                                            onClick={(e) => salvar(e, o['oferta1']['idOferta'])}>
                                                            Confirmar Oferta
                                                        </button>                                                                                                                
                                                    </td>                                               
                                                </tr>
                                                <tr key={i}>
                                                    <td>{nome}</td>
                                                    <td>{modalidade}</td> 
                                                    <td>
                                                        {(o['oferta2']['valorSolicitado'] as number)
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </td>   
                                                    <td>
                                                        {(o['oferta2']['valorAPagar'] as number)
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}                                                        
                                                    </td> 
                                                    <td>
                                                        {(o['oferta2']['taxaJuros'] as number)
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}                                                        
                                                    </td> 
                                                    <td>{o['oferta2']['qntParcelas']}</td>  
                                                    <td>
                                                        <button className="btn btn-sm btn-info" 
                                                            onClick={(e) => salvar(e, o['oferta2']['idOferta'])}>
                                                            Confirmar Oferta
                                                        </button>                                                                                                                
                                                    </td>                                               
                                                </tr>
                                                </>
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
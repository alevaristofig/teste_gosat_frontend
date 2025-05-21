import React, { ReactElement, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

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
            console.log(response.data);                           
              setOfertas(response.data); 
              setLoading(false);              
          })
          .catch((erro) => {
              console.log(erro)              
          }); 
    })

    return (
        <>
            Melhores ofertas
        </>
    )
}
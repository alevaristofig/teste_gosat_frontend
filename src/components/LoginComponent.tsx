import React, { ReactElement, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';

import styles from './css/Credito.module.css';

export default function ConsultaCreditoComponent (): ReactElement {

	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');

	const navigate = useNavigate();

	function logar() {		

		let data = {
			'email': email,
			'password': password
		}

		//axios.post(`http://localhost:8000/api/v1/simulacao/login`,data)
		axios.post(`http://ec2-54-242-207-206.compute-1.amazonaws.com:8000/api/v1/simulacao/login`,data)
          .then((response) => {                                			 
			 sessionStorage.setItem('token',response.data.original.token);
			 sessionStorage.setItem('cpf',response.data.original.cpf);

			 navigate('/consultarcredito', {replace: true});
          })
          .catch((erro) => {
              toast.error('Email/Senha incorretos');             
          });  
	}

    return(
        <>
            <div className={styles.input_container}>
				<div>
					<ToastContainer />
				</div>
                <div className="row mt-3">
                    <div className="col-4 text-end mt-3">
						<label className="form-label">E-mail</label>
						<label className="form-label obrigatorio">*</label>
					</div>
                    <div className="col-6">
						<input 
							type="text"
							name="username"
							className="form-control"
							placeholder="E-mail"
							onChange={(e) => setEmail(e.target.value)}
							required							
						/>
					</div>	
                </div>
                <div className="row mt-3">
					<div className="col-4 text-end mt-3">
						<label className="form-label">Senha</label>
						<label className="form-label obrigatorio">*</label>
					</div>
					<div className="col-6">
						<input 
							type="password"
							name="password"
							className="form-control"
							placeholder="Senha"
							onChange={(e) => setPassword(e.target.value)}
							required							
						/>
					</div>										
				</div>
                <div className="row mt-3">
					<div className="col-5 quebralinha d-flex justify-content-end">
						<button className="btn btn-primary" 
							onClick={logar}>Logar</button>
					</div>
				</div>
            </div>
        </>
    )
}
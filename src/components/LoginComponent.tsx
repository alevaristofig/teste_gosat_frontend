import React, { ReactElement } from 'react';

import styles from './css/Credito.module.css';

export default function ConsultaCreditoComponent (): ReactElement {
    return(
        <>
            <div className={styles.input_container}>
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
							required							
						/>
					</div>										
				</div>
                <div className="row mt-3">
					<div className="col-5 quebralinha d-flex justify-content-end">
						<button type="submit" className="btn btn-primary">Logar</button>
					</div>
				</div>
            </div>
        </>
    )
}
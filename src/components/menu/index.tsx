import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { HiDocumentSearch } from "react-icons/hi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";



const MenuComponent = () => {

  const IconeOferta = HiDocumentSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;   
  const IconeSimulacao = HiAdjustmentsHorizontal as unknown as React.FC<React.SVGProps<SVGSVGElement>>;   
  const IconeMelhorOferta = FaMoneyCheckDollar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;   

  return(
      <>
        <div className='menu_esquerdo list-group float-start'>
          <NavLink id='urlEmpresas' to='/consultarcredito' className='list-group-item list-group-item-action mb-2'>
                <IconeOferta fontSize={24} color='blue' /> Consultar Crédito
          </NavLink>
          <NavLink id='urlEmpresas' to='/simularcredito' className='list-group-item list-group-item-action'>
                <IconeSimulacao fontSize={24} color='blue' /> Simular Crédito
          </NavLink>
          <NavLink id='urlEmpresas' to='/melhoroferta' className='list-group-item list-group-item-action'>
                <IconeMelhorOferta fontSize={24} color='blue' /> Melhores Ofertas
          </NavLink>
        </div>
      </>
    )
};

export default MenuComponent; 
/*export default function MenuComponent (): ReactElement {
   // const Icon = HiDocumentSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    return(
        <>
          <div className='menu_esquerdo list-group'>
            <NavLink id='urlEmpresas' to='/consultarcredito' className='list-group-item list-group-item-action'>
                 <HiDocumentSearch color='blue' size={24}/> Consultar Crédito
            </NavLink>
          </div>
        </>
    )
}*/
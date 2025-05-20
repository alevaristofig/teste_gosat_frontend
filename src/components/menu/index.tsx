import React, { ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiDocumentSearch } from "react-icons/hi";
import type { IconType } from 'react-icons';


const MenuComponent = () => {

   const IconSearch = HiDocumentSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;   

    return(
        <>
          <div className='menu_esquerdo list-group'>
            <NavLink id='urlEmpresas' to='/consultarcredito' className='list-group-item list-group-item-action'>
                 <IconSearch fontSize={24} color='blue' /> Consultar Crédito
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
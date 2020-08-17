import React, { InputHTMLAttributes } from 'react';

import './styles.css';


//interface para informar quais são as propiedades do Input
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {//fazendo o input do formulario de inscrção
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest}/>
        </div> 

    );
}

export default Input;
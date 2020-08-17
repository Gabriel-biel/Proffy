import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';


//interface para informar quais são as propiedades do Input
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {//fazendo o TextArea
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest}/>
        </div> 

    );
}

export default Textarea;
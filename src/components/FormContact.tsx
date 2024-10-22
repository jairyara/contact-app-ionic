import React from 'react';

interface FormContactProps {
    fn: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

export const FormContact: React.FC<FormContactProps> = ({ fn, children }) => {
    return (
        <form className='form-contact' onSubmit={fn}>
            {children}
        </form>
    );
};

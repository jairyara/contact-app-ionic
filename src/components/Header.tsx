import React, {ReactNode} from 'react';
import BgHeader from '../assets/bg-header.jpg';

interface HeaderProps {
    children: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({children}) => {
    return (
        <header className='header'>
            <figure className='header__background'>
                <img src={BgHeader} alt='background' />
            </figure>
            <section className='header__children'>
                {children}
            </section>
        </header>
    );
};

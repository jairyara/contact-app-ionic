import React from "react";


interface ContentContainerProps {
    children: React.ReactNode;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({children}) => {
    return (
        <section className='contacts-list'>
            {children}
        </section>
    );
};

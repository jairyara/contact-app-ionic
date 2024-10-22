import React from "react";

interface AvatarProps {
    src?: string;
    contactName: string;
    getInitials?: (name: string) => string;
    color?: string;
}

const getInitials = (name: string) => {
    const words = name.split(' ');
    const firstNameInitial = words[0]?.[0] || '';
    const lastNameInitial = words[1]?.[0] || '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({src, contactName, color }) => {

    return (
        <figure className='avatar' style={{backgroundColor: src === '' ? `${color}` : 'transparent'}}>
            {src !== '' ? <img src={src} alt={contactName}/> : <h1>{getInitials(contactName)}</h1>}
        </figure>
    );
};

import React from "react";
import { Avatar } from "./Avatar.js";

interface ContactCardProps {
    data: {
        first_name: string;
        last_name: string;
        phone: string;
        id: number;
        photo?: string;
        color?: string;
    },
    editContact: () => void;
    removeContact: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ data, editContact, removeContact }) => {
    const { first_name, last_name, phone, id, photo, color } = data;

    return (
        <article className='contact'>
            <Avatar src={photo} color={color} contactName={`${first_name} ${last_name}`} />
            <section className='contact__info'>
                <h2>{first_name} {last_name}</h2>
                <p>{phone}</p>

                <div className='contact-actions'>
                    <button className='button button-primary' onClick={editContact}>
                        Editar
                    </button>
                    <button className='button button-red' onClick={removeContact}>
                        Eliminar
                    </button>
                </div>
            </section>
        </article>
    );
};

import React from "react";
import {IonIcon} from "@ionic/react";
import {closeCircle} from "ionicons/icons";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export const Modal: React.FC<ModalProps> = ({children, isOpen, onClose, title}) => {
    if (!isOpen) return null;

    return (
        <section className='modal'>
            <section className='modal__container'>
                <header className='modal__header'>
                    <h1>
                        {title}
                    </h1>
                    <IonIcon className='modal__header--icon'
                             icon={closeCircle} onClick={onClose}
                    />
                </header>
                <section className='modal__children'>
                    {children}
                </section>
            </section>
        </section>
    );
};

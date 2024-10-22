import React from "react";

export enum Variant {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary'
}

interface ButtonSecondaryProps {
    children: React.ReactNode;
    fn?: () => void;
    variant?: Variant;
    type?: 'button' | 'submit' | 'reset';
}

export const ButtonApp: React.FC<ButtonSecondaryProps> = ({children, fn, variant = Variant.primary, type}) => {
    return (
        <button type={type} className={`button button-${variant}`} onClick={fn}>
            {children}
        </button>
    );
};

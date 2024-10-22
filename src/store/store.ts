import {create} from 'zustand';
import {supabase} from "../services/supabaseClient";

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
    company?: string;
    photo?: string;
    color?: string;
}

interface ContactStore {
    contacts: Contact[];
    fetchContacts: () => Promise<void>;
    addContact: (contact: Contact) => Promise<void>;
    removeContact: (id: number) => Promise<void>;
    editContact: (id: number, contact: Contact) => Promise<void>;
    getColor: (id: number) => Promise<any>;
    getContact: (id: number) => Promise<any>;
}

export const useContactStore = create<ContactStore>((set) => ({
    contacts: [],

    fetchContacts: async () => {
        const {data, error} = await supabase.from('Contacts').select('*');
        if (error) {
            console.error('Error al obtener contactos:', error);
            return;
        }
        set({contacts: data || []});
    },

    addContact: async (contact) => {
        const {data, error} = await supabase.from('Contacts').insert([contact]);
        if (error) {
            console.error('Error al agregar contacto:', error);
            return;
        }
        set((state) => ({
            contacts: [...state.contacts, ...(data || [])],
        }));
    },

    removeContact: async (id) => {
        const {error} = await supabase.from('Contacts').delete().match({id});
        if (error) {
            console.error('Error al eliminar contacto:', error);
            return;
        }
        set((state) => ({
            contacts: state.contacts.filter(contact => contact.id !== id),
        }));
    },

    getColor: async (id) => {
        const {data, error} = await supabase.from('Contacts').select('color').match({id});
        if (error) {
            console.error('Error al obtener color:', error);
            return;
        }
        return data;
    },

    editContact: async (id, updatedContact) => {
        const {data, error} = await supabase.from('Contacts').update(updatedContact).match({id});
        if (error) {
            console.error('Error al editar contacto:', error);
            return;
        }

        set((state) => ({
            contacts: state.contacts.map(contact => contact.id === id ? updatedContact : contact),
        }));
    },

    getContact: async (id) => {
        const {data, error} = await supabase.from('Contacts').select('*').eq('id', id);
        if (error) {
            console.error('Error al obtener contacto:', error);
            return;
        }
        return data;
    }
}));

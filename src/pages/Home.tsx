import React, {useState, useEffect} from 'react';
import {Header} from '../components/Header';
import {IonIcon} from '@ionic/react';
import {personAdd} from 'ionicons/icons';
import './Home.css';
import {ButtonApp, Variant} from "../components/ButtonApp";
import {ContentContainer} from "../components/ContentContainer";
import {Modal} from "../components/Modal";
import {ContactCard} from "../components/ContactCard";
import {FormContact} from "../components/FormContact";
import {useContactStore} from "../store/store";
import {supabase} from "../services/supabaseClient";


const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [contactId, setContactId] = useState(0);
    const [contact, setContact] = useState({} as any);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState('');
    const [color, setColor] = useState('');


    const addContact = useContactStore(state => state.addContact);
    const contacts = useContactStore(state => state.contacts);
    const removeContact = useContactStore(state => state.removeContact);
    const editContact = useContactStore(state => state.editContact);
    const getColor = useContactStore(state => state.getColor);
    const getContact = useContactStore(state => state.getContact);


    const handleAddContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const file = formData.get('photo') as File;

        let photoUrl: any = '';

        if (file && file.name !== '') {
            const {data, error} = await supabase.storage
                .from('contacts')
                .upload(`contacts/${file.name}`, file);
            if (error) {
                console.error('Error al subir foto:', error);
                return;
            }

            const {data: publicURL} = supabase.storage
                .from('contacts')
                .getPublicUrl(`contacts/${file.name}`);


            photoUrl = publicURL.publicUrl;
        } else {
            photoUrl = '';
        }


        const newContact = {
            id: Date.now(),
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            company: formData.get('company') as string,
            address: formData.get('address') as string,
            photo: photoUrl,
            color: getRandomColor(),
        };

        await addContact(newContact);
        closeModal();
    };

    const handleRemoveContact = async (id: number) => {
        await removeContact(id);
        closeRemoveMode();
    }

    const handleEditContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const file = formData.get('photo') as File;

        let photoUrl: any = '';

        if (file && file.name !== '') {

            const {data, error} = await supabase.storage
                .from('contacts')
                .upload(`contacts/${file.name}`, file);
            if (error) {
                console.error('Error al subir foto:', error);
                return;
            }

            const {data: publicURL} = supabase.storage
                .from('contacts')
                .getPublicUrl(`contacts/${file.name}`);

            photoUrl = publicURL.publicUrl;
        } else {
            photoUrl = photo || '';
        }

        const updatedContact: any = {
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            company: formData.get('company') as string,
            photo: photoUrl,
            color: color,
        };

        console.log(contactId)

        await editContact(contactId, updatedContact);
        setContact({} as any);
        closeEditMode();
    }

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const openEditMode = (id: number) => {
        setEditMode(true)
        setContactId(id)
    };
    const closeEditMode = () => {
        setEditMode(false);
        setContact({} as any);
        setContactId(0);
    }
    const openRemoveMode = (id: any) => {
        console.log(id, 'id')
        setDeleteMode(true);
        setContactId(id);
    }
    const closeRemoveMode = () => {

        setDeleteMode(false)
        setContactId(0)
    };

    useEffect(() => {
        useContactStore.getState().fetchContacts();
    }, [showModal, editMode, deleteMode]);

    useEffect(() => {
        if (contactId) {
            getContact(contactId).then((data: any) => {
                setFirstName(data[0].first_name)
                setLastName(data[0].last_name)
                setPhone(data[0].phone)
                setEmail(data[0].email)
                setCompany(data[0].company)
                setPhoto(data[0].photo)
                setColor(data[0].color)
                setAddress(data[0].address)
            })
        }
    }, [contactId]);

    return (
        <main className='screen-container'>
            <Header>
                <h1 className='header__children--title'>Contactos</h1>
                <ButtonApp variant={Variant.tertiary} fn={openModal}>
                    <IonIcon icon={personAdd}/>
                    Agregar contacto
                </ButtonApp>
            </Header>
            <ContentContainer>
                {contacts && contacts.map((contact, i) => (
                    <ContactCard key={i} data={contacts[i]} editContact={() => openEditMode(contact.id)}
                                 removeContact={() => openRemoveMode(contact.id)}/>
                ))}
            </ContentContainer>

            <Modal onClose={closeModal} isOpen={showModal} title='Nuevo contacto'>
                <FormContact fn={handleAddContact}>
                    <label>
                        <span>
                            Nombres
                        </span>
                        <input
                            name='first_name' type='text' placeholder='Nombres' required/>
                    </label>
                    <label>
                        <span>
                            Apellidos
                        </span>
                        <input name='last_name' type='text' placeholder='Apellidos' required/>
                    </label>
                    <label>
                        <span>
                            Teléfono
                        </span>
                        <input name='phone' type='tel' min={0} maxLength={10} placeholder='Teléfono' required/>
                    </label>
                    <label>
                        <span>
                            Email
                        </span>
                        <input name='email' type='email' placeholder='Email'/>
                    </label>
                    <label>
                        <span>
                            Dirección
                        </span>
                        <input name='address' type='text' placeholder='Dirección'/>
                    </label>
                    <label>
                        <span>
                            Empresa
                        </span>
                        <input name='company' type='text' placeholder='Empresa'/>
                    </label>
                    <label className='form-contact__label--file'>
                        <span>
                            Foto
                        </span>
                        <input name='photo' type='file'/>
                    </label>
                    <ButtonApp>
                        Guardar
                    </ButtonApp>
                </FormContact>
            </Modal>

            <Modal isOpen={editMode} onClose={closeEditMode} title='Editar contacto'>
                <FormContact fn={handleEditContact}>
                    <label>
                        <span>
                            Nombres
                        </span>
                        <input
                            value={first_name || ''}
                            onChange={(e) => setFirstName(e.target.value)}
                            name='first_name' type='text'
                            placeholder='Nombres' required/>
                    </label>
                    <label>
                        <span>
                            Apellidos
                        </span>
                        <input value={last_name || ''}
                               onChange={(e) => setLastName(e.target.value)}
                               name='last_name' type='text' placeholder='Apellidos' required/>
                    </label>
                    <label>
                        <span>
                            Teléfono
                        </span>
                        <input value={phone || ''}
                               onChange={(e) => setPhone(e.target.value)}
                               name='phone' type='tel' min={0} maxLength={10} placeholder='Teléfono' required/>
                    </label>
                    <label>
                        <span>
                            Email
                        </span>
                        <input value={email || ''}
                               onChange={(e) => setEmail(e.target.value)}
                               name='email' type='email' placeholder='Email'/>
                    </label>
                    <label>
                        <span>
                            Dirección
                        </span>
                        <input value={address || ''}
                               onChange={(e) => setAddress(e.target.value)}
                               name='address' type='text' placeholder='Dirección'/>
                    </label>
                    <label>
                        <span>
                            Empresa
                        </span>
                        <input value={company || ''}
                               onChange={(e) => setCompany(e.target.value)}
                               name='company' type='text' placeholder='Empresa'/>
                    </label>
                    <label className='form-contact__label--file'>
                        <span>
                            Foto
                        </span>
                        <input name='photo' type='file'/>
                    </label>
                    <ButtonApp type={'submit'}>
                        Guardar
                    </ButtonApp>
                </FormContact>
            </Modal>

            <Modal isOpen={deleteMode} onClose={closeRemoveMode} title='Eliminar contacto'>

                <h4>¿Estás seguro de eliminar este contacto?</h4>

                <div className='contact-actions'>
                    <button className='button button-red' onClick={() => handleRemoveContact(contactId)}>
                        Eliminar
                    </button>
                    <button className='button' onClick={closeRemoveMode}>
                        Cancelar
                    </button>
                </div>
            </Modal>
        </main>
    );
};

export default Home;

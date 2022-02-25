import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';
import api from './services/api'
import { EditModal, CreateModal } from './Modal/Modal'
import Helmet from 'react-helmet';


export interface ContactProps {
  id: string;
  phone: string;
  name: string;
  email: string;
  image: string;
}

function Agenda() {

  const [isModalEditVisible, setIsModalEditVisible] = useState<boolean>(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState<boolean>(false);
  const [Contacts, setContacts] = useState<ContactProps[]>([])
  const [contactSelected, setContactSelected] = useState<ContactProps>({} as ContactProps)
  const [loading, setLoading] = useState(true)

  const inputRef = useRef(null)

  const onPress = useCallback(async () => {
    await api.post('/phonebook', Contacts)
  }, [Contacts])

  const findContacts = useCallback(async () => {
    setLoading(true)
    const data = await api.get('/phonebook')
    setLoading(false)
    setContacts(data.data.result)
  }, [inputRef])

  const toggleModalCreate = () => {
    setIsModalCreateVisible(wasModalVisible => !wasModalVisible)
    findContacts()
  }

  const toggleModalEdit = (contact: ContactProps) => {
    setContactSelected(contact)
    setIsModalEditVisible(wasModalVisible => !wasModalVisible)
  }

  const toggleDelete = useCallback(async (contact: ContactProps) => {
    console.log("Pegue na minha e balance")
    console.log(contact.id)
    await api.delete(`/phonebook/${contact.id}`)
    findContacts()
  }, [])

  useEffect(() => { findContacts() }, [])

  return (
    <div className="App">
      <Helmet title="Agenda Telefônica" />
      <header className="App-header">
        <p>
          <code> <b> AGENDA TELEFÔNICA </b></code>
        </p>
      </header>
      <button className='button-34' onClick={toggleModalCreate}  >+ NOVO CONTATO</button>

      {isModalEditVisible &&
        <EditModal data={contactSelected} open={isModalEditVisible} onCancel={() => setIsModalEditVisible(false)} onConfirm={async (data_phone: any, data_name: any, data_email: any, data_image: string) => {
          console.log("Porra, nois porta oakley")
          setLoading(true)
          setIsModalEditVisible(false)

          await api.put(`/phonebook/${contactSelected.id}`, { phone: data_phone, name: data_name, email: data_email, image: data_image })

          findContacts()

        }} />
      }

      {isModalCreateVisible &&
        <CreateModal data={contactSelected} open={isModalCreateVisible} onCancel={() => setIsModalCreateVisible(false)} onConfirm={async (data_phone: any, data_name: any, data_email: any, data_image: string) => {
          console.log(contactSelected.id)
          setIsModalCreateVisible(false)

          setLoading(true)

          await api.post('/phonebook', { phone: data_phone, name: data_name, email: data_email, image: data_image })

          findContacts()

        }} />
      }

      <ol className='Lista'>
        {Contacts.map((contact) => (
          <li key={contact.id} className='Lista'>
            <div className='Contacts' >
              <img src={contact.image} className='Img' />

              <div className='AllInformations'>

                <div className='InformationsName'><b>{contact.name}</b></div>
                <div className='Informations'> <b>TELEFONE:</b> {contact.phone}</div>
                <div className='Informations'><b>EMAIL: </b> {contact.email}</div>
              </div>
              <div className='ButtonsContact'>
                <button className='ButtonEdit' onClick={() => toggleModalEdit(contact)}>EDIT</button>
                <button className='ButtonDelete' data-id={contact.id} onClick={() => toggleDelete(contact)}>DEL</button>
              </div>

            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Agenda;

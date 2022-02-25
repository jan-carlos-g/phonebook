import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ContactProps } from '../App';
import Button from '@mui/material/Button';
import './modal.css';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalProps {
    open: boolean
    onCancel: Function
    onConfirm: Function
    data: ContactProps
}

export const    EditModal: React.FC<ModalProps> = ({ onConfirm, onCancel, open, data }) => {
    const input_ref1 = useRef<HTMLInputElement>(null)
    const input_ref2 = useRef<HTMLInputElement>(null)
    const input_ref3 = useRef<HTMLInputElement>(null)
    return (
        <Modal
            open={open}
            onClose={() => onCancel()}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {data.name}
                </Typography>
                Nome     :<input defaultValue={data.name} ref={input_ref2} /><br />
                Email    : <input defaultValue={data.email} ref={input_ref3} /><br />
                Telefone : <input defaultValue={data.phone} ref={input_ref1} /><br />
                Foto     : <input type="file" name="avatar" accept="image/png, image/jpeg" /><br />
                
                <div className='Buttons'> 
                    <button className='ButtonSave' onClick={() => onConfirm(input_ref1.current?.value,input_ref2.current?.value,input_ref3.current?.value)} >Salvar</button>
                    <button className='ButtonCancel'onClick={() => onCancel(input_ref2.current?.value) } >Cancel</button>
                </div>
            </Box>
        </Modal>
    )
}



export const CreateModal: React.FC<ModalProps> = ({ onConfirm, onCancel, open, data}) => {
    const input_ref1 = useRef<HTMLInputElement>(null)
    const input_ref2 = useRef<HTMLInputElement>(null)
    const input_ref3 = useRef<HTMLInputElement>(null)
    const input_ref4 = useRef<HTMLInputElement>(null)
    return (
        <Modal
            open={open}
            onClose={() => onCancel()}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    New Contact
                </Typography>
                Nome     :  <input  ref={input_ref2} /><br />
                Email    :  <input  ref={input_ref3} /><br />
                Telefone :  <input  ref={input_ref1} /><br />
                Imagem   : <input  ref={input_ref4} /><br />
        
            <div className='Buttons'>
                <button className='ButtonSave' onClick={() => onConfirm(input_ref1.current?.value,input_ref2.current?.value,input_ref3.current?.value,input_ref4.current?.value)} >Salvar</button>
                <button className='ButtonCancel' onClick={() => onCancel(input_ref2.current?.value) }  >Cancel</button>
                </div>
            </Box>
        </Modal>
    )
}
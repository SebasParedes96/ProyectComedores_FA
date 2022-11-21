import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { connect }from 'react-redux'
import { getDiners ,deleteDiner, addDiner, updateDiner } from "../actions/diners";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

const  Diners = ({getDiners, deleteDiner, addDiner, updateDiner, diner: {diners, loading}}) => {

    useEffect(() => {
        // get diners
        
        getDiners()
    }, [getDiners]);

    const [validated, setValidated] = useState(false);
    const [modalEdit, setModalEdit] = useState(false)
    const [errors, setErrors] = useState({});
    const [formDataEdit, setFormDataEdit] = useState({
        _id:"",
        name: "",
        address: "",
        latitude: "-26.196693",
        longitude: "-58.180593"
    })
    const [process, setProcess] = useState("")
    const handleClose = () => setModalEdit(false);
    const onChange = (e) => setFormDataEdit({ ...formDataEdit, [e.target.name]: e.target.value })
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } setValidated(true);

        if (validate()) {
            { process == 'add' ?
                addDiner(formDataEdit) :
                updateDiner(formDataEdit._id, formDataEdit) }
            handleClose();
            console.log('enviado')
            getDiners()
        } else {
            console.log('faltan datos')
        }

    };

    const validate = () => {
        setErrors({})
        if (formDataEdit.name === "") {
            setErrors({
                ...errors,
                name: 'name es requerido'
            });
            return false;
        } else if (formDataEdit.address === "") {
            setErrors({
                ...errors,
                date: 'address es requerida'
            });
            return false;
        }

        return true;
    };

    const selectDiner = (element, action) => {
        console.log(element)
        setFormDataEdit(element);
        console.log(formDataEdit)
        setProcess(action);
        (action == 'edit') && setModalEdit(true)
    }

    const add = () => {
        setFormDataEdit({
            _id:"",
            name: "",
            address: "",
            latitude: "-26.196693",
            longitude: "-58.180593"
        });
        setProcess("add")
        setModalEdit(true)
    }

    const deleteOne = async (id)=>{
        await deleteDiner(id) 
        await getDiners()
    }


    return (
        <React.Fragment>
                <Button type="button" onClick={add} variant="primary">Agregar</Button>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Comedor</th>
                            <th>Direccion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            diners.map(elemento => (
                                <tr key={elemento._id}>
                                    <td>{elemento.name}</td>
                                    <td>{elemento.address}</td>
                                    <td style={{display: 'flex' , justifyContent: 'space-around' }} >
                                        <Button onClick={() => selectDiner(elemento, 'edit')} >Editar</Button>
                                        <Button onClick={() => deleteOne(elemento._id)} >Borrar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Modal show={modalEdit} onHide={handleClose}>
                    <Modal.Header closeButton>
                    { process == 'add' ? <Modal.Title>Agregar</Modal.Title> :
                        <Modal.Title>Modificar</Modal.Title> }
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} >
                            <Form.Group className="mb-3" >
                                <Form.Label> Nombre</Form.Label>
                                <Form.Control onChange={(e) => onChange(e)} value={formDataEdit.name} name='name' type="text" required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> Direccion</Form.Label>
                                <Form.Control onChange={(e) => onChange(e)} value={formDataEdit.address} name='address' type="text" required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese una direccion.
                                </Form.Control.Feedback>
                            </Form.Group> 
                            <Form.Group className="mb-3">
                                <Form.Label> Latitud</Form.Label>
                                <Form.Control onChange={(e) => onChange(e)} value={formDataEdit.latitude} name='latitude' type="number" required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese una direccion.
                                </Form.Control.Feedback>
                            </Form.Group>  
                            <Form.Group className="mb-3">
                                <Form.Label> Longitud</Form.Label>
                                <Form.Control onChange={(e) => onChange(e)} value={formDataEdit.longitude} name='longitude' type="number" required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese una direccion.
                                </Form.Control.Feedback>
                            </Form.Group> 
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        { process == 'add' ? 
                        <Button type="button" onClick={handleSubmit} variant="primary">Agregar</Button> 
                        : <Button type="button" onClick={handleSubmit} variant="primary">Modificar</Button>
                    }
                        

                    </Modal.Footer>
                </Modal>
                </React.Fragment>
    )
}



const mapStateToProps = state => ({
    diner : state.diner,
})

export default connect(mapStateToProps, { getDiners, deleteDiner, addDiner, updateDiner })(Diners) 
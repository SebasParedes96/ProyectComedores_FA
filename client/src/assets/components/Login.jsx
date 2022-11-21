import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth'
import { Redirect } from 'react-router-dom'


function Login ({login, isAuthenticated}) {

const [formDataLogin, setFormDataLogin] = useState({
    email:'',
    password:''
})
const [validatedLogin, setValidatedLogin] = useState(false);
const [errors, setErrors] = useState({});


const onChangeLogin = (e) => setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value })


const validateLogin = () => {
    setErrors({})
    if (formDataLogin.email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formDataLogin.email) ) {
        setErrors({
            ...errors,
            email: 'email es requerido'
        });
        return false;
    } else if (formDataLogin.password === "") {
        setErrors({
            ...errors,
            password: 'password es requerida'
        });
        return false;
    }

    return true;
};

const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    } setValidatedLogin(true);

    if (validateLogin()) {
        console.log(formDataLogin)
        login(formDataLogin.email, formDataLogin.password)
        }else{
            alert('credenciales invalidas!')
        }
};

    //Navigate if logged in
    if(isAuthenticated) return <Redirect to='/diners' />

return (
    <Card style={{ width: '18rem' }}>
    <Card.Body >

        <Card.Title>Login</Card.Title>
        <Form noValidate validated={validatedLogin} >
            <Form.Group className="mb-3" >
                <Form.Label> Email</Form.Label>
                <Form.Control onChange={(e) => onChangeLogin(e)} name='email' type="email" placeholder="example@gmail.com" required />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un correo valido.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label> Password</Form.Label>
                <Form.Control onChange={(e) => onChangeLogin(e)} name='password' type="password" placeholder="Example01" required />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese una Contraseña.
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="button" onClick={handleSubmit}  variant="primary">Log in</Button>
        </Form>
    </Card.Body>
</Card>
)

}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
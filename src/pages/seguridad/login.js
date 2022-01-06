import { Container, Form, Button, Row, Col } from "react-bootstrap"
import logo from '../../logo.svg';
import {useState} from 'react';

async function loginUsuario(usuario) {
    
    console.log('usuario ->'+JSON.stringify(usuario));
    return fetch('http://localhost:8084/siget-backend-seg/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        //console.log('response ->');
        //console.log(response);
        for (var entry of response.headers.entries()) { 
            //console.log(entry)
           if (entry[0] === 'authorization') {
               return entry[1]
           }  
        }
    })
}
export default function Login({ setToken }) {

    const [usuario, setUsuario] = useState();
    const [clave, setClave] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        //console.log('usuario -> '+usuario)
        //console.log('clave -> '+clave)

        const token = await loginUsuario({
            usuario,
            clave
        });
        //console.log(token);
        setToken(token);
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Bienvenido</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group row" >
                            <label>
                                <p>Usuario</p>
                                <input type="text" onChange={e => setUsuario(e.target.value)}/>
                            </label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group row" >
                            <label>
                                <p>Clave</p>
                                <input type="password" onChange={e => setClave(e.target.value)}/>
                            </label>
                            <div>
                                <button type="submit">Ingresar</button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )


}
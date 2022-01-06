
import { Component } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import TallerService from './../services/TallerService';


export default class TallerListado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            talleres: [],
            taller: { nombre: '' }
        }
        this.tallerService = new TallerService();
        this.handleChange = this.handleChange.bind(this);
        this.handleBuscar = this.handleBuscar.bind(this)
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let taller = { ...this.state.taller };
        taller[name] = value;
        this.setState({ taller });
    }
    componentDidMount() {
        this.handleBuscar();
    }
    render() {
        return (

            <Container>
                <h1 align="center">Listado de Talleres</h1>
                <Form onSubmit={this.handleBuscar}>
                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-2" controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text"
                                    name="nombre"
                                    value={this.state.taller.nombre}
                                    onChange={this.handleChange}
                                    placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                Buscar
                            </Button>
                        </Col>
                        <Col>
                            <Link to="/taller-registro">
                                <Button variant="secondary">
                                    Nuevo
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Duración</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.talleres.map((taller) => {
                            return (
                                <tr key={taller.id}>
                                    <td align="center">{taller.id} - {taller.idTaller}</td>
                                    <td align="center">{taller.nombre}</td>
                                    <td align="center">{taller.duracion}</td>
                                    <td align="center">
                                        <Link to={`/taller-registro-id/${taller.id}`}>
                                            <Button variant="success">Modificar</Button>
                                        </Link>
                                        <Link to={`/taller-registro-id/${taller.id}`}>
                                            <Button variant="warning">Eliminar</Button>
                                        </Link>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    };

    handleBuscar(event) {
        if (event) {
            event.preventDefault();
        }
        this.tallerService.buscar(this.state.taller.nombre)
            .then(data => {
                this.setState(
                    {
                        talleres: data
                    }
                )
            }).catch(
                error => console.log(error)
            );
    }
}
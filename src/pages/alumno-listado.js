
import { Component } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import AlumnoService from './../services/AlumnoService';

export default class AlumnoListado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alumnos: [],
            alumno: { nombres: '' }
        }
        this.alumnoService = new AlumnoService();
        this.handleChange = this.handleChange.bind(this);
        this.handleBuscar = this.handleBuscar.bind(this)
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let alumno = { ...this.state.alumno };
        alumno[name] = value;
        this.setState({ alumno });
    }
    componentDidMount() {
        this.handleBuscar();
    }
    render() {
        return (

            <Container>
                <h1 align="center">Listado de Alumnos</h1>
                <Form onSubmit={this.handleBuscar}>
                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-2" controlId="nombre">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control type="text"
                                    name="nombres"
                                    value={this.state.alumno.nombres}
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
                            <Link to="/alumno-registro">
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
                            <th>Nombre Completo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.alumnos.map((alumno) => {
                            return (
                                <tr key={alumno.id}>
                                    <td align="center">
                                        {alumno.id} - {alumno.idAlumno}
                                    </td>
                                    <td align="center">
                                        {alumno.apellidoPaterno}{'\u00A0'}  
                                        {alumno.apellidoMaterno},{'\u00A0'}
                                        {alumno.nombres}
                                    </td>
                                    <td align="center">{alumno.estado}</td>
                                    <td align="center">
                                        <Link to={`/alumno-registro-id/${alumno.id}`}>
                                            <Button variant="success">Modificar</Button>
                                        </Link>
                                        <Link to={`/alumno-registro-id/${alumno.id}`}>
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
        this.alumnoService.buscar(this.state.alumno.nombres)
            .then(data => {
                this.setState(
                    {
                        alumnos: data
                    }
                )
            }).catch(
                error => console.log(error)
            );
    }
}
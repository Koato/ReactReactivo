import { Component } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import AlumnoService from './../services/AlumnoService';
export default class AlumnoRegistro extends Component {
    alumno = {
        id: null,
        idAlumno: 0,
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        estado: "1"
    }
    constructor(props) {
        super(props);
        let id = this.props.match.params.id
        this.alumno.id = id
        this.state = {
            alumno: this.alumno
        }
        this.alumnoService = new AlumnoService();

        this.handleChange = this.handleChange.bind(this);
        this.handleGrabar = this.handleGrabar.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
    }

    componentDidMount() {
        let id = this.state.alumno.id;
        if (id) {
            this.buscarXId(id)
        }
    }

    handleGrabar(event) {

        event.preventDefault();

        const { alumno } = this.state;
        this.alumnoService.grabar(alumno)
            .then(response => {
                console.log(response)
            }
            )
            .catch(
                error => console.log(error)
            )
    }
    handleCancelar() {
        this.props.history.push("/alumno-listado");
    }

    handleEliminar(event) {
        this.alumnoService.eliminar(this.state.alumno.id)
            .then(response => {
                console.log(response);
                this.handleCancelar();
            })
            .catch(
                error => console.log(error)
            )
    }


    buscarXId(id) {
        this.alumnoService.buscarXId(id).then(response => {
            this.setState(
                {
                    alumno: response
                }
            )
        })
            .catch(
                error => console.log(error)
            )
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let alumno = { ...this.state.alumno };
        alumno[name] = value;
        this.setState({ alumno });
    }
    render() {
        return (
            <Container>
                <Form onSubmit={this.handleGrabar}>
                    <Row>
                        <Col >
                            <Form.Group className="mb-2" controlId="nombres">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control type="text"
                                    name="nombres"
                                    value={this.state.alumno.nombres}
                                    onChange={this.handleChange}
                                    placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Form.Group className="mb-2" controlId="apellidoPaterno">
                                <Form.Label>Apellido Paterno </Form.Label>
                                <Form.Control type="text"
                                    name="apellidoPaterno"
                                    value={this.state.alumno.apellidoPaterno}
                                    onChange={this.handleChange}
                                    placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Form.Group className="mb-2" controlId="apellidoMaterno">
                                <Form.Label>Apellido Materno </Form.Label>
                                <Form.Control type="text"
                                    name="apellidoMaterno"
                                    value={this.state.alumno.apellidoMaterno}
                                    onChange={this.handleChange}
                                    placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Button variant="primary" type="submit">
                                Grabar
                            </Button>
                        </Col>
                        <Col >
                            <Button variant="warning" onClick={this.handleEliminar}>
                                Eliminar
                            </Button>
                        </Col>
                        <Col >
                            <Button variant="secondary" onClick={this.handleCancelar}>
                                Cancelar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    };
}
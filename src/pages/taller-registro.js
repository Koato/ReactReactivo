import { Component } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import TallerService from './../services/TallerService';
export default class TallerRegistro extends Component {
    taller = {
        id: null,
        idTaller: 0,
        nombre: "",
        duracion: 0,
        estado: "1"
    }
    constructor(props) {
        super(props);
        let id = this.props.match.params.id
        this.taller.id = id
        this.state = {
            taller: this.taller
        }
        this.tallerService = new TallerService();

        this.handleChange = this.handleChange.bind(this);
        this.handleGrabar = this.handleGrabar.bind(this);
        this.handleEliminar = this.handleEliminar.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
    }

    componentDidMount() {
        let id = this.state.taller.id;
        if (id) {
            this.buscarXId(id)
        }
    }

    handleGrabar(event) {

        event.preventDefault();

        const { taller } = this.state;
        this.tallerService.grabar(taller)
            .then(response => {
                console.log(response)
            }
            )
            .catch(
                error => console.log(error)
            )
    }
    handleCancelar() {
        this.props.history.push("/taller-listado");
    }

    handleEliminar(event) {
        this.tallerService.eliminar(this.state.taller.id)
            .then(response => {
                console.log(response);
                this.handleCancelar();
            })
            .catch(
                error => console.log(error)
            )
    }


    buscarXId(id) {
        this.tallerService.buscarXId(id).then(response => {
            this.setState(
                {
                    taller: response
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
        let taller = { ...this.state.taller };
        taller[name] = value;
        this.setState({ taller });
    }
    render() {
        return (
            <Container>
                <Form onSubmit={this.handleGrabar}>
                    <Row>
                        <Col >
                            <Form.Group className="mb-2" controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text"
                                    name="nombre"
                                    value={this.state.taller.nombre}
                                    onChange={this.handleChange}
                                    placeholder="" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Form.Group className="mb-2" controlId="duracion">
                                <Form.Label>Duracción</Form.Label>
                                <Form.Control type="text"
                                    name="duracion"
                                    value={this.state.taller.duracion}
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
import logo from './logo.svg';
import './App.css';
import { Container, Navbar, Nav } from "react-bootstrap"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home'
import TallerListado from './pages/taller-listado'
import TallerRegistro from './pages/taller-registro';
import AlumnoListado from './pages/alumno-listado'
import AlumnoRegistro from './pages/alumno-registro'
import Login from './pages/seguridad/login'
//import {useState} from 'react';
import useToken from './pages/seguridad/useToken';


function App() {
  const { token, setToken } = useToken();
  console.log('App token ->'+token)
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <img src={logo} className="App-logo" alt="logo" />
            <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/taller-listado">Talleres</Nav.Link>
              <Nav.Link href="/alumno-listado">Alumnos</Nav.Link>
              <Nav.Link href="/instructores-listado">Instructores</Nav.Link>
              <Nav.Link href="/acerca">Acerca</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          
          <Route exact path="/" component={Home} />

          <Route path="/taller-listado" component={TallerListado} />
          <Route path="/taller-registro" component={TallerRegistro} />
          <Route path="/taller-registro-id/:id" component={TallerRegistro} />
        
          <Route path="/alumno-listado" component={AlumnoListado} />
          <Route path="/alumno-registro" component={AlumnoRegistro} />
          <Route path="/alumno-registro-id/:id" component={AlumnoRegistro} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

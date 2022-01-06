import Configuration from '../configuration/Configuration';
import axios from "axios";

class AlumnoService {

    constructor() {
        this.configuration = new Configuration();
        this.url = this.configuration.API_ALUMNOS;
    }

    buscar(nombres) {

        if (nombres) {
            this.url = `${this.url}/by-nombres?nombres=${nombres}`
            console.log(this.url)
        }
        return axios.get(this.url)
            .then(response =>
                response.data
            )
            .catch(
                error => console.log(error)
            )
    }

    buscarXId(id) {
        return axios.get(`${this.url}/${id}`)
            .then(response =>
                response.data
            )
            .catch(
                error => console.log(error)
            )
    }

    grabar(taller) {
        if (taller.id) {
            return axios.put(`${this.url}/${taller.id}`, taller)
                .then(response => response.data)
                .catch(
                    error => console.log(error)
                )
        } else {
            return axios.post(this.url, taller)
                .then(response => response.data)
                .catch(
                    error => console.log(error)
                )
        }
    }
    eliminar(id) {
        return axios.delete(`${this.url}/${id}`)
            .then(response => response)
            .catch(
                error => console.log(error)
            )
    }
}

export default AlumnoService;
import Configuration from './../configuration/Configuration';
import axios from "axios";

class TallerService {
     
    constructor() {
        this.configuration = new Configuration();
        this.url = this.configuration.API_TALLERES
    }

    buscar(nombre) {
        
        if (nombre) {
            this.url = `${this.url}/by-nombre?nombre=${nombre}`
        }
        //console.log("url -> " + this.url);
       
        //console.log('getAll tokenString ->'+tokenString);
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        console.log('getAll ->'+userToken);

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': userToken
        }
        return axios.get(this.url,{
            headers: headers
          })
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
        console.log('grabar service')
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

export default TallerService;
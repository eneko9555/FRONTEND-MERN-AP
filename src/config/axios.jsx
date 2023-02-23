import axios from "axios";

const clienteAxios = axios.create({
    baseURL: 'https://mernapbackend-production.up.railway.app/api'

})

export default clienteAxios
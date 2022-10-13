import { axiosConfig } from '../configuracion/axiosConfig';

// Get all
const getTipos = async (estado = true) => {
    return axiosConfig.get('/tipos?estado='+estado, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// Get one
const getTipo = async (id) => {
    return axiosConfig.get(`/tipos/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// post
const createTipo = async (tipo) => {
    return axiosConfig.post('/tipos', tipo, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// put
const updateTipo = async (id, tipo) => {
    return axiosConfig.put(`/tipos/${id}`, tipo, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// delete
const deleteTipo = async (id) => {
    return axiosConfig.delete(`/tipos/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

export { getTipos, getTipo, createTipo, updateTipo, deleteTipo };
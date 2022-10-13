import { axiosConfig } from '../configuracion/axiosConfig';

// Get all
const getEstados = async (estado = true) => {
    return axiosConfig.get('/estados?estado='+estado, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// Get one
const getEstado = async (id) => {
    return axiosConfig.get(`/estados/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// post
const createEstado = async (estado) => {
    return axiosConfig.post('/estados', estado, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// put
const updateEstado = async (id, estado) => {
    return axiosConfig.put(`/estados/${id}`, estado, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// delete
const deleteEstado = async (id) => {
    return axiosConfig.delete(`/estados/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

export { getEstados, getEstado, createEstado, updateEstado, deleteEstado };
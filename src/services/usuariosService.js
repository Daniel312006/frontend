import { axiosConfig } from '../configuracion/axiosConfig';

// Get all
const getUsuarios = async (estado = true) => {
    return axiosConfig.get('/usuarios?estado='+estado, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// Get one
const getUsuario = async (id) => {
    return axiosConfig.get(`/usuarios/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// post
const createUsuario = async (usuario) => {
    return axiosConfig.post('/usuarios', usuario, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// put
const updateUsuario = async (id, usuario) => {
    return axiosConfig.put(`/usuarios/${id}`, usuario, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// delete
const deleteUsuario = async (id) => {
    return axiosConfig.delete(`/usuarios/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

export { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario };
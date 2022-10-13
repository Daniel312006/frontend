import { axiosConfig } from '../configuracion/axiosConfig';

// Get all
const getInventarios = async () => {
    return axiosConfig.get('/inventarios', {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// Get one
const getInventario = async (id) => {
    return axiosConfig.get(`/inventarios/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// post
const createInventario = async (inventario) => {
    return axiosConfig.post('/inventarios', inventario, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// put
const updateInventario = async (id, inventario) => {
    return axiosConfig.put(`/inventarios/${id}`, inventario, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// delete
const deleteInventario = async (id) => {
    return axiosConfig.delete(`/inventarios/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

export { getInventarios, getInventario, createInventario, updateInventario, deleteInventario };
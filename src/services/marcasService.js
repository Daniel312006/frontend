import { axiosConfig } from '../configuracion/axiosConfig';

// Get all
const getMarcas = async (estado = true) => {
    return axiosConfig.get('/marcas?estado='+estado, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// Get one
const getMarca = async (id) => {
    return axiosConfig.get(`/marcas/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// post
const createMarca = async (marca) => {
    return axiosConfig.post('/marcas', marca, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// put
const updateMarca = async (id, marca) => {
    return axiosConfig.put(`/marcas/${id}`, marca, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

// delete
const deleteMarca = async (id) => {
    return axiosConfig.delete(`/marcas/${id}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
}

export { getMarcas, getMarca, createMarca, updateMarca, deleteMarca };
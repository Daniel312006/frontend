// modal para crear y editar
import React from 'react';

export default function Modal({ titulo, metodo, elemento, change }) {

    const nuevoElemento = (event) => {
        event.preventDefault();
        metodo(elemento);
    }

    const handleChange = (event) => {
        change(event);
    }

    return (
        <div className="modal fade" id="modalNewUpdate" tabIndex={-1} aria-labelledby="modalNewUpdateLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalNewUpdateLabel">{titulo}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-start">
                        <form onSubmit={nuevoElemento}>                            
                            <div className="mb-3">
                                <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" value={elemento.nombre} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estado" className="col-form-label">Estado:</label>
                                <select className="form-select" id="estado" name="estado" value={elemento.estado} onChange={handleChange}>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">
                                    { elemento._id ? 'Actualizar' : 'Guardar' }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
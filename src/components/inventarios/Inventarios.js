// Componente inventario de productos con cards
import React, { useEffect, useState } from "react";
import eliminar from "../../helpers/Helpers";
import {
  getInventarios,
  createInventario,
  updateInventario,
  deleteInventario,
} from "../../services/inventariosService";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function Inventarios() {
  const [inventarios, setInventarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inventario, setInventario] = useState({
    serial: "",
    modelo: "",
    descripcion: "",
    foto: "",
    color: "",
    fechaCompra: Date.now(),
    precio: 0,
    usuario: "",
    marca: "",
    estado: "",
    tipoEquipo: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);

  const [errorSend, setErrorSend] = useState({
    status: false,
    message: "",
  });

  function cerrarModal() {
    setInventario({
      serial: "",
      modelo: "",
      descripcion: "",
      foto: "",
      color: "",
      fechaCompra: Date.now(),
      precio: 0,
      usuario: "",
      marca: "",
      estado: "",
      tipoEquipo: "",
    });
    document.getElementById("usuario").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("tipoEquipo").value = "";
    document.getElementById("estado").value = "";
    setErrorSend({
      status: false,
      message: "",
    });
    const modal = document.getElementById("modalInventario");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  }

  const listarInventarios = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await getInventarios();
      setUsuarios(data.usuarios);
      setMarcas(data.marcas);
      setTipos(data.tipos);
      setEstados(data.estados);
      setInventarios(data.inventarios);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar los datos!",
      });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorSend({
      status: false,
      message: "",
    });
    if (inventario._id) {
      const { data } = await updateInventario(inventario._id, inventario);
      if (data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Actualizado!",
          text: "El producto se actualizó",
        });
        cerrarModal();
        listarInventarios();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al actualizar!",
        });
        setErrorSend({
          status: true,
          message: data.message,
        });
      }      
    } else {  
      const { data } = await createInventario(inventario);
      if (data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Creado!",
          text: "El producto se creó",
        });
        cerrarModal();
        listarInventarios();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear el registro!",
        });
        setErrorSend({
          status: true,
          message: data.message,
        });
      }
    }    
  }

  const handleChange = (e) => {
    setInventario({
      ...inventario,
      [e.target.name]: e.target.value,
    });
  };

  const handleDate = (e) => {
    setInventario({
      ...inventario,
      fechaCompra: e.target.value,
    });
  };

  const editarInventario = (inventario) => {
    setInventario(inventario);
    const modal = document.getElementById("modalInventario");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.show();
  };

  useEffect(() => {
    listarInventarios();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Inventario</h1>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalInventario"            
          >
            Crear Inventario
          </button>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          {loading && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              Error al cargar los datos
            </div>
          )}
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {inventarios.length > 0 && inventarios.map((inventario) => (
              <div className="col" key={inventario._id}>
                <div className="card">
                  <img
                    src={inventario.foto}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{inventario.modelo}</h5>
                    <p className="card-text">{inventario.descripcion}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Fecha Compra: {dayjs(inventario.fechaCompra).format("DD/MM/YYYY")}
                      </small>
                    </p>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalInventario"
                      onClick={() => editarInventario(inventario)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminar(inventario._id, deleteInventario, '/inventarios')}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="modal fade" id="modalInventario">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {!inventario._id ? "Crear Inventario" : "Editar Inventario"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cerrarModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleOnSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="serial" className="form-label">
                        Serial
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="serial"
                        name="serial"
                        value={inventario.serial}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="modelo" className="form-label">
                        Modelo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="modelo"
                        name="modelo"
                        value={inventario.modelo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descripcion" className="form-label">
                        Descripción
                      </label>
                      <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        rows="3"
                        value={inventario.descripcion}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="precio" className="form-label">
                        Precio
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="precio"
                        name="precio"
                        value={inventario.precio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="color" className="form-label">
                        Color
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="color"
                        name="color"
                        value={inventario.color}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="fechaCompra" className="form-label">
                        Fecha de compra
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="fechaCompra"
                        name="fechaCompra"
                        value={dayjs(inventario.fechaCompra).format(
                          "YYYY-MM-DD"
                        )}
                        onChange={handleDate}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="marca" className="form-label">
                        Marca
                      </label>
                      <select
                        className="form-select"
                        id="marca"
                        name="marca"
                        value={inventario.marca._id}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione una marca</option>
                        {marcas.map((marca) => (
                          <option key={marca._id} value={marca._id}>
                            {marca.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="usuario" className="form-label">
                        Usuario
                      </label>
                      <select
                        className="form-select"
                        id="usuario"
                        name="usuario"
                        value={inventario.usuario._id}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione un usuario</option>
                        {usuarios.map((usuario) => (
                          <option key={usuario._id} value={usuario._id}>
                            {usuario.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="estado" className="form-label">
                        Estado
                      </label>
                      <select
                        className="form-select"
                        id="estado"
                        name="estado"
                        value={inventario.estado._id}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione un estado</option>
                        {estados.map((estado) => (
                          <option key={estado._id} value={estado._id}>
                            {estado.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tipoEquipo" className="form-label">
                        Tipo de equipo
                      </label>
                      <select
                        className="form-select"
                        id="tipoEquipo"
                        name="tipoEquipo"
                        value={inventario.tipoEquipo._id}
                        onChange={handleChange}
                      >
                        <option value="">
                          Seleccione un tipo de equipo
                        </option>
                        {tipos.map((tipoEquipo) => (
                          <option
                            key={tipoEquipo._id}
                            value={tipoEquipo._id}
                          >
                            {tipoEquipo.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="foto" className="form-label">
                        Foto
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="foto"
                        name="foto"
                        value={inventario.foto}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="foto" className="form-label">
                        Foto actual
                      </label>
                      <img className="img-fluid align-self-center" src={inventario.foto} alt="" />
                    </div>
                  </div>
                </div>
                {/* Botones */}
                <div className="row">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary mx-1">
                      {inventario._id ? "Actualizar" : "Guardar"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-1"
                      onClick={cerrarModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

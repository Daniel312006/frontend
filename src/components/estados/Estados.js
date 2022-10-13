// component: Estados
import React, { useEffect, useState } from "react";
import HeaderTable from "../ui/HeaderTable";
import Modal from "../ui/Modal";
import eliminar from "../../helpers/Helpers";
import {
  getEstados,
  createEstado,
  updateEstado,
  deleteEstado,
} from "../../services/estadosService";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function Estados() {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(true);
  const [error, setError] = useState(false);
  const [estadoEquipo, setEstado] = useState({
    nombre: "",
    estado: true,
  });

  const [errorSend, setErrorSend] = useState({
    status: false,
    message: "",
  });

  function cerrarModal() {
    setEstado({
      _id: 0,
      nombre: "",
      estado: true,
    });
    setErrorSend({
      status: false,
      message: "",
    });
    const modal = document.getElementById("modalNewUpdate");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  }

  const listarEstados = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await getEstados(query);
      setEstados(data);
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

  useEffect(() => {
    listarEstados();
  }, [query]);

  const handleChangeSwitch = (event) => {
    setQuery(!query);
  };

  const handleChange = (event) => {
    setEstado({
      ...estadoEquipo,
      [event.target.name]: event.target.value,
    });
  };

  const nuevoEstado = async (estadoEquipo) => {
    try {
      console.log(estadoEquipo);
      if (estadoEquipo._id !== 0) {
        await updateEstado(estadoEquipo._id, estadoEquipo);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estado actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const data = await createEstado(estadoEquipo);
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Estado creado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        setEstado({
          nombre: "",
          estado: true,
        });
      }
      listarEstados();
      cerrarModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear el estado!",
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>Estados</h3>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={query}
                  onChange={handleChangeSwitch}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Estado
                </label>
              </div>
            </div>
            <div className="col-6 text-end">
              <Modal
                titulo={"Nuevo Estado"}
                metodo={nuevoEstado}
                elemento={estadoEquipo}
                change={handleChange}
              />
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalNewUpdate"
                onClick={() => {
                  setEstado({
                    _id: 0,
                    nombre: "",
                    estado: true,
                  });
                  console.log(estadoEquipo);
                }}
              >
                Nuevo
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          {loading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              Error al cargar los datos!
            </div>
          )}
          {errorSend.status && (
            <div className="alert alert-danger" role="alert">
              {errorSend.message}
            </div>
          )}
          <div className="table-responsive">
            <table className="table table-striped">
              <HeaderTable />
              <tbody>
                {estados.map((estadoEquipo, index) => (
                  <tr key={estadoEquipo._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{estadoEquipo.nombre}</td>
                    <td>{estadoEquipo.estado ? "Activo" : "Inactivo"}</td>
                    <td>
                      {dayjs(estadoEquipo.fechaCreacion).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {dayjs(estadoEquipo.fechaActualizacion).format(
                        "DD/MM/YYYY"
                      )}
                    </td>
                    <td>
                      <Modal
                        titulo={"Editar Estado"}
                        metodo={nuevoEstado}
                        elemento={estadoEquipo}
                        change={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#modalNewUpdate"
                        onClick={() => {
                          setEstado(estadoEquipo);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={() =>
                          eliminar(estadoEquipo._id, deleteEstado, "/estados")
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

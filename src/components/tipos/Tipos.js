// component: Tipos
import React, { useEffect, useState } from "react";
import HeaderTable from "../ui/HeaderTable";
import Modal from "../ui/Modal";
import eliminar from "../../helpers/Helpers";
import {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo,
} from "../../services/tiposService";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function Tipos() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(true);
  const [error, setError] = useState(false);
  const [tipo, setTipo] = useState({
    nombre: "",
    estado: true,
  });

  const [errorSend, setErrorSend] = useState({
    status: false,
    message: "",
  });

  function cerrarModal() {
    setTipo({
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

  const listarTipos = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await getTipos(query);
      setTipos(data);
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
    listarTipos();
  }, [query]);

  const handleChangeSwitch = (event) => {
    setQuery(!query);
  };

  const handleChange = (event) => {
    setTipo({
      ...tipo,
      [event.target.name]: event.target.value,
    });
  };

  const nuevoTipo = async (tipo) => {
    try {
      if (tipo._id) {
        await updateTipo(tipo._id, tipo);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tipo de Equipo actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await createTipo(tipo);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tipo de Equipo creado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        setTipo({
          nombre: "",
          estado: true,
        });
      }
      listarTipos();
      cerrarModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear el tipo de equipo!",
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>Tipos de Equipos</h3>
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
                titulo={"Nuevo Tipo de Equipo"}
                metodo={nuevoTipo}
                elemento={tipo}
                change={handleChange}
              />
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalNewUpdate"
                onClick={() => {
                  setTipo({
                    _id: 0,
                    nombre: "",
                    estado: true,
                  });
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
                {tipos.map((tipo, index) => (
                  <tr key={tipo._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{tipo.nombre}</td>
                    <td>{tipo.estado ? "Activo" : "Inactivo" }</td>
                    <td>{dayjs(tipo.fechaCreacion).format("DD/MM/YYYY")}</td>
                    <td>
                      {dayjs(tipo.fechaActualizacion).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      <Modal
                        titulo={"Editar Tipo de Equio"}
                        metodo={nuevoTipo}
                        elemento={tipo}
                        change={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#modalNewUpdate"
                        onClick={() => {
                          setTipo(tipo);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={() => eliminar(tipo._id, deleteTipo, "/tipos")}
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

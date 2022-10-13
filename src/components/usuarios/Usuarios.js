// component: Usuarios
import React, { useEffect, useState } from "react";
import eliminar from "../../helpers/Helpers";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../../services/usuariosService";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import ModalUsuario from "../ui/ModalUsuario";
import HeaderTableUsuario from "../ui/HeaderTableUsuaro";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(true);
  const [error, setError] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    estado: true,
  });

  const [errorSend, setErrorSend] = useState({
    status: false,
    message: "",
  });

  function cerrarModal() {
    setUsuario({
      nombre: "",
      email: "",
      estado: true,
    });
    setErrorSend({
      status: false,
      message: "",
    });
    const modal = document.getElementById("modalUsuario");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  }

  const listarUsuarios = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await getUsuarios(query);
      setUsuarios(data);
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
    listarUsuarios();
  }, [query]);

  const handleChangeSwitch = (event) => {
    setQuery(!query);
  };

  const handleChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  };

  const nuevoUsuario = async (usuario) => {
    try {
      if (usuario._id) {
        await updateUsuario(usuario._id, usuario);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log(usuario);
        await createUsuario(usuario);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario creado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        setUsuario({
          nombre: "",
          email: "",
          estado: true,
        });
      }
      listarUsuarios();
      cerrarModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear el usuario!",
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>Usuarios</h3>
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
              <ModalUsuario
                titulo={"Nuevo Usuario"}
                metodo={nuevoUsuario}
                elemento={usuario}
                change={handleChange}
              />
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalUsuario"
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
              <HeaderTableUsuario />
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={usuario._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
                    <td>{dayjs(usuario.fechaCreacion).format("DD/MM/YYYY")}</td>
                    <td>
                      {dayjs(usuario.fechaActualizacion).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      <ModalUsuario
                        titulo={"Editar Usuario"}
                        metodo={nuevoUsuario}
                        elemento={usuario}
                        change={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUsuario"
                        onClick={() => {
                          setUsuario(usuario);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={() =>
                          eliminar(usuario._id, deleteUsuario, "/usuarios")
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

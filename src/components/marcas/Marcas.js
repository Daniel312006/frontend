// component: Marcas
import React, { useEffect, useState } from "react";
import HeaderTable from "../ui/HeaderTable";
import Modal from "../ui/Modal";
import eliminar from "../../helpers/Helpers";
import {
  getMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
} from "../../services/marcasService";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(true);
  const [error, setError] = useState(false);
  const [marca, setMarca] = useState({
    nombre: "",
    estado: true,
  });

  const [errorSend, setErrorSend] = useState({
    status: false,
    message: "",
  });

  function cerrarModal() {
    setMarca({
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

  const listarMarcas = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await getMarcas(query);
      setMarcas(data);
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
    listarMarcas();
  }, [query]);

  const handleChangeSwitch = (event) => {
    setQuery(!query);
  };

  const handleChange = (event) => {
    setMarca({
      ...marca,
      [event.target.name]: event.target.value,
    });
  };

  const nuevaMarca = async (marca) => {
    try {
      if (marca._id) {
        await updateMarca(marca._id, marca);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Marca actualizada",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await createMarca(marca);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Marca creada con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        setMarca({
          nombre: "",
          estado: true,
        });
      }
      listarMarcas();
      cerrarModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear la marca!",
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>Marcas</h3>
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
                titulo={"Nueva Marca"}
                metodo={nuevaMarca}
                elemento={marca}
                change={handleChange}
              />
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalNewUpdate"
                onClick={() => {
                  setMarca({
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
                {marcas.map((marca, index) => (
                  <tr key={marca._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{marca.nombre}</td>
                    <td>{marca.estado ? "Activo" : "Inactivo"}</td>
                    <td>{dayjs(marca.fechaCreacion).format("DD/MM/YYYY")}</td>
                    <td>
                      {dayjs(marca.fechaActualizacion).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      <Modal
                        titulo={"Editar Marca"}
                        metodo={nuevaMarca}
                        elemento={marca}
                        change={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#modalNewUpdate"
                        onClick={() => {
                          setMarca(marca);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={() =>
                          eliminar(marca._id, deleteMarca, "/marcas")
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

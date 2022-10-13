import Swal from "sweetalert2";

/**
 * Metodo para eliminar un elemento
 * @param {*} id id del elemento a eliminar
 * @param {*} service servicio a consumir
 * @param {*} ruta ruta para redireccionar
 */
const eliminar = async (id, service, ruta) => {
  try {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        service(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El registro ha sido eliminado.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to ruta
            window.location.href = ruta;
          }
        });
      }
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al eliminar el estado!",
    });
  }
};

export default eliminar;
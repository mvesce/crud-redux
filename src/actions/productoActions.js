import { AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
  COMENZAR_EDICION_PRODUCTO
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction (producto) {
  return async (dispatch) => {
    
    dispatch( agregarProducto() );

    try {
      //Insertar en la API
      await clienteAxios.post('/productos', producto);

      //Si todo sale bien actualiza state
      dispatch( agregarProductoExito(producto) );

      //Alerta
      Swal.fire(
        'Correcto',
        'El producto se agregó correctamente',
        'success'
      );

    } catch (error) {
      console.log(error);
      //Si hay error cambiar state
      dispatch( agregarProductoError(true) );

      //Alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo.'
      });
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});

//Si el producto se guarda en la bd
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

//Si hubo un error
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});



//Funcion que descarga los productos de la bd
export function obtenerProductosAction() {

  return async (dispatch) => {
    dispatch ( descargarProductos() );

    try {

      const respuesta = await clienteAxios.get('/productos');
      dispatch( descargaProductosExitosa(respuesta.data) );
    
    } catch (error) {
      
      console.log(error);
      dispatch( descargaProductosError() );

    }

  }

}

//Poner el loadin previo a descargar los productos
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

//Cargar productos en el state
const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

//Cambiar el estado a error
const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});



//Selecciona y elimina el producto
export function borrarProductoAction(id) {
  
  return async (dispatch) => {
    dispatch( obtenerProductoEliminar(id) );

    try {

      await clienteAxios.delete(`/productos/${id}`);
      dispatch( eliminarProductoExito() );

      //Si se elimina mostrar alerta
      Swal.fire(
        'Eliminado!',
        'El producto se eliminó correctamente',
        'success'
      )

    } catch (error) {
      console.log(error);
      dispatch( eliminarProductoError() );
    }

  }
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

//Cambiar el estado a error
const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
});



//Colocar producto en edición
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch( obtenerProductoEditarAction(producto) );
  }
}

const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})



//Edita un registro en la api y state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    
    dispatch( editarProducto() );

    try {

      await clienteAxios.put(`/productos/${producto.id}`, producto);

      dispatch( editarProductoExito(producto) );

    } catch(error) {
      console.log(error);
      dispatch( editarProductoError() );
    }

  }
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});

//Cambiar el estado a error
const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true
});
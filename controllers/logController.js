/**
 * Controlador para Log.
 * Extiende las funcionalidades del BaseController.
 * Aquí se puede personalizar la lógica de negocio.
 */
import * as Base from "./base/logBaseController.js";

// Re-exportamos los métodos base para que estén disponibles por defecto
export const crear = Base.crear;
export const obtenerTodos = Base.obtenerTodos;
export const obtenerUno = Base.obtenerUno;
export const actualizar = Base.actualizar;
export const eliminar = Base.eliminar;

// Puedes sobreescribir métodos o añadir nuevos aquí.
// Ejemplo:
// export const obtenerTodos = async (req, res) => {
//   console.log("Logica custom antes de llamar al base");
//   await Base.obtenerTodos(req, res);
// };

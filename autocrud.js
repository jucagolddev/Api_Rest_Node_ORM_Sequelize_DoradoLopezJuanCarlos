/**
 * Script de automatización para la generación de la arquitectura MVC Reducida.
 * Genera:
 * 1. Rutas (routes/)
 * 2. Controladores (controllers/) - Extienden de Base
 * 3. Controladores Base (controllers/base/) - Lógica estándar
 * 4. Servicios (services/) - Lógica de datos
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorios requeridos
const modelsPath = path.join(__dirname, "models");
const controllersContentPath = path.join(__dirname, "controllers");
const controllersBasePath = path.join(__dirname, "controllers", "base");
const servicesPath = path.join(__dirname, "services");
const routesPath = path.join(__dirname, "routes");

// Helper para crear directorios si no existen
const createDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

[controllersContentPath, controllersBasePath, servicesPath, routesPath].forEach(createDir);

// Función Helper para nomenclatura (PascalCase)
// Ejemplo: detalles_pedido -> DetallesPedido
const toPascalCase = (str) => {
  return str.replace(/_(\w)/g, (all, letter) => letter.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());
};

// Función Helper para singularizar (básica)
// Ejemplo: productos -> producto
const toSingular = (str) => {
  if (str.endsWith("s")) return str.slice(0, -1);
  return str;
};

// Filtrado de modelos válidos
const models = fs.readdirSync(modelsPath)
  .filter(f => f.endsWith(".js") && f !== "init-models.js");

console.log(`🔍 Modelos detectados: ${models.length}`);

for (const modelFile of models) {
  const modelNameOriginal = path.basename(modelFile, ".js"); // ej: detalles_pedido
  const ModelClass = toPascalCase(modelNameOriginal); // DetallesPedido

  // Nombre de la variable en código (camelCase), ej: detallesPedido
  const modelVar = ModelClass.charAt(0).toLowerCase() + ModelClass.slice(1);

  // Singular para mensajes y variables simples, ej: detalle_pedido (o detallePedido)
  // Usaremos el nombre original singularizado para logs/mensajes
  const singularName = toSingular(modelNameOriginal);

  console.log(`⚙️ Procesando: ${modelNameOriginal} -> Clase: ${ModelClass}`);

  // ---------------------------------------------------------
  // 1. SERVICIO (services/XService.js)
  // Capa de acceso a datos pura
  // ---------------------------------------------------------
  const serviceContent = `/**
 * Servicio para la entidad ${ModelClass}.
 * Encapsula la interacción con la base de datos.
 */
import { sequelize } from "../config/db.js";

// Accedemos al modelo definido en sequelize.models (cargado por init-models)
// Esto evita problemas de inicialización circular o doble.
const getModel = () => sequelize.models.${modelNameOriginal};

export const create = async (data) => {
  return await getModel().create(data);
};

export const findAll = async () => {
  return await getModel().findAll();
};

export const findById = async (id) => {
  return await getModel().findByPk(id);
};

export const update = async (id, data) => {
  const item = await getModel().findByPk(id);
  if (!item) return null;
  return await item.update(data);
};

export const remove = async (id) => {
  const item = await getModel().findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
`;
  fs.writeFileSync(path.join(servicesPath, `${modelNameOriginal}Service.js`), serviceContent);


  // ---------------------------------------------------------
  // 2. CONTROLADOR BASE (controllers/base/XBaseController.js)
  // Lógica CRUD estándar
  // ---------------------------------------------------------
  const baseControllerContent = `/**
 * Controlador Base para ${ModelClass}.
 * Contiene la lógica CRUD estándar utilizando el servicio.
 * NO MODIFICAR ESTE ARCHIVO DIRECTAMENTE.
 */
import * as ${ModelClass}Service from "../../services/${modelNameOriginal}Service.js";

export const crear = async (req, res) => {
  try {
    const nuevo = await ${ModelClass}Service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear ${singularName}:", error);
    res.status(500).json({ mensaje: "Error al crear el registro", error: error.message });
  }
};

export const obtenerTodos = async (req, res) => {
  try {
    const lista = await ${ModelClass}Service.findAll();
    res.json(lista);
  } catch (error) {
    console.error("Error al obtener ${singularName}s:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista", error: error.message });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const item = await ${ModelClass}Service.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "${singularName} no encontrado" });
    res.json(item);
  } catch (error) {
    console.error("Error al obtener ${singularName}:", error);
    res.status(500).json({ mensaje: "Error al obtener el registro", error: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const actualizado = await ${ModelClass}Service.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "${singularName} no encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar ${singularName}:", error);
    res.status(500).json({ mensaje: "Error al actualizar el registro", error: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const eliminado = await ${ModelClass}Service.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "${singularName} no encontrado" });
    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar ${singularName}:", error);
    res.status(500).json({ mensaje: "Error al eliminar el registro", error: error.message });
  }
};
`;
  fs.writeFileSync(path.join(controllersBasePath, `${modelNameOriginal}BaseController.js`), baseControllerContent);


  // ---------------------------------------------------------
  // 3. CONTROLADOR EXTENDIDO (controllers/XController.js)
  // Hereda del Base, permite personalización
  // ---------------------------------------------------------
  const controllerPath = path.join(controllersContentPath, `${modelNameOriginal}Controller.js`);

  // Solo creamos el controlador extendido si NO existe, para no pisar código del usuario
  if (!fs.existsSync(controllerPath)) {
    const controllerContent = `/**
 * Controlador para ${ModelClass}.
 * Extiende las funcionalidades del BaseController.
 * Aquí se puede personalizar la lógica de negocio.
 */
import * as Base from "./base/${modelNameOriginal}BaseController.js";

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
`;
    fs.writeFileSync(controllerPath, controllerContent);
  }


  // ---------------------------------------------------------
  // 4. RUTA (routes/XRoutes.js)
  // Apunta al Controlador Extendido
  // ---------------------------------------------------------
  const routeContent = `/**
 * Rutas para la entidad ${ModelClass}.
 */
import express from "express";
import {
  crear,
  obtenerTodos,
  obtenerUno,
  actualizar,
  eliminar
} from "../controllers/${modelNameOriginal}Controller.js";

const router = express.Router();

router.get("/", obtenerTodos);
router.get("/:id", obtenerUno);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;
`;
  fs.writeFileSync(path.join(routesPath, `${modelNameOriginal}Routes.js`), routeContent);

  console.log(`✅ Generado stack MVC para: ${modelNameOriginal}`);
}

console.log("\n🎉 Proceso AutoCRUD completado correctamente.");
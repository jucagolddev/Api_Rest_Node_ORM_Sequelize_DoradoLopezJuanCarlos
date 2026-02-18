// controllers/productosController.js
/**
 * Controlador para la gestión de productos.
 */
import { sequelize } from "../config/db.js";
import productos from "../models/productos.js";
import { DataTypes } from "sequelize";

// Inicialización del modelo
const Producto = productos.init(sequelize, DataTypes);

/**
 * Crea un nuevo registro de producto.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const crearProducto = async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear producto", error });
  }
};

/**
 * Obtiene todos los registros de productos.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerProductos = async (req, res) => {
  try {
    const lista = await Producto.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
};

/**
 * Obtiene un registro de producto por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerProducto = async (req, res) => {
  try {
    const item = await Producto.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener producto", error });
  }
};

/**
 * Actualiza un registro existente de producto.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const actualizarProducto = async (req, res) => {
  try {
    const item = await Producto.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
};

/**
 * Elimina un registro de producto por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const eliminarProducto = async (req, res) => {
  try {
    const item = await Producto.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
};

// Alias para compatibilidad con rutas genéricas
export const crear = crearProducto;
export const obtenerTodos = obtenerProductos;
export const obtenerUno = obtenerProducto;
export const actualizar = actualizarProducto;
export const eliminar = eliminarProducto;

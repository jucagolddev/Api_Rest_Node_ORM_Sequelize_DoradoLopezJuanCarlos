// controllers/categoriasController.js
/**
 * Controlador para la gestión de categorias.
 */
import { sequelize } from "../config/db.js";
import categorias from "../models/categorias.js";
import { DataTypes } from "sequelize";

// Inicialización del modelo
const Categoria = categorias.init(sequelize, DataTypes);

/**
 * Crea un nuevo registro de categoria.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const crearCategoria = async (req, res) => {
  try {
    const nuevo = await Categoria.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear categoria", error });
  }
};

/**
 * Obtiene todos los registros de categorias.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerCategorias = async (req, res) => {
  try {
    const lista = await Categoria.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener categorias", error });
  }
};

/**
 * Obtiene un registro de categoria por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerCategoria = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener categoria", error });
  }
};

/**
 * Actualiza un registro existente de categoria.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const actualizarCategoria = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar categoria", error });
  }
};

/**
 * Elimina un registro de categoria por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const eliminarCategoria = async (req, res) => {
  try {
    const item = await Categoria.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Categoria eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar categoria", error });
  }
};

// Alias para compatibilidad con rutas genéricas
export const crear = crearCategoria;
export const obtenerTodos = obtenerCategorias;
export const obtenerUno = obtenerCategoria;
export const actualizar = actualizarCategoria;
export const eliminar = eliminarCategoria;

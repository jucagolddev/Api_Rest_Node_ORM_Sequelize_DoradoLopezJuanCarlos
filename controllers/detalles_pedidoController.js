// controllers/detalles_pedidoController.js
/**
 * Controlador para la gestión de detalles_pedido.
 */
import { sequelize } from "../config/db.js";
import detalles_pedido from "../models/detalles_pedido.js";
import { DataTypes } from "sequelize";

// Inicialización del modelo
const Detalles_pedid = detalles_pedido.init(sequelize, DataTypes);

/**
 * Crea un nuevo registro de detalles_pedido.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const crearDetalles_pedid = async (req, res) => {
  try {
    const nuevo = await Detalles_pedid.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear detalles_pedido", error });
  }
};

/**
 * Obtiene todos los registros de detalles_pedido.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerDetalles_pedido = async (req, res) => {
  try {
    const lista = await Detalles_pedid.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

/**
 * Obtiene un registro de detalles_pedido por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerDetalles_pedid = async (req, res) => {
  try {
    const item = await Detalles_pedid.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

/**
 * Actualiza un registro existente de detalles_pedido.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const actualizarDetalles_pedid = async (req, res) => {
  try {
    const item = await Detalles_pedid.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar detalles_pedido", error });
  }
};

/**
 * Elimina un registro de detalles_pedido por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const eliminarDetalles_pedid = async (req, res) => {
  try {
    const item = await Detalles_pedid.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Detalles_pedid eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar detalles_pedido", error });
  }
};

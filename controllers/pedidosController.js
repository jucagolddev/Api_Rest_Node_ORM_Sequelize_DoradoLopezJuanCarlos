// controllers/pedidosController.js
/**
 * Controlador para la gestión de pedidos.
 */
import { sequelize } from "../config/db.js";
import pedidos from "../models/pedidos.js";
import { DataTypes } from "sequelize";

// Inicialización del modelo
const Pedido = pedidos.init(sequelize, DataTypes);

/**
 * Crea un nuevo registro de pedido.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const crearPedido = async (req, res) => {
  try {
    const nuevo = await Pedido.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear pedido", error });
  }
};

/**
 * Obtiene todos los registros de pedidos.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerPedidos = async (req, res) => {
  try {
    const lista = await Pedido.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedidos", error });
  }
};

/**
 * Obtiene un registro de pedido por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerPedido = async (req, res) => {
  try {
    const item = await Pedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedido", error });
  }
};

/**
 * Actualiza un registro existente de pedido.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const actualizarPedido = async (req, res) => {
  try {
    const item = await Pedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar pedido", error });
  }
};

/**
 * Elimina un registro de pedido por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const eliminarPedido = async (req, res) => {
  try {
    const item = await Pedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar pedido", error });
  }
};

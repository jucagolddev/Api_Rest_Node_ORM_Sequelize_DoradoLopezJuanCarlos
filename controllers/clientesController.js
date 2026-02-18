// controllers/clientesController.js
/**
 * Controlador para la gestión de clientes.
 */
import { sequelize } from "../config/db.js";
import clientes from "../models/clientes.js";
import { DataTypes } from "sequelize";

// Inicialización del modelo
const Cliente = clientes.init(sequelize, DataTypes);

/**
 * Crea un nuevo registro de cliente.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const crearCliente = async (req, res) => {
  try {
    const nuevo = await Cliente.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear cliente", error });
  }
};

/**
 * Obtiene todos los registros de clientes.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerClientes = async (req, res) => {
  try {
    const lista = await Cliente.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener clientes", error });
  }
};

/**
 * Obtiene un registro de cliente por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const obtenerCliente = async (req, res) => {
  try {
    const item = await Cliente.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener cliente", error });
  }
};

/**
 * Actualiza un registro existente de cliente.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const actualizarCliente = async (req, res) => {
  try {
    const item = await Cliente.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar cliente", error });
  }
};

/**
 * Elimina un registro de cliente por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const eliminarCliente = async (req, res) => {
  try {
    const item = await Cliente.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar cliente", error });
  }
};

// Alias para compatibilidad con rutas genéricas
export const crear = crearCliente;
export const obtenerTodos = obtenerClientes;
export const obtenerUno = obtenerCliente;
export const actualizar = actualizarCliente;
export const eliminar = eliminarCliente;

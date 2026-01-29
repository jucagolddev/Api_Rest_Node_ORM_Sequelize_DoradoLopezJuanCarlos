/**
 * Controlador Base para Pedidos.
 * Contiene la lógica CRUD estándar utilizando el servicio.
 * NO MODIFICAR ESTE ARCHIVO DIRECTAMENTE.
 */
import * as PedidosService from "../../services/pedidosService.js";

export const crear = async (req, res) => {
  try {
    const nuevo = await PedidosService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ mensaje: "Error al crear el registro", error: error.message });
  }
};

export const obtenerTodos = async (req, res) => {
  try {
    const lista = await PedidosService.findAll();
    res.json(lista);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista", error: error.message });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const item = await PedidosService.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "pedido no encontrado" });
    res.json(item);
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    res.status(500).json({ mensaje: "Error al obtener el registro", error: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const actualizado = await PedidosService.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "pedido no encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    res.status(500).json({ mensaje: "Error al actualizar el registro", error: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const eliminado = await PedidosService.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "pedido no encontrado" });
    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    res.status(500).json({ mensaje: "Error al eliminar el registro", error: error.message });
  }
};

/**
 * Controlador Base para DetallesPedido.
 * Contiene la lógica CRUD estándar utilizando el servicio.
 * NO MODIFICAR ESTE ARCHIVO DIRECTAMENTE.
 */
import * as DetallesPedidoService from "../../services/detalles_pedidoService.js";

export const crear = async (req, res) => {
  try {
    const nuevo = await DetallesPedidoService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear detalles_pedido:", error);
    res.status(500).json({ mensaje: "Error al crear el registro", error: error.message });
  }
};

export const obtenerTodos = async (req, res) => {
  try {
    const lista = await DetallesPedidoService.findAll();
    res.json(lista);
  } catch (error) {
    console.error("Error al obtener detalles_pedidos:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista", error: error.message });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const item = await DetallesPedidoService.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "detalles_pedido no encontrado" });
    res.json(item);
  } catch (error) {
    console.error("Error al obtener detalles_pedido:", error);
    res.status(500).json({ mensaje: "Error al obtener el registro", error: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const actualizado = await DetallesPedidoService.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "detalles_pedido no encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar detalles_pedido:", error);
    res.status(500).json({ mensaje: "Error al actualizar el registro", error: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const eliminado = await DetallesPedidoService.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "detalles_pedido no encontrado" });
    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar detalles_pedido:", error);
    res.status(500).json({ mensaje: "Error al eliminar el registro", error: error.message });
  }
};

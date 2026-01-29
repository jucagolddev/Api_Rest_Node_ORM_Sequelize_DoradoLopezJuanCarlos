/**
 * Controlador Base para Productos.
 * Contiene la lógica CRUD estándar utilizando el servicio.
 * NO MODIFICAR ESTE ARCHIVO DIRECTAMENTE.
 */
import * as ProductosService from "../../services/productosService.js";

export const crear = async (req, res) => {
  try {
    const nuevo = await ProductosService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ mensaje: "Error al crear el registro", error: error.message });
  }
};

export const obtenerTodos = async (req, res) => {
  try {
    const lista = await ProductosService.findAll();
    res.json(lista);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista", error: error.message });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const item = await ProductosService.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "producto no encontrado" });
    res.json(item);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ mensaje: "Error al obtener el registro", error: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const actualizado = await ProductosService.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "producto no encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ mensaje: "Error al actualizar el registro", error: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const eliminado = await ProductosService.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "producto no encontrado" });
    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ mensaje: "Error al eliminar el registro", error: error.message });
  }
};

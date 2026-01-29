/**
 * Controlador Base para Log.
 * Contiene la lógica CRUD estándar utilizando el servicio.
 * NO MODIFICAR ESTE ARCHIVO DIRECTAMENTE.
 */
import * as LogService from "../../services/logService.js";

export const crear = async (req, res) => {
  try {
    const nuevo = await LogService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear log:", error);
    res.status(500).json({ mensaje: "Error al crear el registro", error: error.message });
  }
};

export const obtenerTodos = async (req, res) => {
  try {
    const lista = await LogService.findAll();
    res.json(lista);
  } catch (error) {
    console.error("Error al obtener logs:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista", error: error.message });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const item = await LogService.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "log no encontrado" });
    res.json(item);
  } catch (error) {
    console.error("Error al obtener log:", error);
    res.status(500).json({ mensaje: "Error al obtener el registro", error: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const actualizado = await LogService.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "log no encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar log:", error);
    res.status(500).json({ mensaje: "Error al actualizar el registro", error: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const eliminado = await LogService.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "log no encontrado" });
    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar log:", error);
    res.status(500).json({ mensaje: "Error al eliminar el registro", error: error.message });
  }
};

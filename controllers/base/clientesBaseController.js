/**
 * Controlador Base para Clientes.
 * Contiene la lógica CRUD estándar utilizando el servicio.
 * NO MODIFICAR ESTE ARCHIVO DIRECTAMENTE.
 */
import * as ClientesService from "../../services/clientesService.js";

export const crear = async (req, res) => {
  try {
    const nuevo = await ClientesService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ mensaje: "Error al crear el registro", error: error.message });
  }
};

export const obtenerTodos = async (req, res) => {
  try {
    const lista = await ClientesService.findAll();
    res.json(lista);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista", error: error.message });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const item = await ClientesService.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "cliente no encontrado" });
    res.json(item);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ mensaje: "Error al obtener el registro", error: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const actualizado = await ClientesService.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "cliente no encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ mensaje: "Error al actualizar el registro", error: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const eliminado = await ClientesService.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "cliente no encontrado" });
    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ mensaje: "Error al eliminar el registro", error: error.message });
  }
};

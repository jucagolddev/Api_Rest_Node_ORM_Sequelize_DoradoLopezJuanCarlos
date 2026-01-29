/**
 * Rutas para la entidad Pedidos.
 */
import express from "express";
import {
  crear,
  obtenerTodos,
  obtenerUno,
  actualizar,
  eliminar
} from "../controllers/pedidosController.js";

const router = express.Router();

router.get("/", obtenerTodos);
router.get("/:id", obtenerUno);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;

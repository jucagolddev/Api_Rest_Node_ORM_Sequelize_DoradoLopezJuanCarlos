/**
 * Servicio para la entidad Categorias.
 * Encapsula la interacción con la base de datos.
 */
import { sequelize } from "../config/db.js";

// Accedemos al modelo definido en sequelize.models (cargado por init-models)
// Esto evita problemas de inicialización circular o doble.
const getModel = () => sequelize.models.categorias;

export const create = async (data) => {
  return await getModel().create(data);
};

export const findAll = async () => {
  return await getModel().findAll();
};

export const findById = async (id) => {
  return await getModel().findByPk(id);
};

export const update = async (id, data) => {
  const item = await getModel().findByPk(id);
  if (!item) return null;
  return await item.update(data);
};

export const remove = async (id) => {
  const item = await getModel().findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};

import { Sequelize } from "sequelize";

/**
 * Configuración de la conexión a la base de datos MySQL usando Sequelize.
 */
export const sequelize = new Sequelize("api_rest_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

// Verificación inicial de la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con la base de datos.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

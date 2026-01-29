// server.js
/**
 * Archivo principal del servidor.
 * Configura la aplicación Express, inicializa los modelos y carga dinámicamente las rutas.
 */
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./config/db.js";
import initModels from "./models/init-models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Inicialización de Modelos y Relaciones
// Esto asegura que todas las asociaciones (belongsTo, hasMany) estén registradas antes de usar los controladores
initModels(sequelize);

// Verificación de conexión y sincronización
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con la base de datos:", sequelize.config.database);

    // Sincronización (alter: true actualiza las tablas si hay cambios en modelos)
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar o sincronizar:", error);
  }
})();

// Carga Dinámica de Rutas
// Escanea la carpeta 'routes' y carga automáticamente cualquier archivo .js
const routesPath = path.join(__dirname, "routes");
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach(async (file) => {
    if (file.endsWith(".js")) {
      try {
        const routeModule = await import(`file://${path.join(routesPath, file)}`);
        // Asume que el nombre del archivo es 'entidadRoutes.js' -> endpoint '/entidad'
        // O usa el nombre base del archivo.
        // Estrategia: usar el nombre del recurso definido en el nombre del archivo, ej: "productosRoutes.js" -> "/productos"

        const routeName = file.replace("Routes.js", "").toLowerCase();
        // Si el archivo no sigue el patrón (ej. index.js), se carga en la raíz o se omite.
        // Aquí asumimos estricto 'NombreRoutes.js' generado por autocrud.

        if (routeModule.default) {
          app.use(`/${routeName}`, routeModule.default);
          console.log(`📡 Ruta cargada: /${routeName}`);
        }
      } catch (err) {
        console.error(`❌ Error al cargar la ruta ${file}:`, err);
      }
    }
  });
}

// Configuración y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

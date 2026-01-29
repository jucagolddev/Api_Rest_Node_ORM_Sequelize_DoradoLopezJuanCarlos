# Proyecto API REST con Node.js, Sequelize y AutoCRUD (MVC Reducido)

Este proyecto implementa una API RESTful utilizando Node.js y Sequelize, siguiendo una arquitectura **MVC Reducida** (Modelo-Vista-Controlador reducida) y un sistema **AutoCRUD** avanzado.

**Autor:** Dorado Lopez Juan Carlos  
**Materia:** Desarrollo Backend  
**Universidad:** [Nombre de tu Universidad]

---

## 🚀 Descripción General

El núcleo del proyecto es un script de automatización (`autocrud.js`) que escanea los modelos definidos en Sequelize y genera automáticamente:

1.  **Servicios** (`services/`): Capa de acceso a datos pura.
2.  **Controladores Base** (`controllers/base/`): Lógica genérica de CRUD.
3.  **Controladores Extendidos** (`controllers/`): Donde se puede aplicar lógica de negocio personalizada (Patrón Template Method).
4.  **Rutas** (`routes/`): Endpoints API estándar.

Además, el servidor (`server.js`) carga dinámicamente las rutas generadas, permitiendo que al crear un nuevo modelo y correr el script, la API esté lista inmediatamente.

## 🛠️ Requisitos Previos

- Node.js (v18 o superior recomendado)
- MySQL (XAMPP o similar)
- Gestor de paquetes `npm`

## ⚙️ Configuración e Instalación

1.  **Clonar el repositorio** o descomprimir el proyecto.
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Configurar Base de Datos**:
    - Asegúrate de que MySQL esté corriendo.
    - Crea una base de datos llamada `api_rest_db`.
    - Verifica las credenciales en `config/db.js` (por defecto: User `root`, Pass ``).

## ▶️ Ejecución y AutoCRUD

### 1. Generación de Código (AutoCRUD)

Si has añadido modelos nuevos o quieres regenerar la estructura, ejecuta:

```bash
node autocrud.js
```

Esto creará/actualizará los archivos en `services/`, `controllers/`, y `routes/`.

> **Nota**: El script respeta los controladores extendidos existentes en `controllers/` para no borrar tu lógica personalizada, pero regenera siempre los `base/` y `services/`.

### 2. Iniciar el Servidor

Para levantar la API:

```bash
node server.js
```

O en modo desarrollo (si tienes nodemon):

```bash
npm run dev
```

Verás en consola:

- ✅ Conexión establecida con la base de datos...
- ✅ Tablas sincronizadas correctamente.
- 📡 Ruta cargada: /productos
- ...
- 🚀 Servidor corriendo en http://localhost:3000

## 📡 Endpoints de Ejemplo

Por defecto, para cada modelo (ej. `Productos`), se generan:

| Método     | Endpoint         | Descripción                         |
| :--------- | :--------------- | :---------------------------------- |
| **GET**    | `/productos`     | Obtener todos los productos         |
| **GET**    | `/productos/:id` | Obtener un producto por ID          |
| **POST**   | `/productos`     | Crear un nuevo producto (Body JSON) |
| **PUT**    | `/productos/:id` | Actualizar un producto (Body JSON)  |
| **DELETE** | `/productos/:id` | Eliminar un producto                |

## 📐 Estructura del Proyecto

```
/
├── config/
│   └── db.js               # Conexión Sequelize con MySQL
├── models/
│   ├── log.js              # Modelo para Logs de auditoría
│   ├── init-models.js      # Relaciones entre tablas
│   └── ... (otros modelos)
├── services/               # [GENERADO] Acceso a datos
├── controllers/
│   ├── base/               # [GENERADO] Controladores Base (No tocar)
│   └── ...                 # Controladores personalizables
├── routes/                 # [GENERADO] Rutas de Express
├── autocrud.js             # Script generador de código
├── server.js               # Punto de entrada (Carga dinámica)
└── README.md               # Documentación
```

## 🧠 Explicación Técnica

### Arquitectura MVC Reducida con Servicios

Hemos separado la lógica en capas para asegurar mantenibilidad:

1.  **Controller**: Recibe la petición HTTP (`req`, `res`). Delega al Servicio.
2.  **Service**: Interactúa con los Modelos Sequelize. Devuelve datos puros, sin saber nada de HTTP.
3.  **Model**: Definición del esquema de base de datos.

### Patrón Template Method & Herencia

Usamos **Herencia** en los controladores. El controlador final (`ProductosController.js`) importa y rexporta las funciones del Base (`ProductosBaseController.js`). Si necesitamos cambiar el comportamiento de `obtenerTodos`, simplemente definimos esa función en `ProductosController.js` y sobrescribimos la importada, permitiendo extender la funcionalidad sin perder la automatización del resto.

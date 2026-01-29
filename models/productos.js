import _sequelize from 'sequelize';
const { Model } = _sequelize;

/**
 * Modelo que representa a la entidad 'Productos' en el inventario.
 * @extends Model
 */
export default class Productos extends Model {
  /**
   * Inicializa el modelo Productos.
   * @param {import('sequelize').Sequelize} sequelize - Instancia de Sequelize.
   * @param {import('sequelize').DataTypes} DataTypes - Tipos de datos.
   * @returns {Productos} Modelo inicializado.
   */
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "Identificador único del producto"
      },
      nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "Nombre del producto"
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Precio de venta unitario"
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: "Cantidad disponible en inventario"
      }
    }, {
      sequelize,
      tableName: 'productos',
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  }
}

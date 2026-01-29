import _sequelize from 'sequelize';
const { Model } = _sequelize;

/**
 * Modelo que gestiona las categorías de los productos.
 * Permite organizar el inventario en grupos lógicos.
 * @extends Model
 */
export default class Categorias extends Model {
  /**
   * Inicialización del modelo Categorias.
   * @param {import('sequelize').Sequelize} sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   * @returns {Categorias}
   */
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "Identificador único de la categoría"
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Nombre descriptivo de la categoría"
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Detalles adicionales sobre la categoría"
      }
    }, {
      sequelize,
      tableName: 'categorias',
      timestamps: false,
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

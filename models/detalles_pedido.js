import _sequelize from 'sequelize';
const { Model } = _sequelize;

/**
 * Modelo que representa los detalles de un pedido (líneas de pedido).
 * Relaciona pedidos con productos y cantidades.
 * @extends Model
 */
export default class DetallesPedido extends Model {
  /**
   * Inicializa el modelo DetallesPedido.
   * @param {import('sequelize').Sequelize} sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   * @returns {DetallesPedido}
   */
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "ID único del detalle"
      },
      pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'id'
        },
        comment: "ID del pedido asociado"
      },
      producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id'
        },
        comment: "ID del producto asociado"
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "Cantidad de unidades del producto"
      },
      precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Precio unitario al momento de la compra"
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Subtotal calculado (cantidad * precio)"
      }
    }, {
      sequelize,
      tableName: 'detalles_pedido',
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
        {
          name: "pedido_id",
          using: "BTREE",
          fields: [
            { name: "pedido_id" },
          ]
        },
        {
          name: "producto_id",
          using: "BTREE",
          fields: [
            { name: "producto_id" },
          ]
        },
      ]
    });
  }
}

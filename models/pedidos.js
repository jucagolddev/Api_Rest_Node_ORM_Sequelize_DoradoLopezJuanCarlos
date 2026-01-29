import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

/**
 * Modelo que representa a la entidad 'Pedidos'.
 * Registra las transacciones realizadas por los clientes.
 * @extends Model
 */
export default class Pedidos extends Model {
  /**
   * Configuración e inicialización del modelo Pedidos.
   * @param {import('sequelize').Sequelize} sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   * @returns {Pedidos}
   */
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "Identificador único del pedido"
      },
      cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        },
        comment: "Referencia al cliente que realiza el pedido"
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('current_timestamp'),
        comment: "Fecha y hora de creación del pedido"
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
        comment: "Monto total del pedido"
      },
      estado: {
        type: DataTypes.ENUM('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'),
        allowNull: true,
        defaultValue: "pendiente",
        comment: "Estado actual del flujo del pedido"
      }
    }, {
      sequelize,
      tableName: 'pedidos',
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
          name: "cliente_id",
          using: "BTREE",
          fields: [
            { name: "cliente_id" },
          ]
        },
      ]
    });
  }
}

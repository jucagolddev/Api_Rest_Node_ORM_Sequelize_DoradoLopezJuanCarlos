import _sequelize from 'sequelize';
const { Model } = _sequelize;

/**
 * Modelo que representa a la entidad 'Clientes' en la base de datos.
 * Gestiona la información personal y de contacto de los clientes.
 * @extends Model
 */
export default class Clientes extends Model {
  /**
   * Inicializa el modelo con sus atributos y opciones.
   * @param {import('sequelize').Sequelize} sequelize - Instancia de la conexión a la base de datos.
   * @param {import('sequelize').DataTypes} DataTypes - Tipos de datos de Sequelize.
   * @returns {Clientes} El modelo inicializado.
   */
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "Identificador único del cliente"
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Nombre completo del cliente"
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: "email",
        validate: {
          isEmail: true
        },
        comment: "Correo electrónico único del cliente"
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "Número de teléfono de contacto"
      },
      direccion: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: "Dirección física del cliente"
      }
    }, {
      sequelize,
      tableName: 'clientes',
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
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "email" },
          ]
        },
      ]
    });
  }
}

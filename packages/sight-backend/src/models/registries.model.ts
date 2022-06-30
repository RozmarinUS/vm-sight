import { DataTypes, Model, Sequelize } from 'sequelize';
import { generateID } from '@utils/security';
import { RegistryTypes } from '../dtos/registries.dto';

export class RegistriesModel extends Model {
  id: string;
  name: string;
  type: RegistryTypes;
  host: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  public static associate() {
    return;
  }

  public static initModel(sequelize: Sequelize): typeof RegistriesModel {
    RegistriesModel.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.STRING,
        },
        user_id: DataTypes.STRING,
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        host: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'registries',
        timestamps: false,
        sequelize,
        indexes: [],
        hooks: {
          beforeCreate: record => {
            if (!record.id) {
              record.id = generateID();
            }
            record.createdAt = new Date();
            record.updatedAt = new Date();
          },
          afterUpdate: record => {
            record.updatedAt = new Date();
          },
        },
      },
    );
    return RegistriesModel;
  }
}

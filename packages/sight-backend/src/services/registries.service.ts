import { RegistriesModel } from '@models/registries.model';
import { generateID } from '@utils/security';
import { ConflictException, ForbiddenException, NotFoundException } from '@exceptions';
import { CreateRegistry, RegistryTypes, UpdateRegistry } from '@dtos/registries.dto';
import axios from 'axios';

class RegistriesService {
  public registriesModel = RegistriesModel;
  public dockerHubUrl = 'https://docker.io';

  public async api(registryId: string, data) {
    const registry = await this.getById(registryId);
    return axios({
      baseURL: registry.type === 'dockerhub' ? this.dockerHubUrl : registry.host,
      ...data,
    });
  }

  public async getRegistries(userId: string) {
    const registries = await this.registriesModel.findAll({
      attributes: ['id', 'user_id', 'name', 'type', 'host', 'createdAt', 'updatedAt'],
      where: { user_id: userId },
    });
    if (registries.filter(registry => registry.type === 'dockerhub').length === 0) {
      const newReg = new this.registriesModel({
        id: generateID(),
        user_id: userId,
        name: 'Dockerhub',
        type: 0,
        host: null,
      });
      registries.push(newReg);
      await newReg.save();
    }
    return registries;
  }

  public async getById(registryId: string) {
    const registry = await this.registriesModel.findOne({ where: { id: registryId } });
    if (registry) {
      return registry;
    } else {
      throw new NotFoundException('Registry not found');
    }
  }

  public async checkRegistryConnection(registryType: RegistryTypes, data: UpdateRegistry | CreateRegistry) {
    if (registryType === 'dockerhub' || registryType === 'private') {
      return new Promise<void>((resolve, reject) => {
        axios({
          method: 'post',
          baseURL: registryType === 'dockerhub' ? this.dockerHubUrl : data.host,
          url: '/v2/users/login',
          timeout: 3000,
          data: {
            username: data.username,
            password: data.password,
          },
        })
          .then(() => resolve)
          .catch(err => reject(err));
      });
    } else {
      throw new NotFoundException('Method not found');
    }
  }

  public async createRegistry(createData: CreateRegistry) {
    return this.checkRegistryConnection(createData.type, createData)
      .then(() => {
        console.log('dev');
        return true;
      })
      .catch(err => {
        throw new ForbiddenException(err.message ?? 'An error occurred');
      });
    // if (createData.type === 'dockerhub') throw new ConflictException("You can't create DockerHub one more");
    // await this.checkRegistryConnection(createData.type, createData);
    // return new RegistriesModel({ createData }).save();
  }

  public async updateRegistry(registryId: string, updateData: UpdateRegistry) {
    const registry = await this.getById(registryId);
    if (registry) {
      await this.checkRegistryConnection(registry.type, updateData);
      return registry.update(updateData);
    } else {
      throw new NotFoundException('The registry was not found');
    }
  }

  public async deleteRegistry(registryId: string) {
    const registry = await this.getById(registryId);
    if (registry) {
      await registry.destroy();
    } else {
      throw new NotFoundException('The registry was not found');
    }
  }
}

export default RegistriesService;

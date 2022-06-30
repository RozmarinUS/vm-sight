import RegistriesService from '@services/registries.service';
import { CreateRegistry, UpdateRegistry } from '@dtos/registries.dto';

class RegistriesController {
  public registriesService = new RegistriesService();

  /**
   * @openapi
   *   /registries:
   *     get:
   *       tags:
   *       - registries
   *       summary: Get registries
   *       responses:
   *         200:
   *           description: 'Ok'
   */
  public main = async (req, res) => {
    return res.send(await this.registriesService.getRegistries(req.user.id));
  };

  /**
   * @openapi
   *   /registries:
   *     post:
   *       tags:
   *       - registries
   *       summary: Create registry
   *       parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/createRegistryDto'
   *       responses:
   *         200:
   *           description: 'Ok'
   */
  public create = async (req, res) => {
    const createData: CreateRegistry = req.body;
    await this.registriesService.createRegistry(createData);
    return res.status(201).json();
  };

  /**
   * @openapi
   *   /registries/{registryId}:
   *     put:
   *       tags:
   *       - registries
   *       summary: Update the registry
   *       parameters:
   *       - name: registryId
   *         in: path
   *         description: Registry ID
   *         required: true
   *         type: string
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/updateRegistryDto'
   *       responses:
   *         200:
   *           description: 'Ok'
   */
  public update = async (req, res) => {
    const updateData: UpdateRegistry = req.body;
    await this.registriesService.updateRegistry(req.params.registryId, updateData);
    return res.status(200).json();
  };

  /**
   * @openapi
   *   /registries/{registryId}:
   *     delete:
   *       tags:
   *       - registries
   *       summary: Delete the registry
   *       parameters:
   *       - name: registryId
   *         in: path
   *         description: Registry ID
   *         required: true
   *         type: string
   *       responses:
   *         200:
   *           description: 'Ok'
   */
  public remove = async (req, res) => {
    await this.registriesService.deleteRegistry(req.params.registryId);
    return res.status(200).json();
  };
}

export default RegistriesController;

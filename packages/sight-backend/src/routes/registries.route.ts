import Route from '@interfaces/routes.interface';
import { Router } from 'express';
import { wrapRouteHandler } from '@utils/util';
import RegistriesController from '@controllers/registries.controller';
import { authMiddleware, validationMiddleware } from '@middlewares';
import { CreateRegistry, UpdateRegistry } from '@dtos/registries.dto';

class RegistriesRoute implements Route {
  public path = '/registries';
  public router = Router();
  public registriesController = new RegistriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', authMiddleware, wrapRouteHandler(this.registriesController.main));
    this.router.post('/', authMiddleware, validationMiddleware(CreateRegistry, 'body'), wrapRouteHandler(this.registriesController.create));
    this.router.put('/:registryId', authMiddleware, validationMiddleware(UpdateRegistry, 'body'), wrapRouteHandler(this.registriesController.update));
    this.router.delete('/:registryId', authMiddleware, wrapRouteHandler(this.registriesController.remove));
  }
}

export default RegistriesRoute;

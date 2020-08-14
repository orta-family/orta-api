import express, { NextFunction, Request, Response, Router, RequestHandler } from 'express';
import { Base } from '~/entity/Base';
import { Slug } from '~/entity/Slug';
import { NotFoundApiError, ValidationApiError } from '~/error';
import { validate } from 'class-validator';

class ApiOkResponse {
  constructor(public data: any) {
    this.data = data;
  }
};

class CrudRouter {
  public router: Router;
  public name: string;
  public notFoundError: NotFoundApiError;

  public readManyRoute: RequestHandler = async (req: Request, res: Response) => {
    const { filter } = req.query;
    let collection;
  
    if (filter) {
      collection = await this.Entity.find({ where: { ...filter } });
    } else {
      collection = await this.Entity.find();
    }
  
    const data = new ApiOkResponse(collection.map(e => e.serialize()));
    return res.json(data);
  };

  public createRoute: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const item = this.Entity.create(req.body);
    const valErrs = await validate(item);
  
    if (valErrs.length > 0) {
      return next(new ValidationApiError({ source: valErrs }));
    }
  
    const result = await item.save().catch(e => new ValidationApiError({ detail: e.detail })); // TODO: Generic error
  
    if (result instanceof ValidationApiError) {
      return next(result);
    }
  
    const data = new ApiOkResponse(item.serialize());
    return res.json(data);
  };

  public readOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log('CRUD CRUD CRUD');

    if (isNaN(+id)) {
      return next(this.notFoundError);
    }

    const item = await this.Entity.findOne(id).catch(e => new ValidationApiError({ detail: e.message }));
  
    if (!item) {
      return next(this.notFoundError);
    }
  
    if (item instanceof ValidationApiError) {
      return next(item);
    }
  
    res.locals.item = item;
    return next();
  };

  public readOneRoute: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { item } = res.locals;

    const data = new ApiOkResponse(item.serialize());
    return res.json(data);
  };

  public deleteRoute: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { item } = res.locals;
  
    item.remove();
  
    const data = new ApiOkResponse(item.serialize());
    return res.json(data);
  };

  constructor(
    public Entity: typeof Base,
    public options: {
      name?: string, 
      notFoundError?: NotFoundApiError,
      readOne?: RequestHandler
    } = {},
  ) {
    this.Entity = Entity;
    this.name = options.name || 'Entity';
    this.notFoundError = options.notFoundError || new NotFoundApiError({
      detail: `Specified ${this.name} was not found`
    });

    const router = express.Router();
    this.router = router;

    router.get('/', this.readManyRoute);
    router.post('/', this.createRoute);

    router.all('/:id', this.readOne);
    router.get('/:id', this.readOneRoute);
    router.delete('/:id', this.deleteRoute);
  }
}

function SlugCrudRouter(router: CrudRouter) : CrudRouter {
  router.readOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log('SLUG SLUG SLUG');

    if (isNaN(+id)) {
      return next(router.notFoundError);
    }

    const item = await router.Entity.findOne(id).catch(e => new ValidationApiError({ detail: e.message }));
  
    if (!item) {
      return next(router.notFoundError);
    }
  
    if (item instanceof ValidationApiError) {
      return next(item);
    }
  
    res.locals.item = item;
    return next();
  };
  return router;
}

export { CrudRouter, SlugCrudRouter, ApiOkResponse }
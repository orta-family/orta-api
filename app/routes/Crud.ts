import express, { NextFunction, Request, Response, Router } from 'express';
import { Base } from '~/entity/Base';
import { NotFoundApiError, ValidationApiError } from '~/error';
import { validate } from 'class-validator';
import chalk from 'chalk';

class ApiOkResponse {
  constructor(public data: any) {
    this.data = data;
  }
};

class CrudRouter {
  public router: Router;

  constructor(
    public Entity: typeof Base,
    public entityName?: string, 
    public notFoundError?: NotFoundApiError,
  ) {
    this.Entity = Entity;
    this.entityName = entityName;
    this.notFoundError = notFoundError || new NotFoundApiError({
      detail: `Specified Entity (${entityName}) was not found`
    });

    const router = express.Router();
    this.router = router;

    router.get('/', async (req: Request, res: Response) => {
      const { filter } = req.query;
      let collection;
    
      if (filter) {
        collection = await Entity.find({ where: { ...filter } });
      } else {
        collection = await Entity.find();
      }
    
      const data = new ApiOkResponse(collection.map(e => e.serialize()));
      return res.json(data);
    });

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
      const item = Entity.create(req.body);
      const valErrs = await validate(item);
    
      if (valErrs.length > 0) {
        return next(new ValidationApiError({ source: valErrs }));
      }
    
      const result = await item.save().catch(e => new ValidationApiError({ detail: e.detail }));
    
      if (result instanceof ValidationApiError) {
        return next(result);
      }
    
      const data = new ApiOkResponse(item.serialize());
      return res.json(data);
    });
    
    router.all('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      if (isNaN(+id)) {
        return next(this.notFoundError);
      }

      const item = await Entity.findOne(id).catch(e => new ValidationApiError({ detail: e.message }));
    
      if (!item) {
        return next(this.notFoundError);
      }
    
      if (item instanceof ValidationApiError) {
        return next(item);
      }
    
      res.locals.item = item;
      return next();
    });
    
    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { item } = res.locals;

      const data = new ApiOkResponse(item.serialize());
      return res.json(data);
    });
    
    router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { item } = res.locals;
    
      item.remove();
    
      const data = new ApiOkResponse(item.serialize());
      return res.json(data);
    });
  }
}

export { CrudRouter, ApiOkResponse }
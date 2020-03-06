import express, { NextFunction, Request, Response, response } from 'express';
import { validate } from 'class-validator';
import { Member } from '~/entity/Member';
import { ValidationApiError, NotFoundApiError } from '~/error';
import chalk from 'chalk';

const router = express.Router();
const memberNotFound = new NotFoundApiError({ detail: 'Specified Member was not found' });
class ApiOkResponse {
  constructor(public data: any) {
    this.data = data;
  }
};

router.get('/', async (req: Request, res: Response) => {
  const { filter } = req.query;
  let members;

  if (filter) {
    members = await Member.find({ where: { ...filter } });
  } else {
    members = await Member.find();
  }

  const data = new ApiOkResponse(members.map(m => m.serialize()));
  return res.json(data);
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const member = Member.create(req.body);
  const valErrs = await validate(member);

  if (valErrs.length > 0) {
    return next(new ValidationApiError({ source: valErrs }));
  }

  const result = await member.save().catch(e => new ValidationApiError({ detail: e.detail }));

  if (result instanceof ValidationApiError) {
    return next(result);
  }

  const data = new ApiOkResponse(member.serialize());
  return res.json(data);
});

router.get('/:idOrSlug', async (req: Request, res: Response, next: NextFunction) => {
  const { idOrSlug } = req.params;
  let member;

  if (isNaN(+idOrSlug)) {
    member = await Member.findBySlug(idOrSlug, 'Member');
  } else {
    member = await Member.findOne(idOrSlug);
  }

  if (!member) {
    return next(memberNotFound);
  }

  const data = new ApiOkResponse(member.serialize());
  return res.json(data);
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const member = await Member.findOne(id);

  if (!member) {
    return next(memberNotFound);
  }

  member.remove();

  const data = new ApiOkResponse(member.serialize());
  return res.json(data);
});


export default router;
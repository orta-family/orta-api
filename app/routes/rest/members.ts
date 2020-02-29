import express, { NextFunction, Request, Response } from 'express';
// import { classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { Member } from '~/entity/Member';
import { ValidationApiError } from '~/error';
// import { Serializer } from 'jsonapi-serializer';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const members = await Member.find();
  return res.json(members);
});

router.get('/:id', async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  let member;

  if (isNaN(+idOrSlug)) {
    member = await Member.findBySlug(idOrSlug, 'Member');
  } else {
    member = await Member.findOne(idOrSlug);
  }

  return res.json(member);
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const member = Member.create(req.body);
  const valErrs = await validate(member);

  if (valErrs.length > 0) {
    return next(new ValidationApiError({ source: valErrs }));
  }

  await member.save();
  return res.json({ message: 'Test', member, valErrs})
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const member = await Member.findOne(id);
  if (!member) {
    return
  }
  member?.remove();
  return res.json(member);
});


export default router;
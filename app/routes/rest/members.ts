import express, { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Member } from '~/entity/Member';


const router = express.Router();

router.get('/', async function(req: Request, res: Response) {
  const members = await Member.find();
  return res.json(members);
});

router.get('/:idOrSlug', async function(req: Request, res: Response) {
  const { idOrSlug } = req.params;
  let members;
  if (isNaN(+idOrSlug)) {
    members = await Member.findBySlug(idOrSlug, 'Member');
  } else {
    members = await Member.findOne(idOrSlug);
  }
  return res.json(members);
});

router.post('/', async function(req: Request, res: Response) {
  const member = Member.create(req.body);
  const errors = await validate(member);
  return res.json({ message: 'Test', member, errors})
});

export default router;
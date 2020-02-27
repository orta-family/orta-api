import express, { Request, Response } from 'express';
// import { classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { Member } from '~/entity/Member';
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

router.post('/', async (req: Request, res: Response) => {
  const member = Member.create(req.body);
  const errors = await validate(member);
  // const plain = classToPlain(member);
  if (errors.length > 0) {
    const err = new Error('Validation Failed');
    throw err;
    // res.status(500);
    // return res.json({ message: 'ERR', member, errors})
  }

  await member.save();
  return res.json({ message: 'Test', member, errors})
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const member = await Member.findOne(id);
  member?.remove();
  return res.json(member);
});


export default router;
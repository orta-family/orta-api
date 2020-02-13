import express, { Request, Response } from 'express';
import { Member } from '~/entity/Member';


const router = express.Router();

router.get('/', async function(req: Request, res: Response) {
  const members = await Member.find();
  return res.json(members);
});

router.get('/:slug', async function(req: Request, res: Response) {
  const members = await Member.findBySlug(req.params.slug);
  return res.json(members);
});

export default router;
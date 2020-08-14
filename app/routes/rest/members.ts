import { Member } from '~/entity/Member';
import { SlugCrudRouter, CrudRouter } from '~/routes/Crud';

const memberCrud = SlugCrudRouter(new CrudRouter(Member, {
  name: 'Member',
}));

export default memberCrud.router;
export { memberCrud };
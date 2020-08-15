import { Member } from '~/entity/Member';
import { SlugCrudRouter, CrudRouter } from '~/routes/Crud';

const memberCrud = new SlugCrudRouter(Member, { name: 'Member' });

export default memberCrud.router;
export { memberCrud };
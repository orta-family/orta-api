import { Member } from '~/entity/Member';
import { SlugCrudRouter } from '~/routes/Crud';

const memberCrud = new SlugCrudRouter(Member, 'Member');

export default memberCrud.router;
export { memberCrud };
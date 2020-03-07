import { Member } from '~/entity/Member';
import { CrudRouter } from '~/routes/Crud';

const memberCrud = new CrudRouter(Member, 'Member');

export default memberCrud.router;
export { memberCrud };
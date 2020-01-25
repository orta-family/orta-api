import { nexusPrismaPlugin } from 'nexus-prisma'
import { idArg, makeSchema, objectType, stringArg } from 'nexus'

const Member = objectType({
  name: 'members',
  definition(t) {
    t.model.member_id()
    t.model.name()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.members({
      alias: 'members',
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOnemembers({ alias: 'signupMember' })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Member],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
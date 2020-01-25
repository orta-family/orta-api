import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType } from 'nexus'

const Member = objectType({
  name: 'Member',
  definition(t) {
    t.model.member_id()
    t.model.name()
    t.model.email()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.member({
      alias: 'Member',
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneMember({ alias: 'signupMember' })
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
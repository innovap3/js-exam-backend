const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.prisma.io',
    description: 'Prisma replaces traditional ORMs'
  }
];
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return links.find(function(link) {
        console.log(link.id, args.id);
        return link.id === args.id;
      });
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let updatedLink = {};
      links = links.map(function(link) {
        if (link.id === args.id) {
          updatedLink = {
            id: args.id,
            description: args.description || link.description,
            url: args.url || link.url
          };
          return updatedLink;
        }
        return link;
      });
      return updatedLink;
    },
    deleteLink: (parent, args) => {
      let deletedLink = {};
      links = links.filter(function(link) {
        if (link.id === args.id) {
          deletedLink = link;
        }
        return link.id !== args.id;
      });
      return deletedLink;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

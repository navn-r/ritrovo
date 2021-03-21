export const resolvers = {
  Query: {
    viewer(_parent: any, _args: any, _context: any, _info: any) {
      return { id: 1, name: "John Smith", status: "cached" };
    },
  },
};

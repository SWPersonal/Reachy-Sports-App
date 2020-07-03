import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createPost: async (_, args, { request, isAuthenticated, isAdmin }) => {
      isAuthenticated(request);
      isAdmin(request);

      const { image, caption, overview, description, isFeatured, category } = args;

      await prisma.createPost({
        image,
        caption,
        overview,
        description,
        category,
        isFeatured,
        user: {
          connect: {
            id: request.user.id
          }
        }
      });

      return true;
    }
  }
}

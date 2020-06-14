import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: { 
    sendMessage: async (_, { text, groupId }, { request, isAuthenticated }) => {
      isAuthenticated(request);

      const isParticipant = await prisma.$exists.participant({
        groupId,
        AND: [{
          user: {
            id: request.user.id
          }
        }]
      });
      
      if (!isParticipant) throw new Error("Oops, you ain't a member of this group");

      await prisma.createMessage({
        text,
        user: {
          connect: {
            id: request.user.id
          }
        },
        group: {
          connect: {
            id: groupId
          }
        }
      });

      return true;
    }
  }
}

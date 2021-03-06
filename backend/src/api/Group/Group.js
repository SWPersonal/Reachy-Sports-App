import { prisma } from "../../../generated/prisma-client";

export default {
  Group: {
    isParticipant: async ({ id }, __, { request }) => {
      return (await prisma.user({ id: request.user.id }).groupParticipant()).some(group => group.groupId === id);
    }
  }
}

import prisma from "@repo/database";

export const userService = {
  getAllUsers: async () => {
    return prisma.user.findMany();
  },
  
  getUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },
  
  createUser: async (data: { name: string; email: string }) => {
    return prisma.user.create({
      data,
    });
  },
  
  updateUser: async (id: string, data: { name?: string; email?: string }) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },
  
  deleteUser: async (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};

export default {
  userService,
};

import prisma from "../config/database";

export class UserModel {
  // Create a new user
  static async createUser(data: any) {
    return prisma.user.create({
      data,
    });
  }

  // Get all users
  static async getUsers() {
    return prisma.user.findMany();
  }

  // Get a user by ID
  static async getUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  // Get a user by email
  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // Update user information
  static async updateUser(id: number, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete a user by ID
  static async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

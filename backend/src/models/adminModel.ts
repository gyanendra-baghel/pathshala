import prisma from "../config/database";

class AdminModel {
  static async getAdmins() {
    return prisma.admin.findMany();
  }

  static async getAdminById(id: number) {
    return prisma.admin.findUnique({
      where: { id },
      include: {
        school: true,
      },
    });
  }

  static async getAdminByEmail(email: string) {
    return await prisma.admin.findUnique({
      where: { email },
    });
  }

  static async createAdmin(data: any) {
    return prisma.admin.create({
      data,
    });
  }

  static async updateAdmin(id: number, data: any) {
    return prisma.admin.update({
      where: { id },
      data,
    });
  }

  static async deleteAdmin(id: number) {
    return prisma.admin.delete({
      where: { id },
    });
  }
}

export default AdminModel;

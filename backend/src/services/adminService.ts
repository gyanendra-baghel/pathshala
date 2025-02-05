import AdminModel from "../models/adminModel";

class AdminService {
  static async getAdmins() {
    return AdminModel.getAdmins();
  }

  static async getAdminById(id: number) {
    return AdminModel.getAdminById(id);
  }

  static async getAdminByEmail(email: string) {
    const admin = AdminModel.getAdminByEmail(email);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  }

  static async getAdminByEmailAndPassword(email: string, password: string) {
    const admin = await AdminModel.getAdminByEmail(email);
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (admin.password !== password) {
      throw new Error("Invalid password");
    }
    return admin;
  }

  static async createAdmin(data: any) {
    return AdminModel.createAdmin(data);
  }

  static async updateAdmin(id: number, data: any) {
    return AdminModel.updateAdmin(id, data);
  }

  static async deleteAdmin(id: number) {
    return AdminModel.deleteAdmin(id);
  }
}

export default AdminService;

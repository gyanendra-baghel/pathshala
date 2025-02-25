import prisma from "../config/database";

class AnnouncentModel {
  static async createAnnouncement(announcement: any) {
    return prisma.annoncements.create({
      data: announcement,
    });
  }

  static async getAnnouncements(schoolId: number) {
    return prisma.annoncements.findMany({
      where: {
        schoolId,
      },
    });
  }

  static async getAnnouncementById(announcementId: number) {
    return prisma.annoncements.findUnique({
      where: {
        id: announcementId,
      },
    });
  }

  static async updateAnnouncementById(
    announcementId: number,
    annoncement: any
  ) {
    return prisma.annoncements.update({
      where: {
        id: announcementId,
      },
      data: annoncement,
    });
  }

  static async deleteAnnouncementById(annoncementId: number) {
    return prisma.annoncements.delete({
      where: {
        id: annoncementId,
      },
    });
  }
}

export default AnnouncentModel;

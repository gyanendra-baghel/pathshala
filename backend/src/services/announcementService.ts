import AnnouncentModel from "../models/announcementModel";

class AnnouncentService {
  static async createAnnouncement(annoncement: any) {
    return AnnouncentModel.createAnnouncement(annoncement);
  }

  static async getAnnouncements(schoolId: number) {
    return AnnouncentModel.getAnnouncements(schoolId);
  }

  static async getAnnouncementById(annoncementId: number) {
    return AnnouncentModel.getAnnouncementById(annoncementId);
  }

  static async updateAnnouncementById(annoncementId: number, annoncement: any) {
    return AnnouncentModel.updateAnnouncementById(annoncementId, annoncement);
  }

  static async deleteAnnouncementById(annoncementId: number) {
    return AnnouncentModel.deleteAnnouncementById(annoncementId);
  }
}

export default AnnouncentService;

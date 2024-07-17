export default class LectureService {
  constructor(lectureRepository) {
    this.lectureRepository = lectureRepository;
  }

  async createLecture(lecture) {
    return await this.lectureRepository.createLecture(lecture);
  }

  async readLectureById(lectureId) {
    return await this.lectureRepository.readLectureById(lectureId);
  }

  async readAllLectures() {
    return await this.lectureRepository.readAllLectures();
  }
}

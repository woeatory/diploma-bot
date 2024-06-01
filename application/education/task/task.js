export class Task {
  constructor({ type, question, answer, score }) {
    this.type = type;
    this.question = question;
    this.score = score;
    this.answer = answer;
  }
}

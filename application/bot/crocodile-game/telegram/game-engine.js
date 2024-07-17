export class GameEngine {
  static gamesStates = new Map();

  static setState(
    chatId,
    state = {
      masterUser: 0,
      isRunning: false,
      word: '',
    },
  ) {
    return this.gamesStates.set(chatId, state);
  }

  static getState(chatId) {
    return this.gamesStates.get(chatId);
  }

  static deleteState(chatId) {
    return this.gamesStates.delete(chatId);
  }

  static guessWord(word, userId, state) {
    return state.word === word && state.masterUser !== userId;
  }

  static startGame(userId, word) {
    let chatId;
    this.gamesStates.forEach((value, key) => {
      console.log(value);
      if (value.masterUser === userId && !value.isRunning) {
        chatId = key;
        this.setState(key, {
          masterUser: userId,
          isRunning: true,
          word,
        });
      }
    });
    return [chatId, this.getState(chatId)];
  }
}

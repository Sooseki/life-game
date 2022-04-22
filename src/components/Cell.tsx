export const Cell = () => {
  class Cell {
    state: boolean;

    constructor() {
      this.generateState();
    }

    generateState() {
      this.state = Math.random() < 0.5;
    }

    getState() {
      return this.state;
    }

    setState(state: boolean) {
      this.state = state;
    }
  }
};

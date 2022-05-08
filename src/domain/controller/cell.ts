export class Cell {

  x: number;
  y: number;
  state: boolean;

  constructor (x: number, y: number, state: boolean = false, isRandom:boolean = true) {
    if(isRandom) {
      this.generateState();
    } else {
      this.state = state;
    }

    this.x = x;
    this.y = y;
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
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scores = [0, 0];
  weapons = [
    'rock',
    'paper',
    'scissors'
  ]
  playerSelected = -1;
  loading = false;
  isResultShow = false;
  timeLeft: number = 10;
  interval: any;
  theResult = 0
  enemySelected = -1;
  time: any;
  gameOver: any;
  activeButton: any;
  changeMode: any;
  type: any;
  timer: any;
  winOrLose: any;
  playOrComp: any;
  constructor() {
    this.type = 1;
  }

  ngOnInit(event: any) {
    console.log("event", event);
    this.type = event;
    this.playOrComp = "Choose Your Weapon"

    this.startTimer();
    this.reset();
    this.time = false;
    this.activeButton = true;
    this.changeMode = "Player 1";
    this.timer = true;
    this.winOrLose = "you"
  }

  pick(weapon: number): void {
    // return immediately when still loading. You don't want
    // the user to spam the button.
    this.gameOver = false;
    this.time = false;
    if (this.loading) return;
    this.loading = true;
    this.playerSelected = weapon;
    //create a delay to simulate enemy's turn.
    setTimeout(() => {
      this.loading = false;
      // generate a number from 0 -2 
      const randomNum = Math.floor(Math.random() * 3);
      console.log("number", randomNum);
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, Math.floor(Math.random() * 500) + 200);

  }

  reset(): void {
    this.scores = [0, 0];
    this.weapons = [
      'rock',
      'paper',
      'scissors'
    ];
    this.playerSelected = -1;
    this.loading = false;
    this.isResultShow = false;
    this.theResult = 0
    this.enemySelected = -1;
    this.gameOver = true;
    this.timeLeft = 10;
  }

  checkResult(): void {
    this.gameOver = false;
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
    this.time = false;

    // if you and the enemy have the same weapon, then it is a tie.
    if (playerPick == enemyPick) {
      this.theResult = 2;
    }
    else if ((playerPick - enemyPick + 3) % 3 == 1) {
      // YOU WIN
      this.theResult = 0;
      this.scores[0] = this.scores[0] + 1;
    }
    else {
      // YOU LOSE
      this.theResult = 1;
      this.scores[1] = this.scores[1] + 1;
    }
    this.pauseTimer();

  }
  computer(event: any) {
    console.log("event", event);
    this.type = event;
    this.changeMode = "Computer 1";
    this.timer = false;
    this.time = false;
    this.activeButton = false;
    this.winOrLose = "computer1";
    this.playOrComp = "Computer 1"
    if (this.loading) return;
    this.loading = true;
    const randomNum = Math.floor(Math.random() * 3);
    this.playerSelected = randomNum;

    //create a delay to simulate enemy's turn.
    setTimeout(() => {
      this.loading = false;
      // generate a number from 0 -2 
      const randomNum = Math.floor(Math.random() * 3);
      console.log("number", randomNum);
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, Math.floor(Math.random() * 500) + 200);

  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.time = false;
        this.gameOver = true;
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.time = true;
        this.gameOver = false;
        clearInterval(this.interval);
      }
    }, 2000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  onChangeMode() {
    if (this.type === 1) {
      this.type === 2;
      this.computer(2)
    } else {
      this.type === 1;
      this.ngOnInit(1)
    }
  }
}
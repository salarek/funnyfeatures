<template>
  <div class="math-trainer" id="math-trainer">
    <div class="gif-show">
      <img
        v-if="showGif"
        class="gif-item"
        style="width: 45%; height: 45%"
        :src="require('./testgif.gif')"
        alt=""
      />
    </div>
    <div class="navigation">
      <div class="btn-nav" @click="mode = 'add'">Dodawanie</div>
      <div class="btn-nav" @click="mode = 'odd'">Odejmowanie</div>
      <div style="background: #27cc0c" class="btn-nav" @click="setLevel(10)">
        Łatwy
      </div>
      <div style="background: #cdd406" class="btn-nav" @click="setLevel(100)">
        Średni
      </div>
      <div style="background: #d1220f" class="btn-nav" @click="setLevel(1000)">
        Trudny
      </div>
    </div>
    <!-- <div class="navigation">
      <div class="btn-nav">Zacznij</div>
    </div> -->
    <div class="game">
      <div class="equation">{{ number1 }}{{ getMode }}{{ number2 }}=</div>
      <input
        id="game-input"
        :disabled="!play"
        v-model="inputValue"
        spellcheck="false"
        autocomplete="off"
        maxlength="4"
        class="game-input"
        type="text"
      />
    </div>
    <div class="game-buttons">
      <div class="btn-game" @click="startGame">Start</div>
      <div style="background: #d1220f" class="btn-game" @click="stopGame">
        Stop
      </div>
    </div>
    <div class="second-navigation">
      <div class="info">Czas: {{ timer }}</div>
      <div class="info">Punkty: {{ points }}</div>
    </div>
    <welcome-screen
      :welcomeScreenStatus="welcomeScreenStatus"
      @setWelcomeStatus="setWelcomeStatus"
      :gameStatusText="gameStatusText"
    ></welcome-screen>
  </div>
</template>

<script>
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen.vue";
// import * as fs from 'fs';
import { Howl } from "howler";
export default {
  components: {
    WelcomeScreen,
  },
  data() {
    return {
      showGif: false,
      play: false,
      mode: "add",
      timer: 30,
      points: 0,
      inputValue: "",
      level: 10,
      number1: 0,
      number2: 0,
      goodSound: new Howl({
        src: ["good.m4a"],
        volume: 0.5,
        html5: true,
      }),
      badSound: new Howl({
        src: ["bad.m4a"],
        volume: 1,
        html5: true,
      }),
      jingl: new Howl({
        src: ["jingl.m4a"],
        volume: 0.5,
        html5: true,
      }),
      welcomeScreenStatus: false,
      gameStatusText: "Naucz sie dodawać i odejmować w końcu",
    };
  },
  watch: {
    play(newVal) {
      if (newVal == true) {
        let doc = document.getElementById("math-trainer");
        if (doc) {
          doc.style.background = "#021252";
        }
      }
      if (newVal == false) {
        let doc = document.getElementById("math-trainer");
        if (doc) {
          doc.style.background = "blue";
        }
      }
    },
    inputValue(newVal) {
      if (this.mode == "add") {
        if (newVal == this.number1 + this.number2) {
          if (this.play == true) {
            this.points++;
          }
          this.setNumbers();
          this.showGif = true;
          this.goodSound.play();
          setTimeout(() => {
            this.inputValue = "";
          }, 300);
          setTimeout(() => {
            this.showGif = false;
          }, 900);
        }
      }
      if (this.mode == "odd") {
        if (newVal == this.number1 - this.number2) {
          if (this.play == true) {
            this.points++;
          }
          this.setNumbers();
          this.showGif = true;
          this.goodSound.play();
          setTimeout(() => {
            this.inputValue = "";
          }, 300);
          setTimeout(() => {
            this.showGif = false;
          }, 900);
        }
      }
    },
  },
  computed: {
    getMode() {
      switch (this.mode) {
        case "add":
          return "+";
        case "odd":
          return "-";
        default:
          return "+";
      }
    },
  },
  created() {
    // this.jingl.play();

    this.setNumbers();
  },
  methods: {
    setLevel(val) {
      this.level = val;
      this.setNumbers();
    },
    getRandomInt() {
      console.log("LEVEL", this.level);
      let min = Math.ceil(1);
      let max = Math.floor(this.level);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    setNumbers() {
      this.number1 = this.getRandomInt();
      this.number2 = this.getRandomInt();
      if (this.number1 < this.number2) {
        let tmp = this.number1;
        this.number1 = this.number2;
        this.number2 = tmp;
      }
    },
    startGame() {
      if (this.play == false) {
        this.play = true;
        this.points = 0;
        this.setNumbers();
        setTimeout(() => {
          let doc = document.getElementById("game-input");
          if (doc) {
            doc.focus();
          }
        }, 100);

        this.gameLoop();
      }
    },
    stopGame() {
      this.inputValue = "";
      this.setNumbers();
      this.play = false;
      clearInterval(this.gameLoopInterval);
      this.timer = 30;
    },

    gameLoop() {
      if (this.play) {
        this.gameLoopInterval = setInterval(() => {
          this.timer--;
          if (this.timer == 0) {
            this.badSound.play();
            this.stopGame();
          }
        }, 1000);
      }
    },
    setWelcomeStatus(val) {
      this.jingl.play();
      this.welcomeScreenStatus = val;
    },

    resetGame() {},
  },
};
</script>
<style lang="scss" scoped>
.math-trainer {
  color: white;
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
  .gif-show {
    position: fixed;
    right: 25%;
    top: 16%;
    .gif-item {
      filter: drop-shadow(4px 4px 4px #44dd6a);
    }
  }
  .btn-nav {
    text-align: center;
    margin: 1%;
    cursor: pointer;
    padding: 1%;
    background: #620694;
    font-size: 1.5rem;
    box-shadow: 4px 4px white;
    transition: 1s;
  }
  .btn-nav:hover {
    transform: scale(1.1);
  }
  .navigation {
    background: #021252;
    width: 100%;
    top: 0%;
    position: absolute;
    display: flex;
    justify-content: center;
  }
  .game {
    position: absolute;
    left: 5%;
    width: 78%;
    display: flex;

    .equation {
      display: flex;
      justify-content: center;
      width: 70%;
      font-size: 10.6rem;
    }
    .game-input {
      color: white;
      border: none;
      // border-bottom: 2px solid white;
      text-decoration: none !important;
      outline: none;
      background: transparent;
      font-family: "Galindo", sans-serif;
      margin-left: 3%;
      width: 39%;
      font-size: 10.6rem;
    }
  }
  .second-navigation {
    position: absolute;
    width: 50%;
    bottom: 4%;
    display: flex;
    justify-content: center;

    .info {
      width: 40%;
      margin: 10%;
      font-size: 3rem;
    }
  }
  .game-buttons {
    position: absolute;
    width: 15%;
    right: 1%;
    margin: 1%;
    .btn-game {
      text-align: center;
      margin: 10%;
      padding: 2%;
      cursor: pointer;
      background: #27cc0c;
      font-size: 3vw;
      box-shadow: 4px 4px white;
      transition: 1s;
    }
    .btn-game:hover {
      transform: scale(1.1);
    }
  }
}
</style>

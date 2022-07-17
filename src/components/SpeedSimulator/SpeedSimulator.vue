<template>
  <div class="speed-simulator">
    <div class="road">
      <div
        :style="{ position: 'absolute', left: posX2 + '%' }"
        class="item"
      ></div>
    </div>
    <span class="text"
      >{{ getDistance(this.velocity2, this.speed2) }} km lub 1 rok
      świetlny</span
    >
    <span class="text">{{ this.velocity2 }} m/s</span>
    <div class="road">
      <div
        :style="{ position: 'absolute', left: posX1 + '%' }"
        class="item"
      ></div>
    </div>
    <span class="text">{{ getDistance(this.velocity1, this.speed1) }} km</span>
    <span class="text">{{ getVelocity(this.distance1, this.speed1) }} m/s</span>
    <div class="road">
      <div
        id="dupa"
        :style="{ position: 'absolute', left: posX + '%' }"
        class="item"
      ></div>
    </div>
    <span class="text">{{ getDistance(this.velocity, this.speed) }} km</span>
    <span class="text">{{ getVelocity(this.distance, this.speed) }} m/s</span>
    <div class="btn" @click="startGame">Start</div>
    <div class="btn" @click="stopGame">Stop</div>
    <welcome-screen
      :welcomeScreenStatus="welcomeScreenStatus"
      @setWelcomeStatus="setWelcomeStatus"
      :gameStatusText="gameStatusText"
    ></welcome-screen>
  </div>
</template>

<script>
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen.vue";

export default {
  components: {
    WelcomeScreen,
  },
  data() {
    return {
      distance1: 150000000,
      speed1: 0.2,
      distance: 384400,
      velocity: 295988000,
      velocity1: 300000000,
      velocity2: 300000000,
      speed2: 0.00000000315,
      speed: 77,
      gameLoopInterval: 0,
      direction2: "right",
      direction1: "right",
      direction: "right",
      play: false,
      posX: 0,
      posX1: 0,
      posX2: 0,
      timer: 0,
      welcomeScreenStatus: false,
      gameStatusText: "Przetestuj prędkości i oddddległości :)",
    };
  },

  watch: {
    posX(newValue) {
      if (newValue >= 100) {
        this.direction = "left";
      }
      if (newValue <= 0) {
        this.direction = "right";
      }
    },
    posX1(newValue) {
      if (newValue >= 100) {
        this.direction1 = "left";
      }
      if (newValue <= 0) {
        this.direction1 = "right";
      }
    },
    posX2(newValue) {
      if (newValue >= 100) {
        this.direction2 = "left";
      }
      if (newValue <= 0) {
        this.direction2 = "right";
      }
    },
  },
  methods: {
    getDistance(velocity, speed) {
      return (velocity / (speed * 100)) * 10;
    },
    getVelocity(distance, speed) {
      return distance * (speed / 100) * 1000;
    },
    setWelcomeStatus(val) {
      this.welcomeScreenStatus = val;
    },
    startGame() {
      this.play = true;
      this.gameLoop();
    },
    stopGame() {
      this.play = false;
      clearInterval(this.gameLoopInterval);
    },

    gameLoop() {
      if (this.play) {
        this.gameLoopInterval = setInterval(() => {
          console.log("pizdy");
          if (this.direction2 == "right") {
            this.posX2 = this.posX2 + this.speed2;
          }
          if (this.direction2 == "left") {
            this.posX2 = this.posX2 - this.speed2;
          }
          if (this.direction1 == "right") {
            this.posX1 = this.posX1 + this.speed1;
          }
          if (this.direction1 == "left") {
            this.posX1 = this.posX1 - this.speed1;
          }
          if (this.direction == "right") {
            this.posX = this.posX + this.speed;
          }
          if (this.direction == "left") {
            this.posX = this.posX - this.speed;
          }
        }, 1000);
      }
    },
    resetGame() {},
  },
};
</script>
<style lang="scss" scoped>
.speed-simulator {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .text {
    font-size: 30px;
  }
  .btn {
    cursor: pointer;
    font-size: 1.5em;
    text-align: center;
    margin: 2%;
    width: 10%;
    height: 5%;
    background: white;
    border-radius: 2%;
    transition: 0.5s;
  }
  .btn:hover {
    transition: 0.5s;
    transform: scale(1.1);
    background: rgb(91, 151, 255);
  }
  .road {
    position: relative;
    width: 80%;
    background: red;
    height: 10%;
    .item {
      transition: 1s linear;
      position: absolute;
      height: 100%;
      width: 1%;
      background: green;
    }
  }
}
</style>

<template>
  <div class="speed-simulator">
    <div class="road">
      <div
        :style="{ position: 'absolute', left: posX3 + '%' }"
        class="item"
      ></div>
    </div>
    <span class="text">{{ this.distance3 }} km</span>
    <span class="text"
      >{{ this.velocity3 }} km/h lub
      {{ Math.round((this.velocity3 / 1080000000) * 1000000) / 1000000 }}
      prędkości światła</span
    >
    <span class="text"
      >czas:
      {{ Math.round((this.distance3 / this.velocity3 / 8760) * 100) / 100 }}y
      {{ Math.round((this.distance3 / this.velocity3 / 24) * 100) / 100 }} d
      {{ Math.round((this.distance3 / this.velocity3) * 100) / 100 }} h
      {{ Math.round((this.distance3 / this.velocity3) * 3600 * 100) / 100 }}
      s</span
    >
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
    <span class="text"
      >{{ this.velocity2 }} m/s lub 1080000000 km/h - prędkość światła</span
    >
    <div class="road">
      <div
        :style="{ position: 'absolute', left: posX1 + '%' }"
        class="item"
      ></div>
    </div>
    <span class="text">{{ getDistance(this.velocity1, this.speed1) }} km</span>
    <span class="text"
      >{{ getVelocity(this.distance1, this.speed1) }} m/s lub 1080000000 km/h -
      prędkość światła</span
    >
    <div class="road">
      <div
        id="dupa"
        :style="{ position: 'absolute', left: posX + '%' }"
        class="item"
      ></div>
    </div>
    <span class="text">{{ getDistance(this.velocity, this.speed) }} km</span>
    <span class="text"
      >{{ getVelocity(this.distance, this.speed) }} m/s lub 1080000000 km/h -
      prędkość światła</span
    >

    <div class="btn" @click="startGame">Start</div>
    <div class="btn" @click="stopGame">Stop</div>
    <div>
      Prędkość:<input v-model="velocity3" type="text" />
      <!-- Procent przebytego dystansu w 1 sekunde:<input v-model="speed3" type="text" />  -->
      Dystans:<input v-model="distance3" type="text" />
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

export default {
  components: {
    WelcomeScreen,
  },
  data() {
    return {
      distance3: 0,
      distance1: 150000000,
      speed1: 0.02,
      distance: 384400,
      velocity: 295988000,
      velocity1: 300000000,
      velocity2: 300000000,
      velocity3: 0,
      speed2: 0.000000000315,
      speed3: 0,
      speed: 7.7,
      gameLoopInterval: 0,
      direction3: "right",
      direction2: "right",
      direction1: "right",
      direction: "right",
      play: false,
      posX: 0,
      posX1: 0,
      posX2: 0,
      posX3: 0,
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
      if (newValue <= 7) {
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
    posX3(newValue) {
      if (newValue >= 100) {
        this.direction3 = "left";
      }
      if (newValue <= 0) {
        this.direction3 = "right";
      }
    },
  },
  methods: {
    getDistance(velocity, speed) {
      return (velocity / (parseFloat(speed) * 100)) * 1;
    },
    getVelocity(distance, speed) {
      return distance * (speed / 100) * 10000;
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
          if (this.direction3 == "right") {
            this.posX3 =
              this.posX3 +
              (parseFloat(this.velocity3 * 0.36) /
                (parseFloat(this.distance3) * 10000)) *
                100;
          }
          if (this.direction3 == "left") {
            this.posX3 =
              this.posX3 -
              (parseFloat(this.velocity3 * 0.36) /
                (parseFloat(this.distance3) * 10000)) *
                100;
          }
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
        }, 100);
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
    margin: 0.2%;
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
      transition: 0.1s linear;
      position: absolute;
      height: 100%;
      width: 1%;
      background: green;
    }
  }
}
</style>

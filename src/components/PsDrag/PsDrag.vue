<template>
  <div
    @click="startGame()"
    @mousemove="setPosition($event)"
    :style="{ background: bcg }"
    class="ps-drag"
    id="ps-drag"
  >
    <!-- <div class="timer-container">
      <p style="border: solid; padding: 4px; background: green; color: white">
        Time:{{ time | secondsInMinutes }}
      </p>
    </div> -->
    <stoper @time="receiveTime" :running="running" />

    <div
      @mouseover="endGame()"
      id="autoEnemy"
      :style="{
        background: 'red',
        top: posY - 240 + 'px',
        left: posX - 240 + 'px',
      }"
      class="auto-focus-enemy"
    >
      <img
        id="autoEnemyImage"
        :src="require('@/components/PsDrag/belzebub_plaszczak.gif')"
      />
    </div>
    <div v-for="pos in positions" :key="pos.index">
      <div
        @mouseover="counter2 > 20 ? endGame() : false"
        id="dragDiv"
        :style="{
          background: 'red',
          top: randomNumber(0, 1000) + pos.y - 240 + 'px',
          left: randomNumber(0, 2000) + pos.x - 240 + 'px',
        }"
        class="enemy"
      >
        <img :src="require('@/components/PsDrag/plaszczak_void.gif')" />
      </div>
    </div>
    <div
      v-if="!play"
      @click="startGame()"
      class="end-screen"
      v-html="gameStatusText"
    ></div>
    <div v-if="!play" class="backToHome" @click="pushRouter('/')">Cofnij</div>
  </div>
</template>

<script>
import Stoper from "@/components/Stoper/Stoper.vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Stoper,
  },
  data() {
    return {
      bcg: "#ffffff",
      posX: 900,
      posY: -1100,
      draw: false,
      gameStatusText: "Kliknij by rozpocząć",
      play: false,
      running: false,
      counter: 0,
      counter2: 0,
      deltaTime: [1, 2],
      speed: 2,
      static_positions: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
    };
  },
  mounted() {
    let autoEnemy = document.getElementById("autoEnemy");
    setInterval(() => {
      this.bcg = this.randomColors();
      // if (this.static_positions) {
      //   if (this.counter < 3) {
      //     this.positions.push(this.static_positions[this.counter]);
      //   }
      // }
      // if (this.counter < 3) {
      //   this.counter++;
      // }
      autoEnemy.style.transition = this.speed + "s";
      if (this.speed > 0.8) {
        this.speed = this.speed - 0.1;
      }
      console.log("DELTA", this.deltaTime);
      this.deltaTime.shift();
      this.deltaTime.push(this.counter2);
      if (this.deltaTime[0] == this.deltaTime[1]) {
        let autoEnemy = document.getElementById("autoEnemy");

        let autoEnemyImage = document.getElementById("autoEnemyImage");
        autoEnemyImage.src = require("@/components/PsDrag/skull_plaszczak.gif");
        autoEnemy.style.transition = 40 + "s";
        autoEnemy.style.borderRadius = "0%";
        // autoEnemy.style.width = "100%";
        // autoEnemy.style.height = "100%";
        autoEnemy.style.transform = "scale(40)";
        autoEnemy.style.left = "0px";
        autoEnemy.style.top = "0px";
      } else {
        let autoEnemy = document.getElementById("autoEnemy");
        autoEnemy.style.borderRadius = "50%";
        autoEnemy.style.transition = this.speed + "s";
        // autoEnemy.style.width = "260px";
        // autoEnemy.style.height = "260px";
        autoEnemy.style.transform = "scale(1)";

        let autoEnemyImage = document.getElementById("autoEnemyImage");
        autoEnemyImage.src = require("@/components/PsDrag/belzebub_plaszczak.gif");
      }
    }, 1000);
  },
  methods: {
    pushRouter(src) {
      this.$router.push(src);
    },
    receiveTime(val) {
      this.gameStatusText =
        "KONIEC GRY<br>Kliknij by rozpocząć ponownie<br>" + val;
      return val;
    },
    startGame() {
      this.running = true;
      this.gameStatusText = "";
      this.play = true;
    },
    endGame() {
      this.speed = 2;
      this.deltaTime = [1, 2];
      this.positions = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ];
      this.counter = 0;
      this.counter2 = 0;
      this.running = false;
      this.posX = 900;
      this.posY = -1100;
      this.gameStatusText = "KONIEC GRY<br>Kliknij by rozpocząć ponownie<br>";
      this.play = false;
    },

    setPosition(e) {
      setTimeout(() => {
        if (this.play) {
          this.counter2++;
          console.log("KURWA");
          if (
            e.clientX < 10 ||
            e.clientY < 10 ||
            e.clientX > window.innerWidth - 10 ||
            e.clientY > window.innerHeight - 10
          ) {
            this.endGame();
          }
          if (this.counter2 > 50) {
            this.posX = e.clientX;
            this.posY = e.clientY;
            this.counter2 = 0;
          }
        }
      }, 0);
    },
    randomColors() {
      let color = "#";
      let hex = "0123456789ABCDEF";
      for (let i = 0; i < 6; i++) {
        color = color + hex[Math.floor(Math.random() * 15)];
      }
      return color;
    },
    randomNumber(start, end) {
      return Math.floor(Math.random(start) * end);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ps-drag {
  position: absolute;
  transition: 3s;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/meh.png"), auto;
}

.end-screen {
  background: red;
  position: fixed;
  z-index: 20;
  font-size: 70px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.backToHome {
  box-shadow: 10px -0px 15px black;
  background: blue;
  position: fixed;
  color: white;
  z-index: 23;
  font-size: 50px;
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.backToHome:hover {
  transition: 0.5s;
  width: 12%;
  background: green;
}
.enemy {
  contain: content;
  border-radius: 50%;
  border: solid 20px;
  will-change: auto;
  transition: 2.1s;
  position: absolute;
  width: 260px;
  height: 260px;
  transform: scale(1);
}
.auto-focus-enemy {
  contain: content;
  border-radius: 50%;
  border: solid 20px;
  will-change: auto;
  transition: 1.5s;
  position: absolute;
  width: 260px;
  height: 260px;
  transform: scale(1.2);
}
</style>

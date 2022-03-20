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
    <div v-for="pos in positions" :key="pos.index">
      <div
        v-if="!play"
        @click="startGame()"
        class="end-screen"
        v-html="gameStatusText"
      ></div>
      <div
        @mouseover="endGame()"
        id="dragDiv"
        :style="{
          background: 'red',
          top: posY + pos.y - 240 + 'px',
          left: posX + pos.x - 240 + 'px',
        }"
        class="enemy"
      >
        <img :src="require('@/components/PsDrag/plaszczak_void.gif')" />
      </div>
    </div>
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
      static_positions: [
        { x: 500, y: 0 },
        { x: -500, y: 0 },
        { x: -500, y: 500 },
        { x: 0, y: 500 },
        { x: +500, y: 500 },
        { x: -500, y: -500 },
        { x: 0, y: -500 },
        { x: +500, y: -500 },
      ],
      positions: [{ x: 0, y: 0 }],
    };
  },
  mounted() {
    setInterval(() => {
      this.bcg = this.randomColors();
      if (this.static_positions) {
        this.positions.push(this.static_positions.pop());
      }
    }, 5000);
  },
  methods: {
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
      this.positions = [{ x: 0, y: 0 }];
      this.static_positions = [
        { x: 500, y: 0 },
        { x: -500, y: 0 },
        { x: -500, y: 500 },
        { x: 0, y: 500 },
        { x: +500, y: 500 },
      ];
      this.running = false;
      this.posX = 900;
      this.posY = -1100;
      this.gameStatusText = "KONIEC GRY<br>Kliknij by rozpocząć ponownie<br>";

      this.play = false;
    },

    setPosition(e) {
      if (this.play) {
        if (
          e.clientX < 10 ||
          e.clientY < 10 ||
          e.clientX > window.innerWidth - 10 ||
          e.clientY > window.innerHeight - 10
        ) {
          this.endGame();
        }
        console.log(e.clientX);
        this.posX = e.clientX;
        this.posY = e.clientY;
      }
    },
    randomColors() {
      let color = "#";
      let hex = "0123456789ABCDEF";
      for (let i = 0; i < 6; i++) {
        color = color + hex[Math.floor(Math.random() * 15)];
      }
      return color;
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
.enemy {
  contain: content;
  border-radius: 50%;
  border: solid 20px;
  will-change: auto;
  transition: 0.4s;
  position: absolute;
  width: 260px;
  height: 260px;
  transform: scale(1.2);
}
</style>

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
        top: posY - 240 + 'px',
        left: posX - 240 + 'px',
      }"
      class="enemy"
    >
      <img :src="require('@/components/PsDrag/plaszczak_void.gif')" />
    </div>
    <div
      @mouseover="endGame()"
      id="dragDiv"
      :style="{
        background: 'red',
        top: posY - 240 + 'px',
        left: posX - 240 + 500 + 'px',
      }"
      class="enemy"
    >
      <img :src="require('@/components/PsDrag/belzebub_plaszczak.gif')" />
    </div>
    <div
      @mouseover="endGame()"
      id="dragDiv"
      :style="{
        background: 'red',
        top: posY - 240 + 'px',
        left: posX - 240 - 500 + 'px',
      }"
      class="enemy"
    >
      <img :src="require('@/components/PsDrag/skull_plaszczak.gif')" />
    </div>

    <div
      @mouseover="endGame()"
      id="dragDiv"
      :style="{
        background: 'red',
        top: posY + 400 - 240 + 'px',
        left: posX - 240 + 'px',
      }"
      class="enemy"
    >
      <img :src="require('@/components/PsDrag/plaszczak_void.gif')" />
    </div>
    <div
      @mouseover="endGame()"
      id="dragDiv"
      :style="{
        background: 'red',
        top: posY + 400 - 240 + 'px',
        left: posX - 240 + 500 + 'px',
      }"
      class="enemy"
    >
      <img :src="require('@/components/PsDrag/belzebub_plaszczak.gif')" />
    </div>
    <div
      @mouseover="endGame()"
      id="dragDiv"
      :style="{
        background: 'red',
        top: posY + 400 - 240 + 'px',
        left: posX - 240 - 500 + 'px',
      }"
      class="enemy"
    >
      <img :src="require('@/components/PsDrag/skull_plaszczak.gif')" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
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
      time: 0,
      running: false,
    };
  },

  filters: {
    secondsInMinutes: function (seconds) {
      return moment("2015-01-01")
        .startOf("day")
        .seconds(seconds)
        .format("HH:mm:ss");
    },
  },
  mounted() {
    setInterval(() => {
      this.bcg = this.randomColors();
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
}
.timer-container {
  position: fixed;
  pointer-events: none;
  left: 0px;
  top: 0px;
  padding: 20px;
  z-index: 20;
  font-size: 30px;
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
}
</style>

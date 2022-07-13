<template>
  <div class="speed-simulator">
    <div class="road">
      <div
        :style="{ position: 'absolute', left: posX + '%' }"
        class="item"
      ></div>
    </div>
    <div class="btn" @click="startGame">Start</div>
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
      play: false,
      posX: 0,
      welcomeScreenStatus: false,
      gameStatusText: "Przetestuj prędkości i oddddległości :)",
    };
  },

  methods: {
    setWelcomeStatus(val) {
      this.welcomeScreenStatus = val;
    },
    startGame() {
      this.play = true;
      this.gameLoop();
    },
    gameLoop() {
      if (this.play) {
        setInterval(() => {
          console.log("pizdy");
          this.posX = this.posX + 10;
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
    height: 20%;
    .item {
      position: absolute;
      height: 100%;
      width: 10%;
      background: green;
    }
  }
}
</style>

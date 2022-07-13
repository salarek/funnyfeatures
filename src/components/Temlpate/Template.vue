<template>
  <div class="speed-simulator">
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
      welcomeScreenStatus: false,
      gameStatusText: "Przetestuj prędkości i oddddległości :)",
    };
  },

  methods: {
    setWelcomeStatus(val) {
      this.welcomeScreenStatus = val;
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
}
</style>

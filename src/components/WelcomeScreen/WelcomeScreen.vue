<template>
  <div class="welcome-screen" v-if="!welcomeScreenStatus">
    <div
      @click="setWelcomeStatus()"
      class="end-screen"
      v-html="gameStatusText"
    ></div>
    <div class="backToHome" @click="pushRouter('/')">Cofnij</div>
  </div>
</template>

<script>
export default {
  props: ["welcomeScreenStatus", "gameStatusText"],

  methods: {
    pushRouter(src) {
      this.$router.push(src);
    },
    setWelcomeStatus() {
      this.$emit("setWelcomeStatus", true);
    },
    resetGame() {},
  },
};
</script>
<style lang="scss" scoped>
.welcome-screen {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: blue;
}
.custom-button {
  font-family: "Galindo", sans-serif;
  width: 20%;
  height: 10%;
  background: red;
  color: white;
  font-size: 2rem;
  border-width: 5px;
}
.custom-button:focus {
  background: rgba(0, 0, 0, 0.1);
}
p {
  color: white;
  font-size: 2rem;
}

.end-screen {
  background: red;
  position: fixed;
  z-index: 20;
  font-size: 70px;
  left: 10%;
  top: 0px;
  width: 90%;
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
  left: 0px;
  top: 0px;
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
</style>

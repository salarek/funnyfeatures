<template>
  <div class="phisic">
    <div
      :style="{ bottom: posY + 'px', left: '300px' }"
      class="block"
      id="block"
    ></div>
    <div class="ruler">
      <div class="meter">9 m</div>
      <div class="meter">8 m</div>
      <div class="meter">7 m</div>
      <div class="meter">6 m</div>
      <div class="meter">5 m</div>
      <div class="meter">5 m</div>
      <div class="meter">4 m</div>
      <div class="meter">3 m</div>
      <div class="meter">1 m</div>
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
export default {
  data() {
    return {
      play: false,
      startHeight: 1000,
      gravity: 100, //jezeli metr ma 10 px to przyspieszenie ma 10 metrow/s czyli wartosc 100 - 10 metrow
      posY: 1000,
      meter: 10,
      gameStatusText: "dupa",
      time: 1,
    };
  },
  methods: {
    pushRouter(src) {
      this.$router.push(src);
    },
    startGame() {
      this.play = true;
      this.gameLoop();
    },
    gameLoop() {
      let block = document.getElementById("block");
      console.log(block);
      setInterval(() => {
        this.time++;
        // block.style.transition = 4 - this.time + "s";
        //this.posY = this.posY + (this.gravity * this.meter) / this.time;

        this.posY =
          this.startHeight - (this.gravity * Math.pow(this.time, 2)) / 2;
      }, 1000);
    },
  },
};
</script>
<style lang="scss">
.phisic {
  position: absolute;
  transition: 3s;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to bottom right, yellow, green);
}
.ruler {
  position: absolute;
  bottom: 0px;
  background: red;
  width: 50px;
  height: 100%;
}
.meter {
  border-top: solid;
  background: blue;
  height: 100px;
}
.block {
  // transition: 1s;
  position: absolute;
  background: red;
  width: 80px;
  height: 180px;
}
.end-screen {
  background: red;
  position: fixed;
  z-index: 20;
  font-size: 70px;
  left: 0px;
  top: 0px;
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

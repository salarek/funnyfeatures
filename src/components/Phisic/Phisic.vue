<template>
  <div class="phisic">
    <button style="position: fixed; top: 0px; left: 700px" @click="resetGame()">
      JEBNIJ!
    </button>
    <div
      :style="{ top: 900 - 20 - posY + 'px', left: '300px' }"
      class="block"
      id="block"
    ></div>
    <div class="ruler">
      <div v-for="i in 90" :key="i.id">
        <div class="meter">{{ 90 - i }} m</div>
      </div>
    </div>
    <div class="ruler2">
      <div v-for="i in 30" :key="i.id">
        <div class="pietro">{{ 30 - i }} pietro</div>
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
const meter = 10;
export default {
  data() {
    return {
      play: false,
      startHeight: (90 - 2) * meter,
      gravity: 9.81 * meter, //jezeli metr ma 10 px to przyspieszenie ma 10 metrow/s czyli wartosc 100 - 10 metrow
      posY: (90 - 2) * meter,
      gameStatusText: "dupa",
      time: 0.0,
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
    resetGame() {
      this.startHeight = (90 - 2) * meter;
      this.time = 0.01;
      this.posY = (90 - 2) * meter;
    },
    gameLoop() {
      let block = document.getElementById("block");
      console.log(block);
      setInterval(() => {
        if (this.posY > 0) {
          console.log("CZAS:", this.time + "sekund");
          this.time = this.time + 0.01;
          // block.style.transition = 4 - this.time + "s";
          //this.posY = this.posY + (this.gravity * this.meter) / this.time;
          this.posY =
            this.startHeight - (this.gravity * Math.pow(this.time, 2)) / 2;
        }
      }, 10);
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

  width: 50px;
  height: 100%;
}
.ruler2 {
  position: absolute;
  left: 100px;
  bottom: 0px;

  width: 50px;
  height: 100%;
}
.meter {
  color: white;
  background: blue;
  font-size: 0.7rem;
  width: 100px;
  height: 10px;
}
.pietro {
  color: white;
  background: blue;
  font-size: 0.7rem;
  width: 100px;
  height: 30px;
}
.block {
  // transition: 1s linear;
  position: absolute;
  background: red;
  width: 8px;
  height: 20px;
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

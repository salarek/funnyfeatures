<template>
  <div class="phisic">
    <img
      style="position: fixed; height: 100%"
      :src="require('@/components/Phisic/planets/tower.jpg')"
    />
    <img
      style="opacity: 0.2"
      :src="require('@/components/Phisic/planets/earth.jpg')"
    />
    <div class="navigation-bar">
      <button class="custom-button" @click="resetGame()">JEBNIJ!</button>
      <p style="padding-left: 9%; font-size: 1.5rem; text-align: left">
        Czas Spadania: {{ Math.round(this.time * 100) / 100 }} s
      </p>
      <p>Wybierz planetę</p>
    </div>

    <div
      :style="{ top: 900 - 20 - posY + 'px', left: '300px' }"
      class="block"
      id="block"
    ></div>
    <div class="meter-ruler">
      <div v-for="i in 90" :key="i.id">
        <div class="meter">{{ 90 - i }} m</div>
      </div>
    </div>
    <div class="floor-ruler">
      <div v-for="i in 30" :key="i.id">
        <div class="floor">{{ 30 - i }} pietro</div>
      </div>
    </div>
    <fall-zoom :time="time" :posY="posY" />
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
import FallZoom from "@/components/Phisic/FallZoom.vue";
const meter = 10;
export default {
  components: {
    FallZoom,
  },
  data() {
    return {
      play: false,
      startHeight: (90 - 2) * meter,
      gravity: 9.81 * meter, //jezeli metr ma 10 px to przyspieszenie ma 10 metrow/s czyli wartosc 100 - 10 metrow
      posY: (90 - 2) * meter,
      gameStatusText:
        "Witaj w symulacji upadku :) Przetestuj z jaką prędkością Mateusz Błaszczyk rozwali sobie ryja na różnych planetach",
      time: 0.0,
    };
  },
  methods: {
    getImage(src) {
      return require(src);
    },
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
.custom-button {
  width: 100%;
  height: 100px;
  background: red;
  color: white;
  font-size: 2rem;
  border-width: 5px;
}
p {
  text-align: center;
  color: white;
  font-size: 2rem;
}
.navigation-bar {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 15%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.timer {
  position: fixed;
  pointer-events: none;
  left: 900px;
  top: 0px;
  padding: 20px;
  z-index: 20;
  font-size: 30px;
}
.meter-ruler {
  position: absolute;
  bottom: 0px;

  width: 50px;
  height: 100%;
}
.floor-ruler {
  position: absolute;
  left: 100px;
  bottom: 0px;
  width: 50px;
  height: 100%;
}
.meter {
  color: white;
  background: rgba(0, 0, 0, 0.8);
  font-size: 0.7rem;
  width: 50px;
  height: 10px;
}
.floor {
  color: white;
  background: rgba(0, 0, 0, 0.8);
  font-size: 1rem;
  text-align: center;
  width: 80px;
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

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
      <p style="padding-left: 9%; font-size: 1.5rem; text-align: left">
        Czas Spadania:
        {{ this.blackHole ? 0 : Math.round(this.time * 100) / 100 }} s
      </p>
      <p style="padding-left: 9%; font-size: 1.5rem; text-align: left">
        Prędkość: {{ Math.round((this.gravity / 10) * this.time * 3.6) }} km/h
      </p>
      <hr />
      <p>Wybierz planetę</p>
      <button class="custom-button" @click="setGravity(9.81)">Ziemia</button>
      <button class="custom-button" @click="setGravity(1.62)">Księżyc</button>
      <button class="custom-button" @click="setGravity(3.721)">Mars</button>
      <button class="custom-button" @click="setGravity(24)">Jowisz</button>
      <button class="custom-button" @click="setGravity(2999)">
        Twoja Stara
      </button>
      <button class="custom-button" @click="setGravity(274)">Słońce</button>
      <button
        class="custom-button"
        @click="setGravity(Number.POSITIVE_INFINITY)"
      >
        Czarna dziura
      </button>
    </div>

    <div
      :style="{
        height: heightBlackHole + 'px',
        top: 900 - 20 - posY + 'px',
        left: '300px',
      }"
      class="block"
      id="block"
    >
      <img
        v-if="this.posY > 0 || this.blackHole"
        :style="{
          height: this.blackHole ? '2000px' : '18px',
          width: this.blackHole ? '18px' : '150%',
        }"
        src="./planets/fallguy.gif"
        alt=""
      />
      <img
        v-if="this.posY <= 0"
        :style="{
          height: this.blackHole ? '2000px' : '18px',
          width: this.blackHole ? '18px' : '150%',
        }"
        src="./planets/fallguy2.png"
        alt=""
      />
    </div>
    <!-- <div class="meter-ruler">
      <div v-for="i in 90" :key="i.id">
        <div class="meter">{{ 90 - i }} m</div>
      </div>
    </div>
    <div class="floor-ruler">
      <div v-for="i in 30" :key="i.id">
        <div class="floor">{{ 30 - i }} pietro</div>
      </div>
    </div> -->
    <fall-zoom
      :time="time"
      :posY="posY"
      :heightBlackHole="heightBlackHole"
      :blackHole="blackHole"
    />
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
      blackHole: false,
    };
  },
  computed: {
    heightBlackHole() {
      if (this.blackHole) {
        return 1000;
      } else {
        return 20;
      }
    },
  },
  methods: {
    setGravity(val) {
      if (val == Number.POSITIVE_INFINITY) {
        this.blackHole = true;
      } else {
        this.blackHole = false;
      }

      this.resetGame();
      this.gravity = val * meter;
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
<style lang="scss" scoped>
.phisic {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: red;
}
.custom-button {
  width: 100%;
  height: 100px;
  background: red;
  color: white;
  font-size: 2rem;
  border-width: 5px;
}
.custom-button:focus {
  background: rgba(0, 0, 0, 0.1);
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
  left: 50px;
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
  text-align: center;
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
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  padding: 20px;
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

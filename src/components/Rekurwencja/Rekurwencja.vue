<template>
  <div class="rekurwencja">
    <div
      v-if="!play"
      @click="startGame()"
      class="end-screen"
      v-html="gameStatusText"
    ></div>
    <p>Wprowadź dane</p>
    <input v-model="parameter" type="text" />

    <br />
    <button
      class="custom-button"
      @click="startRekurwencja(parameter, condition)"
    >
      Rozpocznij Rekurwencje
    </button>
    <p>{{ valueFromRekurwencja }}</p>
    <div v-if="!play" class="backToHome" @click="pushRouter('/')">Cofnij</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      play: false,
      parameter: 0,
      condition: "",
      gameStatusText: "Poznaj rekurwencje :)",
      valueFromRekurwencja: 0,
      initValue: 0,
    };
  },

  methods: {
    startRekurwencja(parameter) {
      this.valueFromRekurwencja = this.rekurwencjaSummary(parseInt(parameter));
    },
    Sleep(millis) {
      var date = new Date();
      var curDate = null;
      do {
        curDate = new Date();
      } while (curDate - date < millis);
    },
    rekurwencjaSummary(parameter) {
      if (parameter == 1) {
        return 1;
      }
      this.Sleep(200);

      return this.rekurwencjaSummary(parameter - 1) + parameter;
    },
    pushRouter(src) {
      this.$router.push(src);
    },
    startGame() {
      this.play = true;
    },
    resetGame() {},
  },
};
</script>
<style lang="scss" scoped>
.rekurwencja {
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

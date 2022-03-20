<template>
  <div
    @mousemove="setPosition($event)"
    :style="{ background: bcg }"
    class="ps-connect"
  >
    <div
      :style="{ background: 'red', top: '130px', left: '130px' }"
      class="container"
      @click="setStartPosition($event)"
    ></div>

    <div
      :style="{ background: 'red', top: '130px', left: '730px' }"
      class="container"
      @click="setEndPosition($event)"
    ></div>

    <svg
      style="position: fixed"
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line :x1="startX" :y1="startY" :x2="posX" :y2="posY" stroke="black" />

      <!-- If you do not specify the stroke
       color the line will not be visible -->
    </svg>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      bcg: "#ffffff",
      posX: 100,
      posY: 100,
      startX: 0,
      startY: 0,
      draw: false,
    };
  },
  mounted() {
    setInterval(() => {
      this.bcg = this.randomColors();
    }, 5000);
  },
  methods: {
    setStartPosition(e) {
      this.draw = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
    },
    setEndPosition(e) {
      this.posX = e.clientX;
      this.posY = e.clientY;
      this.draw = false;
    },
    setPosition(e) {
      if (this.draw) {
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
.ps-connect {
  position: absolute;
  transition: 3s;
  width: 100vw;
  height: 100vh;
}
.container {
  z-index: 1;
  border: solid 20px;
  will-change: auto;
  transition: 3s;
  position: absolute;
  width: 300px;
  height: 300px;
}
</style>

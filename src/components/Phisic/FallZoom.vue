<template>
  <div class="fall-zoom">
    <div :style="{ top: setHeight, width: '100%' }" class="building">
      <div style="background: black; width: 100%; height: 20px"></div>
      <div style="width: 100%" v-for="i in 30" :key="i.id">
        <div class="floor">
          <div style="position: absolute; padding: 10px; background: black">
            {{ 30 - i }}
          </div>
          <img
            v-if="i < 30"
            style="height: 300px; width: 100%"
            src="./planets/floor.png"
            alt=""
          />
          <img
            v-else
            style="height: 300px; width: 100%"
            src="./planets/floor0.png"
            alt=""
          />
        </div>
      </div>
      <div style="background: black; width: 100%; height: 300px"></div>
    </div>
    <div
      :style="{
        height: heightBlackHole + '%',
        top: this.blackHole ? '0%' : '70%',
      }"
      class="block"
    >
      <img
        v-if="this.posY > 0 || this.blackHole"
        :style="{
          height: this.blackHole ? '2000px' : '180px',
          width: this.blackHole ? '180px' : '150%',
        }"
        src="./planets/fallguy.gif"
        alt=""
      />
      <img
        v-if="this.posY <= 0"
        :style="{
          height: this.blackHole ? '2000px' : '180px',
          width: this.blackHole ? '180px' : '150%',
        }"
        src="./planets/fallguy2.png"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["time", "posY", "heightBlackHole", "blackHole"],
  computed: {
    setHeight() {
      if (this.blackHole) {
        return 0 + "px";
      } else {
        return -8050 + this.posY * 10 + "px";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.fall-zoom {
  contain: content;
  position: absolute;
  top: 0%;
  right: 15%;
  width: 50%;
  height: 100%;
  background-image: linear-gradient(rgb(0, 40, 219), rgb(2, 225, 255));
}

.floor {
  color: white;
  background: blue;
  font-size: 1.2rem;
  width: 100%;
  height: 300px;
}
.building {
  position: absolute;
  height: 9000px;
  width: 100px;
  background: blue;
}
.block {
  position: absolute;
  top: 70%;
  width: 100px;
  height: 180px;
  left: 50%;
}
</style>

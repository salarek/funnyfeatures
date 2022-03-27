<template>
  <div class="fall-zoom">
    <div :style="{ top: -8050 + posY * 10 + 'px' }" class="building">
      <div v-for="i in 30" :key="i.id">
        <div class="floor">
          {{ 30 - i }}
          <img style="height: 300px" src="./planets/floor.png" alt="" />
        </div>
      </div>
    </div>
    <div class="block"></div>
  </div>
</template>
<script>
export default {
  props: ["time", "posY"],
};
</script>
<style lang="scss" scoped>
.fall-zoom {
  contain: content;
  position: absolute;
  top: 0%;
  right: 15%;
  width: 900px;
  height: 100%;
}

.floor {
  color: white;
  background: blue;
  font-size: 1.2rem;
  width: 100px;
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

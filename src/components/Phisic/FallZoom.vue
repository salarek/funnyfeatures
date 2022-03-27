<template>
  <div class="fall-zoom">
    <div
      :style="{ top: -8050 + posY * 10 + 'px', width: '100%' }"
      class="building"
    >
      <div style="width: 100%" v-for="i in 30" :key="i.id">
        <div class="floor">
          <div style="position: absolute; padding: 10px; background: black">
            {{ 30 - i }}
          </div>
          <img
            style="height: 300px; width: 100%"
            src="./planets/floor.png"
            alt=""
          />
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
  width: 50%;
  height: 100%;
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

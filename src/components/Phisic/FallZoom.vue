<template>
  <div class="fall-zoom">
    <div :style="{ top: -8500 + posY * 10 + 'px' }" class="building">
      <div v-for="i in 30" :key="i.id">
        <div class="floor">{{ 30 - i }} pietro</div>
      </div>
    </div>
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
  top: 100px;
  left: 50%;
  width: 500px;
  height: 500px;
  background: red;
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
</style>

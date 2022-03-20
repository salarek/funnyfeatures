<template>
  <div id="app">
    <ps-drag />
  </div>
</template>

<script>
// import PsConnect from "./components/PsConnect.vue";
import PsDrag from "./components/PsDrag/PsDrag.vue";
export default {
  name: "App",
  components: {
    // PsConnect,
    PsDrag,
  },
};
</script>

<style>
body {
  margin: 0 !important;
}
#app {
  background: black;
  position: "absolute";
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
}
</style>

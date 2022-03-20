<template>
  <div class="timer-container">
    <p style="border: solid; padding: 4px; background: green; color: white">
      Time:{{ time | secondsInMinutes }}
    </p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    running: Boolean,
  },
  data() {
    return {
      time: 0,
      timer: null,
    };
  },
  watch: {
    running: function (newVal) {
      if (newVal) this.startT();
      else {
        this.$emit("time", this.$options.filters.secondsInMinutes(this.time));
        this.time = 0;
        this.stopT();
      }
    },
  },
  filters: {
    secondsInMinutes: function (seconds) {
      return moment("2015-01-01")
        .startOf("day")
        .seconds(seconds)
        .format("HH:mm:ss");
    },
  },

  methods: {
    stopT: function () {
      clearInterval(this.timer);
      if (this.restWhenStop) this.resetT();
    },
    startT() {
      if (this.resetWhenStart) this.resetT();
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    resetT() {
      this.time = 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timer-container {
  position: fixed;
  pointer-events: none;
  left: 0px;
  top: 0px;
  padding: 20px;
  z-index: 20;
  font-size: 30px;
}
</style>

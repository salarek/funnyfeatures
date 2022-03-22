<template>
  <div class="home">
    <p>Funny Games</p>
    <div class="games-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2.37333in"
        height="1.58667in"
        viewBox="0 0 712 476"
      >
        <path
          id="Zaznaczenie #1"
          @click="pushRouter('dountTouchMe')"
          :fill="currentColor"
          stroke="black"
          stroke-width="0"
          d="M 0.00,2.00
           C 0.00,2.00 171.00,2.00 171.00,2.00
             171.00,2.00 186.00,1.00 186.00,1.00
             186.00,1.00 420.00,1.00 420.00,1.00
             420.00,1.00 527.00,1.00 527.00,1.00
             527.00,1.00 542.00,0.00 542.00,0.00
             542.00,0.00 712.00,0.00 712.00,0.00
             712.00,0.00 619.42,315.00 619.42,315.00
             619.42,315.00 589.42,417.00 589.42,417.00
             589.42,417.00 572.00,476.00 572.00,476.00
             572.00,476.00 531.00,455.31 531.00,455.31
             531.00,455.31 505.00,442.25 505.00,442.25
             505.00,442.25 338.00,357.75 338.00,357.75
             338.00,357.75 273.00,324.75 273.00,324.75
             273.00,324.75 244.00,310.80 244.00,310.80
             244.00,310.80 222.00,313.92 222.00,313.92
             222.00,313.92 171.00,322.75 171.00,322.75
             171.00,322.75 57.00,342.25 57.00,342.25
             57.00,342.25 0.00,352.00 0.00,352.00
             0.00,352.00 0.00,2.00 0.00,2.00 Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      currentColor: "blue",
    };
  },
  methods: {
    pushRouter(src) {
      this.$router.push(src);
    },
  },
};
</script>
<style lang="scss" scope>
.home {
  background: rgb(21, 42, 59);
  cursor: crosshair;
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.games-container {
  width: 80%;
  height: 60%;
  border: solid;
}
.btn {
  background: yellow;
  width: 400px;
}
svg:hover {
  transition: 1s;
  transform: scale(1.1);
}
p {
  color: white;
  font-size: 3rem;
}
</style>

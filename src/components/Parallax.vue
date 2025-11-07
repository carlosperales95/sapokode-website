<template>
    <div class="log" @mousemove="parallax">
      <img
        class="layer layer-1"
        src="../../assets/parallax/granda-back.jpg"
        alt="bg-1"
        width="20%"
        data-speed="0.5"
      />
      <img
        class="layer layer-2"
        src="../../assets/parallax/cacti1.png"
        alt="bg-2"
        width="10%"
        data-speed="3"
      />
      <img
        class="layer layer-3"
        src="../../assets/parallax/granda-back.jpg"
        alt="bg-1"
        width="15%"
        data-speed="4"
      />
      <img
        class="layer layer-4"
        src="../../assets/parallax/pixil-frame-0.png"
        alt="bg-2"
        width="50%"
        data-speed="2"
      />
      <img
        class="layer layer-5"
        src="../../assets/parallax/granda-back.jpg"
        alt="bg-1"
        width="25%"
        data-speed="2"
      />
      <img
        class="layer layer-6"
        src="../../assets/parallax/granda-back.jpg"
        alt="bg-2"
        width="17%"
        data-speed="3"
      />
      <img
        class="layer layer-7"
        src="../../assets/parallax/granda-back.jpg"
        alt="bg-1"
        width="17%"
        data-speed="4"
      />
      <h2>Parallax</h2>
    </div>
</template>

<script setup>
const parallax = function(e) {
    document.querySelectorAll(".layer").forEach((layer) => {
        const speed = layer.getAttribute("data-speed");
        const x = (window.innerWidth - e.pageX * speed) / 10;
        const y = (window.innerHeight - e.pageY * speed) / 10;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
};
</script>

<style scoped>
.hero-container {
    background-color: aliceblue;
}

.log {
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */
  background-color: #f8bc74;
}
h2 {
  font-size: 3em;
}
.layer {
  position: absolute;
}
.layer-1 {
  top: 0;
  left: 60%;
  border-top-left-radius: 250px;
  border-top-right-radius: 250px;
  border-bottom: 5px solid;
  box-shadow: 0 9px 0 8px #f8bc74,
0 13px 0 13px #1c1c27;
}

.layer-2 {
  top: 51%;
  left: 15%;
}
.layer-3 {
  top: 40%;
  right: 2%;
}
.layer-4 {
  top: 25%;
  right: 40%;
}
.layer-5 {
  top: 60%;
  right: 25%;
}
.layer-6 {
  top: 5%;
  right: 40%;
}
.layer-7 {
  top: 70%;
  left: 2%;
}

</style>
<template>
  <div class="loading-container">
    <h2>{{ title }}</h2>
    <div class="loading-animation">
      <div v-for="i in 11" :key="i" class="dot" :style="dotStyle(i)"></div>
    </div>
    <p>{{ subtitle }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Обработка результатов'
  },
  subtitle: {
    type: String,
    default: 'Определение стиля мышления...'
  }
});
const dotStyle = (index) => {
  const angle = -(index - 1) * (360 / 11);
  const size = 4 + (index - 1) * 1.3;
  return {
    transform: `rotate(${angle}deg) translate(40px) rotate(-${angle}deg)`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${-index * 0.1}s`
  };
};
</script>

<style scoped>
h2 {
  font-size: 35px;
  font-weight: 200;
  line-height: 40px;
}

p {
  font-size: 20px;
}

.loading-container {
  text-align: center;
  padding: 20px;
  font-family: PT Serif;
}

.loading-animation {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 35px auto;
}

.dot {
  position: absolute;
  background-color: #3BDE7C;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  animation: circling 1.2s infinite linear;
}

@keyframes circling {
  0% {
    transform: rotate(360deg) translate(40px) rotate(360deg);
  }
  100% {
    transform: rotate(0deg) translate(40px) rotate(0deg);
  }
}
</style>

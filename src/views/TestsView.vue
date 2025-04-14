<template>
  <Header title="Selecciona un Test" :logo="logo" />
  <div class="tests-list">
    <div 
      v-for="test in tests" 
      :key="test.id" 
      class="test-card"
      @click="goToTest(test.id)"
    >
      <h3>{{ test.name }}</h3>
      <p>{{ test.description }}</p>
      <Button text="Iniciar" :isActive="true"/>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { testConfigs } from '../tests/index.js'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import logo from '../assets/logo.png'
import Button from '../components/buttons/Button.vue'

const router = useRouter()
const tests = ref(testConfigs)

function goToTest(id) {
  router.push(`/test/${id}`)
}
</script>

<style scoped>
.tests-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  padding: 80px 20px 40px 20px;
}
.test-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  background: #7a4fa46b;
  transition: 0.2s;
}
.test-card:hover {
  background: #6f0df4;
}
.test-card h3 {
  margin: 0 0 8px;
}
button {
  margin-top: 12px;
}
</style>

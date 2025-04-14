<template>
  <Header :title="headerTitle" :logo="logo"/>
  <div class="test-container">
    <div v-if="loading">Cargando test...</div>
    <div v-else-if="error">{{ error }}</div>
    <TestComponent 
      v-else
      :test="currentTest" 
      @test-completed="onTestCompleted" 
      @result-ready="handleResultReady"
    />
  </div>
  <Footer v-if="isResultReady" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import TestComponent from '../components/Test.vue';
import Footer from '../components/Footer.vue';
import logo from '../assets/logo.png';

const route = useRoute();
const headerTitle = ref("Evaluación de Calidad de Vida Animal");
const isResultReady = ref(false);
const currentTest = ref(null);
const loading = ref(true);
const error = ref(null);

// Import the test configuration based on the route parameter
onMounted(async () => {
  const testId = route.params.testId;
  try {
    // Dynamic import of test configuration
    const testModule = await import(`../tests/${testId}.js`);
    currentTest.value = testModule.default;
    // Update header title based on test name
    headerTitle.value = currentTest.value.name;
    loading.value = false;
  } catch (err) {
    console.error('Error al cargar el test:', err);
    error.value = `Error al cargar el test: ${testId}`;
    loading.value = false;
  }
});

const handleResultReady = (value) => {
  isResultReady.value = value;
};

const onTestCompleted = () => {
  headerTitle.value = "¡Completado!";
};
</script>

<style scoped>
.test-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 20px 20px;
  min-height: 88vh;
}
</style>

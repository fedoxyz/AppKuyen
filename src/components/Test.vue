<template>
  <div class="container" v-if="!finished">
    <div v-if="!finished" class="progress-container">
      <div class="progress-bar" :style="progressStyle"></div>
    </div>
    <div v-if="currentQuestion" class="question-card">
      <label class="question-title">{{ currentQuestion.title }}</label>
      <p class="question-description" v-html="currentQuestion.description" />
      <input
        v-if="currentQuestion.type === 'number'"
        type="number"
        :min="currentQuestion.min"
        :max="currentQuestion.max"
        v-model.number="answers[currentStep]"
      />
      <select
        v-else-if="currentQuestion.type === 'select'"
        v-model.number="answers[currentStep]"
      >
        <option disabled value="">Seleccione</option>
        <option
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    </div>
    <div v-if="test" class="button-group">
      <Button text="Atrás" @click="prevStep" :isActive="currentStep !== 0"/>
      <Button text="Siguiente" v-if="!isLastStep" :isActive="true" @click="nextStep"/>      
      <Button text="Finalizar" v-else :isActive="true" @click="finishTest"/>
    </div>
  </div>
    <div v-if="finished" class="result-box">
      <p class="result-label">✅ ¡Test finalizado!</p>
      <p class="result-text">{{ resultText }}</p>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import Button from './buttons/Button.vue'

const props = defineProps({
  test: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['test-completed', 'result-ready'])

const currentStep = ref(0)
const answers = ref([])
const finished = ref(false)
const resultText = ref('')

const totalSteps = props.test.steps.length

const errorMessage = ref('')

const progressStyle = computed(() => {
  const percentage = ((currentStep.value + 1) / totalSteps) * 100;
  console.log(percentage)
  return {
    width: `${percentage}%`
  };
});

watch(() => props.test, (newTest) => {
  if (newTest && newTest.steps && newTest.steps.length > 0) {
    answers.value = Array(newTest.steps.length).fill('')
    currentStep.value = 0
    finished.value = false
  }
}, { immediate: true })

const currentQuestion = computed(() => 
  props.test && props.test.steps && props.test.steps.length > 0 
    ? props.test.steps[currentStep.value] 
    : null
)

const isLastStep = computed(() => 
  props.test && props.test.steps 
    ? currentStep.value === props.test.steps.length - 1 
    : true
)

const totalScore = computed(() =>
  answers.value.reduce((sum, val) => sum + (parseInt(val) || 0), 0)
)

function nextStep() {
  const current = currentQuestion.value
  const answer = answers.value[currentStep.value]

  errorMessage.value = '' // reset previous error

  if (current.type === 'number') {
    if (answer === '' || answer < current.min || answer > current.max) {
      errorMessage.value = `Por favor ingrese un número entre ${current.min} y ${current.max}.`
      return
    }
  }

  if (current.type === 'select' && (answer === '' || answer === undefined)) {
    errorMessage.value = 'Por favor seleccione una opción.'
    return
  }

  currentStep.value++
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function finishTest() {
  finished.value = true
  
  if (props.test && props.test.steps && props.test.processResult) {
    // Convert answers array to object with keys from test steps
    const answersObject = props.test.steps.reduce((obj, step, index) => {
      obj[step.key] = answers.value[index]
      return obj
    }, {})
    
    // Process results using the test's processResult function
    const result = props.test.processResult(answersObject)
    resultText.value = result.text
    
    saveTestResults(result)
    
    // Emit events to parent component
    emit('test-completed')
    emit('result-ready', true)
  }
}

function saveTestResults(result) {
  console.log('Guardando resultado del test:', {
    name: props.test?.name,
    answers: answers.value,
    totalScore: totalScore.value,
    result: result
  })
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: inherit;
}

.question-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 60px;
  border-radius: 6px;
  max-height: 100%;

  flex: 1 1 auto;   
  overflow-y: auto; 
}
.question-title {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  color: black;
  font-size: 22px;
  font-weight: 500;
}
.question-description {
  margin-bottom: 12px;
  color: #666;
  font-size: 16px;
}
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  bottom: 20px;
  position: absolute;
  position-area: bottom;
}
.result-box {
  margin-top: 24px;
  padding: 16px;
  background-color: #e0ffe0;
  border: 1px solid #8f8;
  border-radius: 6px;
  color: black;
}

.error-text {
  color: red;
  margin-top: 8px;
  font-size: 14px;
}

.progress-container {
  width: 100%;
  min-height: 10px;
  background-color: #e0e0e0a1;
  border-radius: 10.5px;
  overflow: hidden;
  place-self: center;
  margin-top: 27px;
}

select {
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #f9f9f9;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='%23999' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

select:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
  background-color: #fff;
}

.progress-bar {
  height: 10px;
  background-color: #6f0df4;
  border-radius: 10.5px;
  transition: width 0.3s ease-in-out;
}
input {
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #f9f9f9;
}

input:focus {
  border-color: #4f46e5; /* indigo-600 */
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
  background-color: #fff;
}

p {
  margin: 0;
}

.result-label {
  font-size: 22px;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 20px;
}
</style>

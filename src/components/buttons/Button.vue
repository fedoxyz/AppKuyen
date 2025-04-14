<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  text: String,
  isActive: Boolean,
  style: {
    type: String,
    default: 'default'
  },
  href: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['click'])
const handleClick = (event) => {
  if (props.isActive) {
    emit('click')
    // If there's no href, prevent default behavior
    if (!props.href) {
      event.preventDefault()
    }
  } else {
    // Prevent navigation if inactive
    event.preventDefault()
  }
}

// Determine if we should render a button or an anchor
const isLink = computed(() => !!props.href)
</script>
<template>
  <component
    :is="isLink ? 'a' : 'button'"
    :href="isLink ? href : undefined"
    :class="{ 
      'button': true, 
      'active': isActive, 
      'inactive': !isActive,
      'transparent': style === 'transparent'
    }" 
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>
<style scoped>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    text-transform: uppercase;
    background-color: #DADADA;
    width: 160px;
    height: 42px;
    font-size: 16px;
    transition: all 0.6s ease;
    border: none;
    outline: none;
    position: relative;
    text-decoration: none;
    font-family: "Outfit";
  }
  .button.active::hover {
    background-color: #6f0df4;
  }
    

  .button.inactive {
    cursor: not-allowed;
    box-shadow: inset 0 8px 10px rgb(0 0 0 / 40%);
    color: #3c3c3c;
  }
  .button.inactive::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
  }
  .button.active {
    background-color: #f1cd00;
    color: black;
    cursor: pointer;
  }
  .button.active:hover {
    background-color: #ffd84c;
  }
  .button.active:active {
    background-color: #e0b001;
  }
  
  /* Transparent style */
  .button.transparent {
    background-color: transparent;
    border: 1px solid white;
    color: white;
  }
  .button.transparent.active {
    background-color: transparent;
    border: 1px solid white;
    color: white;
  }
  .button.transparent.active:hover {
    background-color: #e0b001;
    border-color: #e0b001;
    color: black;
  }
  .button.transparent.inactive {
    border: 2px solid #DADADA;
    color: #DADADA;
    box-shadow: none;
  }
  .button.transparent.inactive::after {
    background-color: transparent;
  }
</style>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const props = defineProps({
  logo: String,
  title: String
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="container">
      <button class="hamburger" @click="toggleMenu" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
     
      <div v-if="logo || title" class="logo-title">
        <img v-if="logo" class="logo" :src="logo" alt="Logo" />
        <span v-if="title" class="title">{{ title }}</span>
      </div>
      
      <nav class="nav" :class="{ active: isMenuOpen }">
        <div class="close-btn" @click="toggleMenu">×</div>
        <ul class="nav-list">
          <li><a href="/" class="nav-link">Inicio</a></li>
          <li><a href="/tests" class="nav-link highlight">Pruebas</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>


.header {
  position: fixed;
  background-color: #f1cd00;
  width: 100%;
  margin: 0;
  z-index: 50;
  padding: 0.5rem 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
}

.logo {
  width: 48px;
  height: 49px;
}

nav {
    margin: 0.8rem 0 0.8rem auto;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.8rem;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #6f0df4;
}

.nav-link.highlight {
  color: #6f0df4;
  border-radius: 4px;
}
.nav-link.highlight:hover {
  color: #000;
}

.hamburger {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 20;
}

.hamburger span {
  display: block;
  width: 30px;
  height: 3px;
  margin: 5px 0;
  background-color: #000000;
  transition: all 0.3s;
}

.close-btn {
  font-family: Arial, sans-serif;
  display: none;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 1.3rem;
  right: 1.3rem;
  font-size: 5rem;
  line-height: 40px;
  text-align: center;
  color: #f4cf0d;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-weight: 100;
}

.close-btn:hover {
  color: #ffee97;
}

.logo-title {
  display: flex;
  align-self: center;
  text-transform: uppercase;
  margin-right: auto;
}

.title {
  margin: 0 10px 0 10px;
  align-self: center;
  color: #6f0df4;
  font-size: 20px;
  font-weight: 500;
}


/* Responsive styles */
@media (max-width: 768px) {
  .hamburger {
    display: block;
    order: -1;
  }
  
  .nav {
    position: fixed;
    top: -13px;
    left: -100%;
    width: 100%;
    height: 100vh;
    background-color: #fcfcfc;
    z-index: 100;
    transition: left 0.3s ease;
  }
  
  .nav.active {
    left: 0;
  }
  
  .close-btn {
    width: auto;
    display: block;
  }
  
  .nav-list {
    flex-direction: column;
    padding: 8rem 2rem;
  }
  
  .nav-link {
    text-transform: uppercase;
    color: #000;
    font-size: 16px;
    line-height: 22px;
    display: block;
    padding: 0.8rem 0;
    text-align: left;
    font-weight: 300;
  }

}
</style>

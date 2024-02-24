<script setup>
import HomeView from './views/HomeView.vue';
import Header from './components/HeaderCom.vue'
import FooterComp from './components/FooterCom.vue'
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template>
  <div class="text-white h-screen bg-primary-light dark:bg-black dark:text-black">
    <Header :modeType="isDark" @selectMode="toggleDark" />
    <HomeView class="text-white bg-secondary-light dark:bg-black dark:text-black"/>
    <FooterComp  class="text-white bg-white dark:bg-black dark:text-black"/>
  </div>
</template>

<style scoped>
.dark {
  background-color: #1a202c;
  color: #e2e8f0;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
} */
/* 
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>

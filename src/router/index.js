import { createRouter, createWebHistory } from 'vue-router';
import TestView from '../views/TestView.vue';
import MainView from '../views/MainView.vue';
import TestsView from '../views/TestsView.vue';

const routes = [
  { path: '/', name: 'home', component: MainView },
  { path: '/tests', name: 'tests', component: TestsView },
  { path: '/test/:testId', name: 'test', component: TestView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

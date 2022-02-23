import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/",
      name: "Login",
      component: () => import("@/login/login-screen.vue"),
    },
    {
      path: "/landing",
      name: "Landing",
      component: () => import("@/landing/landing-screen.vue"),
      beforeEnter: (to, from, next) => {
        
        if (sessionStorage.getItem('crtsBEWAuth') === 'true') next()

        else next({ name: 'Login' })
      }
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
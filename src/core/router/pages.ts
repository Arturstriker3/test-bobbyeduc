import pageNotFound from "@/core/pages/errors/404.vue"
import { userAuthStore } from '../stores/auth';
import { interfacePages } from '../interface/interface';

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/:pathMatch(.*)", component: pageNotFound },
    ]
});

router.beforeEach((to, _, next) => {
    const authStore = userAuthStore();
    const targetPage = interfacePages.find(page => page.path === to.path);

    if (targetPage && targetPage.showWhenAuth && !authStore.GetIsAuth) {
        next('#####');
    } else {
        next();
    }
});

export default router;
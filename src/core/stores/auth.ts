import { defineStore } from "pinia";
import router from '../router/pages';
import { interfacePages } from '../interface/interface';

export const userAuthStore = defineStore("auth", {
    state: () => ({
        isAuth: false,
        returnUrl: null,
        user: null as object | null,
        accessToken: null as string | null
    }),
    getters: {
        GetIsAuth: (state) => state.isAuth,
        GetUserId: (state) => state.user
    },
    actions: {
        login(user: object, token: string) {
            this.$state.user = user;
            this.$state.accessToken = token;

            this.$state.isAuth = true;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', token);
        },
        logout() {

            this.$state.user = null;
            this.$state.accessToken = null;

            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');

            this.$state.isAuth = false;
            router.push('/login');
        },
        initializeFromLocalStorage() {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('accessToken');

            if (storedUser && storedToken) {
                this.$state.user = JSON.parse(storedUser);
                this.$state.accessToken = storedToken;
                this.$state.isAuth = true;

                const currentRoute = router.currentRoute.value.path;
                const routeRequiresAuth = interfacePages.find(page => page.path === currentRoute && page.showWhenAuth);

                if (!routeRequiresAuth) {
                    router.push('/');
                }
            }
        }
    }
})
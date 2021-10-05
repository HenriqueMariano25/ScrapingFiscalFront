import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const routes = new Router({
    mode: "history",
    routes: [{
        path: "/",
        component: () => import(/* webpackChunkName: "home" */ "./pages/Home"),
        name: "Home"
    },
    ]
})

export default routes
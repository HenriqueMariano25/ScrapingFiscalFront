import Vue from "vue"
import Router from "vue-router"

import Usuario from "./routes/usuarioRoutes"

Vue.use(Router)

const routes = new Router({
    mode: "history",
    routes: [{
        path: "/",
        component: () => import(/* webpackChunkName: "home" */ "./pages/Home"),
        name: "Home"
    },
        ...Usuario
    ]
})

export default routes
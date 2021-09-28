const routes = [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../pages/Usuario/Login'),
        name: 'Login'
    },
]

export default routes
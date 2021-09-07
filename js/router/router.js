const routes = [{
        path: '/',
        name: 'home',
        component: app.component('artifact-box')
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: About
    // },
    // {
    //     path: '/artifactShow',
    //     name: '',
    //     component: app.component('artifact-show')
    // }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
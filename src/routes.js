import featuredPageSpec from './pages/featured/page.spec'

const routes = [
    {
        url: '/',
        routeSpec: featuredPageSpec
    },
    {
        url: '/main',
        routeSpec: featuredPageSpec
    },
    {
        url: '/channels/:channel',
        routeSpec: featuredPageSpec
    },

]

export default routes;
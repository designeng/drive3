import featuredPageSpec from './pages/posts/page.spec';

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
        url: '/channels/:channelId',
        routeSpec: featuredPageSpec
    },
    {
        url: '/posts/:postId',
        routeSpec: featuredPageSpec
    },

]

export default routes;
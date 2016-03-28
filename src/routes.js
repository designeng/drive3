import postsPageSpec from './pages/posts/page.spec';

const routes = [
    {
        url: '/',
        routeSpec: postsPageSpec
    },
    {
        url: '/main',
        routeSpec: postsPageSpec
    },
    {
        url: '/channels/:channelId',
        routeSpec: postsPageSpec
    },
    {
        url: '/posts/:postId',
        routeSpec: postsPageSpec
    },

]

export default routes;
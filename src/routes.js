import featuredPageSpec from './pages/featured/page.spec';

// TODO: handle '/posts/:postId' with featuredPageSpec
// import postPageSpec     from './pages/post/page.spec';

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
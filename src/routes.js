import postsPageSpec from './blocks/posts/page.spec';

const routes = [
    {
        url: '/',
        routeTasks: postsPageSpec
    },
    {
        url: '/main',
        routeTasks: postsPageSpec
    },
    {
        url: '/channels/:channelId',
        routeTasks: postsPageSpec
    },
    {
        url: '/posts/:postId',
        routeTasks: postsPageSpec
    },

]

export default routes;
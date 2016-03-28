// scrollLoadingPlugin
import wireDebugPlugin      from 'essential-wire/source/debug';
import scrollLoadingPlugin  from '../../plugins/dom/loading/scroll';

const lastPostId = window.__sharedData__.lastPostId;

export default {
    $plugins: [
        wireDebugPlugin,
        scrollLoadingPlugin
    ],

    additionalPosts: {
        dinamicLoading: {
            params: {
                limit: 3,
                fromPostId: lastPostId
            }
        }
    }
}
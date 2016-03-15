import chai, { expect } from 'chai';
import spies from 'chai-spies';
import wire  from 'essential-wire';
import wireDebugPlugin      from 'essential-wire/source/debug';
import requestPlugin   from '../../src/plugins/api/request';
import { getPostsUrl } from '../../src/api/config';

describe('preprocessors', () => {

    let rootContext;

    const before = (done) => {
        wire({
            $plugins: [
                wireDebugPlugin,
                requestPlugin
            ],
            posts: {
                request: {
                    url: getPostsUrl()
                }
            },
        })
        .then((context) => {
            rootContext = context;
            done();
        })
        .otherwise((error) => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('posts ', (done) => {
        console.log("rootContext.posts:::::", rootContext.posts);
        expect(rootContext.posts).to.be.ok;
        done();
    });
});
import chai, { expect } from 'chai';
import spies from 'chai-spies';

import { preprocessPosts } from '../../src/pages/posts/preprocessors';

describe('preprocessors', () => {

    const items = [
        {
            CreatedOn: '2016-03-15T07:25:11Z',
            Images: ['one', 'two', 'three']
        },
        {
            CreatedOn: '2016-03-15T07:25:11Z',
            Images: ['one', 'two', 'three']
        }
    ];

    it('should format CreatedOn ', () => {
        expect(preprocessPosts(items)[0]['CreatedOn']).to.equal('03-15-2016');
    });

    it('should format CreatedOn ', () => {
        expect(preprocessPosts(items)[0]['imagesCount']).to.equal(3);
    });
});
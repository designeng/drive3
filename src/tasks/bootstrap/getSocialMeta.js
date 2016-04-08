import twitter from '../../templates/build/social/twitter';
import openGraph from '../../templates/build/social/openGraph';

export default function getSocialMeta(postData) {
    let meta = [];

    let Images = postData.Images;

    meta.push(openGraph({
        Id: postData.Id,
        Title: postData.Title,
        Content: postData.Content,
        Image: Images && Images.length ? Images[0].Url : void 0,
        CreatedOn: postData.CreatedOn
    }));

    meta.push(twitter({
        Id: postData.Id,
        Title: postData.Title,
        Content: postData.Content,
        Image: Images && Images.length ? Images[0].Url : void 0,
    }));

    return meta.join('');
}
import post from '../../templates/build/post';
import extraPostContent from '../../templates/build/extraPostContent';

export default function extraPost() {
    return post({
        Title: 'Looking for old DRIVE.NET?',
        Content: extraPostContent()
    })
}
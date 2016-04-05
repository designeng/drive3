import post from '../../templates/build/post';
import extraPostContent from '../../templates/build/extraPostContent';

const Images = [
    [
        {
            "Url": "https://images.d3-x.net/WWmYOklOFeQ9kV43AIbSPyvmn44=/350x197/post/FT5oB_XWNSCZ6mHMNnymyIAK0AUB.jpg",
            "W": 350,
            "H": 197
        },
        {
            "Url": "https://images.d3-x.net/gwIVa2FwYym5YEDxPQPdWiZWr0U=/700x394/post/FT5oB_XWNSCZ6mHMNnymyIAK0AUB.jpg",
            "W": 700,
            "H": 394
        },
        {
            "Url": "https://images.d3-x.net/qn5AX6yFKiGGFL6wJtC4AAdGBOU=/1280x720/post/FT5oB_XWNSCZ6mHMNnymyIAK0AUB.jpg",
            "W": 1280,
            "H": 720
        }
    ]
]

export default function extraPost() {
    return post({
        Title: 'Looking for old DRIVE.NET?',
        Content: extraPostContent(),
        HasClicableImages: false,
        ImagesCount: 1,
        Images
    })
}
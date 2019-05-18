var pswpElement = document.querySelectorAll('.pswp')[0];

var items = [
    {
        src: '../img/slide-1.jpg',
        w: 600,
        h: 600,
    },
    {
        src: '../img/slide-2.jpg',
        w: 600,
        h: 600,
    },
    {
        src: '../img/slide-3.jpg',
        w: 600,
        h: 600,
    },
    {
        src: '../img/slide-4.jpg',
        w: 600,
        h: 600,
    },
    {
        src: '../img/slide-5.jpg',
        w: 600,
        h: 600,
    }
];

var options = {
    index: 0
};

var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
gallery.init()
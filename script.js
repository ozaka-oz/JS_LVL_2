const goods = [
    {
        title: 'Super Mario Odyssey',
        price: 150,
        img: 'default_picture.jpg'
    },
    {
        title: 'Luigi Mansion 3',
        price: 50,
        img: 'default_picture.jpg'
    },
    {
        title: 'Astral Chain',
        price: 350,
        img: 'default_picture.jpg'
    },
    {
        title: 'The Legend of Zelda: Breath of the Wild',
        price: 250,
        img: 'default_picture.jpg'
    },
    {
        title: 'The Legend of Zelda: Link’s Awakening',
        price: 70,
        img: 'default_picture.jpg'
    },
    {
        title: 'Yoshi Crafted World',
        price: 160,
        img: 'default_picture.jpg'
    },
    {
        title: 'Stardew Valley',
        price: 40,
        img: 'default_picture.jpg'
    },
    {
        title: 'Captain Toad: Treasure Tracker',
        price: 120,
        img: 'default_picture.jpg'
    },
    {
        title: 'Super Mario Party',
        price: 100,
        img: 'default_picture.jpg'
    },
    {
        title: 'Rayman Legends: Definitive Edition (Nintendo Switch)',
        price: 200,
        img: 'default_picture.jpg'
    },
];

const renderGoodsItem = (title, price, img) => {
    return `<div class="goods-item"><img src="${img}" alt="${title}"><h3>${title}</h3><p class="price">${price} руб.</p></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img));
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);
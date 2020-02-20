const goods = [
    {
        title: 'Super Mario Odyssey',
        price: 150
    },
    {
        title: 'Luigi Mansion 3',
        price: 50
    },
    {
        title: 'Astral Chain',
        price: 350
    },
    {
        title: 'The Legend of Zelda: Breath of the Wild',
        price: 250
    },
    {
        title: 'The Legend of Zelda: Link’s Awakening',
        price: 70
    },
    {
        title: 'Yoshi Crafted World',
        price: 160
    },
    {
        title: 'Stardew Valley',
        price: 40
    },
    {
        title: 'Captain Toad: Treasure Tracker',
        price: 120
    },
    {
        title: 'Super Mario Party',
        price: 100
    },
    {
        title: 'Rayman Legends: Definitive Edition (Nintendo Switch)',
        price: 200
    },
];

const renderGoodsItem = (title, price, img = 'default_picture.jpg') => {
    return `<div class="goods-item"><img src="${img}" alt="${title}"><h3>${title}</h3><p class="price">${price} руб.</p></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join("");
//    Вывод запятых происходит потому, что мы выводим содержимое массива. По умолчанию эллементы в массиве разделены запятыми.
}

renderGoodsList(goods);
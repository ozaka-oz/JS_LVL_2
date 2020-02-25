class ProductsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {
                id: 1,
                title: 'Super Mario Odyssey',
                price: 150
    },
            {
                id: 2,
                title: 'Luigi Mansion 3',
                price: 50
    },
            {
                id: 3,
                title: 'Astral Chain',
                price: 350
    },
            {
                id: 4,
                title: 'The Legend of Zelda: Breath of the Wild',
                price: 250
    },
            {
                id: 5,
                title: 'The Legend of Zelda: Link’s Awakening',
                price: 70
    },
            {
                id: 6,
                title: 'Yoshi Crafted World',
                price: 160
    },
            {
                id: 7,
                title: 'Stardew Valley',
                price: 40
    },
            {
                id: 8,
                title: 'Captain Toad: Treasure Tracker',
                price: 120
    },
            {
                id: 9,
                title: 'Super Mario Party',
                price: 100
    },
            {
                id: 10,
                title: 'Rayman Legends: Definitive Edition (Nintendo Switch)',
                price: 200
    },
        ];
    }
    
    render() {
        const block = document.querySelector(this.container);
        for (let itemProduct of this.goods) {
            const productObj = new ProductItem(itemProduct);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }

}

class ProductItem {
    constructor(product, img = 'default_picture.jpg') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;

    }

    render() {
        return `<div class="goods-item" data-id="${this.id}"><img src="${this.img}" alt="${this.title}"><h3>${this.title}</h3><p class="price">${this.price} руб.</p><div class="btn_basket">В корзину</div></div>`
    }
}

class basket {
    addBaket() {};
    removeBasket() {};
    clearBasket() {};
}

class basketItem {
    plusBasketItem() {};
    minusBasketItem() {};
    deleteBasketItem() {};
    
}

let list = new ProductsList();
list.render();
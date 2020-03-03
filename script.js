const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.list[this.construtor.name](product);
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
    _init() {
        return false;
    }
}

class item {
    constructor(el, img = 'default_picture.jpg') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}"><img src="${this.img}" alt="${this.product_name}"><h3>${this.product_name}</h3><p class="price">${this.price} руб.</p><div class="buy-btn" data-id="${this.id_product}" data-name="${this.product_name}" data-price="${this.price}">В корзину</div></div>`
    }
}

class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value)
        })
    }
}

class ProductItem extends item {}

class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(element) {
        this.getJson(`${API}/deleteFormBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity*product.price}`;
    }
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }
}

class CartItem extends item {
    constructor(el, img = 'default_picture.jpg') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
<div class="product-bio">
<img src="${this.img}">
<div class="product-desc">
<p class="product-title">${this.product_name}</p>
<p class="product-single-price">${this.price} each</p>
</div>
</div>
<div class="right-block">
<p class="product-price">${this.quantity*this.price}</p>
<button class="del-btn" data-id="${this.id_product}">&times;</button>
</div>
</div>`
    }
}

const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);


////Задача №1 Переделайте makeGETRequest() так, чтобы она использовала промисы.
////let getRequest = (data) => {
////    return new Promise((resolve, reject) => {
////        let xhr = new XMLHttpRequest();
////        xhr.open("GET", url, true);
////        xhr.onreadystatechange = () => {
////            if (xhr.readyState === XMLHttpRequest.DONE) {
////                if (xhr.status === 200) {
////                    resolve(xhr.responseText);
////                } else {
////                    reject('Error');
////                }
////            }
////        };
////        xhr.send();
////    });
////};
////
////getRequest('temp.json')
////    .then(data => {
////        console.log(data);
////    })
////    .catch(error => {
////        console.log(`${error} from catch`);
////    })
//
//class ProductsList {
//    constructor(container = '.goods-list', calc = '.calculate') {
//        this.container = container;
//        this.calc = calc;
//        this.allProductsPrices = [];
//        this.goods = [];
//        this.allProducts = [];
//        this._fetchProducts()
//        .then(data => {
//            this.goods = [...data];
//            this.render()
//        });
//    }


//Задача №3 
//    _fetchProducts() {
//        return fetch(`${API}/catalogData.json`)
//        .then(result => result.json())
//        .catch(error => {
//            console.log(error);
//        })
//    }
//
//    render() {
//        const block = document.querySelector(this.container);
//        for (let itemProduct of this.goods) {
//            const productObj = new ProductItem(itemProduct);
//            this.allProducts.push(productObj);
//            block.insertAdjacentHTML('beforeend', productObj.render())
//        }
//    }
//
////    getSum() {
////        const calcBlock = document.querySelector(this.calc);
////        let resultSum = this.allProducts.reduce((sum, current) => sum += current.price, 0);
////        calcBlock.insertAdjacentHTML('beforeend', `Общая стоимость товаров ${resultSum}`)
////    }
//
//    //    Это то решение которое я сделал до просмотра 3-го урока. Теперь понимаю что оно не оптимально.
//    //    sumAllGoods() {
//    //        const calcBlock = document.querySelector(this.calc);
//    //        for (let itemProduct of this.goods) {
//    //            const productPrice = itemProduct.price;
//    //            this.allProductsPrices.push(productPrice);
//    //        }
//    //        let resultSum = this.allProductsPrices.reduce(function (sum, current) {
//    //            return sum + current;
//    //        }, 0);
//    //        calcBlock.insertAdjacentHTML('beforeend', `Общая стоимость товаров ${resultSum}`)
//    //    }
//}
//
//class ProductItem {
//    constructor(product, img = 'default_picture.jpg') {
//        this.title = product.product_name;
//        this.price = product.price;
//        this.id = product.id_product;
//        this.img = img;
//    }
//
//    render() {
//        return `<div class="goods-item" data-id="${this.id}"><img src="${this.img}" alt="${this.title}"><h3>${this.title}</h3><p class="price">${this.price} руб.</p><div class="btn_basket">В корзину</div></div>`
//    }
//}
//
//
//let list = new ProductsList();
//list.render();
//list.getSum();
////list.sumAllGoods();
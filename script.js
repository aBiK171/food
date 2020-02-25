const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 599,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 732,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    burgerBeef: {
        name: 'Бургер с говядиной',
        price: 16000,
        kcall: 879,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    doubleBurger: {
        name: 'Двойной Бургер',
        price: 23500,
        kcall: 982,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        },
        get Amount() {
            return this.amount
        }
    },
    pizzaMargeritha: {
        name: 'Пицца Маргарита',
        price: 49990,
        kcall: 721,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 300,
        kcall: 78,
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 2000,
        kcall: 52
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox');

for(let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function() {
        addAmount(this)
    })
}

function addAmount(element) {
    // Метод closest() - переподключается к ближайшему родителю.
    // Метод getAttribute - получается все, что находится в атрибуте.
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        amount = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-call span'),
        elementData = element.getAttribute('data-symbol');

    if(elementData == '+') {
        product[parentId].amount++;
    }else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    amount.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

for(let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this)
    })
}
function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        elementData = element.getAttribute('data-extra'),
        priceExtra = parent.querySelector('.main__product-price span'),
        kcallExtra = parent.querySelector('.main__product-call span');

    product[parentId][elementData] = element.checked;
    const {price, kcall} = extraProduct[elementData]
    const check = product[parentId][elementData];
    if(check == true) {
        product[parentId].price += price;
        product[parentId].kcall += kcall;
    }else {
    product[parentId].price -= price;
    product[parentId].kcall -= kcall;
    }

    priceExtra.innerHTML = product[parentId].Summ;
    kcallExtra.innerHTML = product[parentId].Kcall;

}

const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = receipt.querySelector('.receipt__window'),
    receiptOut = receiptWindow.querySelector('.receipt__window-out'),
    receiptBtn = receiptWindow.querySelector('.receipt__window-btn');

let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener('click', function() {

    for(const key in product) {
        const po = product[key];
        if(po.amount > 0) {
            arrayProduct.push(po);
            for(const newKey in po) {
                if(po[newKey] === true) {
                    po.name += '\n' + extraProduct[newKey].name;
                }
            }
            po.price = po.Summ;
            po.kcall = po.Kcall;

        }
    }

    for(let i = 0; i < arrayProduct.length; i++) {
        const ap = arrayProduct[i];
        totalName += '\n' + ap.name + '\n';
        totalPrice += ap.price;
        totalKcall += ap.kcall;
    }
    let totalHtml = `Вы заказали \n ${totalName} \n Калории ${totalKcall} \n Стоимость ${totalPrice} сумм`
    receiptOut.innerHTML = totalHtml;
    
    receipt.style.display = 'flex';
    setTimeout(function() {
        receipt.style.opacity = 1;
        receiptWindow.style.top = 0;
    }, 100)
})
receiptBtn.addEventListener('click', function() {
    location.reload();
})   
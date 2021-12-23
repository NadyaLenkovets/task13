const currentDate = document.querySelector('.current-date');
const cards = document.querySelector('.cards');
const searchInput = document.querySelector('.search-input');
const searchError = document.getElementById('error');
const cartButton = document.querySelector('.cart__btn');
const frame = document.querySelector('.frame');
const cartBlock = document.querySelector('.cart-block');
const payment = document.querySelector('.payment');
const confirmBtn = document.querySelector('.confirm__btn');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup-close');
const paymentMethodItems = document.querySelectorAll('.payment-method__item');
const cart = document.querySelector('.cart');
const subTotalSum = document.querySelector('.sub-total__sum');
const backArrow = document.querySelector('.cart-block__back-arrow');
const cancelButton = document.querySelector('.cancel__btn');
const cartError = document.querySelector('.cart-error');
const paymentError = document.querySelector('.payment-error');
const burgerMenu = document.querySelector('.burger-menu');
const sidebar = document.querySelector('.sidebar');

let navListItems = document.querySelectorAll('.nav-list__item');
let tabNavItems = document.querySelectorAll('.tabs-nav__item');
let collection = document.getElementsByClassName('card'); // коллекция cards
let cartAmountInputs = document.getElementsByClassName('cart__amount-input'); // коллекция amountInputs
let cartItemsDelete = document.getElementsByClassName('cart-item__delete'); // коллекция deleteCartItem
let cartItemSums = document.getElementsByClassName('cart-item__sum');  // коллекция cartItemSums
let cartItems = document.getElementsByClassName('cart-item');  // коллекция cartItems

//  ================  NAV   ================  //

navListItems.forEach((navListItem) => {
   navListItem.addEventListener('click', function() {
      navListItems.forEach((navListItem) => {
         navListItem.classList.remove('active');
      })

      this.classList.add('active');
   })
})



//  ================  CURRENT DATE   ================  //

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDay();
let date = today.getDate();
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday'];

currentDate.innerHTML = days[day] + ', ' + date + ' ' +  months[month] + ' ' + year;



//  ==========  JSON  ==========  //

let dishesObj = JSON.parse(dishes);

// текущий массив
let currentArr = dishesObj['hot-dishes'];



//  ================  TABS NAV   ================  //

tabNavItems.forEach((tabNavItem) => {
   tabNavItem.addEventListener('click', function() {
      tabNavItems.forEach((tabNavItem) => {
         tabNavItem.classList.remove('active');
      })

      this.classList.add('active');
      searchInput.value = ''; // обнуляем поиск при переключении таба
   })
   tabNavItem.addEventListener('click', getCategoryName);
})



function getCategoryName() {
   let category = this.dataset.tab;
   currentArr = dishesObj[`${category}`];
  
   createCards(currentArr);
   collection = document.getElementsByClassName('card');
   collectionClick();
}




//  ================  CREATE CARDS   ================  //


function createCards(currentArr) {
   cards.innerHTML = '';

   currentArr.forEach((elem) => {
      let cardTemplate = `
         <div class="card">
            <div class="card__image">
               <img src="img/dishes/${elem['image']}" alt="">
            </div>
            <div class="card__name">${elem['name']}</div>  
            <div class="card__price">$ ${elem['price']}</div>  
            <div class="card__amount">${elem['amount']} Bowls available</div>  
         </div>
      `;

      cards.insertAdjacentHTML('beforeend', cardTemplate);
   })
}

createCards(currentArr);




//  ================  SEARCH   ================  //

searchInput.addEventListener('input', function() {
   let searchValue = searchInput.value.toLowerCase();
   let counter = 0;
   for (let elem of collection) {
      elem.classList.remove('hidden');
   }

   for (let elem of collection) {
      let dishName = elem.querySelector('.card__name').innerHTML.toLowerCase();
      if (!dishName.includes(searchValue)) {
         elem.classList.add('hidden');
         counter++;
      } else if (searchValue == '') {
         elem.classList.remove('hidden');
      }

      if (counter == collection.length) {
         error.classList.add('show');
         setTimeout(hideError, 3000);
      }
   }
})

function hideError() {
   error.classList.remove('show');
}




//  ================  CART BUTTON   ================  //

cartButton.addEventListener('click', checkEmptyCart);

function checkEmptyCart() {
   cartItems = document.getElementsByClassName('cart-item');
   if (cartItems.length == 0) {
      cartError.classList.add('active');
      setTimeout(hideCartError, 3000);
   } else {
      frame.classList.add('hidden');
      payment.classList.add('active');
      cartBlock.classList.add('active');
      scrollToPayment();
   }
}

function scrollToPayment() {
   payment.scrollIntoView({behavior: "smooth"});
}

function hideCartError() {
   cartError.classList.remove('active');
}


// ============  DROPDOWN CUSTOMIZATION  ============  //

const multiDefault = () => {
   const select = document.querySelector('#type-select');
   const choices = new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
   });
};

multiDefault();
 








// ============  PAYMENT METHOD ITEMS  ============  //

paymentMethodItems.forEach((paymentMethodItem) => {
   paymentMethodItem.addEventListener('click', function() {

      paymentMethodItems.forEach((paymentMethodItem) => {
         paymentMethodItem.classList.remove('active');
      })

      this.classList.add('active');
   })
})



// ============  COLLECTION CLICK  ============  //

function collectionClick() {
   for (let dishCard of collection) {
      dishCard.addEventListener('click', function() {

         let dishName = this.querySelector('.card__name').innerHTML;
         let dishPrice = this.querySelector('.card__price').innerHTML;
         let dishImage = this.querySelector('.card__image img').src;
         
         let dishTemplate = `
            <div class="cart-item">
               <div class="cart-item__content">
                  <div class="cart-item__image">
                     <img src="${dishImage}">
                  </div>
                  <div class="cart-item__block">
                     <div class="cart-item__name">${dishName}</div>
                     <div class="cart-item__price">${dishPrice}</div>
                  </div>
                  <div class="cart-item__amount">
                     <input class="cart__amount-input" type="text" value="1">
                  </div>
                  <div class="cart-item__sum">$ ${countSum(convertPrice(dishPrice), 1)}</div>
               </div>
               <div class="cart-item__info">
                  <div class="cart-item__comment">
                     <input class="cart__comment-input" type="text" placeholder="Order Note...">
                  </div>
                  <div class="cart-item__delete">
                     <svg class="cart-item__delete-icon">
                        <use xlink:href="#delete"></use>
                     </svg>
                  </div>
               </div>
            </div>
         `;

         cart.insertAdjacentHTML('beforeend', dishTemplate);
         activateAmountInputs();
         activateCartItemsDelete();
         subTotalCount();
      });
   }
}

collectionClick();


function convertPrice(string) {
   return result = +string.substr(2);
}

function countSum(price, number) {
   return sum = price * number;
}



// ============  AMOUNT INPUTS  ============  //

function activateAmountInputs() {
   cartAmountInputs = document.getElementsByClassName('cart__amount-input');
   for (let cartAmountInput of cartAmountInputs) {
      cartAmountInput.addEventListener('input', function() {
         console.log(typeof(this.value));
         if (isNaN(this.value)) {
            cartError.innerHTML = 'Not a number.'
            cartError.classList.add('active');
            setTimeout(hideCartError, 3000);
         } else {
            let price = convertPrice(this.parentElement.previousElementSibling.lastElementChild.innerHTML);
            let newSum = (this.value * price).toFixed(2);

            this.parentElement.nextElementSibling.innerHTML = `$ ${newSum}`;
            subTotalCount();
         }
         
      })
   };
}


// ============  DELETE ITEMS  ============  //

function activateCartItemsDelete() {
   cartItemsDelete = document.getElementsByClassName('cart-item__delete');
   for (let cartItemDelete of cartItemsDelete) {
      cartItemDelete.addEventListener('click', function() {
         this.parentElement.parentElement.remove();
         subTotalCount();
      })
      
   };
   
};



// ============  SUB TOTAL COUNT  ============  //

function subTotalCount() {
   cartItemSums = document.getElementsByClassName('cart-item__sum');
   let totalSum = 0;
   for (let cartItemSum of cartItemSums) {
      totalSum += convertPrice(cartItemSum.innerHTML);
   }
   subTotalSum.innerHTML = `$ ${totalSum.toFixed(2)}`;
};

subTotalCount();



// ============  BACK ARROW, CANCEL BUTTON  ============  //

backArrow.addEventListener('click', closePayment);
cancelButton.addEventListener('click', closePayment);

function closePayment() {
   frame.classList.remove('hidden');
   payment.classList.remove('active');
   cartBlock.classList.remove('active');
}





// ============  INPUT MASKS  ============  //

// ============  name  ============  //

let userName = document.querySelector('#name');
let maskOptionsName = {
  mask: /^[A-Za-z -]+$/
};
mask = IMask(userName, maskOptionsName);

// ============  card number  ============  //

let cardNumber = document.querySelector('#card-number');
let maskOptions = {
  mask: '0000 0000 0000 0000',
  lazy: false,
  placeholderChar: '_'
};
mask = IMask(cardNumber, maskOptions);


// ============  expiration-date  ============  //

let expirationDate = document.querySelector('#expiration-date');
let maskOptionsExpDate = {
   mask: 'MM{/}YYYY',
   lazy: false,
   placeholderChar: '_',

   blocks: {
      YYYY: {
         mask: '0000',
         mask: IMask.MaskedRange,
         from: 2021,
         to: 2050
      },

      MM: {
         mask: IMask.MaskedRange,
         from: 1,
         to: 12
      },
   }
};
mask = IMask(expirationDate, maskOptionsExpDate);


// ============  password  ============  //

let password = document.querySelector('#cvv');
let maskOptionsPassword = {
  mask: '000',
};
mask = IMask(password, maskOptionsPassword);




// ============  BURGER MENU  ============  //


const sidebarBlock = document.querySelector('.sidebar-block');

burgerMenu.addEventListener('click', function() {
   sidebarBlock.classList.toggle('show');
   this.classList.toggle('active');
   sidebar.classList.toggle('open');
})




// ============  POPUP  ============  //

confirmBtn.addEventListener('click', function(e) {
   e.preventDefault();
   // проверка на заполнение всех инпутов
   if (!userName.value == '' && !cardNumber.value.includes('_') && !expirationDate.value.includes('_') && password.value.length == 3) {
      popup.classList.add('open');
   } else {
      paymentError.classList.add('active');
      setTimeout(hidePaymentError, 3000);
   }
})

function hidePaymentError() {
   paymentError.classList.remove('active');
}

popup.addEventListener("click", function(e) {
   if (!e.target.closest('.popup-inner') || e.target == popupClose) {
      this.classList.remove('open');
   }
})
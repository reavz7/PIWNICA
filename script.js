const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const price = event.target.parentElement.querySelector('.item-price').textContent;
    const itemType = event.target.parentElement.querySelector('h2').textContent; 
    const size = event.target.parentElement.querySelector('.size-options').value;

    const item = {
        type: itemType,
        price: price,
        size: size,
        quantity: 1 
    };

    if (!item.type || !item.price || !item.size) {
        alert("Nie udało się dodać przedmiotu do koszyka. Sprawdź, czy wybrałeś rozmiar i czy cena jest poprawnie ustawiona.");
        return;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.type === item.type && cartItem.size === item.size);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push(item);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    alert(`Dodano ${item.type}, Rozmiar: ${item.size}, Cena: ${item.price} do koszyka!`);

    updateCartDisplay();
}

function removeItemFromCart(item, index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (index !== undefined && index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price'); 

    cartContainer.innerHTML = ''; 
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    let totalPrice = 0; 

    cartItems.forEach((item, index) => {
        
        if (item.type && item.price && item.size) {
            const sizeInfo = item.size ? `, Rozmiar: ${item.size}` : '';
            const itemElement = document.createElement('div');
            itemElement.textContent = `Typ: ${item.type}${sizeInfo}, Cena: ${item.price}, Ilość: ${item.quantity}`;
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-from-cart-button';

            removeButton.textContent = 'Usuń';
            removeButton.addEventListener('click', () => removeItemFromCart(item, index));
            itemElement.appendChild(removeButton);
            cartContainer.appendChild(itemElement);

            totalPrice += parseFloat(item.price) * item.quantity; 
        } else {
            
            alert("Nie udało się wyświetlić przedmiotu w koszyku. Sprawdź, czy przedmiot ma poprawne właściwości.");
        }
    });

    totalPriceContainer.textContent = `Cena całkowita:  ${totalPrice} PLN `; 
    
}

updateCartDisplay();


if (typeof(Storage) !== "undefined") {
    updateCartDisplay(); 
} else {
    
    alert("Twoja przeglądarka nie obsługuje funkcji localStorage, więc nie można wyświetlić zawartości koszyka.");
}

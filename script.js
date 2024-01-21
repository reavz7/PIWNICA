// Pobierz wszystkie przyciski "Dodaj do koszyka"
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

// Dla każdego przycisku "Dodaj do koszyka", dodaj obsługę zdarzenia kliknięcia
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    // Pobierz wybrane wartości: cena, typ ubrania i rozmiar
    const price = event.target.parentElement.querySelector('.item-price').textContent;
    const itemType = event.target.parentElement.querySelector('h2').textContent; // Zakładam, że nazwa ubrania jest w nagłówku h2.
    const size = event.target.parentElement.querySelector('.size-options').value;

    // Utwórz obiekt reprezentujący przedmiot w koszyku
    const item = {
        type: itemType,
        price: price,
        size: size
    };

    // Sprawdź, czy przedmiot ma wymagane właściwości
    if (!item.type || !item.price || !item.size) {
        // Jeśli nie wszystkie wymagane wartości są dostępne, poinformuj użytkownika
        alert("Nie udało się dodać przedmiotu do koszyka. Sprawdź, czy wybrałeś rozmiar i czy cena jest poprawnie ustawiona.");
        return;
    }

    // Pobierz obecnie przechowywane przedmioty w koszyku z localStorage (jeśli istnieją)
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Dodaj nowy przedmiot do koszyka
    cartItems.push(item);

    // Zapisz zaktualizowane przedmioty w koszyku w localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Powiadom użytkownika, że przedmiot został dodany do koszyka
    alert(`Dodano ${item.type}, Rozmiar: ${item.size}, Cena: ${item.price} do koszyka!`);

    // Odśwież zawartość koszyka na stronie
    updateCartDisplay();
}

function removeItemFromCart(item, index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Usuń przedmiot z koszyka na podstawie indeksu
    if (index !== undefined && index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
        // Zapisz zaktualizowane przedmioty w koszyku w localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Odśwież zawartość koszyka na stronie
        updateCartDisplay();
    }
}

// Funkcja do odświeżania zawartości koszyka na stronie
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price'); // Dodaj kontener dla całkowitej ceny

    cartContainer.innerHTML = ''; // Wyczyść zawartość koszyka przed dodaniem zaktualizowanych przedmiotów
    // Pobierz przedmioty zapisane w localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    let totalPrice = 0; // Inicjalizuj zmienną do przechowywania całkowitej ceny

    // Wyświetl przedmioty z koszyka na stronie wraz z przyciskiem usuwania
    cartItems.forEach((item, index) => {
        // Sprawdź, czy przedmiot ma wymagane właściwości
        if (item.type && item.price && item.size) {
            const sizeInfo = item.size ? `, Rozmiar: ${item.size}` : '';
            const itemElement = document.createElement('div');
            itemElement.textContent = `Typ: ${item.type}${sizeInfo}, Cena: ${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Usuń';
            removeButton.addEventListener('click', () => removeItemFromCart(item, index));
            itemElement.appendChild(removeButton);
            cartContainer.appendChild(itemElement);

            // Dodaj cenę przedmiotu do całkowitej ceny
            totalPrice += parseFloat(item.price); // Konwertuj cenę na liczbę zmiennoprzecinkową i dodaj do całkowitej ceny
        } else {
            // Jeśli przedmiot nie ma wymaganych właściwości, poinformuj użytkownika
            alert("Nie udało się wyświetlić przedmiotu w koszyku. Sprawdź, czy przedmiot ma poprawne właściwości.");
        }
    });

    // Wyświetl całkowitą cenę na stronie
    totalPriceContainer.textContent = `Cena całkowita:  ${totalPrice} PLN `; // Zakładam, że używasz polskiej waluty
    
}

// Wywołaj funkcję do odświeżania zawartości koszyka
updateCartDisplay();


// Sprawdź, czy przeglądarka wspiera localStorage
if (typeof(Storage) !== "undefined") {
    updateCartDisplay(); // Wywołaj funkcję do odświeżania zawartości koszyka
} else {
    // Jeśli przeglądarka nie obsługuje funkcji localStorage, poinformuj użytkownika
    alert("Twoja przeglądarka nie obsługuje funkcji localStorage, więc nie można wyświetlić zawartości koszyka.");
}
//dodaj cos takiego ze wyswietla sie koszt wszystkich rzeczy w koszyku
    

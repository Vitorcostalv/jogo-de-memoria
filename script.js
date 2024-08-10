document.getElementById('start-button').addEventListener('click', startGame);

let cards = [];
let flippedCards = [];
let matches = 0;
let level = 1;

function startGame() {
    document.getElementById('message').textContent = '';
    matches = 0;
    flippedCards = [];
    cards = generateCards(level);
    renderBoard();
}

function generateCards(level) {
    const totalCards = level * 4;
    const cardValues = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
    return shuffle([...cardValues, ...cardValues]);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${Math.sqrt(cards.length)}, 1fr)`;
    cards.forEach((value, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = value;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard(event) {
    const cardElement = event.target;
    const value = cardElement.dataset.value;
    const index = cardElement.dataset.index;

    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
        cardElement.classList.add('flipped');
        cardElement.textContent = value;
        flippedCards.push({ value, index });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.value === secondCard.value) {
        document.querySelector(`[data-index="${firstCard.index}"]`).classList.add('hidden');
        document.querySelector(`[data-index="${secondCard.index}"]`).classList.add('hidden');
        matches++;
        if (matches === cards.length / 2) {
            levelUp();
        }
    } else {
        setTimeout(() => {
            document.querySelector(`[data-index="${firstCard.index}"]`).classList.remove('flipped');
            document.querySelector(`[data-index="${firstCard.index}"]`).textContent = '';
            document.querySelector(`[data-index="${secondCard.index}"]`).classList.remove('flipped');
            document.querySelector(`[data-index="${secondCard.index}"]`).textContent = '';
        }, 1000);
    }
    flippedCards = [];
}

function levelUp() {
    level++;
    if (level > 3) {
        document.getElementById('message').textContent = 'Parabéns! Você completou todos os níveis!';
        level = 1;
    } else {
        document.getElementById('message').textContent = `Nível ${level}`;
        startGame();
    }
}

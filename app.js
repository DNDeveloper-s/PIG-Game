/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dicePrvs, finalScore = 100;
init();

document.querySelector('.finalScore').addEventListener('keyup', function () {
    finalScore = document.querySelector('.finalScore').value;

    init();
    return finalScore;
})

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice_an = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        var dice_anDOM = document.querySelector('.dice_an');

        diceDOM.style.display = 'block';
        dice_anDOM.style.display = 'block';

        diceDOM.src = 'dice-' + dice + '.png';
        dice_anDOM.src = 'dice-' + dice_an + '.png';

        // Looses score if 6 counts to two
        if (/* dicePrvs === 6 && dice === 6 */ dice === 6 && dice_an === 6 ) {
            console.log("its two times six counted");
            //Looses his entire score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            changePlayer();

        } else {
            // 3. Update the round score IF the rolled number was Not a 1
            if (dice !== 1 && dice_an !== 1) {
                // Add to the round Score
                roundScore += dice + dice_an;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                console.log('Player-' + (activePlayer + 1) + ' has got one on one of two dices');
                // Change the Player
                changePlayer();
            }
        }

        // dicePrvs = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Update the score to Global Score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Winner Declaration 
        if (scores[activePlayer] >= finalScore) {
            //Update the winner
            document.getElementById('name-' + activePlayer).textContent = 'winner';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice_an').style.display = 'none';
            gamePlaying = false;
        } else {
            // Change the Player
            changePlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);


function changePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice_an').style.display = 'none';
}

function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice_an').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
//Star Wars RPG
let attacker, defender = {}; // Temp var to hold selected chars
let playerSelected, defenderSelected = false; // to verify states
let characters = {
    rey: {
        id: "rey",
        name: "Rey",
        hitPoints: 120,
        attackPower: 10,
        counterAttack: 38,
        imageSrc: "assets/images/rey.png"
    },
    kylo: {
        id: "kylo",
        name: "Kylo Ren",
        hitPoints: 220,
        attackPower: 6,
        counterAttack: 29,
        imageSrc: "assets/images/kylo.png"
    },
    snoke: {
        id: "snoke",
        name: "Supreme Leader Snoke",
        hitPoints: 100,
        attackPower: 14,
        counterAttack: 46,
        imageSrc: "assets/images/snoke.png"
    },
    chewbacca: {
        id: "chewbacca",
        name: "Chewbacca",
        hitPoints: 280,
        attackPower: 8,
        counterAttack: 18,
        imageSrc: "assets/images/chewbacca.png"
    }
}

$(document).ready(function () {
    //     function newGame() {
    //         attacker,
    //         defender = {};
    //         playerSelected,
    //         defenderSelected = false;
    //         $('.attack-button').prop('disabled', false);
    //         $('.defender-section').empty();
    //         $('.enemy-selection').empty();
    //         $('.attack-wrapper').empty();
    //         $(".character-selection").children('.character').empty();

    //   }

    // Runs each character of the array and calls the print function to display it
    for (var x in characters) {
        printCharacter(characters[x]);
    }

    function printCharacter(elem) {

        newDiv = $('<div>');
        newImg = $('<img src="' + elem.imageSrc + '">');
        newDiv.addClass('character');
        newDiv.append(newImg);
        newDiv.append('<div>' + elem.name + '</div>');
        newDiv.append('<div class="hitpoints"> HP: ' + elem.hitPoints + '</div>');
        newDiv.attr('id', elem.id);
        $('.character-selection').append(newDiv);
    }

    //Event listener to choose character
    $('.character').on('click', function () {
        
        if (playerSelected && !defenderSelected && attacker.id !== this.id) {
            defender = characters[this.id];
            defenderSelected = true;
            printDefender(defender);
        }

        if (!playerSelected) {
            attacker = characters[this.id];
            playerSelected = true;
            $('.text').remove();
            $('.character-selection').prepend(' <span class="text char-text">Attacker</span>');
            $('#' + this.id).attr('id', 'attacker');
            printEnemies(attacker);
        }
    })
    // Moves character to enemy section
    function printEnemies(player) {
        $('.enemy-selection').html('<span class="text char-text">Enemy Selection </span>');
        for (var x in characters) {
            if (player.id !== characters[x].id) {
                let $changeChar = $('#' + characters[x].id);
                $changeChar.appendTo($('.enemy-selection'));
                $changeChar.addClass('enemy');
            }
        }
    }
    // Moves selected character to defender section
    function printDefender(defender) {
        $('.defender-section').html('<span class="text char-text">Defender </span>');
        let $changeChar = $('#' + defender.id);
        $changeChar.appendTo('.defender-section');
        $changeChar.attr('id', 'defender');
    }
    //Calculates attack and counters and displays mesage
    function attackFunction() {
        defender.hitPoints -= attacker.attackPower;
        attacker.attackPower += attacker.attackPower;
        attacker.hitPoints -= defender.counterAttack;
        //console.log(attacker.attackPower);
        $('#attack-msg').text('You attacked for: ' + attacker.attackPower);
        $('#defender').children('.hitpoints').text('HP: ' + defender.hitPoints);
        $('#counter-msg').text(defender.name + ' counter attack for: ' + defender.counterAttack);
        $('#attacker').children('.hitpoints').text('HP: ' + attacker.hitPoints);

        if (defender.hitPoints <= 0) {
            //$('#finish-msg').text(defender.name + ' was killed!');
            $('.defender').detach();
            defenderSelected = false;
            printDefender(defender);
        }
        if (attacker.hitPoints <= 0) {
            $('#finish-msg').text('You Died! Press restart to play again');
            $('#attack-button').prop('disabled', true);
        }
    }
    //Event listener for attack  and reset button
    $('button').on('click', function () {
        if (this.id === 'attack-button' && playerSelected && defenderSelected && attacker.hitPoints > 0) {
            attackFunction();
        }
        if (this.id === 'reset-button') {
            newGame();
        }
    })
})
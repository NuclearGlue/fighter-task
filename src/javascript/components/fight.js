import { updateHealth } from './arena';

export async function fight(firstFighter, secondFighter) {
    const initialFirstHealth = firstFighter.health;
    const initialSecondHealth = secondFighter.health;

    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const pressedKeys = new Set();
        document.addEventListener('keydown', event => {
            pressedKeys.add(event.key);
            handleKeyPress(event);
        });

        function handleKeyPress() {
            if (pressedKeys.has('a') && !firstFighter.isBlocking) {
                performAttack(firstFighter, secondFighter);
            } else if (pressedKeys.has('d')) {
                performBlock(firstFighter);
            } else if (pressedKeys.has('j') && !secondFighter.isBlocking) {
                performAttack(secondFighter, firstFighter);
            } else if (pressedKeys.has('l')) {
                performBlock(secondFighter);
            } else if (pressedKeys.has('q') && pressedKeys.has('w') && pressedKeys.has('e')) {
                secondFighter.health -= firstFighter.attack * 2;
                checkFightEnd();
            } else if (pressedKeys.has('u') && pressedKeys.has('i') && pressedKeys.has('o')) {
                firstFighter.health -= secondFighter.attack * 2;
                checkFightEnd();
            }

            document.addEventListener('keyup', event => {
                pressedKeys.delete(event.key);
            });
        }

        function performAttack(attacker, defender) {
            if (!defender.isBlocking) {
                const damage = getHitPower(attacker);
                defender.health -= damage;
            } else {
                const damage = getDamage(attacker, defender);
                defender.health -= damage;
            }
            checkFightEnd();
        }

        function performBlock(fighter) {
            fighter.isBlocking = true;
            setTimeout(() => {
                fighter.isBlocking = false;
            }, 500);
        }

        function checkFightEnd() {
            updateHealth(
                (firstFighter.health / initialFirstHealth) * 100,
                (secondFighter.health / initialSecondHealth) * 100
            );

            if (firstFighter.health < 1 || secondFighter.health < 1) {
                document.removeEventListener('keydown', event => {
                    pressedKeys.add(event.key);
                    handleKeyPress(event);
                });

                const winner = firstFighter.health > 0 ? firstFighter : secondFighter;
                resolve(winner);
            } else {
            }
        }
    });
}

export function getHitPower(fighter) {
    // return hit power
    const criticalHitChance = Math.floor(Math.random() * 2) + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    // return block power
    const dodgeChance = Math.floor(Math.random() * 2) + 1;
    return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    // return damage
    const damage = getHitPower(attacker) - getBlockPower(defender);
    if (damage >= 0) {
        return damage;
    }
    return 0;
}

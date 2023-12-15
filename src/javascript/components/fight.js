import { updateHealth } from './arena';

export async function fight(firstFighter, secondFighter) {
    const initialFirstHealth = firstFighter.health;
    const initialSecondHealth = secondFighter.health;

    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const pressedKeys = new Set();

        firstFighter.isBlocking = false;
        secondFighter.isBlocking = false;

        document.addEventListener('keydown', event => {
            pressedKeys.add(event.key);
            handleCriticalHit(event);
        });

        document.addEventListener('keyup', event => {
            handleBlockRelease(event);
            pressedKeys.delete(event.key);
        });

        document.addEventListener('keydown', event => {
            pressedKeys.add(event.key);
            handleKeyPress(event);
        });

        function handleCriticalHit(event) {
            if (pressedKeys.has('q') && pressedKeys.has('w') && pressedKeys.has('e')) {
                secondFighter.health -= firstFighter.attack * 2;
            } else if (pressedKeys.has('u') && pressedKeys.has('i') && pressedKeys.has('o')) {
                firstFighter.health -= secondFighter.attack * 2;
            }
            checkFightEnd();
        }

        function handleKeyPress(event) {
            if (pressedKeys.has('a') && !firstFighter.isBlocking) {
                performAttack(firstFighter, secondFighter);
            } else if (pressedKeys.has('d')) {
                performBlock(firstFighter);
            } else if (pressedKeys.has('j') && !secondFighter.isBlocking) {
                performAttack(secondFighter, firstFighter);
            } else if (pressedKeys.has('l')) {
                performBlock(secondFighter);
            }
        }

        function performAttack(attacker, defender) {
            if (defender.isBlocking) {
                defender.health -= 0;
            } else {
                const damage = getDamage(attacker, defender);
                defender.health -= damage;
            }
            checkFightEnd();
        }

        function performBlock(fighter) {
            if (!fighter.isBlocking) {
                fighter.isBlocking = true;
            }
        }

        function handleBlockRelease(event) {
            if (event.key === 'd') {
                firstFighter.isBlocking = false;
            } else if (event.key === 'l') {
                secondFighter.isBlocking = false;
            }
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
    const criticalHitChance = Math.random() + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    // return block power
    const dodgeChance = Math.random() + 1;
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

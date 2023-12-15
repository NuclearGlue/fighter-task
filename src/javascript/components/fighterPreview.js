import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    const content = `
    <img src="${fighter.source}" alt="${fighter.name}">
    <h2>${fighter.name}</h2>
    <ul>
    <li>Health:${fighter.health}</li>
    <li>Attack:${fighter.attack}</li>
    <li>Defense:${fighter.defense}</li>
    </ul>
    `;

    fighterElement.innerHTML += content;
    // todo: show fighter info (image, name, health, etc.)

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

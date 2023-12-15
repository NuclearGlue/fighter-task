import createElement from '../../helpers/domHelper';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    const title = `${fighter.name} Wins!`;
    const bodyElement = createElement({
        tagName: 'img',
        className: 'modal-image',
        attributes: {
            src: fighter.source,
            alt: fighter.name
        }
    });

    showModal({ title, bodyElement });
}

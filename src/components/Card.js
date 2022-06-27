import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  onCardDeleteButtonClick,
  onCardLikeButtonClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleDeleteButtonClick = () => {
    onCardDeleteButtonClick(card);
  };

  const handleLikeButtonClick = () => {
    onCardLikeButtonClick(card);
  };

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button" : "element__delete-button_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : "element__like-button"
  }`;

  return (
    <div className="element">
      <img
        src={`${card.link}`}
        className="element__image"
        alt={`${card.name}`}
        onClick={handleCardClick}
      />
      <div className="element__main">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeButtonClick}
          ></button>
          <h3 className="element__number-of-like">{card.likes.length}</h3>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label=""
        onClick={handleDeleteButtonClick}
      ></button>
    </div>
  );
}

export default Card;

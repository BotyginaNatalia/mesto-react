import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__edit-avatar">
          <img
            src={currentUser.avatar}
            alt="портрет Кусто"
            className="profile__image"
          />

          <button
            type="button"
            className="profile__avatar-edit-button"
            aria-label="Редактировать аватар"
            onClick={props.onEditAvatar}
          ></button>
        </div>

        <div className="profile__main">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements" aria-label="Фото">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardDeleteButtonClick={props.onCardDeleteButtonClick}
            onCardLikeButtonClick={props.onCardLikeButtonClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;

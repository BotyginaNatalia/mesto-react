import React, { useState, useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, addCards] = useState([]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
  };

  /** add/remove likes */

  const handleCardLikeButtonClick = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          addCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          addCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  /** delete my cards */

  const handleDeleteButtonClick = (card) => {
    api
      .deleteMyCard(card._id)
      .then(() => {
        addCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => console.log(err));
  };

  /** update user info */

  function handleUpdateUser(data) {
    api
      .changeProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  /** update avatar pic */

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  /** add new cards */

  function handleUpdateCard(data) {
    api
      .addNewCard(data)
      .then((res) => {
        addCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    Promise.all([api.getOriginalProfileInfo(), api.getOriginalCards()])
      .then(([allProfileInfo, allCardsInfo]) => {
        setCurrentUser(allProfileInfo);
        addCards(allCardsInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardDeleteButtonClick={handleDeleteButtonClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLikeButtonClick={handleCardLikeButtonClick}
        />

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
        />

        <AddPlacePopup
          onUpdateCard={handleUpdateCard}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

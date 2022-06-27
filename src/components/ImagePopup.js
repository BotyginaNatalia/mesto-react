import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_pic ${card ? "popup_opened" : ""}`}>
      <div className="popup__pic">
        <button className="popup__close popup__close-button_pic" type="button" aria-label="Закрыть" onClick={onClose} />
        <form className="popup__container popup__container_pic" name="popupImg" action="openFullImage">
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <h2 className="popup__title popup__title_pic">{card ? card.name : ""}</h2>
        </form>
      </div>
    </div>
  );
}

export default ImagePopup;
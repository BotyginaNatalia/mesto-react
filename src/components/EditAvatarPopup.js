import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const userAvatar = useRef();

  useEffect(() => {
    userAvatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      ["inputAvatar"]: userAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popupAvatar"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <form
        className="popup__container popup__container_avatar"
        name="popupAvatar"
        action="changeAvatar"
        noValidate
      >
        <input
          id="input-avatar"
          type="url"
          name="inputAvatar"
          className="popup__info popup__info_avatar"
          placeholder="Ссылка"
          required
          ref={userAvatar}
        />

        <span className="popup__span-error input-avatar-error"></span>
      </form>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

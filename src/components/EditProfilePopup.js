import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [userName, addUserName] = useState("");
  const [userDescription, addUserDescription] = useState("");

  useEffect(() => {
    addUserName(currentUser.name);
    addUserDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeProfileName(evt) {
    addUserName(evt.target.value);
  }

  function handleChangeProfileDescription(evt) {
    addUserDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      ["inputName"]: userName,
      ["inputJob"]: userDescription,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popupInfo"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <form
        className="popup__container popup__container_profile"
        name="popupInfo"
        action="editProfile"
        noValidate
      >
        <input
          id="input-name"
          type="text"
          name="inputName"
          className="popup__info popup__info_name_active"
          value={userName || ""}
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeProfileName}
        />

        <span className="popup__span-error input-name-error"></span>

        <input
          id="input-job"
          type="text"
          name="inputJob"
          className="popup__info popup__info_job_active"
          value={userDescription || ""}
          placeholder="Род деятельности"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeProfileDescription}
        />

        <span className="popup__span-error input-job-error"></span>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [imgTitle, addImgTitle] = useState("");
  const [imgForm, addImgForm] = useState("");

  useEffect(() => {
    addImgTitle("");
    addImgForm("");
  }, [props.isOpen]);

  function handleChangeImgTitle(evt) {
    addImgTitle(evt.target.value);
  }

  function handleChangeImgForm(evt) {
    addImgForm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateCard({
      ["inputPlace"]: imgTitle,
      ["inputLink"]: imgForm,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="editProfile"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <form
        className="popup__container popup__container_add"
        name="popupPlace"
        action="editItem"
        noValidate
      >
        <input
          id="input-place"
          type="text"
          name="inputPlace"
          className="popup__info popup__info_item"
          value={imgTitle}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChangeImgTitle}
        />

        <span className="popup__span-error input-place-error"></span>

        <input
          id="input-link"
          type="url"
          name="inputLink"
          className="popup__info popup__info_link"
          value={imgForm}
          placeholder="Ссылка"
          required
          onChange={handleChangeImgForm}
        />

        <span className="popup__span-error input-link-error"></span>
      </form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

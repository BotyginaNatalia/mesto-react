import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  button,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__main">
        <button
          className={`popup__close-button popup__close-button_${name}`}
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <form
          className={`popup__container popup__container_${name}`}
          name={name}
          action=""
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>

          {children}

          <button
            className={`popup__submit-button popup__submit-button_${name}`}
            type="submit"
            aria-label=""
          >
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

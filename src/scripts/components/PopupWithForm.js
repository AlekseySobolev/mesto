import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = document.querySelector('.popup__submit-form');
    }

    _getInputValues() {
        this._inputList = this.popup.querySelectorAll('.popup__text-field');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }


    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close(event);
        });
    }

    close(event) {
        this._form.reset();
        super.close();
    }
}
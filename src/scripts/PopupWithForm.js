import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this.popupSelector.querySelectorAll('.popup__text-field');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }


    setEventListeners() {
        super.setEventListeners();
        this.popupSelector.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close(event);
        });
    }

    close(event) {
        if(event !== undefined){event.target.reset();}
        super.close();
    }
}
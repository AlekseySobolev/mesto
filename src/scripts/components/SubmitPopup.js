import { Popup } from "./Popup.js";

export class SubmitPopup extends Popup {

    constructor(popup) {
        super(popup);
        this._form = popup.querySelector('.popup__submit-form');
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitCallback();
        });
    }

    setConfirmHandler(submitCallback){
        this._submitCallback = submitCallback;
    }
}
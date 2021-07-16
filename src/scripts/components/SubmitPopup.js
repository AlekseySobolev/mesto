import { Popup } from "./Popup.js";

export class SubmitPopup extends Popup {

    constructor(popup) {
        super(popup);
        //this._submitCallback = submitCallback;
        this._form = document.querySelector('.popup__submit-form');
        //this._button =  this._form.querySelector('.popup__submit-btn');
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
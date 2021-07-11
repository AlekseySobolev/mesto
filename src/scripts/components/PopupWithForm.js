import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = document.querySelector('.popup__submit-form');
        this._button =  this._form.querySelector('.popup__submit-btn');
    }

    _getInputValues() {
        
        this._inputList = this.popup.querySelectorAll('.popup__text-field');
        this._formValues = {};
        if (this._inputList.length){
            this._inputList.forEach(input => {
                this._formValues[input.name] = input.value;
            });
        }
            this._formValues._userId = this._userId;
       
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            //this.close();
        });
    }
    open(userId){
        this._userId = userId;
        //this._card = card;
        super.open();
    }
    close() {
        this._form.reset();
        super.close();
    }

    updateLoadInfo(button){
        this._button = button;              
    }
    getForm(){
        return this._form;
    }
}
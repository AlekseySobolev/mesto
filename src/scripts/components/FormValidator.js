export class FormValidator {
    constructor(validationObject, form) {
        this._validationObject = validationObject;
        //this._form = form;
        this._form = document.querySelector(form);
    }
    _checkInputValidity(inputElement){
        const isNotInputElementValid = !inputElement.validity.valid;
        if(isNotInputElementValid){
            const errorMessage = inputElement.validationMessage; 
            this._showInputError(inputElement, errorMessage);        
        }else{
            this._hideInputError(inputElement);
        }
    
    }
    _showInputError(inputElement, errorMessage){
 
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationObject.errorClass);
        inputElement.classList.add(this._validationObject.inputErrorClass);
    }
    _hideInputError(inputElement){
     
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    
        errorElement.textContent = "";
        errorElement.classList.remove(this._validationObject.errorClass);
        inputElement.classList.remove(this._validationObject.inputErrorClass);
    }

    _toggleSubmitBtn(inputList, buttonElement){
        const hasNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

        if(hasNotValidInput){
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._validationObject.inactiveButtonClass);
        }else{
            buttonElement.removeAttribute('disabled', true);
            buttonElement.classList.remove(this._validationObject.inactiveButtonClass);
        }
    }


    _setEventListeners() {
        this._form.addEventListener(('submit'), (event) => {
            event.preventDefault();
        });

        const inputList = Array.from(this._form.querySelectorAll(this._validationObject.InputSelector));

        const buttonElement = this._form.querySelector(this._validationObject.submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (event) => {
                this._checkInputValidity(inputElement);
                this._toggleSubmitBtn(inputList, buttonElement);
           });
       });

        this._toggleSubmitBtn(inputList, buttonElement);

    }
    enableValidation() {
        this._setEventListeners();
    }
}
export class FormValidator {
    constructor(validationObject, form) {
        this._validationObject = validationObject;
        this._form = form;

    }
    _checkInputValidity(formElement, inputElement, validationObject){
        const isNotInputElementValid = !inputElement.validity.valid;
        if(isNotInputElementValid){
            const errorMessage = inputElement.validationMessage; 
            this._showInputError(formElement, inputElement, errorMessage, validationObject);        
        }else{
            this._hideInputError(formElement, inputElement, validationObject);
        }
    
    }
    _showInputError(formElement, inputElement, errorMessage, validationObject){
 
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
        errorElement.textContent = errorMessage;
        errorElement.classList.add(validationObject.errorClass);
        inputElement.classList.add(validationObject.inputErrorClass);
    }
    _hideInputError(formElement, inputElement, validationObject){
     
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
        errorElement.textContent = "";
        errorElement.classList.remove(validationObject.errorClass);
        inputElement.classList.remove(validationObject.inputErrorClass);
    }

    _toggleSubmitBtn(inputList, buttonElement, validationObject){
        const hasNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

        if(hasNotValidInput){
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(validationObject.inactiveButtonClass);
        }else{
            buttonElement.removeAttribute('disabled', true);
            buttonElement.classList.remove(validationObject.inactiveButtonClass);
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
                this._checkInputValidity(this._form, inputElement, this._validationObject);
                this._toggleSubmitBtn(inputList, buttonElement, this._validationObject);
           });
       });

        this._toggleSubmitBtn(inputList, buttonElement, this._validationObject);

    }
    enableValidation() {
        this._setEventListeners();
    }
}
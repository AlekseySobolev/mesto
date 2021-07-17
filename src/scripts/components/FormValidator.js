export class FormValidator {
    constructor(validationObject, form) {
        this._validationObject = validationObject;
        //this._form = document.querySelector(form);
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._validationObject.InputSelector));
        this._buttonElement = this._form.querySelector(this._validationObject.submitButtonSelector);

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

    _toggleSubmitBtn(){
        const hasNotValidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);

        if(hasNotValidInput){
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._validationObject.inactiveButtonClass);
        }else{
            this._buttonElement.removeAttribute('disabled', true);
            this._buttonElement.classList.remove(this._validationObject.inactiveButtonClass);
        }
    }


    _setEventListeners() {
        this._form.addEventListener(('submit'), (event) => {
            event.preventDefault();
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (event) => {
                this._checkInputValidity(inputElement);
                this._toggleSubmitBtn();
           });
       });
        this._toggleSubmitBtn();
    }

    
    enableValidation() {
        this._setEventListeners();
    }

    resetValidation(){

        this._toggleSubmitBtn(); 

        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement) 
        });
    }
}
const showInputError = (formElement, inputElement, errorMessage, validationObject)=>{
 
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationObject.errorClass);
    inputElement.classList.add(validationObject.inputErrorClass);
};
const hideInputError = (formElement, inputElement, validationObject)=>{
     
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = "";
    errorElement.classList.remove(validationObject.errorClass);
    inputElement.classList.remove(validationObject.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, validationObject) => {
    const isNotInputElementValid = !inputElement.validity.valid;
    if(isNotInputElementValid){
        const errorMessage = inputElement.validationMessage; 
        showInputError(formElement, inputElement, errorMessage, validationObject);        
    }else{
        hideInputError(formElement, inputElement, validationObject);
    }

};

const toggleSubmitBtn = (inputList, buttonElement, validationObject) => {
    
    const hasNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);

    if(hasNotValidInput){
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(validationObject.inactiveButtonClass);
    }else{
        buttonElement.removeAttribute('disabled', true);
        buttonElement.classList.remove(validationObject.inactiveButtonClass);
    }
};

const setEventListeners = (formElement, validationObject) => {
    formElement.addEventListener(('submit'), (event) =>{
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(validationObject.InputSelector));

    const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (event) => {
            checkInputValidity(formElement, inputElement, validationObject);
            toggleSubmitBtn(inputList, buttonElement, validationObject);    
        });
    });
    if(formElement.name === 'popup-card-form'){
        toggleSubmitBtn(inputList, buttonElement, validationObject); 
    }
    
};

const enableValidation = (validationObject) => {


    const formList = Array.from(document.querySelectorAll(validationObject.formSelector));

    formList.forEach((form) => setEventListeners(form, validationObject));

};

enableValidation({
    formSelector:         '.popup__submit-form',
    InputSelector:        '.popup__text-field',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass:  'popup__submit-btn_unactive',
    inputErrorClass:      'popup__text-field_type_error',
    errorClass:           'popup__input-error_active'
});
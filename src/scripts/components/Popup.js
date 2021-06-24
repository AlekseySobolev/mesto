export class Popup{
   
    constructor(popupSelector){
        this.popup =  document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(event){
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open(){
        document.addEventListener('keydown', this._handleEscClose);
        this.popup.classList.add('popup_opened');
    }
    close(){
        this._inputList = this.popup.querySelectorAll('.popup__text-field');
        this._inputList.forEach(input => {
               input.value = '';
            });
        document.removeEventListener('keydown', this._handleEscClose);
        this.popup.classList.remove('popup_opened');
    }

    setEventListeners(){

        this.popup.addEventListener('click', (event) =>{
            if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-btn')){
                this.close();
            }            
        });
    }
}
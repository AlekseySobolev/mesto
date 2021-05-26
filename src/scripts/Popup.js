export class Popup{
   
    constructor(popupSelector){
        this.popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(event){
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open(){
        this.popupSelector.classList.add('popup_opened');

    }
    close(){
        this.popupSelector.classList.remove('popup_opened');
    }

    setEventListeners(){

        document.addEventListener('keydown', this._handleEscClose);

        this.popupSelector.addEventListener('click', (event) =>{
            if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-btn')){
                this.close();
            }            
        });
    }
}
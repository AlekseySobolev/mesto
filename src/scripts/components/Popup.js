export class Popup{
   
    constructor(popup){
       this.popup = popup;
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
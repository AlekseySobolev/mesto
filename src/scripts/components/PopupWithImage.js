import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    
    constructor(popup){
        super(popup);
        super.setEventListeners();
    }    

    open(link, name){
        this.popup.querySelector('.popup__img').src = link;
        this.popup.querySelector('.popup__img').alt = name;
        this.popup.querySelector('.popup__img-desc').textContent = name;
        super.open();
    }
    
}
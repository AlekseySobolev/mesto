import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    
    constructor(popupSelector){
        super(popupSelector);
        super.setEventListeners();
    }    

    open(link, name){
        this.popupSelector.querySelector('.popup__img').src = link;
        this.popupSelector.querySelector('.popup__img-desc').alt = name;
        this.popupSelector.querySelector('.popup__img-desc').textContent = name;
        super.open();
    }
    
}
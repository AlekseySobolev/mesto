import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    
    static selectors = {
        img: '.popup__img',
        desc: '.popup__img-desc'
    }

    constructor(popup){
        super(popup);
        super.setEventListeners();
    }    
    
    open(link, name){
        this.popup.querySelector(PopupWithImage.selectors.img).src = link;
        this.popup.querySelector(PopupWithImage.selectors.img).alt = name;
        this.popup.querySelector(PopupWithImage.selectors.desc).textContent = name;
        super.open();
    }
    
}
import {openPreviewModal} from './index.js';
export class Card{

    static selectors = {
        likeBtn:  '.element__like-btn',
        likeBtnActive:  'element__like-btn_active',
        trashBtn: '.element__trash-btn',
        picBtn:   '.element__pic',
        picName:  '.element__pic-name' 
    }
    constructor(cardObj, cardSelector){
        this._name = cardObj.name;
        this._link = cardObj.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate(){
        const cardElement = this._cardSelector.cloneNode(true);
        return cardElement;
   }
   
    _setEventListeners(){

        this.element.querySelector(Card.selectors.likeBtn).addEventListener('click', () => {
            this._handleLikeBtnClick();
        });

        this.element.querySelector(Card.selectors.trashBtn).addEventListener('click', () => {
            this._handleTrashBtnClick();
        });

        this.element.querySelector(Card.selectors.picBtn).addEventListener('click', () => {
            this._handleImageClick();
       });

    }
    
    _handleLikeBtnClick(){
        this.element.querySelector(Card.selectors.likeBtn).classList.toggle(Card.selectors.likeBtnActive);
    }

    _handleTrashBtnClick(){
        this.element.remove();
    }

    _handleImageClick(){
        openPreviewModal(this._link, this._name);    
    }

    generateCard(){

        this.element = this._getTemplate();
        this._setEventListeners();

        this.element.querySelector(Card.selectors.picBtn).src = this._link;
        this.element.querySelector(Card.selectors.picBtn).alt = this._name;

        this.element.querySelector(Card.selectors.picName).textContent = this._name;

        return this.element;
    }
}

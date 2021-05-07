import {openPreviewModalTest} from './index.js';
export class Card{

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

        this.element.querySelector('.element__like-btn').addEventListener('click', () => {
            this._handleLikeBtnClick();
        });

        this.element.querySelector('.element__trash-btn').addEventListener('click', () => {
            this._handleTrashBtnClick();
        });

        this.element.querySelector('.element__pic').addEventListener('click', () => {
            this._handleImageClick();
       });

    }
    
    _handleLikeBtnClick(){
        this.element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
    }

    _handleTrashBtnClick(){
        this.element.remove();
    }

    _handleImageClick(){
        openPreviewModalTest(this._link, this._name);    
    }


    generateCard(){

        this.element = this._getTemplate();
        this._setEventListeners();

        this.element.querySelector('.element__pic').src = this._link;
        this.element.querySelector('.element__pic').alt = this._name;

        this.element.querySelector('.element__pic-name').textContent = this._name;

        return this.element;
    }
}

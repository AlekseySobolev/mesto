export class Card{

    static selectors = {
        likeBtn:  '.element__like-btn',
        likeBtnActive:  'element__like-btn_active',
        trashBtn: '.element__trash-btn',
        trashBtnUnactive: 'element__trash-btn_unactive',
        picBtn:   '.element__pic',
        picName:  '.element__pic-name',
        likeQantity: '.element__like-quantity' 
    }
    constructor(cardObj, handleCardClick){
        this._name = cardObj.element.name;
        this._link = cardObj.element.link;
        this._cardTemplate = cardObj.elementTemplate;
        this._id = cardObj.element._id;
        this._cardOwnerId = cardObj.element.owner._id;
        this._handleCardClick = handleCardClick;
        this.handleLikeClick = cardObj.handleLikeClick;
        this.handleDeleteClick = cardObj.handleDeleteClick;
        this._qantity = cardObj.element.likes.length;
        this._likes = cardObj.element.likes;
        this._userId = cardObj.userId;
        
    }

    _getTemplate(){
        const cardElement = this._cardTemplate.cloneNode(true);
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
        //this.element.querySelector(Card.selectors.likeBtn).classList.toggle(Card.selectors.likeBtnActive);
        this.handleLikeClick();
    }

    _handleTrashBtnClick(){
        //this._handleDeleteCardClick(this._cardObj); 
        this.handleDeleteClick();
    }

    _handleImageClick(){ 
        this._handleCardClick(this._link, this._name);  
    }

    generateCard(){

        this.element = this._getTemplate();
        this._setEventListeners();

        this.element.querySelector(Card.selectors.picBtn).src = this._link;
        this.element.querySelector(Card.selectors.picBtn).alt = this._name;
        this.element.querySelector(Card.selectors.likeQantity).textContent = this._qantity;
        if (this._cardOwnerId !== this._userId){
            this.element.querySelector(Card.selectors.trashBtn).classList.add(Card.selectors.trashBtnUnactive); 
        }
        const likedCard = this._likes.find( obj => obj._id === this._userId);
        if (likedCard !== undefined){
            this.element.querySelector(Card.selectors.likeBtn).classList.add(Card.selectors.likeBtnActive);
        }
        this.element.querySelector(Card.selectors.picName).textContent = this._name;

        return this.element;
    }

    deleteCard(){
         this.element.remove();    
    }

   isLiked(){
     const card = this._likes.find((obj) => obj._id === this._userId);
     if(card === undefined){
         return false;
     }else{
         return true;
     }

   }
   updateLikes(isLiked, likes){
    if(isLiked){
      
      this.element.querySelector(Card.selectors.likeBtn).classList.remove(Card.selectors.likeBtnActive);
      this._qantity--;
      this.element.querySelector(Card.selectors.likeQantity).textContent = this._qantity;
      //-1
    }
    else{
      this.element.querySelector(Card.selectors.likeBtn).classList.add(Card.selectors.likeBtnActive);    
      this._qantity++;
      this.element.querySelector(Card.selectors.likeQantity).textContent = this._qantity;
      //+1
    }
    this._likes = likes;
   }
}

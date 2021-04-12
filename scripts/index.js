let popup            = document.querySelector('.popup');
let popupForm        = document.querySelector('.popup__form');
let popupCardForm    = document.querySelector('.popup__card-form');
let popupImgForm     = document.querySelector('.popup__img-form');
let author           = document.querySelector('.profile__author');
let authorSubline    = document.querySelector('.profile__author-subline');

let editBtn   = document.querySelector('.profile__edit-btn');
let addBtn   = document.querySelector('.profile__add-btn');
let closeBtn  = document.querySelectorAll('.popup__close-btn');
let likeBtn   = document.querySelectorAll('.element__like-btn');

let authorElement = document.getElementById('authorElement');
let userName      = document.getElementById('UserName');

const isEvent = false;
const sectionElements = document.querySelector('.elements');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  elementTemplate     = document.querySelector('.elementTemplate').content.querySelector('.element');

   initialCards.forEach(item => {
    insertElementItem(item,  false);  
 });

 articleElement = document.querySelectorAll('.element');

function openPopup(evt){  
      popup.classList.add('popup_opened') 

    if(evt.currentTarget === editBtn){
        popupCardForm.classList.remove('popup__card-form_opened');
        popupImgForm.classList.remove('popup__img-form_opened');
        popupForm.classList.add('popup__form_opened');
        
        authorElement.value         = author.textContent;
        userName.value              = authorSubline.textContent;
    }
    else if(evt.currentTarget === addBtn){
       popupForm.classList.remove('popup__form_opened');
        popupImgForm.classList.remove('popup__img-form_opened');
        popupCardForm.classList.add('popup__card-form_opened');
    }
    
}

function closePopup(){ 

  popup.classList.remove('popup_opened'); 
  //popupForm.classList.remove('popup__form_opened');
  //popupCardForm.classList.remove('popup__card-form_opened');
  //popupImgForm.classList.remove('popup__img-form_opened');

}

function formSubmitHandler(event){
    event.preventDefault();
    author.textContent         =  authorElement.value; 
    authorSubline.textContent  =  userName.value; 
    closePopup();
}

function cardFormSubmitHandler(event){
  event.preventDefault();
  newElement = {};
  newElement.name = popupCardForm.querySelector('#cardName').value;
  newElement.link = popupCardForm.querySelector("#cardLink").value;
  insertElementItem(newElement, true);
}

function toggleLikeBtn(likeElement){
  likeElement.classList.toggle('element__like-btn_active');
}

function insertElementItem (item, isEvent){

  element                        = elementTemplate.cloneNode(true);
  elementPicture                 = element.querySelector('.element__pic');
  elementPicture.src             = item.link;
  elementPicture.alt             = item.name;
  elementPictureName             = element.querySelector('.element__pic-name');
  elementPictureName.textContent = item.name;

  if(isEvent){
    sectionElements.prepend(element);
  }
  else{
    sectionElements.append(element);
  } 
  closePopup();
}

function deleteElementItem(elementForDelete){
  elementForDelete.remove();
}

function showElementItem(evt){
  
  elementImg     = popupImgForm.querySelector('.popup__img');
  elementText    = popupImgForm.querySelector('.popup__img-desc');

  elementImg.src          =  evt.currentTarget.querySelector('.element__pic').currentSrc;
  elementText.textContent = evt.currentTarget.querySelector('.element__pic-name').textContent;

  popupForm.classList.remove('popup__form_opened');
  popupCardForm.classList.remove('popup__card-form_opened');

  popup.classList.add('popup_opened'); 
  popupImgForm.classList.add('popup__img-form_opened');
  
}

function ElementItemAction(evt){
  
  if(evt.target.classList.contains('element__pic')){//если картинку открываем окно
    showElementItem(evt);
  }

  else if(evt.target.classList.contains('element__like-btn')){//если лайк меняем изображение лайка
    toggleLikeBtn(evt.target); 
  }

  else if(evt.target.parentElement.classList.contains('element__trash-btn')){//если корзину - удаляем
    deleteElementItem(evt.currentTarget); 
  }
}
//подписки на события
popupForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', cardFormSubmitHandler);
editBtn.addEventListener('click', openPopup);
addBtn.addEventListener('click', openPopup);
closeBtn.forEach((item) => item.addEventListener('click',closePopup));
likeBtn.forEach((item) => item.addEventListener('click',toggleLikeBtn));
articleElement.forEach((item) => item.addEventListener('click',ElementItemAction));

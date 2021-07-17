import './index.css';   
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { SubmitPopup } from '../scripts/components/SubmitPopup.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { validationObj } from '../scripts/utils/validationObj.js';
import { Card } from '../scripts/components/Card.js';
import { Api } from '../scripts/components/Api.js';

import {profileModalOpenBtn, cardModalOpenBtn, editAvatarModalOpenBtn,
  profileModal, editAvatarModal, cardModal, deleteCardModal, sectionElements, elementTemplate} from '../scripts/utils/constants.js';

const section = new Section({ items: [], renderer: createCard }, sectionElements);
//modals
const popupProfile = new PopupWithForm(profileModal, submitProfileModal);
const profileModalFormValidation = new FormValidator(validationObj, profileModal);

const popupEditAvatar = new PopupWithForm(editAvatarModal, submitEditAvatarModal);
const еditAvatarModalFormValidation = new FormValidator(validationObj, editAvatarModal);

const popupcard = new PopupWithForm(cardModal, submitCardModal);
const cardModalFormValidation = new FormValidator(validationObj, cardModal);
const popupPreview = new PopupWithImage(document.querySelector('.popup-preview'));

const popupDeleteCardModal = new SubmitPopup(deleteCardModal);

const uInf = new UserInfo({ userName: '.profile__author', userInfo: '.profile__author-subline', userAvatar: '.profile__avatar'});

//апи работы с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'e7b232ea-4aa9-4978-9c59-7bfa1612d130',
    'Content-Type': 'application/json'
  }
});

let userId ='';
 Promise.all([api.getUserInfo(), api.getInitialCards()])
 .then(([user, cards]) => {
  userId  = user._id;
  //1.Загрузка информации о пользователе с сервер
    uInf.setUserInfo({name: user.name, info: user.about, avatar: user.avatar});
  //2.Загрузка информации о пользователе с сервера
    section.renderItems(cards, userId);
 })
 .catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

profileModalFormValidation.enableValidation(); 
popupProfile.setEventListeners();
еditAvatarModalFormValidation.enableValidation();
popupEditAvatar.setEventListeners();

popupcard.setEventListeners();
popupDeleteCardModal.setEventListeners();
cardModalFormValidation.enableValidation();  

function openProfileModal() {  
  const currentUserInfo = uInf.getUserInfo();
  profileModalFormValidation.resetValidation();
  document.querySelector('#authorElement').value = currentUserInfo.name; 
  document.querySelector('#UserName').value = currentUserInfo.info; 
  popupProfile.open(); 
} 

function openAvatarModal() {  
  const currentUserInfo = uInf.getUserInfo(); 
  еditAvatarModalFormValidation.resetValidation();
  document.querySelector('#avatarLink').value = currentUserInfo.avatar; 
  popupEditAvatar.open(); 
  
} 

function openCardModal() { 
  cardModalFormValidation.resetValidation();
  popupcard.open(userId); 
} 

//
function submitProfileModal(formValues) {
  popupProfile.setButtonTextContent('Сохранение...');
  const profileData = { name: formValues.inputForm1, info: formValues.inputForm2 };
  //3.Редактирование профиля
  api.updateProfile(profileData)
  .then((result) => {
    uInf.setUserInfo({name: result.name, info: result.about, avatar: result.avatar});
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() =>{
    popupProfile.setButtonTextContent('Сохранить');
  });
}

function submitCardModal(formValues) {

  const element = {};

  element.name = formValues.inputForm1;
  element.link = formValues.inputForm2;
  element.likes = [];
  element.owner = {};
  element.owner._id = formValues._userId;

  //4.Добавление новой карточки
  popupcard.setButtonTextContent('Сохранение...');
  api.addCard(element)
  .then((result) => {
    section.addItem(createCard(result, formValues._userId));
    popupcard.close(); 
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() =>{
    popupcard.setButtonTextContent('Сохранить');
  });
}

function submitEditAvatarModal(formValues){
  
  popupEditAvatar.setButtonTextContent('Сохранение...');
  api.updateAvatar(formValues.inputForm1)
  .then((result) => {
    uInf.setUserInfo({name: result.name, info: result.about, avatar: result.avatar});
    popupEditAvatar.close(); 
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() =>{   
    popupEditAvatar.setButtonTextContent('Сохранить');
  });
}

function createCard(element, userId, likes) {
  const card = new Card({
    element, 
    userId, 
    elementTemplate,
    likes,
    handleLikeClick: () => {
      const isLiked = card.isLiked();
        api.changeLikeCardStatus(card._id,  isLiked)
        //обновить страницу и количество лайков
        .then((result) =>{
          card.updateLikes(isLiked, result.likes);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });    
    },
    handleDeleteClick: () =>{
      popupDeleteCardModal.setConfirmHandler(() => {
        api.deleteCard(card.getId())
        .then(() =>{
          card.deleteCard();
          popupDeleteCardModal.close();
      })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      });
      popupDeleteCardModal.open();
    }
  }, 
    (cardSrc, cardText) => {
    popupPreview.open(cardSrc, cardText);
  });
  return card.generateCard();
}

//подписки на события 
profileModalOpenBtn.addEventListener('click', () => openProfileModal()); 
cardModalOpenBtn.addEventListener('click', () => openCardModal());
editAvatarModalOpenBtn.addEventListener('click', () => openAvatarModal()); 

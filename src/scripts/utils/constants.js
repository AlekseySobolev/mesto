import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationObj } from './validationObj.js';
//import {initialCards} from './InitialCards.js'; 
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';

//buttons 
export const profileModalOpenBtn = document.querySelector('.profile__edit-btn');
export const editAvatarModalOpenBtn = document.querySelector('.profile__edit-avatar-btn');
export const cardModalOpenBtn = document.querySelector('.profile__add-btn');
export const deleteCardModalOpenBtn = document.querySelectorAll('.element__trash-btn');
export const sectionElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.elementTemplate').content.querySelector('.element');

//апи работы с сервером
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'e7b232ea-4aa9-4978-9c59-7bfa1612d130',
    'Content-Type': 'application/json'
  }
});
//1.Загрузка информации о пользователе с сервера
export const profileSection = document.querySelector('.profile__content');
export const profileAuthor = profileSection.querySelector('.profile__author');
export const profileSubline = profileSection.querySelector('.profile__author-subline');
export const profileAvatar = profileSection.querySelector('.profile__avatar');

export const section = new Section({ items: [], renderer: createCard }, sectionElements);
//modals
const profileModal = '.popup-profile';
export const popupProfile = new PopupWithForm(profileModal, submitProfileModal);
export const profileModalFormValidation = new FormValidator(validationObj, profileModal);

const editAvatarModal = '.popup-edit-avatar';
export const popupEditAvatar = new PopupWithForm(editAvatarModal, submitEditAvatarModal);
export const EditAvatarModalFormValidation = new FormValidator(validationObj, editAvatarModal);

const cardModal = '.popup-card';
export const popupcard = new PopupWithForm(cardModal, submitCardModal);
export const cardModalFormValidation = new FormValidator(validationObj, cardModal);
const popupPreview = new PopupWithImage('.popup-preview');

const deleteCardModal = '.popup-delete-card';
export const popupDeleteCardModal = new PopupWithForm(deleteCardModal, submitDeleteCardModal);
//
export const uInf = new UserInfo({ userName: '.profile__author', userInfo: '.profile__author-subline' });
export const objUserInfo = uInf.getUserInfo();

function submitProfileModal(formValues) {

  const textContent = document.querySelector('.popup__form').querySelector('.popup__submit-btn').textContent;
  document.querySelector('.popup__form').querySelector('.popup__submit-btn').textContent = "Сохранение...";

  const profileData = { name: formValues.inputForm1, info: formValues.inputForm2 };
  uInf.setUserInfo(profileData);
  //3.Редактирование профиля
  api.updateProfile(profileData)
  .finally(() =>{
    popupProfile.close();
    document.querySelector('.popup__form').querySelector('.popup__submit-btn').textContent = textContent;
  });
}

function submitCardModal(formValues) {

  const element = {};

  element.name = formValues.inputForm1;
  element.link = formValues.inputForm2;
  element.likes = [];
  element.owner = {};
  element.owner._id = formValues._userId;

  section.addItem(createCard(element, formValues._userId));
  //4.Добавление новой карточки
  const textContent = document.querySelector('.popup__card-form').querySelector('.popup__submit-btn').textContent;
  document.querySelector('.popup__card-form').querySelector('.popup__submit-btn').textContent = "Сохранение...";
  api.addCard(element)
  .finally(() =>{
    popupcard.close();
    document.querySelector('.popup__card-form').querySelector('.popup__submit-btn').textContent = textContent;
  });
}

function submitDeleteCardModal(card) {
  api.deleteCard(card._Id);
}

function submitEditAvatarModal(formValues){
  
  const textContent = document.querySelector('.popup__edit-avatar-form').querySelector('.popup__submit-btn').textContent;
  document.querySelector('.popup__edit-avatar-form').querySelector('.popup__submit-btn').textContent = "Сохранение...";

  api.updateAvatar(formValues.inputForm1)
  .then((result) => {
    profileAvatar.src = result.avatar;
  })
  .finally(() =>{
    popupEditAvatar.close(); 
    document.querySelector('.popup__edit-avatar-form').querySelector('.popup__submit-btn').textContent = textContent;    
  });

  

}

export function createCard(element, userId, likes) {
  const card = new Card({
    element, 
    userId, 
    elementTemplate,
    likes,
    handleLikeClick: () => {
      
      //определить состояние лайкнута мной или нет
      const isLiked = card.isLiked();
      if(isLiked){//если лайкнута
      api.likeOff(card._id)
      //обновить страницу и количество лайков
      .then((result) =>{
        card.updateLikes(isLiked, result.likes);
      });
      }else{
        api.likeOn(card._id)
        //обновить страницу и количество лайков
        .then((result) =>{
          card.updateLikes(isLiked, result.likes);
        });
      }
    },
    handleDeleteClick: () =>{
      card.deleteCard();
    }
  }, 
    (cardSrc, cardText) => {
    popupPreview.open(cardSrc, cardText);
  });
  return card.generateCard();
}

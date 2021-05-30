import './index.css'; 
import {initialCards} from '../scripts/utils/InitialCards.js';
import {validationObj} from '../scripts/utils/validationObj.js';
import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
//modals
const profileModal = '.popup-profile';
const popupProfile = new PopupWithForm(profileModal, submitProfileModal);
const profileModalFormValidation = new FormValidator(validationObj, profileModal);
profileModalFormValidation.enableValidation();
popupProfile.setEventListeners();

const cardModal = '.popup-card';
const popupcard = new PopupWithForm(cardModal, submitCardModal);
popupcard.setEventListeners();
const cardModalFormValidation = new FormValidator(validationObj, cardModal);
//cardModalFormValidation.enableValidation();

const popupPreview = new PopupWithImage('.popup-preview');
const uInf = new UserInfo({userName: '.profile__author', userInfo: '.profile__author-subline'});
//buttons
const profileModalOpenBtn = document.querySelector('.profile__edit-btn');
const cardModalOpenBtn = document.querySelector('.profile__add-btn');
const sectionElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.elementTemplate').content.querySelector('.element');

//отрисовка изначального массива карточек
const section = new Section({items: initialCards, renderer: createCard}, sectionElements);
section.renderItems();

function submitProfileModal(formValues) {
  uInf.setUserInfo({name:formValues.inputForm1, info:formValues.inputForm2});
}

function submitCardModal(formValues) {
 
  const element = {};
  element.name  =  formValues.inputForm1;
  element.link  =   formValues.inputForm2;

  section.addItem(createCard(element));
}

function openProfileModal() {
  const objUserInfo = uInf.getUserInfo();
  document.querySelector('#authorElement').value = objUserInfo.name;
  document.querySelector('#UserName').value = objUserInfo.info;
  popupProfile.open();
}

function openCardModal() {
  cardModalFormValidation.enableValidation();
 popupcard.open();
}

function createCard(element) {
  const card = new Card(element, elementTemplate, (cardSrc,cardText) =>{
    popupPreview.open(cardSrc, cardText);
  });
  return card.generateCard();
}
//подписки на события
profileModalOpenBtn.addEventListener('click', () => openProfileModal());
cardModalOpenBtn.addEventListener('click', () => openCardModal());

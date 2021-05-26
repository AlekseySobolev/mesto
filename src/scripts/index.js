import '../pages/index.css'; 
import {initialCards} from './InitialCards.js';
import {validationObj} from './validationObj.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
//modals
const profileModal = document.querySelector('.popup-profile');
const popupProfile = new PopupWithForm(profileModal, submitProfileModal);
const profileModalFormValidation = new FormValidator(validationObj, profileModal);
profileModalFormValidation.enableValidation();
popupProfile.setEventListeners();

const cardModal = document.querySelector('.popup-card');
const popupcard = new PopupWithForm(cardModal, submitCardModal);
popupcard.setEventListeners();
const cardModalFormValidation = new FormValidator(validationObj, cardModal);
cardModalFormValidation.enableValidation();

const previewModal = document.querySelector('.popup-preview');
const popupPreview = new PopupWithImage(previewModal);

const author = document.querySelector('.profile__author').textContent;
const authorSubline = document.querySelector('.profile__author-subline').textContent;
const uInf = new UserInfo({userName: author, userInfo: authorSubline});
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
  profileModal.querySelector('#authorElement').value = objUserInfo.name;
  profileModal.querySelector('#UserName').value = objUserInfo.info;
  popupProfile.open();
}

function openCardModal() {
 popupcard.open();
}

function createCard(element) {
  const card = new Card(element, elementTemplate, (cardSrc,cardText) =>{
    popupPreview.open(cardSrc, cardText);
  });
  return card.generateCard();
}
//подписки на события
profileModalOpenBtn.addEventListener('click', () => openProfileModal(profileModal));
cardModalOpenBtn.addEventListener('click', () => openCardModal(cardModal));

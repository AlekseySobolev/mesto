import {FormValidator} from '../components/FormValidator.js'; 
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';  
import {validationObj} from './validationObj.js'; 
import {initialCards} from './InitialCards.js'; 
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';

//modals
const profileModal = '.popup-profile'; 
export const popupProfile = new PopupWithForm(profileModal, submitProfileModal); 
export const profileModalFormValidation = new FormValidator(validationObj, profileModal);
const uInf = new UserInfo({userName: '.profile__author', userInfo: '.profile__author-subline'});

const cardModal = '.popup-card'; 
export const popupcard = new PopupWithForm(cardModal, submitCardModal);
export const cardModalFormValidation = new FormValidator(validationObj, cardModal);
const popupPreview = new PopupWithImage('.popup-preview'); 

//buttons 
export const profileModalOpenBtn = document.querySelector('.profile__edit-btn'); 
export const cardModalOpenBtn = document.querySelector('.profile__add-btn'); 
const sectionElements = document.querySelector('.elements'); 
const elementTemplate = document.querySelector('.elementTemplate').content.querySelector('.element');

//отрисовка изначального массива карточек 
export const section = new Section({items: initialCards, renderer: createCard}, sectionElements);
export const objUserInfo = uInf.getUserInfo();

function submitProfileModal(formValues) { 
    uInf.setUserInfo({name:formValues.inputForm1, info:formValues.inputForm2}); 
  }

function submitCardModal(formValues) { 
  
    const element = {}; 
  
    element.name  =  formValues.inputForm1; 
    element.link  =   formValues.inputForm2; 
   
    section.addItem(createCard(element)); 
  } 

function createCard(element) { 
    const card = new Card(element, elementTemplate, (cardSrc,cardText) =>{ 
      popupPreview.open(cardSrc, cardText); 
    }); 
    return card.generateCard(); 
  } 
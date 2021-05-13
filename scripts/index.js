import {initialCards} from './InitialCards.js';
import {validationObj} from './validationObj.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//modals
const profileModal = document.querySelector('.popup-profile');
const cardModal = document.querySelector('.popup-card');
const cardModalFormValidation = new FormValidator(validationObj, cardModal);
cardModalFormValidation.enableValidation();
const previewModal = document.querySelector('.popup-preview');
const profileModalFormValidation = new FormValidator(validationObj, profileModal);
profileModalFormValidation.enableValidation();
//buttons
const profileModalOpenBtn = document.querySelector('.profile__edit-btn');
const profileModalCloseBtn = profileModal.querySelector('.popup__close-btn');
const cardModalOpenBtn = document.querySelector('.profile__add-btn');
const cardModalCloseBtn = cardModal.querySelector('.popup__close-btn');
const previewModalCloseBtn = previewModal.querySelector('.popup__close-btn');

const popupList = document.querySelectorAll('.popup');
const sectionProfile = document.querySelector('.profile');
const author = sectionProfile.querySelector('.profile__author');
const authorSubline = sectionProfile.querySelector('.profile__author-subline');
const authorElement = profileModal.querySelectorAll('.popup__text-field')[0];
const userName = profileModal.querySelectorAll('.popup__text-field')[1];

const sectionElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.elementTemplate').content.querySelector('.element');


function closeModal(modal) {
  document.removeEventListener('keydown', closeOnEsc);
  modal.classList.remove('popup_opened');
}

function openModal(modal) {
  document.addEventListener('keydown', closeOnEsc);
  modal.classList.add('popup_opened');

}

function submitProfileModal(event) {
  event.preventDefault();

  author.textContent        = authorElement.value;
  authorSubline.textContent = userName.value;

  event.target.reset();
  closeModal(profileModal);

}

function submitCardModal(event) {
  event.preventDefault();

  const element = {};
  element.name  = cardModal.querySelector('#cardName').value;
  element.link  = cardModal.querySelector("#cardLink").value;

  const card = new Card(element, elementTemplate);
  sectionElements.prepend(card.generateCard());

  event.target.reset();
  event.target.lastElementChild.classList.add('popup__submit-btn_unactive');
  closeModal(cardModal);

}

function openProfileModal(modal) {
  authorElement.value = author.textContent;
  userName.value      = authorSubline.textContent;
  openModal(modal);
}

function openCardModal(modal) {
  openModal(modal);
}

//function openPreviewModal(evt) {
 // const card     = evt.currentTarget.parentElement;
 // const cardSrc  = card.querySelector('.element__pic').currentSrc;
 // const cardText = card.querySelector('.element__pic-name').textContent;

 // const elementImg  = previewModal.querySelector('.popup__img');
 // const elementText = previewModal.querySelector('.popup__img-desc');

 // elementImg.src          = cardSrc;
 // elementText.textContent = cardText;
 // elementImg.alt          = cardText; 

  //openModal(previewModal);
//}

export function openPreviewModal(cardSrc, cardText) {
  
  const elementImg  = previewModal.querySelector('.popup__img');
  const elementText = previewModal.querySelector('.popup__img-desc');

  elementImg.src          = cardSrc;
  elementImg.alt          = cardText;

  elementText.textContent = cardText;
  
  openModal(previewModal);
}

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    popupList.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closeModal(popup);
      }
    });
  }
}

function closeOnOverley(event) {
  if (event.target.classList.contains('popup_opened')) {
    closeModal(event.target);
  }
}

function createCard(element) {
  const card = new Card(element, elementTemplate);
  sectionElements.append(card.generateCard());
}
//подписки на события
profileModal.addEventListener('submit', submitProfileModal);
profileModal.addEventListener('click', closeOnOverley);
profileModalOpenBtn.addEventListener('click', () => openProfileModal(profileModal));
profileModalCloseBtn.addEventListener('click', () => closeModal(profileModal));

cardModalOpenBtn.addEventListener('click', () => openCardModal(cardModal));
cardModalCloseBtn.addEventListener('click', () => closeModal(cardModal));
cardModal.addEventListener('submit', submitCardModal);
cardModal.addEventListener('click', closeOnOverley);

previewModal.addEventListener('click', closeOnOverley);
previewModalCloseBtn.addEventListener('click', () => closeModal(previewModal));

// генерируем карточки
initialCards.forEach(element => {
  createCard(element);
});

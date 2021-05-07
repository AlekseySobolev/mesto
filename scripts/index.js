import {initialCards} from './InitialCards.js';
import {validationObj} from './validationObj.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//modals
const profileModal = document.querySelector('.popup-profile');
const cardModal = document.querySelector('.popup-card');
const cardModalFormValidation = new FormValidator(validationObj, cardModal);
const previewModal = document.querySelector('.popup-preview');
const profileModalFormValidation = new FormValidator(validationObj, profileModal);
//buttons
const ProfileModalOpenBtn = document.querySelector('.profile__edit-btn');
const ProfileModalCloseBtn = profileModal.querySelector('.popup__close-btn');
const CardModalOpenBtn = document.querySelector('.profile__add-btn');
const CardModalCloseBtn = cardModal.querySelector('.popup__close-btn');
const PreviewModalCloseBtn = previewModal.querySelector('.popup__close-btn');

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

function SubmitCardModal(event) {
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
  profileModalFormValidation.enableValidation();
  authorElement.value = author.textContent;
  userName.value      = authorSubline.textContent;
  openModal(modal);
}

function openCardModal(modal) {
  cardModalFormValidation.enableValidation();
  openModal(modal);
}

function openPreviewModal(evt) {
  const card     = evt.currentTarget.parentElement;
  const cardSrc  = card.querySelector('.element__pic').currentSrc;
  const cardText = card.querySelector('.element__pic-name').textContent;

  const elementImg  = previewModal.querySelector('.popup__img');
  const elementText = previewModal.querySelector('.popup__img-desc');

  elementImg.src          = cardSrc;
  elementText.textContent = cardText;
  elementImg.alt          = cardText; 

  openModal(previewModal);
}

export function openPreviewModalTest(cardSrc, cardText) {
  
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

//подписки на события
profileModal.addEventListener('submit', submitProfileModal);
profileModal.addEventListener('click', closeOnOverley);
ProfileModalOpenBtn.addEventListener('click', () => openProfileModal(profileModal));
ProfileModalCloseBtn.addEventListener('click', () => closeModal(profileModal));

CardModalOpenBtn.addEventListener('click', () => openCardModal(cardModal));
CardModalCloseBtn.addEventListener('click', () => closeModal(cardModal));
cardModal.addEventListener('submit', SubmitCardModal);
cardModal.addEventListener('click', closeOnOverley);

previewModal.addEventListener('click', closeOnOverley);
PreviewModalCloseBtn.addEventListener('click', () => closeModal(previewModal));

// генерируем карточки
initialCards.forEach(element => {
    const card = new Card(element, elementTemplate);
    sectionElements.append(card.generateCard());
});

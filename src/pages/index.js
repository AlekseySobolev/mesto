import './index.css';   
import {popupProfile, profileModalFormValidation, popupcard, popupDeleteCardModal, cardModalFormValidation, profileModalOpenBtn, cardModalOpenBtn, editAvatarModalOpenBtn,
  popupEditAvatar, profileAuthor, profileSubline, profileAvatar, section, createCard, api, EditAvatarModalFormValidation} from '../scripts/utils/constants.js';

let userId ='';
 Promise.all([api.getUserInfo(), api.getInitialCards()])
 .then(([user, cards]) => {
  userId  = user._id;
  //1.Загрузка информации о пользователе с сервер
    profileAuthor.textContent = user.name;
    profileSubline.textContent = user.about;
    profileAvatar.src = user.avatar;
  
  //2.Загрузка информации о пользователе с сервера
    cards.forEach(element => {
    section.addItem(createCard(element, user._id, cards), element);
   });
 });

profileModalFormValidation.enableValidation(); 
popupProfile.setEventListeners();
EditAvatarModalFormValidation.enableValidation();
popupEditAvatar.setEventListeners();

popupcard.setEventListeners();
popupDeleteCardModal.setEventListeners();
cardModalFormValidation.enableValidation();  

function openProfileModal() {  
  
  profileModalFormValidation.resetValidation();
  document.querySelector('#authorElement').value = profileAuthor.textContent; 
  document.querySelector('#UserName').value = profileSubline.textContent; 
  popupProfile.open(); 
  
} 

function openAvatarModal() {  
   
  EditAvatarModalFormValidation.resetValidation();
  document.querySelector('#avatarLink').value = profileAvatar.src; 
  popupEditAvatar.open(); 
  
} 

function openCardModal() { 
  
  cardModalFormValidation.resetValidation();
  popupcard.open(userId); 

} 

//подписки на события 
profileModalOpenBtn.addEventListener('click', () => openProfileModal()); 
cardModalOpenBtn.addEventListener('click', () => openCardModal());
editAvatarModalOpenBtn.addEventListener('click', () => openAvatarModal()); 

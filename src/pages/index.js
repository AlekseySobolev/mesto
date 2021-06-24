import './index.css';   
import {popupProfile, profileModalFormValidation, popupcard, cardModalFormValidation, profileModalOpenBtn, cardModalOpenBtn, section, objUserInfo} from '../scripts/utils/constants.js';
 
profileModalFormValidation.enableValidation(); 
popupProfile.setEventListeners();  
popupcard.setEventListeners(); 
cardModalFormValidation.enableValidation();  
section.renderItems(); 

function openProfileModal() {  
  document.querySelector('#authorElement').value = objUserInfo.name; 
  document.querySelector('#UserName').value = objUserInfo.info; 
  popupProfile.open(); 
} 
 
function openCardModal() { 
  
  cardModalFormValidation.resetValidation();
  popupcard.open(); 

} 
//подписки на события 
profileModalOpenBtn.addEventListener('click', () => openProfileModal()); 
cardModalOpenBtn.addEventListener('click', () => openCardModal());
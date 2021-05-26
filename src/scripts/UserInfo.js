export class UserInfo{

    static selectors = {
        profileAuthor: '.profile__author',
        profileAuthorSubline: '.profile__author-subline' 
    }

    constructor({userName, userInfo}){
        this.userName = userName;
        this.userInfo = userInfo;
    }

    getUserInfo(){
        return {name: this.userName, info: this.userInfo};
    }
    setUserInfo({name, info}){
        document.querySelector(UserInfo.selectors.profileAuthor).textContent = name;
        document.querySelector(UserInfo.selectors.profileAuthorSubline).textContent = info;
    }
}
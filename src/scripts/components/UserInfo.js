export class UserInfo{

    constructor({userName, userInfo, userAvatar}){
        this.userName = document.querySelector(userName);
        this.userInfo = document.querySelector(userInfo);
        this.userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo(){
        return {name: this.userName.textContent, info: this.userInfo.textContent, avatar: this.userAvatar.src};
    }
    setUserInfo({name, info, avatar}){
        if(avatar !== undefined){this.userName.textContent = name;}
        if(avatar !== undefined){this.userInfo.textContent = info;}
        if(avatar !== undefined){this.userAvatar.src = avatar;}      
    }

}
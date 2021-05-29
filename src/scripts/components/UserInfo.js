export class UserInfo{

    constructor({userName, userInfo}){
        this.userName = document.querySelector(userName);
        this.userInfo = document.querySelector(userInfo);
    }

    getUserInfo(){
        return {name: this.userName.textContent, info: this.userInfo.textContent};
    }
    setUserInfo({name, info}){
        this.userName.textContent = name;
        this.userInfo.textContent = info;
    }

}
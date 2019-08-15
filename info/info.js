var bodyEle = document.querySelector('body')
console.log(bodyEle)

var name = 'hey';
var className = 'some';

bodyEle.insertAdjacentHTML('beforeend', `<div class="profile">
        <div class="profile__image">
            <img src="" alt="" class="profile__image--target">
        </div>
        <div class="profile__content">
            <div class="">
                <span>name : </span>
                <span class="profile__name--target">blabla name</span>
            </div>
            <div>
                <span>class : </span>
                <span class="profile__class--target">${className}</span>
            </div>
        </div>
    </div>`)
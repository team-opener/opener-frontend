const appInit = () => {
  fixHeader();
  switch(true) {
    case /index/.test(PATH):
      console.log('reg index');
      homePage();
      break;
    case /mypage/.test(PATH):
      console.log('reg mypage');
      mypagePage();
      break;
  }
}

// header 부분 스크롤 이벤트 
const fixHeader = () => {
  const target = document.querySelector("#targetHeader");
  const targetHeight = target.offsetHeight;

  window.addEventListener("scroll", function(e) {
    const scrollHeight = window.scrollY;
    if (scrollHeight > targetHeight) {
      target.classList.add("active");
    } else {
      target.classList.remove("active");
    }
  });
};

// home페이지에서 사용할 함수 
const homePage = () => {
  const itemList = document.querySelector('#itemList')
  fetch(BACK + '/user/info/all')
  .then( res => res.json())
  .then(data => {
    data.forEach((v, i, a) => {
      var path = BACK + v.profileImgPath
      const ITEM_CARD = `<li class="item card">
        <div class="profile-img">
          <img src="${path}" alt="profile-image" />
        </div>
        <div class="item-desc">
          <h3 class="user-name">${v.name}</h3>
          <p class="course-name">${v.course}</p>
          <p class="entry-time">${v.entryTime}</p>
        </div>
        </li>`
      itemList.insertAdjacentHTML('beforeend', ITEM_CARD)
    })
  })
}

// mypage페이지에서 사용할 함수 
const mypagePage = () => {
  fetch(BACK + '/user/info?name=Ingleby')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const ITEM_CARD = `<li class="item card">
        <div class="profile-img">
          <img src="${path}" alt="profile-image" />
        </div>
        <div class="item-desc">
          <h3 class="user-name">${v.name}</h3>
          <p class="course-name">${v.course}</p>
          <p class="entry-time">${v.entryTime}</p>
        </div>
        </li>`
  })
}

// application 초기화 
const PATH = window.location.pathname
const BACK = 'http://192.168.1.68:3000'
const ITEM_CARD = `<li class="item card">
<div class="profile-img">
  <img src="" alt="profile-image" />
</div>
<div class="item-desc">
  <h3 class="user-name">Snow</h3>
  <p class="course-name">Front-end${name}</p>
  <p class="entry-time">Entry Time</p>
</div>
</li>`
appInit()

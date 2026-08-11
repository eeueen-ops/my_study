const diaryArea = 
    `
    <div class="body__menu">
        <select class="filter__select">
            <option selected="true">전체</option>
            <option>행복해요</option>
            <option>슬퍼요</option>
            <option>놀랐어요</option>
            <option>화나요</option>
            <option>기타</option>
        </select>
        <div class="filter__search">
            <img src="./image/search_outline_light_m.png" class="filter__search__img">
            <input type="text" class="filter__search__text" placeholder="검색어를 입력하세요.">
        </div>
        <button class="menu__writebtn" id="diaryWrite" onclick="openModal('modalWrite')">+ 일기쓰기</button>
    </div>
    
    <div class="body__card__wrapper" id="card__wrapper">
        <div class="card" id="card" onclick="window.location.href='diary-detail.html' ">
            <img class="card__img" src="./image/1.png">
            <img class="card__img__delete" src="./image/close_outline_light_m.png" onclick="deleteCard(event)">
            <div class="card__content"></div>
        </div>
    </div>
    `;
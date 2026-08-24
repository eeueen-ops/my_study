const diaryArea = 
    `
    <div class="body__menu">
        <div class="dropdown__wrapper">
            <input type="checkbox" class="dropdown__title emotion" id="dropdownTitleEmotion">
                    <ul class="dropdown__list" id="dropdownList">
                        <li>
                            <input type="radio" name="emotionFilter" id="all" onclick="selectDropdownEmotion(event)">
                            <label for="all">전체</label>
                        </li>
                        <li>
                        <input type="radio" name="emotionFilter" id="happy" onclick="selectDropdownEmotion(event)">
                            <label for="happy">행복해요</label>
                        </li>
                        <li>
                            <input type="radio" name="emotionFilter" id="sad" onclick="selectDropdownEmotion(event)">
                            <label for="sad">슬퍼요</label>
                        </li>
                        <li>
                            <input type="radio" name="emotionFilter" id="surprised" onclick="selectDropdownEmotion(event)">
                            <label for="surprised">놀랐어요</label>
                        </li>
                        <li>
                            <input type="radio" name="emotionFilter" id="upset" onclick="selectDropdownEmotion(event)">
                            <label for="upset">화났어요</label>
                        </li>
                        <li>
                            <input type="radio" name="emotionFilter" id="etc" onclick="selectDropdownEmotion(event)">
                            <label for="etc">기타</label>
                        </li>
                    </ul>
        </div>
        <div class="filter__search">
            <img src="./image/search_outline_light_m.png" class="filter__search__img">
            <input type="text" class="filter__search__text" id="searchBox" placeholder="검색어를 입력하세요."
            oninput="search(event)">
        </div>
        <button class="menu__writebtn" id="diaryWrite" onclick="openModal('modalWrite')">+ 일기쓰기</button>
    </div>
    
    <div class="body__card__wrapper" id="cardWrapper"></div>

    <div class="page__tab" id="pageBtnWrapper">
        <button class="page__tab__move" id="pastPage" onclick="pastPage()"></button>
        <span class page__tab__number id="pageBtn"></span>
        <button class="page__tab__move" id="nextPage" onclick="nextPage()"></button>
    </div>
    `;



// 일기보관함 / 사진보관함 스위치
const switchTab = (tab) => {
    let diaryTab = document.getElementById("tabDiary")
    let photoTab = document.getElementById("tabPhoto")
    let componentArea = document.getElementById("componentArea")
    switch (tab) {
        case "1" :
            componentArea.innerHTML = diaryArea
            diaryTab.style = "color: #000000; border-bottom: 2px solid #000000;"
            photoTab.style = "color: #ABABAB; border: none;"
            break;
        case "2" :
            componentArea.innerHTML = photoArea
            photoTab.style = "color: #000000; border-bottom: 2px solid #000000;"
            diaryTab.style = "color: #ABABAB; border: none;"
            loadPhoto()
            break;
    }
}
// 드롭다운 감정
const selectDropdownEmotion = (event) => {
    const filterEmotion = document.querySelector(`label[for="${event.target.id}"]`).textContent;
    console.log(filterEmotion)

    document.getElementById("dropdownTitleEmotion").style = `--dropdownVariableEmotion: "${filterEmotion}"`;
    document.getElementById("dropdownTitleEmotion").click();
}

// 사진보관함 클릭 시 사진 불러오기
const loadPhoto = () => {
    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
        받아온결과.json().then((객체만뽑힌결과) => {
    
            const 이미지다운로드주소들 = 객체만뽑힌결과.message
            const 상태 = 객체만뽑힌결과.status
    
            document.getElementById("photoWrapper").innerHTML = 이미지다운로드주소들.map(el => `
                <img src="${el}" class="photos" id="photos" width="640px" />
            `).join("")
        })
    })
}
// 드롭다운 비율
const selectDropdownRatio = (event) => {
    const filterRatio = document.querySelector(`label[for="${event.target.id}"]`).textContent;
    console.log(filterRatio)

    document.getElementById("dropdownTitleRatio").style = `--dropdownVariableRatio: "${filterRatio}"`;
    document.getElementById("dropdownTitleRatio").click();
    
    const photoAspectRatio = () => {
        let photos = document.querySelectorAll('.photos')
        if (filterRatio === "기본형" ) {
            el.style.aspectRatio = "1 / 1"
        }
        if (filterRatio === "가로형" ) {
            elements.forEach(
                el => {
                    el.style.aspectRatio = "4 / 3"
                }
            )
        }
        if (filterRatio === "세로형" ) {
            el.photos.style.aspectRatio = "3 / 4"
        }
    
    }
    photoAspectRatio()
}
// 검색

// 무한스크롤 쓰로틀링

let timer = "stopped";

window.addEventListener('scroll', () => {


    if (timer !== "stopped") return

    timer = setTimeout (
        ()=> {
            timer = "stopped"
        }, 500)

    const scrollPercentage = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    if (scrollPercentage >= 0.7) {
        fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
            받아온결과.json().then((객체만뽑힌결과) => {
    
            document.getElementById("photoWrapper").innerHTML += `
            <img src="${객체만뽑힌결과.message}" class="photos" id="photos" width="640px;" /> `

            })
        }) 

    }
});



// 모달창 열기 닫기
const openModal = (modalType) => {
    document.getElementById(modalType).style.display= 'block'

} 
const closeModal = (modalType) => {
    document.getElementById(modalType).style.display= 'none'

} 
window.addEventListener('keydown', (event)=> {
    if (event.key === 'Escape' ) {
        closeModal('modalWrite')
        clearModalContent()
    }
} )
const modalBackground = document.getElementById('modalWrite');
modalBackground.addEventListener('click', (event) => {
    if (event.target === modalBackground) {
        closeModal('modalWrite');
    }
});

// 일기 작성 취소 시 모달창 내용 초기화
const clearModalContent = () => {
    document.getElementById("myTitle").value = null;
    document.getElementById("myContent").value = null;
    document.querySelectorAll('input[name="emotion"]').forEach((el) => {el.checked = false; })
}

// 일기 입력 시 등록 버튼 활성화
const activeSubmit = () => {
    let diaryTitle = document.getElementById("myTitle").value.trim();
    let diaryContent = document.getElementById("myContent").value.trim();
    let emotion = document.querySelector('input[name="emotion"]:checked').value;
    let submitBtn = document.getElementById("writeDiarySubmit");

    if (emotion && diaryTitle && diaryContent) {
        submitBtn.disabled = false;
        submitBtn.style.border = "1px solid #000000";
        submitBtn.style.backgroundColor = "#FFFFFF";
        submitBtn.style.color = "#1C1C1C";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.border = "none";
        submitBtn.style.backgroundColor = "#C7C7C7";
        submitBtn.style.color = "#F2F2F2";
    }
};


// 일기 등록 시 내용 저장
const storeDiary = () => {
    let diaryTitle = document.getElementById("myTitle").value.trim();
    let diaryContent = document.getElementById("myContent").value.trim();
    let diaryEmotion = document.querySelector('input[name="emotion"]:checked').value;
    const diary = {
        title: diaryTitle,
        content: diaryContent,
        emotion: diaryEmotion
    }
    const diaryList = JSON.parse(localStorage.getItem("newDiary")) || [];
    diaryList.push(diary);
    localStorage.setItem("newDiary", JSON.stringify(diaryList));

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML =
    `<img class="card__img" src="./image/1.png">
    <img class="card__img__delete" src="./image/close_outline_light_m.png" onclick="deleteCard(event)">
    <div class="card__content"></div>`
    container.appendChild(card__wrapper);
    
    const changeImg = () => {
        if (emotion === 1) {

        }
    }

    
};









// 일기 카드 삭제
const deleteCard = (event) => {
    event.stopPropagation();
    const card = document.getElementById("card");
    card.remove();


}
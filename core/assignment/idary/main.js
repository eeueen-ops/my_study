window.onload = () => {
    switchTab('1');
}
// 모달창 내용 초기화
const clearModalContent = () => {
    document.getElementById("myTitle").value = null;
    document.getElementById("myContent").value = null;
    document.querySelectorAll('input[name="emotion"]').forEach((el) => {el.checked = false; })
}

// 모달창 열기
const openModal = (modalType) => {
    document.getElementById(modalType).style.display= 'block'

} 
// 모달창 닫기
const closeModal = (modalType) => {
    clearModalContent()
    document.getElementById(modalType).style.display= 'none'
} 
// 모달창 전부 닫기
const closeModalAll = () => {
    clearModalContent();
    closeModal('modalWrite');
    closeModal('modalClose');
    closeModal('modalSubmit');
}
// esc로 모달 닫기
window.addEventListener('keydown', (event)=> {
    if (event.key === 'Escape' ) {
        closeModalAll()
    }
} )
// 배경 클릭해서 모달 닫기
const modalBackground = document.getElementById('modalWrite');
modalBackground.addEventListener('click', (event) => {
    if (event.target === modalBackground) {
        closeModalAll()
    }
});

// 일기 입력 시 등록 버튼 활성화
const activeSubmit = () => {
    let diaryTitle = document.getElementById("myTitle").value.trim();
    let diaryContent = document.getElementById("myContent").value.trim();
    let emotion = document.querySelector('input[name="emotion"]:checked');
    let submitBtn = document.getElementById("writeDiarySubmit");

    if (emotion && diaryTitle && diaryContent) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
};
// 일기 카드 영역
const cardWrapper = document.getElementById("cardWrapper")
// 기본 일기 목록
const sampleDiary = [
    { diaryId: 1, emotionValue: 2, emotion: "슬퍼요", date: "2026. 08. 12", title: "비가 와서 조금 울적했던 날", content: "비 오는 창밖을 보며 조용히 하루를 보냈다." },
    { diaryId: 2, emotionValue: 3, emotion: "놀랐어요", date: "2026. 08. 12", title: "친구가 깜짝 선물을 주었다", content: "생각하지 못한 선물을 받아서 정말 놀랐다." },
    { diaryId: 3, emotionValue: 4, emotion: "화나요", date: "2026. 08. 12", title: "버스를 눈앞에서 놓쳤다", content: "조금만 빨리 나올 걸 하는 생각이 들었다." },
    { diaryId: 4, emotionValue: 1,emotion: "행복해요", date: "2026. 08. 12", title: "좋아하는 사람들과 맛있는 저녁", content: "함께 이야기하고 웃어서 행복한 하루였다." },
    { diaryId: 5, emotionValue: 5, emotion: "기타", date: "2026. 08. 11", title: "오늘은 생각이 많았던 하루", content: "앞으로 하고 싶은 일을 천천히 정리해 보았다." },
    { diaryId: 6, emotionValue: 3, emotion: "놀랐어요", date: "2026. 08. 11", title: "갑자기 눈이 내리기 시작했다", content: "봄인 줄 알았는데 눈이 와서 신기했다." },
    { diaryId: 7, emotionValue: 4, emotion: "화나요", date: "2026. 08. 11", title: "할 일이 한꺼번에 몰려왔다", content: "하나씩 차근차근 해 보기로 마음먹었다." },
    { diaryId: 8, emotionValue: 1, emotion: "행복해요", date: "2026. 08. 11", title: "산책길에서 예쁜 꽃을 발견했다", content: "작은 꽃 덕분에 기분이 좋아졌다." },
    { diaryId: 9, emotionValue: 2, emotion: "슬퍼요", date: "2026. 08. 10", title: "기대했던 약속이 취소되었다", content: "아쉬웠지만 집에서 편안하게 쉬었다." },
    { diaryId: 10, emotionValue: 4, emotion: "화나요", date: "2026. 08. 10", title: "컴퓨터가 갑자기 멈춰 버렸다", content: "작성하던 글을 잃어서 속상했다." },
    { diaryId: 11, emotionValue: 1, emotion: "행복해요", date: "2026. 08. 10", title: "오랜만에 푹 쉬었던 일요일", content: "늦잠도 자고 좋아하는 영화도 보았다." }
];
// 일기보관함 사진보관함 스위치
const switchTab = (tab) => {
    let diaryTab = document.getElementById("tabDiary")
    let photoTab = document.getElementById("tabPhoto")
    let componentArea = document.getElementById("componentArea")
    switch (tab) {
        case "1" :
            componentArea.innerHTML = diaryArea
            loadDiaryList();
            createDiaryPage(1, diaryList);
            createPageButton(1, diaryList);
            diaryTab.style = "color: #000000; border-bottom: 2px solid #000000;"
            photoTab.style = "color: #ABABAB; border: none;"
            break;
        case "2" :
            componentArea.innerHTML = photoArea
            photoTab.style = "color: #000000; border-bottom: 2px solid #000000;"
            diaryTab.style = "color: #ABABAB; border: none;"
            break;
    }
}
// 드롭다운 emotion
const selectDropdownEmotion = (event) => {
    loadDiaryList();

    const filterEmotion = document.querySelector(`label[for="${event.target.id}"]`).textContent;

    document.getElementById("dropdownTitleEmotion").style = `--dropdownVariableEmotion: "${filterEmotion}"`;
    document.getElementById("dropdownTitleEmotion").click();
    
    const filteredList = diaryList.filter((diary) => {
        return diary.emotion === filterEmotion;
    });

    if (filterEmotion !== "전체") {

        if (filteredList.length === 0) {

            document.getElementById("cardWrapper").innerHTML = `
                <div class="card__none">등록된 일기가 없습니다.</div>
            `;

            document.getElementById("pageBtn").innerHTML = "";

            document.getElementById("pastPage").style.display = "none";
            document.getElementById("nextPage").style.display = "none";

        } else {

            document.getElementById("pastPage").style.display = "";
            document.getElementById("nextPage").style.display = "";

            lastPage = Math.ceil(filteredList.length / 8);
            firstPage = 1;

            createDiaryPage(1, filteredList);
            createPageButton(1, filteredList);
        }

    } else {

        document.getElementById("pastPage").style.display = "";
        document.getElementById("nextPage").style.display = "";

        lastPage = Math.ceil(diaryList.length / 8);
        firstPage = 1;

        createDiaryPage(1, diaryList);
        createPageButton(1, diaryList);
    }
};


// 보여줄 일기 목록 선택
let diaryList;
const loadDiaryList = () => {
    const myDiary = JSON.parse(localStorage.getItem("diaries"));
    if (myDiary === null) {
        diaryList = sampleDiary
    } else {
        diaryList = myDiary
    }
}
loadDiaryList()



let firstPage = 1
let lastPage = Math.ceil( diaryList.length / 8 );

// 이전페이지, 다음페이지 버튼
const pastPage = (diaryList) => {
    if (firstPage !== 1) {
        firstPage = firstPage - 5;
        createDiaryPage(firstPage, diaryList);
        createPageButton(firstPage, diaryList);
    }
}

const nextPage = (diaryList) => {
    if (firstPage + 5 <= lastPage) {
        firstPage = firstPage + 5;
        createDiaryPage(firstPage, diaryList);
        createPageButton(firstPage, diaryList);
    }
}

const createCard = (diary, index) => {
    return `
        <div class="card" onclick="window.location.href='./diary-detail.html?index=${index}'">
            <img class="card__img" src="./image/${diary.emotionValue}.png">
            <img class="card__img__delete" src="./image/close_outline_light_m.png" onclick="event.stopPropagation(); deleteCard('${diary.diaryId}');">
            <div class="card__content">
                <div class="card__content__subtitle">
                    <div class="card__content__subtitle__emotion">${diary.emotion}</div>
                    <div class="card__content__subtitle__date">${diary.date}</div>
                </div>
                <div class="card__content__title">${diary.title}</div>
            </div>
        </div>
    `
}

// 일기 페이지 생성 함수
const createDiaryPage = (clickedPage, diaryList) => {

    const cardWrapper = document.getElementById("cardWrapper");

    // 배열에 저장된 일기 없을 떄 일기없음문구출력
    if (diaryList.length === 0) {
        cardWrapper.innerHTML = `<div class="card__none">작성된 일기가 없습니다.</div>`;
        return;
    }

    // 현재 페이지에 보여줄 일기 8개씩 끊어서 필터
    const currentPageDiaryList = diaryList.filter((el, index) => {
        const skippedCardNum = (clickedPage - 1) * 8
        const skippedCardIndex = skippedCardNum - 1

        return skippedCardIndex < index && index <= skippedCardIndex + 8
    });

    // 카드 생성
    cardWrapper.innerHTML = currentPageDiaryList.map((diary, index) => {
        let prevIndex = (clickedPage - 1) * 8 + index;
        return createCard(diary, prevIndex);
    }).join("")
}

// 페이지 버튼 함수
const createPageButton = (clickedPage, diaryList) => {
    const buttonBox = new Array(5).fill("Btn");

    const pages = buttonBox.map((el, index) => {
        const pageNumber = firstPage + index;

        return pageNumber <= lastPage ? `
            <button
                class="${clickedPage === pageNumber ? "page__button__chosen" : ""} page__tab__button"
                data-page="${pageNumber}"
            >
                ${pageNumber}
            </button>
        ` : "";
    }).join("");

    document.getElementById("pageBtn").innerHTML = pages;

    document.querySelectorAll(".page__tab__button").forEach((button) => {
        button.addEventListener("click", () => {
            const pageNumber = Number(button.dataset.page);

            createDiaryPage(pageNumber, diaryList);
            createPageButton(pageNumber, diaryList);
        });
    });

    document.getElementById("pastPage").onclick = () => {
        pastPage(diaryList);
    };

    document.getElementById("nextPage").onclick = () => {
        nextPage(diaryList);
    };
}

// 일기 등록 시 내용 저장
const storeDiary = () => {
    // 다이어리 객체로 저장
    today = new Date()
    const newDiary = {
        diaryId: today,
        emotionValue: document.querySelector('input[name="emotion"]:checked').value,
        emotion: document.querySelector('input[name="emotion"]:checked').parentElement.textContent,
        date: today.getFullYear() + ". " + (today.getMonth() + 1) + ". " + today.getDate(),
        title: document.getElementById("myTitle").value.trim(),
        content: document.getElementById("myContent").value.trim()
    }
    // 기존에 있는 일기 객체들 myDiary 배열에 불러오기 없으면 빈 배열 불러오기
    const myDiary = JSON.parse(localStorage.getItem("diaries")) || [];
    // myDiary 배열에 newDiary 객체 추가하기
    myDiary.push(newDiary);
    // myDiary 배열을 문자열로 변환해 dairies키로 로컬스토리지에 저장하기
    localStorage.setItem("diaries", JSON.stringify(myDiary));
    diaryList = myDiary;
    createDiaryPage(lastPage, diaryList);
};

// 카드 삭제 함수
const deleteCard = (diaryId) => {

    const card = event.target.closest(".card");

    // 화면에서 카드 삭제
    card.remove();

    // 배열에서 객체 삭제
    diaryList = diaryList.filter((diary) => {
        return String(diary.diaryId) !== String(diaryId);
    });

    // 페이지 수 다시 계산
    lastPage = Math.ceil(diaryList.length / 8);

    // 로컬스토리지 저장
    localStorage.setItem("diaries", JSON.stringify(diaryList));

    // 다이어리 페이지 다시 생성
    createDiaryPage(1, diaryList);
}


// 다크모드
const toggle = document.querySelector(".toggle");

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        document.body.classList.add("darkMode");
    } else {
        document.body.classList.remove("darkMode");
    }
});









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
        let photos = document.querySelectorAll(".photos")
        if (filterRatio === "기본형" ) {
            photos.forEach(
                el => {
                    el.style.aspectRatio = "1 / 1"
                }
            )
        }
        if (filterRatio === "가로형" ) {
            photos.forEach(
                el => {
                    el.style.aspectRatio = "4 / 3"
                }
            )
        }
        if (filterRatio === "세로형" ) {
            photos.forEach(
                el => {
                    el.photos.style.aspectRatio = "3 / 4"
                }
            )
        }
    
    }
    photoAspectRatio()
}
let timer = "stopped";

window.addEventListener('scroll', () => {


    if (timer !== "stopped") return

    timer = setTimeout (
        ()=> {
            timer = "stopped"
        }, 500)

    const scrollPercentage = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    if (scrollPercentage >= 0.7) {
        fetch("https://dog.ceo/api/breeds/image/random").then((받아온결과) => { 
            받아온결과.json().then((객체만뽑힌결과) => {
    
            document.getElementById("photoWrapper").innerHTML += `
            <img src="${객체만뽑힌결과.message}" class="photos" id="photos" width="640px;" /> `

            })
        }) 

    }
});


// 일기보관함 / 사진보관함 스위치
const switchTab = (tab) => {
    let diaryTab = document.getElementById("tabDiary")
    let photoTab = document.getElementById("tabPhoto")
    let componentArea = document.getElementById("componentArea")
    switch (tab) {
        case "1" :
            componentArea.innerHTML = diaryArea
            createDiaryPage(firstPage)
            createPageButton(firstPage)
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
// 드롭다운 emotion
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


// 모달창 내용 초기화
const clearModalContent = () => {
    document.getElementById("myTitle").value = null;
    document.getElementById("myContent").value = null;
    document.querySelectorAll('input[name="emotion"]').forEach((el) => {el.checked = false; })
}

// 모달창 열기 닫기
const openModal = (modalType) => {
    document.getElementById(modalType).style.display= 'block'

} 
const closeModal = (modalType) => {
    clearModalContent()
    document.getElementById(modalType).style.display= 'none'
} 
const closeModalAll = () => {
    clearModalContent();
    closeModal('modalWrite');
    closeModal('modalClose');
    closeModal('modalSubmit');
}
window.addEventListener('keydown', (event)=> {
    if (event.key === 'Escape' ) {
        closeModalAll()
    }
} )
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


// // 일기 등록 시 내용 저장
// const storeDiary = () => {
//     let b = document.querySelector('input[name="emotion"]:checked').value;
//     let c = document.querySelector('input[name="emotion"]:checked').parentElement.textContent;
//     let e = document.getElementById("myTitle").value.trim();
//     let f = document.getElementById("myContent").value.trim();
//     const diary = {
//         emotionValue: b,
//         emotion: "c",
//         title: "e",
//         content: "f"
//     }
//     const myDiary = JSON.parse(localStorage.getItem("Diaries")) || [];
//     myDiary.push(diary);
//     localStorage.setItem("myDiary", JSON.stringify(newDiary));

    
// };


// 기본 일기 목록
const sampleDiary = [
    { diaryNum: 1, emotionValue: 2, emotion: "슬퍼요", diaryDate: "2026. 08. 12", title: "비가 와서 조금 울적했던 날", content: "비 오는 창밖을 보며 조용히 하루를 보냈다." },
    { diaryNum: 2, emotionValue: 3, emotion: "놀랐어요", diaryDate: "2026. 08. 12", title: "친구가 깜짝 선물을 주었다", content: "생각하지 못한 선물을 받아서 정말 놀랐다." },
    { diaryNum: 3, emotionValue: 4, emotion: "화나요", diaryDate: "2026. 08. 12", title: "버스를 눈앞에서 놓쳤다", content: "조금만 빨리 나올 걸 하는 생각이 들었다." },
    { diaryNum: 4, emotionValue: 1,emotion: "행복해요", diaryDate: "2026. 08. 12", title: "좋아하는 사람들과 맛있는 저녁", content: "함께 이야기하고 웃어서 행복한 하루였다." },
    { diaryNum: 5, emotionValue: 5, emotion: "기타", diaryDate: "2026. 08. 11", title: "오늘은 생각이 많았던 하루", content: "앞으로 하고 싶은 일을 천천히 정리해 보았다." },
    { diaryNum: 6, emotionValue: 3, emotion: "놀랐어요", diaryDate: "2026. 08. 11", title: "갑자기 눈이 내리기 시작했다", content: "봄인 줄 알았는데 눈이 와서 신기했다." },
    { diaryNum: 7, emotionValue: 4, emotion: "화나요", diaryDate: "2026. 08. 11", title: "할 일이 한꺼번에 몰려왔다", content: "하나씩 차근차근 해 보기로 마음먹었다." },
    { diaryNum: 8, emotionValue: 1, emotion: "행복해요", diaryDate: "2026. 08. 11", title: "산책길에서 예쁜 꽃을 발견했다", content: "작은 꽃 덕분에 기분이 좋아졌다." },
    { diaryNum: 9, emotionValue: 2, emotion: "슬퍼요", diaryDate: "2026. 08. 10", title: "기대했던 약속이 취소되었다", content: "아쉬웠지만 집에서 편안하게 쉬었다." },
    { diaryNum: 10, emotionValue: 4, emotion: "화나요", diaryDate: "2026. 08. 10", title: "컴퓨터가 갑자기 멈춰 버렸다", content: "작성하던 글을 잃어서 속상했다." },
    { diaryNum: 11, emotionValue: 1, emotion: "행복해요", diaryDate: "2026. 08. 10", title: "오랜만에 푹 쉬었던 일요일", content: "늦잠도 자고 좋아하는 영화도 보았다." }
];
// 보여줄 일기 목록 선택
let diaryList;
const loadDiaryList = () => {
    const myDiary = JSON.parse(localStorage.getItem("myDiary"));
    if (myDiary === null) {
        diaryList = sampleDiary
    } else {
        diaryList = myDiary
    }
}
loadDiaryList();
// 카드 한 장 생성
const createCard = (diary) => {
    return `
        <div class="card" onclick="window.location.href='diary-detail-${diary.diaryNum}.html'">
            <img class="card__img" src="./image/${diary.emotionValue}.png">
            <img class="card__img__delete" src="./image/close_outline_light_m.png" onclick="deleteCard(event)">
            <div class="card__content">
                <div class="card__content__subtitle">
                    <div class="card__content__subtitle__emotion">${diary.emotion}</div>
                    <div class="card__content__subtitle__date">${diary.diaryDate}</div>
                </div>
                <div class="card__content__title">${diary.title}</div>
            </div>
        </div>
        `
}
// // 일기 페이지 생성
// const createDiaryPage = (diaryList) => {
//     document.getElementById("cardWrapper").innerHTML = diaryList.map(diary => createCard(diary) ).join("")
// }



const createDiaryPage = (clickedPage) => {
    loadDiaryList();
    const currentPageDiaryList = diaryList.filter((el, index) => {
        const skippedCardNum = (clickedPage - 1) * 12
        const skippedCardIndex = skippedCardNum - 1

        return skippedCardIndex < index && index <= skippedCardIndex + 12
    });

    document.getElementById("cardWrapper").innerHTML = currentPageDiaryList.map(diary => createCard(diary) ).join("")
}

window.onload = () => {
    switchTab("1");
}


let firstPage = 1
const lastPage = Math.ceil(diaryList.length / 12);

const pastPage = () => {
    if ( firstPage !== 1 ) {
        firstPage = firstPage - 5;
        createDiaryPage(firstPage);
        createPageButton(clickedPage);
    }
}
const nextPage = () => {
    if (firstPage + 5 <= lastPage) {
        firstPage = firstPage + 5;
        createDiaryPage(firstPage);
        createPageButton(clickedPage);
    }
}  

// 페이지 버튼 생성하기
const createPageButton = (clickedPage) => {
    const buttonBox = new Array(5).fill("Btn")

    const pages = buttonBox.map((el, index) => {
        const pageNumber = clickedPage + index;

        return pageNumber <= lastPage ? `<button
            onclick="createDiaryPage(${pageNumber}); createPageButton(${pageNumber});"
            class="${clickedPage === pageNumber ? "page__button__chosen" : ""} page__tab__button"
        >
            ${pageNumber}
        </button>` : ""
    }).join("")

    document.getElementById("pageBtnWrapper").innerHTML = pages
}




// 일기 카드 삭제
const deleteCard = (event) => {
    event.stopPropagation();
    const card = event.target.closest

    // const card = document.getElementById("card");

    card.remove();
}
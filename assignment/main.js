


const switchTab = (tab) => {
    let diaryTab = document.getElementById("tabDiary")
    let photoTab = document.getElementById("tabPhoto")
    let componentArea = document.getElementById("componentArea")
    switch (tab) {
        case "1" :
            componentArea.innerHTML = diaryArea
            diaryTab.style = "color: #000000; borderBottom: 2px solid #000000;"
            photoTab.style = "color: #ABABAB; border: none;"
            break;
        case "2" :
            componentArea.innerHTML = photoArea
            photoTab.style = "color: #000000; borderBottom: 2px solid #000000;"
            diaryTab.style = "color: #ABABAB; border: none;"
            loadPhoto()
            break;
    }
}

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

const photoAspectRatio = () => {
    let ratio = document.getElementById("selectRatio").value
    let photos = document.getElementById("photos")
    if (ratio === "기본" ) {
        photos.style.aspectRatio = "1 / 1"
    }
    if (ratio === "가로형" ) {
        photos.style.aspectRatio = "4 / 3"
    }
    if (ratio === "세로형" ) {
        photos.style.aspectRatio = "3 / 4"
    }

}

const openModal = (modalType) => {
    document.getElementById(modalType).style.display= 'block'

} 
const closeModal = (modalType) => {
    document.getElementById(modalType).style.display= 'none'

} 
const clearModalContent = () => {
    let input1 = document.getElementById("diaryTitle").value
    let input2 = document.getElementById("diaryContent").value  
    let input3 = document.querySelector('selectEmotion')
    input1.value = null;
    input2.value = null;
    input3.checked === false
}
window.addEventListener('keydown', (event)=> {
    if (event.key === 'Escape' ) {
        closeModal('modalWrite')
    }
} )
const modalBackground = document.getElementById('modalWrite');
modalBackground.addEventListener('click', (event) => {
    if (event.target === modalBackground) {
        closeModal('modalWrite');
    }
});
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








const submitDiary = () => {

}


const storageDiary = () => {

}

const cardLink = location.search


const openCardDetail = () => {

}

const deleteCard = (event) => {
    event.stopPropagation();
    const card = document.getElementById("card");
    card.remove();
}
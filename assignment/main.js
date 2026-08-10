const diary = () => {
    document.getElementById("tabDiary").style = "color: black;"
    document.getElementById("tabPhoto").style = "color: #ABABAB;"
    document.getElementById("tabDiary").style.borderBottom = "2px solid black"
    document.getElementById("tabPhoto").style.borderBottom = "none"   
}

const photo = () => {
    document.getElementById("tabPhoto").style = "color: black;"
    document.getElementById("tabDiary").style = "color: #ABABAB;"
    document.getElementById("tabPhoto").style.borderBottom = "2px solid black"
    document.getElementById("tabDiary").style.borderBottom = "none"

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
    let diaryTitle = document.getElementById("diaryTitle").value.trim();
    let diaryContent = document.getElementById("diaryContent").value.trim();
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
    let diaryTitle = document.getElementById("diaryTitle").value.trim();
    let diaryContent = document.getElementById("diaryContent").value.trim();
    let emotion = document.querySelector('input[name="emotion"]:checked').value;
    const diary = {
        title: diaryTitle,
        content: diaryContent,
        emotion: emotion
    }
    const diaryList = JSON.parse(localStorage.getItem("newDiary")) || [];
    diaryList.push(diary);
    localStorage.setItem("newDiary", JSON.stringify(diaryList));

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img class="card__img" src="./image/1.png">
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
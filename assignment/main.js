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
    const diary ={
        title: diaryTitle,
        content: diaryContent,
        emotion: emotion
    }
    let JSON.stringify(diary)
    const diaryList = ()
    Push
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
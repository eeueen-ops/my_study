const comment = () => {
    const commentInf = {
        content: document.getElementById("commentContent").value,

    }
    localStorage.setItem('myComments', JSON.stringify("commentInf"))
}




const copyBtn = document.getElementById("copyBtn");
const copyToast = document.getElementById("copyToast");

const openToast = () => {
    copyToast.classList.add("show");

    setTimeout(() => {
        copyToast.classList.remove("show");
    }, 3000);
};

copyBtn.addEventListener("click", openToast);
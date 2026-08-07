const comment = () => {
    const commentInf = {
        content: document.getElementById("commentContent").value,

    }
    localStorage.setItem('myComments', JSON.stringify("commentInf"))

    

}
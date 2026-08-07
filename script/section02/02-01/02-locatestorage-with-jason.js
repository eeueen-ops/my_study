const 과일담는통 = {
    사과: 5,
    바나나: 10,
    딸기: 10
}

localStorage.setItem("내과일들", 과일담는통)

JSON.stringify(과일담는통)
//객체를 문자열로 변환

localStorage.setItem('내과일들', JSON.stringify(과일담는통))
//로컬스토리지에 다시 저장

JSON.parse(localStorage.getItem('내과일들'))
//되돌리기
function Logo () {
    return<strong>로고</strong>
}
function WelcomeText () {
    return <h1>환영합니다</h1>
}

// 위에 만들어진 컴포넌트를 조합해 하나의 컴포넌트 생성

export default function ComponentExample () {
    return (
        <header>
            <Logo />
            <WelcomeText />
        </header>
    )
}
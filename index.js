const form = document.querySelector(".form"), // form 태그
    input = document.querySelector("input"), // input 태그
    ol = document.querySelector(".list"), // 화면에 출력되는 ol 태그
    gameBtn = document.querySelector(".gameBtn"); // 게임시작 button 태그

let baseNum = '', // baseball 숫자
    chkBall = '', // baseball 숫자에 스트라이크 표시
    chkNum = '', // 입력한 숫자에 스트라이크 표시
    ball = 0, // 볼 갯수
    strike = 0, // 스트라이크 갯수
    count = 0; // 시도 횟수

/* baseball 숫자와 시도횟수 초기화 화면에 출력된 내용 삭제 */
/* 매개변수 msg는 시도가 10번이 넘었을때 정답을 맞추얼때만 넘어온다. 그외로는 해당 게임을 재시작 버튼을 눌렀을때 */
function resetBaseball(msg) {
    if(msg !== undefined) {
        // 매개변수로 넘어온 값이 있을때

        alert(msg); // 매개변수로 넘어온 메세지로 alert 창 출력
        input.type = "hidden"; // 입력하는 input 태그 숨기기
        gameBtn.classList.toggle('restart'); // 해당 재시작 버튼에 restart 클래스가 있으면 해당 클래스 삭제 
        gameBtn.innerText = '게임시작'; // 재시작 버튼을 게임시작 버튼으로 변경 
    }
    baseNum = ''; // baseball 숫자 초기화
    count = 0; // count 초기화

    /* 화면에 표시된 리스트 모두 삭제 */
    while(ol.hasChildNodes()) {
        // ol 태그의 자식요소가 있을때만 실행

        ol.removeChild(ol.firstChild); // ol태그의 첫번째자식요소 삭제
    }
}

/* 화면에 입력한 값과 스트라이크 볼 갯수 출력 */
function appendList(num) {
    const li = document.createElement("li"); // li 태그 생성
    li.innerText = `${num} : ${ball}ball ${strike}strike`; // 해당 li 태그의 텍스트 값 추가
    ol.appendChild(li); // ol 태그의 li태그를 자식 요소로 추가
    console.log(`입력한 숫자 : ${num}`);
    console.log(`결과 : ${ball}ball ${strike}strike`);
}

/* ball, strike 체크 함수 */
function checkBaseNum(num) {
    chkBall = ''; // ball 체크하기위해 변수에 빈문자열 할당하여 선언 및 초기화 (baseball 숫자)
    chkNum = ''; // ball 체크하기위해 변수에 빈문자열 할당하여 선언 및 초기화 (입력한 숫자)

    count++; // 시도 횟수 증가

    if (count < 11) {
        // 시도 횟수가 10번 이하일때

        /* 스트라이크 개수 확인 */
        for(let i = 0; i<3; i++) {
            if(num[i] === baseNum[i]) {
                // 입력한 숫자와 baseball 숫자와 각 대칭인 자리를 비교하여 같을때(스트라이크 일때)

                strike++; // 스트라이크 갯수 증가
                chkBall += 's'; // 스트라이크이면 변수 소문자 s 할당
                chkNum += 'S'; // 스트라이크이면 변수 대문자 S 할당
            } else {
                // 각 자리의 숫자가 같지 않을때(스트라이크가 아닐때)

                chkBall += baseNum[i]; // 변수에 baseball의 해당 인덱스의 숫자 할당
                chkNum += num[i]; // 변수에 입력한 숫자의 해당 인덱스의 숫자 할당
            }
        }
        if(strike === 3) {
            resetBaseball("STRIKE!!! 정답입니다."); // 스트라이크 갯수 3개일때 해당 함수 호출
        } else {
            // 스트라이크 갯수가 3개가 아닐때

            /* 볼 갯수 확인 */
            for(let i=0; i<3; i++) {
                for(let j=0; j<3; j++) {
                    if(chkNum[i] === chkBall[j]) {
                        // 이전에 할당했던 변수에 스트라이크면 해당 인덱스 s,S 문자가 할당되어 있음
                        // 그래서 같은 스트라이크일때는 소문자 대문자 차이로 해당 조건문은 실행 안됨

                        ball++; // 볼 갯수 증가
                        chkBall = chkBall.replace(chkNum[i], 'b'); // 해당 변수에 입력한 문자에서 같은 숫자가 있으면 해당 숫자는 문자 'b' 할당. 볼 갯수를 정확하게 파악하기위해
                        break; // 해당 인덱스의 숫자가 ball 이 있으면 해당 for문 중지, 중복 방지
                    }
                }
            }
            appendList(num); // 화면에 표시할 함수 호출 
        }
    } else {
        // 10번 시도가 넘어갔을때 실행

        resetBaseball(`10번의 기회를 모두 소진하였습니다. 정답은 ${baseNum} 입니다.`);
    }

    /* 스트라이크, 볼 갯수 초기화 */
    strike = 0;
    ball = 0;
}

/* 입력한 데이터 문자존재여부, 총 3자리 숫자 입력 여부 체크 */
function checkInputData(data) {
    let strChk = false; // 해당 변수 false 값 할당

    /* 문자 존재 여부 체크 */
    if(isNaN(data)) {
        strChk = true; // 문자 존재하면 변수에 true 값 할당
    }

    if(strChk === true) {
        // 1. 문자 존재 여부 체크

        alert("숫자만 입력해주세요!!");
    }else if(data.length < 3) {
        // 2. 숫자 3자리 입력 여부 체크

        alert("숫자 3자리를 입력해주세요!!");
    } else {
        // 3. 위 두조건 모두 해당 안되면 ball, strike 체크 함수 호출

        checkBaseNum(data);
    }
}

/* form태그 submit시 함수 */
function handleSubmit(event) {
    event.preventDefault(); // 페이지 새로고침 방지
    const inputNum = input.value; // 입력한 값을 변수에 할당
    checkInputData(inputNum); // 해당 입력한 값이 문자가 포함되어있는가?! 3자리를 입력하였는가?! 체크
    input.value = ""; // input 태그 텍스트 값 초기화
}

/* 베이스볼 숫자 랜덤 생성 함수 */
function randomNumber() {

    /* 숫자가 총3자리여서 반복문으로 해당 숫자 추가 */
    for(var i=0; i<3; i++) {
        baseNum += Math.floor(Math.random()*10); // 0~9 까지 숫자 생성
    }

}

/* 게임버튼 클릭시 함수 */
function handleGameBtnClick() {
    /* 게임버튼 클래스 restart 클래스가 있으면(재시작) resetBaseball 함수 호출*/
    if(gameBtn.classList.contains('restart')) {
        resetBaseball();
    }

    gameBtn.classList.add('restart'); // 클래스 추가
    gameBtn.innerText="재시작"; // 텍스트 변경
    input.type = "text"; // input태그가 버튼 클릭시 화면에 표시
    baseNum = ""; // 베이스볼숫자 초기화
    randomNumber(); // 베이스볼숫자 생성 함수 호출
    console.log(`베이스볼 정답 : ${baseNum}`);
}

function init() {
    gameBtn.addEventListener("click", handleGameBtnClick); // 게임버튼 클릭시 이벤트 함수 호출
    form.addEventListener("submit", handleSubmit); // form 태그 submit시 이벤트 함수 호출
}

init();

// ==========================
// 요소 선택
// ==========================
const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");

// ==========================
// 현재 날짜 정보
// ==========================
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

// 월 이름
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// ==========================
// 달력 생성 함수
// ==========================
function initCalendar() {
  // 이번 달 첫째날 & 마지막날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const lastDate = lastDay.getDate();      // 이번 달 마지막 날짜
  const prevLastDate = prevLastDay.getDate();
  const firstDayIndex = firstDay.getDay(); // 시작 요일
  const lastDayIndex = lastDay.getDay();   // 마지막 요일

  const nextDays = 7 - lastDayIndex - 1;

  // 상단 날짜 표시
  date.innerHTML = `${months[month]} ${year}`;

  let days = "";

  // ==========================
  // 이전 달 날짜
  // ==========================
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="day prev-date">${prevLastDate - x + 1}</div>`;
  }

  // ==========================
  // 이번 달 날짜
  // ==========================
  for (let i = 1; i <= lastDate; i++) {
    // 오늘 날짜 표시
    if (
      i === today.getDate() &&
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      days += `<div class="day today">${i}</div>`;
    } else {
      days += `<div class="day">${i}</div>`;
    }
  }

  // ==========================
  // 다음 달 날짜
  // ==========================
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  // 화면에 출력
  daysContainer.innerHTML = days;
}

// ==========================
// 초기 실행
// ==========================
initCalendar();

// ==========================
// 이전 달 버튼
// ==========================
prev.addEventListener("click", () => {
  month--;

  if (month < 0) {
    month = 11;
    year--;
  }

  initCalendar();
});

// ==========================
// 다음 달 버튼
// ==========================
next.addEventListener("click", () => {
  month++;

  if (month > 11) {
    month = 0;
    year++;
  }

  initCalendar();
});

// ==========================
// 오늘 버튼 기능
// ==========================
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

// ==========================
// 특정 날짜 이동 기능 (MM/YYYY)
// ==========================
gotoBtn.addEventListener("click", () => {
  const dateArr = dateInput.value.split("/");

  if (dateArr.length === 2) {
    const inputMonth = parseInt(dateArr[0]) - 1;
    const inputYear = parseInt(dateArr[1]);

    if (inputMonth >= 0 && inputMonth <= 11 && inputYear > 0) {
      month = inputMonth;
      year = inputYear;
      initCalendar();
    }
  }
});

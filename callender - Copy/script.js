const calendarDays = document.getElementById("calendar-days");
const currentMonth = document.getElementById("current-month");
const gregorianToday = document.getElementById("gregorian-today");
const hijriToday = document.getElementById("hijri-today");
const hijriToggle = document.getElementById("hijri-toggle");
const gregorianToggle = document.getElementById("gregorian-toggle");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");

let isHijri = true;
let currentDate = moment().startOf("day");

function renderCalendar() {
  calendarDays.innerHTML = "";
  const today = moment();
  const startOfMonth = isHijri ? currentDate.clone().startOf("iMonth") : currentDate.clone().startOf("month");
  const endOfMonth = isHijri ? currentDate.clone().endOf("iMonth") : currentDate.clone().endOf("month");
  currentMonth.textContent = isHijri ? currentDate.format("iMMMM iYYYY") : currentDate.format("MMMM YYYY");

  gregorianToday.textContent = `Today (Gregorian): ${today.format("DD MMMM YYYY")}`;
  hijriToday.textContent = `Today (Hijri): ${today.format("iD iMMMM iYYYY")}`;

  const startDay = isHijri ? startOfMonth.isoWeekday() : startOfMonth.weekday();

  for (let i = 1; i < startDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.style.visibility = "hidden";
    calendarDays.appendChild(emptyDay);
  }

  for (let day = startOfMonth.clone(); day.isBefore(endOfMonth) || day.isSame(endOfMonth); day.add(1, "day")) {
    const dayElement = document.createElement("div");
    dayElement.textContent = isHijri ? day.format("iD") : day.format("D");
    if (day.isSame(today, "day")) dayElement.classList.add("today");
    calendarDays.appendChild(dayElement);
  }
}

hijriToggle.addEventListener("click", () => {
  isHijri = true;
  hijriToggle.classList.add("active");
  gregorianToggle.classList.remove("active");
  renderCalendar();
});

gregorianToggle.addEventListener("click", () => {
  isHijri = false;
  gregorianToggle.classList.add("active");
  hijriToggle.classList.remove("active");
  renderCalendar();
});

prevMonth.addEventListener("click", () => {
  isHijri ? currentDate.subtract(1, "iMonth") : currentDate.subtract(1, "month");
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  isHijri ? currentDate.add(1, "iMonth") : currentDate.add(1, "month");
  renderCalendar();
});

renderCalendar();

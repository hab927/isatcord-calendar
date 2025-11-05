function BuildCalendar() {
    let calendar = document.getElementById("calendar");
    let weekDivs = [];
    let dayDivs = [];
    let dayCounter = 1;

    let month = document.createElement("div");
    month.classList.add("month");
    calendar.appendChild(month);

    for (let week = 0; week < 4; week++) {
        let weekdiv = document.createElement("div");
        weekdiv.classList.add("week");
        weekDivs.push(weekdiv);
        month.appendChild(weekdiv);
    }
    for (const week of weekDivs) {
        for (let day = 0; day < 7; day++) {
            let daydiv = document.createElement("div");
            daydiv.classList.add("day");
            daydiv.textContent = dayCounter;
            dayCounter++;
            dayDivs.push(daydiv);
            week.appendChild(daydiv);
        }
    }

    console.log(dayDivs);
}
const HowManyDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
    13: 29 // february on a leap year
}

let monthText = document.getElementById("monthText");
let months = ["", "January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November", "December", "February"];
let yearText = document.getElementById("yearText");

function GetEvents() {
    let events = 3;
    return events;
}

function BuildCalendar(reqDay, reqMonth, reqYear) {

    let ISATEvents = GetEvents();

    let monthP = reqMonth.padStart(2, '0');
    let yearP = reqYear.padStart(4, '0');
    let dateStringFDOW = yearP + "-" + monthP + "-" + "01";

    let firstDayOfWeek = new Date(dateStringFDOW).getUTCDay();
    
    console.log(new Date(dateStringFDOW));
    console.log(firstDayOfWeek);

    let calendar = document.getElementById("calendar");
    let weekDivs = [];
    let dayDivs = [];
    let dayCounter = -firstDayOfWeek + 1;

    let month = document.createElement("div");
    month.classList.add("month");
    calendar.appendChild(month);

    let weeksInMonth = Math.ceil(HowManyDays[reqMonth] / 7);

    if (dayCounter == -6) {
        dayCounter = 1;
    }

    if (reqYear % 4 == 0 && reqYear % 400 != 0 && reqMonth == 2) { // all months in leap years will have 5 weeks
        reqMonth = 13; // february on a leap year
        weeksInMonth = 5;
    }
    else if (firstDayOfWeek != 0 && reqMonth == 2) {
        weeksInMonth = 5;
    }
    else if (firstDayOfWeek == 6) {
        weeksInMonth = 6;
    }
    else if (firstDayOfWeek == 5 && HowManyDays[reqMonth] == 31) {
        weeksInMonth = 6;
    }

    for (let week = 0; week < weeksInMonth; week++) {
        let weekdiv = document.createElement("div");
        weekdiv.classList.add("week");
        weekDivs.push(weekdiv);
        month.appendChild(weekdiv);
    }
    for (const week of weekDivs) {
        for (let day = 0; day < 7; day++) {
            let daydiv = document.createElement("div");
            let daynumdiv = document.createElement("div");

            daydiv.classList.add("day");
            daynumdiv.classList.add("day-number");

            if (dayCounter <= 0 || dayCounter > HowManyDays[reqMonth]) {
                daynumdiv.textContent = "";
            }
            else {
                daynumdiv.textContent = dayCounter;
            }

            daydiv.appendChild(daynumdiv);

            if (dayCounter == reqDay) {
                let infoDiv = MakeInfoDiv(daydiv, reqDay, reqMonth, reqYear);
                daydiv.appendChild(infoDiv);
                // console.log(daydiv.classList);
            }

            dayCounter++;
            dayDivs.push(daydiv);
            week.appendChild(daydiv);
        }
    }

    monthText.textContent = months[reqMonth];
    yearText.textContent = reqYear;
}

function MakeInfoDiv(daydiv, day, month, year) {
    let div = document.createElement("div");
    div.classList.add("day-info");
    div.textContent = "Event";
    day = 3;
    daydiv.classList.add("highlighted");
    return div;
}
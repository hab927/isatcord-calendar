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

let eventBoard = document.getElementById("event-board");

let weekDivs = []; // universal tracker for week divs
let dayDivs = []; // universally keep track of day divs

let chosenDay;
let chosenMonth;
let chosenYear;

async function GetEvents() {
    const response = await fetch('./data/events.json');
    const json = await response.json();
    return json;
}

async function BuildCalendar(reqDay, reqMonth, reqYear) {

    dayDivs = [""];
    weekDivs = [];

    let evJSON = await GetEvents();

    let monthP = reqMonth.padStart(2, '0');
    let yearP = reqYear.padStart(4, '0');
    let dateStringFDOW = yearP + "-" + monthP + "-" + "01";

    let firstDayOfWeek = new Date(dateStringFDOW).getUTCDay();

    let calendar = document.getElementById("calendar");
    let dayCounter = -firstDayOfWeek + 1;

    let month = document.createElement("div");
    month.classList.add("month");

    let weeksInMonth = Math.ceil(HowManyDays[reqMonth] / 7);

    if (dayCounter == -6) {
        dayCounter = 1;
    }

    if (reqYear % 4 == 0 && reqYear % 400 != 0 && reqMonth == 2) { // all months in leap years will have 5 weeks
        reqMonth = 13; // february on a leap year
        weeksInMonth = 5;
    }
    else if (firstDayOfWeek != 0 && reqMonth == 2) { // non-perfect februaries
        weeksInMonth = 5;
    }
    else if (firstDayOfWeek == 6) { // six week months
        weeksInMonth = 6;
    }
    else if (firstDayOfWeek == 5 && HowManyDays[reqMonth] == 31) { // same as above
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
                dayDivs.push(daydiv);
            }

            daydiv.appendChild(daynumdiv);

            dayCounter++;
            week.appendChild(daydiv);
        }
    }

    chosenMonth = reqMonth;
    chosenYear = reqYear;

    HighlightDiv(dayDivs[parseInt(Number(reqDay))], reqDay);

    for (const event of evJSON.events) {
        let monthNumber = String(parseInt(event.eventDate.split('-')[1], 10));
        if (monthNumber == reqMonth) {
            if (!event.eventAnnual) {
                if (event.eventDate.split('-')[0] != reqYear) {
                    continue;
                }
            }
            if (chosenYear == event.eventDate.split('-')[0] && event.eventType == "Anniversary") {
                continue;
            }
            let eventDay = parseInt(event.eventDate.split('-')[2], 10);
            let eventDiv = MakeEvent(event);
            dayDivs[eventDay].appendChild(eventDiv);
        }
    }

    monthText.textContent = months[reqMonth];
    yearText.textContent = reqYear;
    calendar.appendChild(month); // calendar visible after everything is done
}

function ReselectCalendar(newDay) {
    dayDivs[Number(chosenDay)].classList.remove("highlighted");
    dayDivs[newDay].classList.add("highlighted");
    chosenDay = newDay;
}

function HighlightDiv(daydiv, day) {
    daydiv.classList.add("highlighted");
    chosenDay = day;
}

function MakeEvent(event) {
    eventDiv = document.createElement("div");
    eventDiv.classList.add("day-info");

    let tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add("day-info-tooltip");
    tooltipDiv.textContent = event.eventDescription;

    if (event.eventType == "Anniversary") {
        let newEvent = HandleAnniversary(event, chosenYear - Number(event.eventDate.split('-')[0]));
        eventDiv.textContent = newEvent[0];
        tooltipDiv.textContent = newEvent[1];
    }
    else {
        eventDiv.textContent = event.eventName;
    }

    eventDiv.appendChild(tooltipDiv);

    return eventDiv;
}

function HandleAnniversary(oldEvent) {
    let ordinal = chosenYear - Number(oldEvent.eventDate.split('-')[0]);
    let ordinalSuffix;

    const mod100 = ordinal % 100;
    const mod10 = ordinal % 10;

    if (mod100 >= 11 && mod100 <= 13) {
        ordinalSuffix = "th";
    } 
    else {
        switch (mod10) {
            case 1:
                ordinalSuffix = "st";
                break;
            case 2:
                ordinalSuffix = "nd";
                break;
            case 3:
                ordinalSuffix = "rd";
                break;
            default:
                ordinalSuffix = "th";
        }
    }

    ordinal += ordinalSuffix;
    let newTitle = oldEvent.eventName.replace("$ORDINAL", ordinal);
    let newDesc = oldEvent.eventDescription.replace("$ORDINAL", ordinal);
    return [newTitle, newDesc];
}

async function UpdateEventBoard(day, month, year) {

    const evJSON = await GetEvents();
    eventFound = false;

    while (eventBoard.firstChild) { // clear it
        eventBoard.removeChild(eventBoard.firstChild);
    }

    for (const event of evJSON.events) {
        let monthNumber = String(parseInt(event.eventDate.split('-')[1], 10));
        let dayNumber = String(parseInt(event.eventDate.split('-')[2], 10));
        if (monthNumber == month && dayNumber == day) {
            eventFound = true;
            if (!event.eventAnnual) {
                if (event.eventDate.split('-')[0] != year) {
                    continue;
                }
            }

            let eventTitleDiv = document.createElement("div");
            eventTitleDiv.classList.add("event-title");
            let eventDescDiv = document.createElement("div");
            eventDescDiv.classList.add("event-desc");

            if (event.eventType == "Anniversary") {
                const newEvent = HandleAnniversary(event);
                eventTitleDiv.textContent = newEvent[0];
                eventDescDiv.textContent = "* " + newEvent[1];
            }
            else {
                eventTitleDiv.textContent = event.eventName;
                console.log(event.eventName);
                eventDescDiv.textContent = "*" + event.eventDescription;
            }
            eventTitleDiv.appendChild(eventDescDiv);
            eventBoard.appendChild(eventTitleDiv);
        }
    }
    if (!eventFound) {
        let eventTitleDiv = document.createElement("div");
        eventTitleDiv.classList.add("event-title");
        eventTitleDiv.textContent = "No events today, come back later!"
        eventBoard.appendChild(eventTitleDiv);
    }
}
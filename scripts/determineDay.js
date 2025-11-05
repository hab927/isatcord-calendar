const Months = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12
}

let dayBox = document.getElementById("dayField");
let monthBox = document.getElementById("monthField");
let yearBox = document.getElementById("yearField");

let confirmButton = document.getElementById("confirmButton");
confirmButton.onclick = function() { DayOfWeek() };

function DayOfWeek() {
    let day = dayBox.value;
    let month = monthBox.value;
    let year = yearBox.value;

    
}
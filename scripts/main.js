window.onload = async function() {
    let now = new Date();
    let currentDate = now.toLocaleDateString();
    let localeArray = currentDate.split('/');
    let dateArray = [];

    console.log(localeArray);

    dateArray[0] = localeArray[1];
    dateArray[1] = localeArray[0];
    dateArray[2] = localeArray[2];

    datePicker.value = currentDate;

    BuildCalendar(dateArray[0], dateArray[1], dateArray[2]);
    UpdateEventBoard(dateArray[0], dateArray[1], dateArray[2]);
}
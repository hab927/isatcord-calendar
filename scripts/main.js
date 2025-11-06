window.onload = function() {
    let now = new Date();
    let currentDate = now.toISOString().split('T')[0];
    let dateArray = currentDate.split('-');
    dateArray.reverse();
    BuildCalendar(dateArray[0], dateArray[1], dateArray[2]);
}
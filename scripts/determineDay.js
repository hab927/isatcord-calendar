let datePicker = document.getElementById("datePicker");

function GetDateArray() {
    let dateArray = datePicker.value.split('-'); // yyyy/mm/dd

    let day = String(parseInt(dateArray[2], 10));
    let month = String(parseInt(dateArray[1], 10));
    let year = String(parseInt(dateArray[0], 10));

    let dayP = day.padStart(2, '0');
    let monthP = String(Number(month)-1).padStart(2, '0'); // zero-indexed months moment
    let yearP = year.padStart(4, '0');
    let dateString = yearP + "-" + monthP + "-" + dayP;

    request = new Date(dateString);
    // console.log(request.getDay()); // just for debug
    return [day, month, year];
}
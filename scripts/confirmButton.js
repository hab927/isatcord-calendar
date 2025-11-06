let confirmButton = document.getElementById("confirmButton");

confirmButton.onclick = function() { 

    let pickedMonth = months[parseInt(datePicker.value.split("-")[1], 10)];
    let shownMonth = document.getElementById("monthText").textContent;

    if (document.getElementsByClassName("month").length > 0) {
        monthDiv = document.getElementsByClassName("month")[0];
    }

    let dateArray = GetDateArray();

    if (pickedMonth != shownMonth) {
        monthDiv.remove();
        BuildCalendar(dateArray[0], dateArray[1], dateArray[2]);
    }
    else { // highlight a different div
        
    }
};
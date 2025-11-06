let confirmButton = document.getElementById("confirmButton");

confirmButton.onclick = function() { 

    let shownMonth = document.getElementById("monthText").textContent;
    let shownYear = document.getElementById("yearText").textContent;

    if (document.getElementsByClassName("month").length > 0) {
        monthDiv = document.getElementsByClassName("month")[0];
    }

    let dateArray = GetDateArray();

    if (chosenMonth != shownMonth || chosenYear != shownYear) {
        monthDiv.remove();
        BuildCalendar(dateArray[0], dateArray[1], dateArray[2]);
    }
    else { // highlight a different div
        ReselectCalendar(Number(dateArray[0]));
    }
};
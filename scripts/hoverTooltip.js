let tooltip = document.getElementsByClassName("day-info-tooltip");

document.addEventListener('mousemove', mouseHover, false);

function mouseHover(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = Number(e.pageX + 5) + 'px';
        tooltip[i].style.top = Number(e.pageY - 60) + 'px';
    }
}
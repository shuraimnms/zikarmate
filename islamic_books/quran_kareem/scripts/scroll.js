let scrollInterval;
let speed = 1000;

document.getElementById("scroll-start").addEventListener("click", function () {
    clearInterval(scrollInterval);
    scrollInterval = setInterval(() => {
        window.scrollBy(0, 50);
    }, speed);
});

document.getElementById("scroll-stop").addEventListener("click", function () {
    clearInterval(scrollInterval);
});

document.getElementById("speed-up").addEventListener("click", function () {
    speed = Math.max(200, speed - 200);
    updateSpeedDisplay();
});

document.getElementById("speed-down").addEventListener("click", function () {
    speed += 200;
    updateSpeedDisplay();
});

function updateSpeedDisplay() {
    document.getElementById("scroll-speed").textContent = (1000 / speed) + "x";
}

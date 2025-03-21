document.addEventListener("DOMContentLoaded", function () {
    let lastRead = localStorage.getItem("lastRead");
    if (lastRead) {
        document.getElementById("continue-reading").style.display = "block";
        document.getElementById("continue-reading").addEventListener("click", function () {
            window.location.href = lastRead;
        });
    }
});

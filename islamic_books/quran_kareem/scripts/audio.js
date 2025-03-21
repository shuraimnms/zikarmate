document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".play-btn").forEach(button => {
        button.addEventListener("click", function () {
            const audioUrl = this.dataset.audio;
            const audio = new Audio(audioUrl);
            audio.play();
        });
    });
});

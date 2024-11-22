$(document).ready(function () {
    const words = [
        { word: "always", translation: "завжди" },
        { word: "never", translation: "ніколи" },
        { word: "sometimes", translation: "іноді" },
        { word: "often", translation: "часто" },
        { word: "rarely", translation: "рідко" },
        { word: "soon", translation: "скоро" },
        { word: "later", translation: "пізніше" },
        { word: "now", translation: "зараз" },
        { word: "tomorrow", translation: "завтра" },
        { word: "yesterday", translation: "вчора" }
    ];

    let correctCount = 0;
    let incorrectCount = 0;
    let currentStep = 0;
    const totalSteps = words.length;
    let shuffledWords = [];

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function startGame() {
        shuffledWords = shuffle([...words]);
        correctCount = 0;
        incorrectCount = 0;
        currentStep = 0;

        $("#correct-counter").text(correctCount);
        $("#incorrect-counter").text(incorrectCount);
        $("#step-counter").text(currentStep);
        $("#total-steps").text(totalSteps);
        $("#modal").addClass("hidden");

        loadNextWord();
    }

    function loadNextWord() {
        if (currentStep < totalSteps) {
            const currentWord = shuffledWords[currentStep];
            $("#word-card").text(currentWord.word);
            $("#translation-input").val("");
        } else {
            endGame();
        }
    }

    $("#check-btn").click(function () {
        const userInput = $("#translation-input").val().trim();
        const correctTranslation = shuffledWords[currentStep].translation;

        if (userInput.toLowerCase() === correctTranslation.toLowerCase()) {
            correctCount++;
            $("#correct-counter").text(correctCount);
        } else {
            incorrectCount++;
            $("#incorrect-counter").text(incorrectCount);
        }

        currentStep++;
        $("#step-counter").text(currentStep);
        loadNextWord();
    });

    function endGame() {
        $("#modal").removeClass("hidden");
        const score = ((correctCount / totalSteps) * 100).toFixed(2);
        $("#result").text(`Ваш результат: ${score}%.`);
    }

    $("#restart-btn").click(function () {
        startGame();
    });

    startGame();
});

// Textdatenbank mit Quiz-Fragen
const texts = {
    unterstufe: {
        text: `Der kleine Drache Felix lebte in einer Höhle am Rande des Zauberwaldes. Jeden Morgen flog er hinaus, um seine Freunde zu besuchen. Am liebsten mochte er die kleinen Hasen, die auf der Wiese spielten. Eines Tages entdeckte Felix einen geheimen Pfad, der zu einem wunderschönen See führte. Das Wasser war so klar, dass man bis zum Grund sehen konnte. Felix beschloss, jeden Tag hierher zu kommen, um zu schwimmen und die bunten Fische zu beobachten. Er war der glücklichste Drache im ganzen Zauberwald.`,
        quiz: [
            {
                question: "Wo lebte der Drache Felix?",
                options: ["In einem Schloss", "In einer Höhle", "In einem Baum", "In einem See"],
                correct: 1
            },
            {
                question: "Welche Tiere mochte Felix am liebsten?",
                options: ["Vögel", "Fische", "Hasen", "Schmetterlinge"],
                correct: 2
            },
            {
                question: "Was entdeckte Felix eines Tages?",
                options: ["Einen Schatz", "Einen geheimen Pfad", "Eine neue Höhle", "Einen anderen Drachen"],
                correct: 1
            },
            {
                question: "Wie war das Wasser im See?",
                options: ["Trübe", "Kalt", "Warm", "Klar"],
                correct: 3
            }
        ]
    },
    mittelstufe: {
        text: `Die industrielle Revolution veränderte im 18. und 19. Jahrhundert das Leben der Menschen grundlegend. Durch die Erfindung der Dampfmaschine konnten Fabriken entstehen, in denen Waren in großen Mengen hergestellt wurden. Viele Menschen zogen vom Land in die Städte, um in den Fabriken zu arbeiten. Die Arbeitsbedingungen waren oft sehr hart. Arbeiter mussten bis zu 16 Stunden am Tag arbeiten, auch Kinder mussten in den Fabriken helfen. Erst nach und nach entstanden Gesetze zum Schutz der Arbeiter. Die Industrialisierung brachte aber auch viele Fortschritte. Die Menschen konnten sich mehr Waren leisten, und neue Erfindungen wie die Eisenbahn veränderten das Reisen.`,
        quiz: [
            {
                question: "Wann fand die industrielle Revolution statt?",
                options: ["16. und 17. Jahrhundert", "18. und 19. Jahrhundert", "19. und 20. Jahrhundert", "20. und 21. Jahrhundert"],
                correct: 1
            },
            {
                question: "Was ermöglichte die Entstehung von Fabriken?",
                options: ["Die Elektrizität", "Die Dampfmaschine", "Die Wasserkraft", "Die Windkraft"],
                correct: 1
            },
            {
                question: "Wie lange mussten Arbeiter oft am Tag arbeiten?",
                options: ["8 Stunden", "10 Stunden", "12 Stunden", "16 Stunden"],
                correct: 3
            },
            {
                question: "Was veränderte das Reisen?",
                options: ["Das Auto", "Die Eisenbahn", "Das Flugzeug", "Das Schiff"],
                correct: 1
            }
        ]
    },
    oberstufe: {
        text: `Die Quantenmechanik revolutionierte im 20. Jahrhundert unser Verständnis der physikalischen Welt fundamental. Anders als die klassische Physik, die deterministische Vorhersagen ermöglicht, beschreibt die Quantenmechanik die Natur auf subatomarer Ebene durch Wahrscheinlichkeiten. Das Phänomen der Superposition besagt, dass sich Teilchen gleichzeitig in mehreren Zuständen befinden können, bis eine Messung durchgeführt wird. Dieses Konzept wurde durch Schrödingers berühmtes Gedankenexperiment mit der Katze illustriert. Ein weiteres faszinierendes Phänomen ist die Verschränkung, bei der zwei Teilchen so miteinander verbunden sind, dass die Messung des einen sofort den Zustand des anderen beeinflusst, unabhängig von der Entfernung zwischen ihnen. Diese Erkenntnisse bilden heute die Grundlage für Technologien wie Quantencomputer und Quantenkryptographie.`,
        quiz: [
            {
                question: "Was beschreibt die Quantenmechanik anders als die klassische Physik?",
                options: ["Makroskopische Objekte", "Die Natur durch Wahrscheinlichkeiten", "Nur große Geschwindigkeiten", "Nur chemische Reaktionen"],
                correct: 1
            },
            {
                question: "Was besagt das Phänomen der Superposition?",
                options: ["Teilchen sind immer in einem festen Zustand", "Teilchen können gleichzeitig in mehreren Zuständen sein", "Teilchen können nicht gemessen werden", "Teilchen existieren nicht wirklich"],
                correct: 1
            },
            {
                question: "Wer machte das berühmte Gedankenexperiment mit der Katze?",
                options: ["Einstein", "Heisenberg", "Schrödinger", "Bohr"],
                correct: 2
            },
            {
                question: "Wofür bildet die Quantenmechanik heute eine Grundlage?",
                options: ["Nur für theoretische Physik", "Für Quantencomputer und Quantenkryptographie", "Für klassische Computer", "Für biologische Forschung"],
                correct: 1
            }
        ]
    }
};

// Globale Variablen
let currentText = '';
let currentQuiz = [];
let wordArray = [];
let currentWordIndex = 0;
let recognizedWords = 0;
let correctWords = 0;
let errorWords = 0;
let timeRemaining = 60;
let timerInterval = null;
let recognition = null;
let isReading = false;
let recognizedWordsList = [];

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Event Listeners für Textauswahl
    document.querySelectorAll('.text-btn').forEach(btn => {
        btn.addEventListener('click', handleTextSelection);
    });

    // Event Listener für eigenen Text
    document.getElementById('use-custom-text').addEventListener('click', handleCustomText);

    // Event Listeners für Lesen
    document.getElementById('start-reading').addEventListener('click', startReading);
    document.getElementById('stop-reading').addEventListener('click', stopReading);

    // Event Listeners für Navigation
    document.getElementById('continue-to-quiz').addEventListener('click', showQuiz);
    document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
    document.getElementById('restart').addEventListener('click', restartApp);

    // Spracherkennung initialisieren
    initializeSpeechRecognition();
}

function handleTextSelection(e) {
    const level = e.target.dataset.level;

    // Alle Buttons deaktivieren
    document.querySelectorAll('.text-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    e.target.classList.add('active');

    if (level === 'custom') {
        document.getElementById('custom-text-input').classList.remove('hidden');
        document.getElementById('reading-section').classList.add('hidden');
    } else {
        document.getElementById('custom-text-input').classList.add('hidden');
        loadPredefinedText(level);
    }
}

function loadPredefinedText(level) {
    const textData = texts[level];
    currentText = textData.text;
    currentQuiz = textData.quiz;
    prepareReadingSection();
}

function handleCustomText() {
    const customTextInput = document.getElementById('custom-text').value.trim();

    if (customTextInput === '') {
        alert('Bitte gib einen Text ein!');
        return;
    }

    currentText = customTextInput;
    currentQuiz = []; // Kein Quiz für eigene Texte
    prepareReadingSection();
}

function prepareReadingSection() {
    wordArray = currentText.split(/\s+/).filter(word => word.length > 0);
    currentWordIndex = 0;
    recognizedWords = 0;
    correctWords = 0;
    errorWords = 0;
    timeRemaining = 60;
    recognizedWordsList = [];

    // Text mit span-Tags für jedes Wort vorbereiten
    const textDisplay = document.getElementById('text-display');
    textDisplay.innerHTML = wordArray.map((word, index) =>
        `<span class="word" id="word-${index}">${word}</span>`
    ).join(' ');

    // Zeige Lesesektion
    document.getElementById('reading-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.add('hidden');

    // Scroll zur Lesesektion
    document.getElementById('reading-section').scrollIntoView({ behavior: 'smooth' });
}

function initializeSpeechRecognition() {
    // Prüfe Browser-Kompatibilität
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Dein Browser unterstützt leider keine Spracherkennung. Bitte verwende Chrome, Edge oder Safari.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'de-DE';

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join(' ');

        // Aktuell erkanntes Wort anzeigen
        document.getElementById('current-recognized').textContent = transcript;

        // Verarbeite finale Ergebnisse
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                processRecognizedText(event.results[i][0].transcript);
            }
        }
    };

    recognition.onerror = (event) => {
        console.error('Spracherkennungsfehler:', event.error);
        if (event.error === 'no-speech') {
            console.log('Kein Spracheingabe erkannt');
        }
    };

    recognition.onend = () => {
        if (isReading && timeRemaining > 0) {
            // Starte Erkennung neu, wenn noch Zeit übrig ist
            recognition.start();
        }
    };
}

function processRecognizedText(transcript) {
    const words = transcript.toLowerCase().split(/\s+/).filter(word => word.length > 0);

    words.forEach(spokenWord => {
        if (currentWordIndex < wordArray.length) {
            recognizedWords++;
            recognizedWordsList.push(spokenWord);

            const expectedWord = normalizeWord(wordArray[currentWordIndex]);
            const spokenNormalized = normalizeWord(spokenWord);

            const wordElement = document.getElementById(`word-${currentWordIndex}`);

            if (spokenNormalized === expectedWord || isSimilar(spokenNormalized, expectedWord)) {
                correctWords++;
                wordElement.classList.add('correct');
                wordElement.classList.remove('error', 'current');
            } else {
                errorWords++;
                wordElement.classList.add('error');
                wordElement.classList.remove('correct', 'current');
            }

            currentWordIndex++;

            // Markiere nächstes Wort als aktuell
            if (currentWordIndex < wordArray.length) {
                const nextWordElement = document.getElementById(`word-${currentWordIndex}`);
                nextWordElement.classList.add('current');
            }
        }
    });
}

function normalizeWord(word) {
    // Entferne Satzzeichen und konvertiere zu Kleinbuchstaben
    return word.toLowerCase()
        .replace(/[.,!?;:()"""''„‚]/g, '')
        .replace(/[äÄ]/g, 'a')
        .replace(/[öÖ]/g, 'o')
        .replace(/[üÜ]/g, 'u')
        .replace(/ß/g, 'ss')
        .trim();
}

function isSimilar(word1, word2) {
    // Einfache Ähnlichkeitsprüfung (Levenshtein-Distanz wäre besser)
    if (Math.abs(word1.length - word2.length) > 3) return false;

    // Prüfe ob mindestens 70% der Buchstaben übereinstimmen
    let matches = 0;
    const maxLength = Math.max(word1.length, word2.length);

    for (let i = 0; i < Math.min(word1.length, word2.length); i++) {
        if (word1[i] === word2[i]) matches++;
    }

    return (matches / maxLength) >= 0.7;
}

function startReading() {
    if (!recognition) {
        alert('Spracherkennung konnte nicht initialisiert werden.');
        return;
    }

    isReading = true;
    timeRemaining = 60;
    currentWordIndex = 0;
    recognizedWords = 0;
    correctWords = 0;
    errorWords = 0;
    recognizedWordsList = [];

    // Markiere erstes Wort als aktuell
    if (wordArray.length > 0) {
        document.getElementById('word-0').classList.add('current');
    }

    // UI Updates
    document.getElementById('start-reading').classList.add('hidden');
    document.getElementById('stop-reading').classList.remove('hidden');
    document.getElementById('recognition-status').classList.remove('hidden');

    // Starte Timer
    startTimer();

    // Starte Spracherkennung
    try {
        recognition.start();
    } catch (error) {
        console.error('Fehler beim Starten der Spracherkennung:', error);
    }
}

function stopReading() {
    isReading = false;

    if (recognition) {
        recognition.stop();
    }

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    showResults();
}

function startTimer() {
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            stopReading();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = `Zeit: ${timeRemaining}s`;
}

function showResults() {
    // Verstecke Lesesektion
    document.getElementById('reading-section').classList.add('hidden');
    document.getElementById('recognition-status').classList.add('hidden');

    // Berechne Wörter pro Minute (60 Sekunden = 1 Minute)
    const timeElapsed = 60 - timeRemaining;
    const wordsPerMinute = timeElapsed > 0 ? Math.round((recognizedWords / timeElapsed) * 60) : 0;

    // Zeige Ergebnisse
    document.getElementById('words-read').textContent = recognizedWords;
    document.getElementById('words-correct').textContent = correctWords;
    document.getElementById('words-error').textContent = errorWords;
    document.getElementById('words-per-minute').textContent = wordsPerMinute;

    document.getElementById('results-section').classList.remove('hidden');

    // Scroll zu Ergebnissen
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });

    // Verstecke Quiz-Button wenn kein Quiz vorhanden
    if (currentQuiz.length === 0) {
        document.getElementById('continue-to-quiz').classList.add('hidden');
    } else {
        document.getElementById('continue-to-quiz').classList.remove('hidden');
    }
}

function showQuiz() {
    if (currentQuiz.length === 0) return;

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    currentQuiz.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `Frage ${qIndex + 1}: ${question.question}`;
        questionDiv.appendChild(questionTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        question.options.forEach((option, oIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question-${qIndex}`;
            radio.value = oIndex;
            radio.id = `q${qIndex}-o${oIndex}`;

            const label = document.createElement('label');
            label.htmlFor = `q${qIndex}-o${oIndex}`;
            label.textContent = option;

            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });

    document.getElementById('quiz-section').classList.remove('hidden');
    document.getElementById('submit-quiz').classList.remove('hidden');

    // Scroll zum Quiz
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
}

function submitQuiz() {
    let correctAnswers = 0;
    const totalQuestions = currentQuiz.length;

    currentQuiz.forEach((question, qIndex) => {
        const selectedOption = document.querySelector(`input[name="question-${qIndex}"]:checked`);

        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            const optionDiv = selectedOption.parentElement;

            if (selectedValue === question.correct) {
                correctAnswers++;
                optionDiv.classList.add('correct');
            } else {
                optionDiv.classList.add('incorrect');
                // Zeige auch die richtige Antwort
                const correctOption = document.getElementById(`q${qIndex}-o${question.correct}`).parentElement;
                correctOption.classList.add('correct');
            }
        }
    });

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    document.getElementById('quiz-correct').textContent = correctAnswers;
    document.getElementById('quiz-total').textContent = totalQuestions;
    document.getElementById('quiz-percentage').textContent = `${percentage}%`;

    document.getElementById('submit-quiz').classList.add('hidden');
    document.getElementById('quiz-results-section').classList.remove('hidden');

    // Scroll zu Quiz-Ergebnissen
    document.getElementById('quiz-results-section').scrollIntoView({ behavior: 'smooth' });
}

function restartApp() {
    // Reset alle Variablen
    currentText = '';
    currentQuiz = [];
    wordArray = [];
    currentWordIndex = 0;
    recognizedWords = 0;
    correctWords = 0;
    errorWords = 0;
    timeRemaining = 60;
    isReading = false;

    // Reset UI
    document.querySelectorAll('.text-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById('custom-text').value = '';
    document.getElementById('custom-text-input').classList.add('hidden');
    document.getElementById('reading-section').classList.add('hidden');
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('quiz-results-section').classList.add('hidden');
    document.getElementById('start-reading').classList.remove('hidden');
    document.getElementById('stop-reading').classList.add('hidden');

    // Scroll nach oben
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

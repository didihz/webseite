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
        text: `Der Klimawandel ist eine der größten Herausforderungen unserer Zeit. Die durchschnittliche Temperatur auf der Erde steigt seit Jahrzehnten kontinuierlich an. Hauptursache ist der Ausstoß von Treibhausgasen wie Kohlendioxid. Diese entstehen vor allem durch die Verbrennung fossiler Brennstoffe wie Kohle, Öl und Gas. Auch die Abholzung von Wäldern trägt zum Problem bei. Bäume nehmen normalerweise Kohlendioxid auf und produzieren Sauerstoff. Werden sie gefällt, fehlt diese wichtige Funktion. Die Folgen des Klimawandels sind bereits spürbar. Extremwetterereignisse wie Stürme und Überschwemmungen nehmen zu. In vielen Regionen herrscht längere Trockenheit. Gletscher schmelzen und der Meeresspiegel steigt. Wissenschaftler warnen, dass sich diese Entwicklung beschleunigen wird, wenn wir nicht handeln. Es gibt aber auch Hoffnung. Erneuerbare Energien wie Solar- und Windkraft werden immer günstiger. Viele Länder haben sich verpflichtet, ihre Emissionen zu reduzieren. Auch jeder Einzelne kann einen Beitrag leisten. Weniger Auto fahren, Energie sparen und bewusster konsumieren sind wichtige Schritte. Die Jugend engagiert sich zunehmend für den Klimaschutz. Bewegungen wie Fridays for Future machen auf die Dringlichkeit aufmerksam. Es liegt an uns allen, die Zukunft unseres Planeten zu sichern.`,
        quiz: [
            {
                question: "Was ist die Hauptursache für den Klimawandel?",
                options: ["Naturkatastrophen", "Ausstoß von Treibhausgasen", "Überbevölkerung", "Waldbrände"],
                correct: 1
            },
            {
                question: "Welche Funktion haben Bäume für das Klima?",
                options: ["Sie produzieren Wärme", "Sie nehmen Kohlendioxid auf", "Sie speichern Wasser", "Sie reflektieren Sonnenlicht"],
                correct: 1
            },
            {
                question: "Was sind erneuerbare Energien laut Text?",
                options: ["Kohle und Öl", "Solar- und Windkraft", "Gas und Benzin", "Atomkraft"],
                correct: 1
            },
            {
                question: "Welche Jugendbewegung wird im Text genannt?",
                options: ["Greenpeace", "Fridays for Future", "Extinction Rebellion", "Scientists for Future"],
                correct: 1
            }
        ]
    }
};

// Globale Variablen
let currentText = '';
let currentQuiz = [];
let wordArray = [];
let results = []; // Array für Status jedes Wortes: null, 'correct', 'incorrect'
let errors = []; // Array für Fehler-Details
let currentPosition = 0; // Aktuelle Position im Text
let recognizedWords = 0;
let correctWords = 0;
let errorWords = 0;
let timeRemaining = 60;
let timerInterval = null;
let recognition = null;
let isReading = false;

// Eye Training Variablen
let trainingWords = [];
let trainingIndex = 0;
let trainingInterval = null;
let trainingSpeed = 180; // Wörter pro Minute
let trainingPaused = false;
let trainingActive = false;

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

    // Event Listeners für Eye Training
    document.getElementById('start-training').addEventListener('click', startTraining);
    document.getElementById('pause-training').addEventListener('click', pauseTraining);
    document.getElementById('stop-training').addEventListener('click', stopTraining);
    document.getElementById('training-speed').addEventListener('change', updateTrainingSpeed);

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
        document.getElementById('mode-selection').classList.add('hidden');
    } else {
        document.getElementById('custom-text-input').classList.add('hidden');
        loadPredefinedText(level);
    }
}

function loadPredefinedText(level) {
    const textData = texts[level];
    currentText = textData.text;
    currentQuiz = textData.quiz;
    showModeSelection();
}

function handleCustomText() {
    const customTextInput = document.getElementById('custom-text').value.trim();

    if (customTextInput === '') {
        alert('Bitte gib einen Text ein!');
        return;
    }

    currentText = customTextInput;
    currentQuiz = []; // Kein Quiz für eigene Texte
    showModeSelection();
}

function showModeSelection() {
    document.getElementById('mode-selection').classList.remove('hidden');
    document.getElementById('mode-selection').scrollIntoView({ behavior: 'smooth' });
}

function selectMode(mode) {
    if (mode === 'speed-test') {
        prepareReadingSection();
    } else if (mode === 'eye-training') {
        prepareEyeTraining();
    }
}

function prepareReadingSection() {
    wordArray = currentText.split(/\s+/).filter(word => word.length > 0);
    currentPosition = 0;
    results = new Array(wordArray.length).fill(null);
    errors = [];
    recognizedWords = 0;
    correctWords = 0;
    errorWords = 0;
    timeRemaining = 60;

    renderText();
    updateStats();

    // Zeige Lesesektion
    document.getElementById('reading-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.add('hidden');

    // Scroll zur Lesesektion
    document.getElementById('reading-section').scrollIntoView({ behavior: 'smooth' });
}

// Wort normalisieren - Verbesserte Version
function normalize(word) {
    return word.toLowerCase()
        .replace(/[.,!?;:'"„"«»()\[\]{}–—\-\/\\]/g, '')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .trim();
}

// Prüft ob zwei Wörter übereinstimmen - Verbesserte Version mit Levenshtein-ähnlicher Logik
function wordsMatch(spoken, expected) {
    const s = normalize(spoken);
    const e = normalize(expected);

    if (!s || !e) return false;
    if (s === e) return true;
    if (s.includes(e) || e.includes(s)) return true;

    // Levenshtein-ähnliche Prüfung für kleine Fehler
    if (e.length >= 4) {
        let diff = 0;
        const minLen = Math.min(s.length, e.length);
        const maxLen = Math.max(s.length, e.length);

        for (let i = 0; i < minLen; i++) {
            if (s[i] !== e[i]) diff++;
        }
        diff += maxLen - minLen;

        // Erlaubt bis zu 2 Unterschiede
        if (diff <= 2) return true;
    }

    return false;
}

// Sucht das gesprochene Wort in den nächsten X Wörtern (Lookahead)
function findMatchInRange(spoken, startIdx, range = 5) {
    for (let i = startIdx; i < Math.min(startIdx + range, wordArray.length); i++) {
        if (results[i] === null && wordsMatch(spoken, wordArray[i])) {
            return i;
        }
    }
    return -1;
}

// Zeigt das gehörte Wort mit Match-Indicator an
function showHeard(word, match, expectedWord = '') {
    const heardBox = document.getElementById('current-recognized');
    if (heardBox) {
        heardBox.textContent = word;
        heardBox.className = match ? 'text-green-600 font-bold' : 'text-red-600 font-bold';
    }
}

// UI: Text rendern
function renderText() {
    const container = document.getElementById('text-display');
    container.innerHTML = wordArray.map((word, i) => {
        let cls = 'word ';
        if (results[i] === 'correct') {
            cls += 'correct';
        } else if (results[i] === 'incorrect') {
            cls += 'error';
        } else if (i === currentPosition && isReading) {
            cls += 'current';
        }
        return `<span class="${cls}" data-idx="${i}" id="word-${i}">${word}</span>`;
    }).join(' ');

    // Auto-scroll zum aktuellen Wort
    if (currentPosition < wordArray.length && isReading) {
        const currentWordElement = document.getElementById(`word-${currentPosition}`);
        if (currentWordElement) {
            currentWordElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// UI: Statistiken aktualisieren
function updateStats() {
    correctWords = results.filter(r => r === 'correct').length;
    errorWords = results.filter(r => r === 'incorrect').length;
    recognizedWords = correctWords + errorWords;

    document.getElementById('words-read').textContent = recognizedWords;
    document.getElementById('words-correct').textContent = correctWords;
    document.getElementById('words-error').textContent = errorWords;

    const total = correctWords + errorWords;
    if (total > 0) {
        const accuracy = Math.round((correctWords / total) * 100);
        document.getElementById('accuracyDisplay').textContent = accuracy + '%';
    }
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
        // Zeige Interim-Ergebnisse
        const interimTranscript = Array.from(event.results)
            .slice(event.resultIndex)
            .map(result => result[0].transcript)
            .join(' ');

        if (interimTranscript) {
            showHeard(interimTranscript, false);
        }

        // Verarbeite finale Ergebnisse
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                processSpoken(event.results[i][0].transcript);
            }
        }
    };

    recognition.onerror = (event) => {
        console.error('Spracherkennungsfehler:', event.error);
        if (event.error === 'no-speech') {
            console.log('Keine Spracheingabe erkannt');
        }
    };

    recognition.onend = () => {
        if (isReading && timeRemaining > 0) {
            // Starte Erkennung neu, wenn noch Zeit übrig ist
            try {
                recognition.start();
            } catch (error) {
                console.error('Fehler beim Neustart der Spracherkennung:', error);
            }
        }
    };
}

// Verarbeitet erkannten Text - Verbesserte Version mit Lookahead
function processSpoken(transcript) {
    if (!isReading) return;

    const spokenWords = transcript.trim().split(/\s+/).filter(w => w.length > 0);

    spokenWords.forEach(spokenWord => {
        const expectedWord = currentPosition < wordArray.length ? wordArray[currentPosition] : '';

        // Suche Match in den nächsten 5 Wörtern (Lookahead)
        const matchIdx = findMatchInRange(spokenWord, currentPosition, 5);

        if (matchIdx !== -1) {
            // Markiere übersprungene Wörter als Fehler
            for (let i = currentPosition; i < matchIdx; i++) {
                if (results[i] === null) {
                    results[i] = 'incorrect';
                    errors.push({
                        index: i,
                        spoken: '(übersprungen)',
                        expected: wordArray[i]
                    });
                }
            }

            // Markiere gefundenes Wort als richtig
            results[matchIdx] = 'correct';
            currentPosition = matchIdx + 1;

            showHeard(spokenWord, true, wordArray[matchIdx]);
        } else {
            // Kein Match gefunden
            showHeard(spokenWord, false, expectedWord);
        }

        renderText();
        updateStats();
    });
}

async function startReading() {
    if (!recognition) {
        alert('Spracherkennung konnte nicht initialisiert werden.');
        return;
    }

    // Prüfe Mikrofon-Berechtigung
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
    } catch (error) {
        alert('⚠️ Mikrofon nicht erlaubt. Bitte erlaube den Zugriff auf das Mikrofon.');
        return;
    }

    isReading = true;
    timeRemaining = 60;
    currentPosition = 0;
    results = new Array(wordArray.length).fill(null);
    errors = [];
    recognizedWords = 0;
    correctWords = 0;
    errorWords = 0;

    renderText();
    updateStats();

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
        alert('Fehler beim Starten der Spracherkennung: ' + error.message);
        stopReading();
    }
}

function stopReading() {
    isReading = false;

    if (recognition) {
        try {
            recognition.stop();
        } catch (error) {
            console.error('Fehler beim Stoppen der Spracherkennung:', error);
        }
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
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = `Zeit: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function showResults() {
    // Verstecke Lesesektion
    document.getElementById('recognition-status').classList.add('hidden');

    // Berechne Wörter pro Minute (60 Sekunden = 1 Minute)
    const timeElapsed = 60 - timeRemaining;
    const wordsPerMinute = timeElapsed > 0 ? Math.round((correctWords / timeElapsed) * 60) : 0;

    // Zeige Ergebnisse
    document.getElementById('words-read').textContent = recognizedWords;
    document.getElementById('words-correct').textContent = correctWords;
    document.getElementById('words-error').textContent = errorWords;
    document.getElementById('words-per-minute').textContent = wordsPerMinute;

    // Zeige Fehlerdetails wenn vorhanden
    if (errors.length > 0) {
        console.log('Fehler:', errors);
    }

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
            optionDiv.id = `option-${qIndex}-${oIndex}`;

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
            const optionDiv = document.getElementById(`option-${qIndex}-${selectedValue}`);

            if (selectedValue === question.correct) {
                correctAnswers++;
                optionDiv.classList.add('correct');
            } else {
                optionDiv.classList.add('incorrect');
                // Zeige auch die richtige Antwort
                const correctOption = document.getElementById(`option-${qIndex}-${question.correct}`);
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

// ===== EYE TRAINING FUNCTIONS =====

function prepareEyeTraining() {
    trainingWords = currentText.split(/\s+/).filter(word => word.length > 0);
    trainingIndex = 0;
    trainingPaused = false;
    trainingActive = false;

    // UI Updates
    document.getElementById('mode-selection').classList.add('hidden');
    document.getElementById('eye-training-section').classList.remove('hidden');
    document.getElementById('training-complete').classList.add('hidden');
    document.getElementById('training-stats').textContent = `0 / ${trainingWords.length} Wörter`;
    document.getElementById('training-progress-fill').style.width = '0%';
    document.getElementById('training-word').textContent = '';

    // Scroll zur Training-Sektion
    document.getElementById('eye-training-section').scrollIntoView({ behavior: 'smooth' });
}

function updateTrainingSpeed(e) {
    trainingSpeed = parseInt(e.target.value);

    // Wenn Training läuft, neu starten mit neuer Geschwindigkeit
    if (trainingActive && !trainingPaused) {
        clearInterval(trainingInterval);
        const intervalMs = 60000 / trainingSpeed;
        trainingInterval = setInterval(showNextWord, intervalMs);
    }
}

function startTraining() {
    if (trainingWords.length === 0) {
        alert('Bitte wähle zuerst einen Text aus!');
        return;
    }

    trainingActive = true;
    trainingPaused = false;

    // Reset wenn abgeschlossen
    if (trainingIndex >= trainingWords.length) {
        trainingIndex = 0;
        document.getElementById('training-complete').classList.add('hidden');
    }

    // UI Updates
    document.getElementById('start-training').classList.add('hidden');
    document.getElementById('pause-training').classList.remove('hidden');
    document.getElementById('stop-training').classList.remove('hidden');

    // Starte Training
    const intervalMs = 60000 / trainingSpeed; // Millisekunden pro Wort
    showNextWord(); // Zeige sofort erstes Wort
    trainingInterval = setInterval(showNextWord, intervalMs);
}

function pauseTraining() {
    if (trainingPaused) {
        // Resume
        trainingPaused = false;
        document.getElementById('pause-training').textContent = 'Pause';
        const intervalMs = 60000 / trainingSpeed;
        trainingInterval = setInterval(showNextWord, intervalMs);
    } else {
        // Pause
        trainingPaused = true;
        document.getElementById('pause-training').textContent = 'Fortsetzen';
        clearInterval(trainingInterval);
    }
}

function stopTraining() {
    trainingActive = false;
    trainingPaused = false;
    clearInterval(trainingInterval);

    // UI Reset
    document.getElementById('start-training').classList.remove('hidden');
    document.getElementById('pause-training').classList.add('hidden');
    document.getElementById('stop-training').classList.add('hidden');
    document.getElementById('pause-training').textContent = 'Pause';
    document.getElementById('training-word').textContent = '';

    // Reset Index
    trainingIndex = 0;
    document.getElementById('training-stats').textContent = `0 / ${trainingWords.length} Wörter`;
    document.getElementById('training-progress-fill').style.width = '0%';
}

function showNextWord() {
    if (trainingIndex >= trainingWords.length) {
        // Training abgeschlossen
        clearInterval(trainingInterval);
        trainingActive = false;

        document.getElementById('training-complete').classList.remove('hidden');
        document.getElementById('total-training-words').textContent = trainingWords.length;
        document.getElementById('start-training').classList.remove('hidden');
        document.getElementById('pause-training').classList.add('hidden');
        document.getElementById('stop-training').classList.add('hidden');
        document.getElementById('training-word').textContent = '';

        return;
    }

    const word = trainingWords[trainingIndex];
    const wordElement = document.getElementById('training-word');

    // Zufällige Position generieren
    const positions = [
        { top: '15%', left: '20%' },
        { top: '15%', left: '50%' },
        { top: '15%', left: '80%' },
        { top: '40%', left: '10%' },
        { top: '40%', left: '50%' },
        { top: '40%', left: '90%' },
        { top: '65%', left: '20%' },
        { top: '65%', left: '50%' },
        { top: '65%', left: '80%' },
        { top: '85%', left: '30%' },
        { top: '85%', left: '70%' }
    ];

    const randomPosition = positions[Math.floor(Math.random() * positions.length)];

    // Wort anzeigen mit Animation
    wordElement.style.top = randomPosition.top;
    wordElement.style.left = randomPosition.left;
    wordElement.textContent = word;
    wordElement.classList.add('fade-in');

    // Animation nach kurzer Zeit entfernen
    setTimeout(() => {
        wordElement.classList.remove('fade-in');
    }, 100);

    // Fortschritt aktualisieren
    trainingIndex++;
    const progress = (trainingIndex / trainingWords.length) * 100;
    document.getElementById('training-progress-fill').style.width = `${progress}%`;
    document.getElementById('training-stats').textContent = `${trainingIndex} / ${trainingWords.length} Wörter`;
}

function restartTraining() {
    trainingIndex = 0;
    document.getElementById('training-complete').classList.add('hidden');
    document.getElementById('training-stats').textContent = `0 / ${trainingWords.length} Wörter`;
    document.getElementById('training-progress-fill').style.width = '0%';
    startTraining();
}

function backToModeSelection() {
    stopTraining();
    document.getElementById('eye-training-section').classList.add('hidden');
    document.getElementById('mode-selection').classList.remove('hidden');
    document.getElementById('mode-selection').scrollIntoView({ behavior: 'smooth' });
}

// ===== GENERAL APP FUNCTIONS =====

function restartApp() {
    // Stoppe laufende Spracherkennung
    if (recognition && isReading) {
        try {
            recognition.stop();
        } catch (error) {
            console.error('Fehler beim Stoppen:', error);
        }
    }

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Stoppe Eye Training
    if (trainingActive) {
        stopTraining();
    }

    // Reset alle Variablen
    currentText = '';
    currentQuiz = [];
    wordArray = [];
    results = [];
    errors = [];
    currentPosition = 0;
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
    document.getElementById('mode-selection').classList.add('hidden');
    document.getElementById('eye-training-section').classList.add('hidden');
    document.getElementById('reading-section').classList.add('hidden');
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('quiz-results-section').classList.add('hidden');
    document.getElementById('start-reading').classList.remove('hidden');
    document.getElementById('stop-reading').classList.add('hidden');
    document.getElementById('recognition-status').classList.add('hidden');

    // Scroll nach oben
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

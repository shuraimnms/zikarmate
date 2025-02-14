// Islamic Quiz App JavaScript Code

// Define quiz questions for each day
const dailyQuestions = {
"monday": [
    { "question": "اسلام کا دوسرا رکن کون سا ہے؟ / What is the second pillar of Islam?", 
      "options": ["نماز / Salah", "زکوٰۃ / Zakat", "روزہ / Fasting", "حج / Hajj"], 
      "answer": "نماز / Salah" },

    { "question": "قرآن کا پہلا لفظ کیا ہے؟ / What is the first word of the Quran?", 
      "options": ["اقرأ / Iqra", "بسم / Bism", "الحمد / Alhamd", "قل / Qul"], 
      "answer": "اقرأ / Iqra" },

    { "question": "حضرت محمد ﷺ کہاں پیدا ہوئے؟ / Where was Prophet Muhammad (ﷺ) born?", 
      "options": ["مدینہ / Madinah", "مکہ / Makkah", "طائف / Taif", "یمن / Yemen"], 
      "answer": "مکہ / Makkah" },

    { "question": "کلمہ شہادت میں کس بات کی گواہی دی جاتی ہے؟ / What is testified in the Kalimah Shahadah?", 
      "options": ["اللہ کی وحدانیت / Oneness of Allah", "نبی کی رسالت / Prophethood of Muhammad (ﷺ)", "دونوں / Both", "نماز کی فرضیت / Obligation of Salah"], 
      "answer": "دونوں / Both" },

    { "question": "کس صحابی کو 'سیف اللہ' کا لقب دیا گیا؟ / Which companion was given the title 'Sword of Allah'?", 
      "options": ["حضرت علی رضی اللہ عنہ / Ali (R.A)", "حضرت عمر رضی اللہ عنہ / Umar (R.A)", "حضرت خالد بن ولید رضی اللہ عنہ / Khalid bin Walid (R.A)", "حضرت حمزہ رضی اللہ عنہ / Hamza (R.A)"], 
      "answer": "حضرت خالد بن ولید رضی اللہ عنہ / Khalid bin Walid (R.A)" }
],

    
    "tuesday": [
    { "question": "پانچ وقت کی نمازوں میں سب سے پہلے کون سی نماز ہے؟ / Which is the first prayer of the day?", 
      "options": ["ظہر / Dhuhr", "عصر / Asr", "مغرب / Maghrib", "فجر / Fajr"], 
      "answer": "فجر / Fajr" },

    { "question": "قرآن میں کتنی سورتیں ہیں؟ / How many Surahs are in the Quran?", 
      "options": ["100", "114", "120", "99"], 
      "answer": "114" },

    { "question": "کس نبی کو کشتی بنانے کا حکم دیا گیا؟ / Which prophet was commanded to build an ark?", 
      "options": ["حضرت آدم علیہ السلام / Prophet Adam (A.S)", "حضرت نوح علیہ السلام / Prophet Nuh (A.S)", "حضرت موسیٰ علیہ السلام / Prophet Musa (A.S)", "حضرت ابراہیم علیہ السلام / Prophet Ibrahim (A.S)"], 
      "answer": "حضرت نوح علیہ السلام / Prophet Nuh (A.S)" },

    { "question": "روزہ کس مہینے میں فرض ہے؟ / Fasting is obligatory in which month?", 
      "options": ["شوال / Shawwal", "رجب / Rajab", "رمضان / Ramadan", "ذی الحجہ / Dhul-Hijjah"], 
      "answer": "رمضان / Ramadan" },

    { "question": "مسجد اقصیٰ کہاں واقع ہے؟ / Where is Masjid Al-Aqsa located?", 
      "options": ["مکہ / Makkah", "مدینہ / Madinah", "یروشلم / Jerusalem", "دمشق / Damascus"], 
      "answer": "یروشلم / Jerusalem" }
],

    "wednesday": [
    { "question": "نماز عصر کے بعد کون سا ذکر پڑھنا مستحب ہے؟ / Which Dhikr is recommended after Asr prayer?", 
      "options": ["سبحان اللہ / SubhanAllah", "استغفار / Astaghfirullah", "لا الہ الا اللہ / La ilaha illallah", "الحمد للہ / Alhamdulillah"], 
      "answer": "استغفار / Astaghfirullah" },

    { "question": "رسول اللہ ﷺ کی پیدائش کا دن کون سا تھا؟ / On which day was Prophet Muhammad (ﷺ) born?", 
      "options": ["پیر / Monday", "بدھ / Wednesday", "جمعہ / Friday", "اتوار / Sunday"], 
      "answer": "پیر / Monday" },

    { "question": "کون سا فرشتہ پیغام لے کر آتا تھا؟ / Which angel brought the revelations?", 
      "options": ["جبرائیل علیہ السلام / Jibreel (A.S)", "اسرافیل علیہ السلام / Israfeel (A.S)", "میکائیل علیہ السلام / Mikaeel (A.S)", "عزرائیل علیہ السلام / Azrael (A.S)"], 
      "answer": "جبرائیل علیہ السلام / Jibreel (A.S)" },

    { "question": "قرآن پاک کی سب سے لمبی سورہ کون سی ہے؟ / What is the longest Surah in the Quran?", 
      "options": ["سورۃ البقرہ / Surah Al-Baqarah", "سورۃ النساء / Surah An-Nisa", "سورۃ یوسف / Surah Yusuf", "سورۃ آل عمران / Surah Aal-E-Imran"], 
      "answer": "سورۃ البقرہ / Surah Al-Baqarah" },

    { "question": "مسلمانوں کا قبلہ کون سا ہے؟ / What is the Qibla of Muslims?", 
      "options": ["مسجد نبوی / Masjid Nabawi", "مسجد اقصی / Masjid Al-Aqsa", "مسجد الحرام / Masjid Al-Haram", "مسجد قباء / Masjid Quba"], 
      "answer": "مسجد الحرام / Masjid Al-Haram" }
],

"thursday": [
    { "question": "تہجد کی نماز کا وقت کب ہوتا ہے؟ / When is the time for Tahajjud prayer?", 
      "options": ["مغرب کے بعد / After Maghrib", "رات کے آخری حصے میں / Last part of the night", "عشاء کے بعد / After Isha", "فجر کے بعد / After Fajr"], 
      "answer": "رات کے آخری حصے میں / Last part of the night" },

    { "question": "اسلام کے کتنے بنیادی ارکان ہیں؟ / How many pillars of Islam are there?", 
      "options": ["تین / Three", "چار / Four", "پانچ / Five", "چھ / Six"], 
      "answer": "پانچ / Five" },

    { "question": "قرآن مجید کا پہلا لفظ کیا ہے؟ / What is the first word of the Quran?", 
      "options": ["اللہ / Allah", "اقرأ / Iqra (Read)", "بسم / Bism", "الحمد / Alhamdu"], 
      "answer": "اقرأ / Iqra (Read)" },

    { "question": "کون سا دن 'یوم عرفہ' کہلاتا ہے؟ / Which day is known as 'Yawm Arafah'?", 
      "options": ["عید الفطر / Eid-ul-Fitr", "نو ذوالحجہ / 9th of Dhul-Hijjah", "عید الاضحی / Eid-ul-Adha", "پندرہ رمضان / 15th of Ramadan"], 
      "answer": "نو ذوالحجہ / 9th of Dhul-Hijjah" },

    { "question": "مدینہ منورہ کی ہجرت کے وقت نبی ﷺ کے ساتھی کون تھے؟ / Who accompanied Prophet Muhammad (ﷺ) during the migration to Madinah?", 
      "options": ["حضرت عمر رضی اللہ عنہ / Umar (R.A)", "حضرت علی رضی اللہ عنہ / Ali (R.A)", "حضرت ابو بکر رضی اللہ عنہ / Abu Bakr (R.A)", "حضرت عثمان رضی اللہ عنہ / Uthman (R.A)"], 
      "answer": "حضرت ابو بکر رضی اللہ عنہ / Abu Bakr (R.A)" }
],
    "friday": [
    { "question": "جمعہ کا خطبہ کب دیا جاتا ہے؟ / When is the Friday Khutbah delivered?", 
      "options": ["نماز کے بعد / After Salah", "نماز سے پہلے / Before Salah", "ظہر کے بعد / After Dhuhr", "فجر کے بعد / After Fajr"], 
      "answer": "نماز سے پہلے / Before Salah" },

    { "question": "جمعہ کے دن کون سا سورہ پڑھنا افضل ہے؟ / Which Surah is recommended to recite on Friday?", 
      "options": ["سورۃ الکہف / Surah Al-Kahf", "سورۃ یس / Surah Yaseen", "سورۃ الرحمن / Surah Ar-Rahman", "سورۃ الواقعہ / Surah Al-Waqiah"], 
      "answer": "سورۃ الکہف / Surah Al-Kahf" },

      { "question": "جمعہ کے دن جلدی مسجد جانے کی کیا فضیلت ہے؟ / What is the virtue of going early to the mosque on Friday?", 
        "options": ["زیادہ ثواب / More reward", "گناہوں کی معافی / Forgiveness of sins", "جنت کے قریب / Closer to Jannah", "تمام صحیح ہیں / All are correct"], 
        "answer": "تمام صحیح ہیں / All are correct" },
      

    { "question": "جمعہ کے دن غسل کرنا کیا ہے؟ / What is taking a bath on Friday considered?", 
      "options": ["فرض / Fard", "واجب / Wajib", "سنت / Sunnah", "مستحب / Mustahabb"], 
      "answer": "سنت / Sunnah" },

    { "question": "جمعہ کے دن کی جانے والی کون سی دعا بہت اہم ہے؟ / Which dua made on Friday is highly accepted?", 
      "options": ["دعا قنوت / Dua-e-Qunoot", "درود شریف / Durood Sharif", "آیت الکرسی / Ayat-ul-Kursi", "کوئی بھی دعا / Any Dua"], 
      "answer": "کوئی بھی دعا / Any Dua" }
],

    "saturday": [
    { "question": "اسلام میں پہلا فرض عبادت کون سا ہے؟ / What is the first obligatory act in Islam?", 
      "options": ["زکوٰۃ / Zakat", "نماز / Salah", "روزہ / Fasting", "حج / Hajj"], 
      "answer": "نماز / Salah" },

    { "question": "قرآن پاک میں کتنے پارے ہیں؟ / How many Juz are in the Quran?", 
      "options": ["20", "25", "30", "35"], 
      "answer": "30" },

    { "question": "مسجد نبوی کس شہر میں واقع ہے؟ / In which city is Masjid Nabawi located?", 
      "options": ["مکہ مکرمہ / Makkah", "مدینہ منورہ / Madinah", "جدہ / Jeddah", "دمشق / Damascus"], 
      "answer": "مدینہ منورہ / Madinah" },

    { "question": "قرآن کی سب سے چھوٹی سورہ کون سی ہے؟ / What is the shortest Surah in the Quran?", 
      "options": ["سورۃ الفاتحہ / Surah Al-Fatiha", "سورۃ العصر / Surah Al-Asr", "سورۃ الکوثر / Surah Al-Kawthar", "سورۃ الاخلاص / Surah Al-Ikhlas"], 
      "answer": "سورۃ الکوثر / Surah Al-Kawthar" },

    { "question": "پہلا انسان اور نبی کون تھے؟ / Who was the first human and prophet?", 
      "options": ["حضرت آدم علیہ السلام / Prophet Adam (A.S)", "حضرت نوح علیہ السلام / Prophet Nuh (A.S)", "حضرت ابراہیم علیہ السلام / Prophet Ibrahim (A.S)", "حضرت موسیٰ علیہ السلام / Prophet Musa (A.S)"], 
      "answer": "حضرت آدم علیہ السلام / Prophet Adam (A.S)" }
],

"sunday": [
    { "question": "پہلا کلمہ کیا ہے؟ / What is the first Kalimah?", 
      "options": ["کلمہ طیبہ / Kalimah Tayyibah", "کلمہ شہادت / Kalimah Shahadah", "کلمہ توحید / Kalimah Tawheed", "کلمہ رد کفر / Kalimah Radd-e-Kufr"], 
      "answer": "کلمہ طیبہ / Kalimah Tayyibah" },

    { "question": "حضرت محمد ﷺ نے کتنی شادیاں کیں؟ / How many marriages did Prophet Muhammad (ﷺ) have?", 
      "options": ["9", "11", "12", "13"], 
      "answer": "11" },

    { "question": "شب معراج کے سفر میں نبی ﷺ کس جانور پر سوار تھے؟ / On which animal did Prophet Muhammad (ﷺ) travel during Miraj?", 
      "options": ["اونٹ / Camel", "گھوڑا / Horse", "براق / Buraq", "خچر / Mule"], 
      "answer": "براق / Buraq" },

    { "question": "اسلام میں پہلا خلیفہ کون تھا؟ / Who was the first Caliph in Islam?", 
      "options": ["حضرت عمر رضی اللہ عنہ / Umar (R.A)", "حضرت علی رضی اللہ عنہ / Ali (R.A)", "حضرت عثمان رضی اللہ عنہ / Uthman (R.A)", "حضرت ابو بکر رضی اللہ عنہ / Abu Bakr (R.A)"], 
      "answer": "حضرت ابو بکر رضی اللہ عنہ / Abu Bakr (R.A)" },

    { "question": "قرآن کی آخری نازل ہونے والی سورہ کون سی ہے؟ / What is the last revealed Surah in the Quran?", 
      "options": ["سورۃ الناس / Surah An-Naas", "سورۃ الفاتحہ / Surah Al-Fatiha", "سورۃ المائدہ / Surah Al-Maidah", "سورۃ النصر / Surah An-Nasr"], 
      "answer": "سورۃ النصر / Surah An-Nasr" }
],
    // Add more days and questions as needed
};

// Get today's day and questions
const today = new Date().toLocaleDateString('en-us', { weekday: 'long' }).toLowerCase();
const questions = dailyQuestions[today] || [];

// Variables for quiz
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];

// Function to delete history older than 7 days
function deleteOldHistory() {
    const now = new Date();
    quizHistory = quizHistory.filter(entry => {
        const entryDate = new Date(entry.date);
        const timeDiff = now - entryDate;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
    });
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
}

// Run the deleteOldHistory function on load
deleteOldHistory();

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const feedbackEl = document.getElementById('quiz-feedback');
const nextBtn = document.getElementById('next-question');
const restartBtn = document.getElementById('restart-quiz');
const historyContainer = document.getElementById('history-container');
const historyList = document.getElementById('history-list');
const resultContainer = document.getElementById('result-container');
const finalScoreEl = document.getElementById('final-score');
const correctAnswersList = document.getElementById('correct-answers-list');

// Initialize the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    resultContainer.style.display = 'none';
    historyContainer.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        optionsEl.innerHTML = '';
        feedbackEl.style.display = 'none';
        nextBtn.style.display = 'none';

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(option));
            optionsEl.appendChild(button);
        });
    } else {
        showResult();
    }
}

function selectAnswer(selected) {
    const currentQuestion = questions[currentQuestionIndex];
    userAnswers.push({ question: currentQuestion.question, selected, correct: currentQuestion.answer });

    if (selected === currentQuestion.answer) {
        score++;
        feedbackEl.textContent = "✅ درست جواب! / Correct Answer!";
    } else {
        feedbackEl.textContent = `❌ غلط جواب! صحیح جواب: ${currentQuestion.answer} / Wrong! Correct: ${currentQuestion.answer}`;
    }
    feedbackEl.style.display = 'block';
    nextBtn.style.display = 'inline-block';
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    finalScoreEl.textContent = `آپ کا سکور: ${score}/${questions.length} / Your Score: ${score}/${questions.length}`;
    correctAnswersList.innerHTML = '';

    userAnswers.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.question} 
        آپ کا جواب: ${item.selected} / Your Answer: ${item.selected} 
        درست جواب: ${item.correct} / Correct Answer: ${item.correct}`;
        correctAnswersList.appendChild(li);
    });

    // Save quiz history
    quizHistory.push({
        date: new Date().toLocaleString(),
        score: `${score}/${questions.length}`,
        answers: userAnswers
    });
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
}

function restartQuiz() {
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    startQuiz();
}

function showHistory() {
    historyContainer.style.display = 'block';
    historyList.innerHTML = '';

    if (quizHistory.length === 0) {
        historyList.innerHTML = '<li>کوئی تاریخ نہیں۔ تاریخ ہر ہفتے حذف کر دی جاتی ہے۔ / No history found. History is deleted weekly.</li>';
    } else {
        quizHistory.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>Quiz ${index + 1}:</strong> ${entry.date}<br>Score: ${entry.score}`;
            historyList.appendChild(li);
        });

        const note = document.createElement('li');
        note.innerHTML = `<strong>🔔 نوٹ:</strong> تاریخ خودکار طور پر ہر 7 دن بعد حذف کر دی جاتی ہے۔ / <strong>Note:</strong> History is automatically deleted after 7 days.`;
        note.style.color = '#f8e71c';
        historyList.appendChild(note);
    }
}

function hideHistory() {
    historyContainer.style.display = 'none';
}

// Event Listeners
document.getElementById('view-history').addEventListener('click', showHistory);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});
restartBtn.addEventListener('click', restartQuiz);

// Start the quiz when the page loads
startQuiz();

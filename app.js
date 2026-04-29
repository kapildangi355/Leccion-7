// ============================
// FLASHCARD DATA
// ============================
const vocabData = [
  { word: "el abogado / la abogada", translation: "lawyer", emoji: "⚖️", example: "Mi abogada trabaja en una empresa grande." },
  { word: "el actor / la actriz", translation: "actor", emoji: "🎭", example: "La actriz busca un nuevo papel." },
  { word: "el arqueólogo / la arqueóloga", translation: "archeologist", emoji: "🏺", example: "El arqueólogo descubrió unas ruinas antiguas." },
  { word: "el arquitecto / la arquitecta", translation: "architect", emoji: "🏛️", example: "La arquitecta diseñó el edificio nuevo." },
  { word: "el ascenso", translation: "promotion", emoji: "📈", example: "Ella recibió un ascenso después de trabajar mucho." },
  { word: "el aspirante / la aspirante", translation: "candidate; applicant", emoji: "📋", example: "Hay diez aspirantes para el puesto." },
  { word: "el aumento de sueldo", translation: "raise", emoji: "💰", example: "El gerente le dio un aumento de sueldo." },
  { word: "los beneficios", translation: "benefits", emoji: "🏥", example: "La empresa ofrece buenos beneficios." },
  { word: "el bombero / la bombera", translation: "firefighter", emoji: "🔥", example: "El bombero apagó el incendio rápidamente." },
  { word: "el carpintero / la carpintera", translation: "carpenter", emoji: "🪚", example: "El carpintero hizo una mesa de madera." },
  { word: "la carrera", translation: "career", emoji: "🎓", example: "Ella estudia para tener una buena carrera." },
  { word: "el científico / la científica", translation: "scientist", emoji: "🔬", example: "La científica investigó el virus nuevo." },
  { word: "el cocinero / la cocinera", translation: "cook; chef", emoji: "👨‍🍳", example: "El cocinero preparó un plato delicioso." },
  { word: "contratar", translation: "to hire", emoji: "🤝", example: "La compañía va a contratar a veinte personas." },
  { word: "el contador / la contadora", translation: "accountant", emoji: "📊", example: "La contadora revisó los libros financieros." },
  { word: "el currículum", translation: "résumé", emoji: "📄", example: "Ella envió su currículum a varias empresas." },
  { word: "dejar", translation: "to quit; to leave behind", emoji: "🚪", example: "Él dejó su trabajo para estudiar." },
  { word: "despedir (e:i)", translation: "to fire", emoji: "❌", example: "El jefe despidió al empleado irresponsable." },
  { word: "el diseñador / la diseñadora", translation: "designer", emoji: "🎨", example: "La diseñadora creó un anuncio brillante." },
  { word: "el ejecutivo / la ejecutiva", translation: "executive", emoji: "👔", example: "El ejecutivo tuvo una reunión importante." },
  { word: "el electricista / la electricista", translation: "electrician", emoji: "⚡", example: "El electricista arregló el cableado." },
  { word: "la entrevista", translation: "interview", emoji: "🗣️", example: "Tengo una entrevista de trabajo mañana." },
  { word: "ganar", translation: "to earn", emoji: "💵", example: "Ella gana un buen salario como abogada." },
  { word: "el gerente / la gerente", translation: "manager", emoji: "🏢", example: "El gerente aprobó el nuevo proyecto." },
  { word: "invertir (e:ie)", translation: "to invest", emoji: "📉", example: "Es importante invertir en tu educación." },
  { word: "el jefe / la jefa", translation: "boss", emoji: "👑", example: "Mi jefa es muy exigente pero justa." },
  { word: "el maestro / la maestra", translation: "teacher", emoji: "🍎", example: "La maestra explicó la lección claramente." },
  { word: "el peluquero / la peluquera", translation: "hairdresser", emoji: "✂️", example: "La peluquera cortó el cabello perfectamente." },
  { word: "el político / la política", translation: "politician", emoji: "🗳️", example: "El político habló sobre el desempleo." },
  { word: "el psicólogo / la psicóloga", translation: "psychologist", emoji: "🧠", example: "La psicóloga ayudó al paciente." },
  { word: "el puesto", translation: "position; job", emoji: "💼", example: "Solicité el puesto de gerente." },
  { word: "renunciar", translation: "to resign (from)", emoji: "🏳️", example: "Ella renunció a su puesto ayer." },
  { word: "el reportero / la reportera", translation: "reporter", emoji: "📰", example: "El reportero cubrió la conferencia." },
  { word: "la reunión", translation: "meeting", emoji: "👥", example: "Tenemos una reunión a las tres." },
  { word: "el salario / el sueldo", translation: "salary", emoji: "💳", example: "Mi sueldo aumentó este año." },
  { word: "solicitar", translation: "to apply (for a job)", emoji: "📬", example: "Voy a solicitar el empleo mañana." },
  { word: "tener éxito", translation: "to be successful", emoji: "🏆", example: "Ella tuvo mucho éxito en su carrera." },
  { word: "el teletrabajo", translation: "telecommuting", emoji: "💻", example: "El teletrabajo es cada vez más común." },
  { word: "la videoconferencia", translation: "videoconference", emoji: "📹", example: "La reunión fue por videoconferencia." },
  { word: "el corredor de bolsa", translation: "stockbroker", emoji: "📈", example: "El corredor de bolsa invirtió bien." }
];

// ============================
// FLASHCARD LOGIC
// ============================
let currentCard = 0;
let seenCards = new Set();

const card      = document.getElementById('flashcard');
const fcWord    = document.getElementById('fc-word');
const fcTrans   = document.getElementById('fc-translation');
const fcEx      = document.getElementById('fc-example');
const fcEmoji   = document.getElementById('fc-emoji');
const fcCounter = document.getElementById('fc-counter');
const fcDotsEl  = document.getElementById('fc-dots');

function buildDots() {
  if (!fcDotsEl) return;
  fcDotsEl.innerHTML = '';
  vocabData.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'fc-dot' +
      (i === currentCard ? ' active' : seenCards.has(i) ? ' seen' : '');
    fcDotsEl.appendChild(d);
  });
}

function setCardContent(index) {
  const data = vocabData[index];
  if (fcWord)    fcWord.textContent    = data.word;
  if (fcTrans)   fcTrans.textContent   = data.translation;
  if (fcEx)      fcEx.textContent      = data.example;
  if (fcEmoji)   fcEmoji.textContent   = data.emoji;
  if (fcCounter) fcCounter.textContent = `${index + 1} / ${vocabData.length}`;
  buildDots();
}

function loadCard(index) {
  if (!card) return;
  if (card.classList.contains('flipped')) {
    card.classList.remove('flipped');
    // Wait for the flip animation to complete before swapping content
    setTimeout(() => setCardContent(index), 300);
  } else {
    setCardContent(index);
  }
}

if (card) {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    seenCards.add(currentCard);
    buildDots();
  });
}

document.getElementById('fc-prev').addEventListener('click', () => {
  currentCard = (currentCard - 1 + vocabData.length) % vocabData.length;
  loadCard(currentCard);
});

document.getElementById('fc-next').addEventListener('click', () => {
  currentCard = (currentCard + 1) % vocabData.length;
  loadCard(currentCard);
});

loadCard(0);


// ============================
// QUIZ ENGINE
// ============================
function shuffleArr(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuiz(containerId, questions) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  questions.forEach((q, qi) => {
    const item = document.createElement('div');
    item.className = 'q-item';

    const qText = document.createElement('div');
    qText.className = 'q-text';
    qText.innerHTML = `<span class="q-number">${qi + 1}</span> ${q.question}`;
    item.appendChild(qText);

    const optsGrid = document.createElement('div');
    optsGrid.className = 'q-options';

    const shuffled = shuffleArr(q.options);
    let answered = false;

    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'q-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const allBtns = optsGrid.querySelectorAll('.q-opt');
      allBtns.forEach(b => {
  b.disabled = true;
});

  if (opt === q.answer) {
  btn.classList.add('correct');
  fb.textContent = '✅ ¡Correcto!';
  fb.className = 'q-feedback correct';
    } else {
  btn.classList.add('wrong');
  // Mark the correct answer green as a hint, flagged as revealed
  allBtns.forEach(b => {
    if (b.textContent === q.answer) b.classList.add('correct', 'revealed');
  });
  fb.textContent = `❌ Incorrecto. La respuesta correcta es: "${q.answer}"`;
  fb.className = 'q-feedback wrong';
  }
        updateScore(containerId);
      });
      optsGrid.appendChild(btn);
    });

    item.appendChild(optsGrid);

    const fb = document.createElement('div');
    fb.className = 'q-feedback';
    item.appendChild(fb);

    container.appendChild(item);
  });

  // Score bar
  const scoreBar = document.createElement('div');
  scoreBar.className = 'quiz-score';
  scoreBar.id = containerId + '-score';
  scoreBar.innerHTML = `
    <span>Score: <strong id="${containerId}-pts">0</strong> / ${questions.length}</span>
    <button class="quiz-reset" data-container="${containerId}">🔄 Restart</button>
  `;
  container.appendChild(scoreBar);
}

function updateScore(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  // Count buttons marked correct that are NOT also marked wrong
  const correctCount = container.querySelectorAll('.q-opt.correct:not(.wrong):not(.revealed)').length;
  const ptsEl = document.getElementById(containerId + '-pts');
  if (ptsEl) ptsEl.textContent = correctCount;
}

// Single delegated listener handles all restart buttons
document.addEventListener('click', e => {
  if (!e.target.classList.contains('quiz-reset')) return;
  const cid = e.target.dataset.container;
  if (cid === 'vocab-q-container')  buildQuiz('vocab-q-container',  shuffleArr(vocabQuestions).slice(0, 8));
  if (cid === 'future-q-container') buildQuiz('future-q-container', shuffleArr(futureQuestions).slice(0, 7));
  if (cid === 'fp-q-container')     buildQuiz('fp-q-container',     shuffleArr(futurePerfectQuestions).slice(0, 7));
  if (cid === 'ps-q-container')     buildQuiz('ps-q-container',     shuffleArr(pastSubjQuestions).slice(0, 7));
});


// ============================
// VOCAB QUIZ DATA
// ============================
const vocabQuestions = [
  { question: "What does <em>el ascenso</em> mean?", options: ["salary", "promotion", "benefits", "position"], answer: "promotion" },
  { question: "Which word means 'to hire'?", options: ["despedir", "contratar", "renunciar", "solicitar"], answer: "contratar" },
  { question: "What does <em>el currículum</em> mean?", options: ["career", "résumé", "meeting", "interview"], answer: "résumé" },
  { question: "Which word means 'to fire (an employee)'?", options: ["contratar", "ganar", "despedir", "dejar"], answer: "despedir" },
  { question: "What is <em>el teletrabajo</em>?", options: ["telecommuting", "videoconference", "benefits", "salary"], answer: "telecommuting" },
  { question: "What does <em>solicitar</em> mean?", options: ["to resign", "to invest", "to apply for a job", "to earn"], answer: "to apply for a job" },
  { question: "What does <em>el puesto</em> mean?", options: ["position; job", "meeting", "raise", "career"], answer: "position; job" },
  { question: "Which word means 'accountant'?", options: ["el gerente", "el contador", "el diseñador", "el ejecutivo"], answer: "el contador" },
  { question: "What does <em>tener éxito</em> mean?", options: ["to be successful", "to earn money", "to resign", "to invest"], answer: "to be successful" },
  { question: "What does <em>los beneficios</em> mean?", options: ["salaries", "promotions", "benefits", "raises"], answer: "benefits" },
  { question: "Which word means 'stockbroker'?", options: ["el contador", "el corredor de bolsa", "el ejecutivo", "el psicólogo"], answer: "el corredor de bolsa" },
  { question: "What does <em>el aumento de sueldo</em> mean?", options: ["job application", "raise", "promotion", "résumé"], answer: "raise" },
];

// ============================
// FUTURE TENSE QUIZ DATA
// ============================
const futureQuestions = [
  { question: "Choose the correct future form of <em>hablar</em> for <strong>yo</strong>:", options: ["hablaré", "hablarás", "hablará", "hablaremos"], answer: "hablaré" },
  { question: "Complete: 'El gerente _____ (contratar) a veinte personas.'", options: ["contratará", "contrata", "contrató", "contratando"], answer: "contratará" },
  { question: "Which is the correct future stem of <em>tener</em>?", options: ["tener-", "tenerá-", "tendr-", "teniend-"], answer: "tendr-" },
  { question: "Complete: 'Nosotros _____ (trabajar) en la empresa nueva.'", options: ["trabajaremos", "trabajarán", "trabajaréis", "trabajaremos"], answer: "trabajaremos" },
  { question: "Which sentence correctly uses the future tense?", options: ["Ella va solicitar el puesto.", "Ella solicitará el puesto.", "Ella solicitó el puesto.", "Ella solicitando el puesto."], answer: "Ella solicitará el puesto." },
  { question: "Complete: 'Tú _____ (recibir) el ascenso pronto.'", options: ["recibirás", "recibirá", "recibirán", "recibiré"], answer: "recibirás" },
  { question: "What is the future of <em>hacer</em> for <strong>él</strong>?", options: ["hacerá", "hará", "hacará", "harás"], answer: "hará" },
  { question: "Complete: 'Los científicos _____ (descubrir) nuevas vacunas.'", options: ["descubrirán", "descubrirá", "descubriré", "descubriremos"], answer: "descubrirán" },
  { question: "Which ending is correct for <strong>vosotros</strong> in the future?", options: ["-án", "-emos", "-éis", "-ás"], answer: "-éis" },
  { question: "Complete: 'Yo _____ (renunciar) al puesto el viernes.'", options: ["renunciaré", "renunciará", "renunciando", "renunciaba"], answer: "renunciaré" },
];

// ============================
// FUTURE PERFECT QUIZ DATA
// ============================
const futurePerfectQuestions = [
  { question: "Complete: 'Para el lunes, yo _____ (terminar) el currículum.'", options: ["habré terminado", "habrá terminado", "habremos terminado", "habré terminando"], answer: "habré terminado" },
  { question: "Which is the correct future perfect form for <strong>ella</strong>?", options: ["habré hablado", "habrá hablado", "habremos hablado", "habrán hablado"], answer: "habrá hablado" },
  { question: "Complete: 'Dentro de un año, nosotros _____ (obtener) el ascenso.'", options: ["habremos obtenido", "habrán obtenido", "habré obtenido", "habrá obtenido"], answer: "habremos obtenido" },
  { question: "Which sentence uses the future perfect correctly?", options: ["Para las cinco, él saldrá.", "Para las cinco, él habrá salido.", "Para las cinco, él habría salido.", "Para las cinco, él salió."], answer: "Para las cinco, él habrá salido." },
  { question: "Complete: '¿Tú _____ (renunciar) antes del viernes?'", options: ["habrás renunciado", "habrá renunciado", "habrán renunciado", "habremos renunciado"], answer: "habrás renunciado" },
  { question: "What is the past participle of <em>invertir</em>?", options: ["invertando", "invirtiendo", "invertido", "inverso"], answer: "invertido" },
  { question: "Complete: 'Para el año 2030, los científicos _____ (descubrir) mucho.'", options: ["habrán descubierto", "habremos descubierto", "habrá descubierto", "habré descubierto"], answer: "habrán descubierto" },
  { question: "Which time phrase pairs naturally with the future perfect?", options: ["ayer", "mañana por la mañana", "para cuando llegues", "hace dos años"], answer: "para cuando llegues" },
];

// ============================
// PAST SUBJUNCTIVE QUIZ DATA
// ============================
const pastSubjQuestions = [
  { question: "Complete: 'El jefe quería que yo _____ (llegar) a tiempo.'", options: ["llegara", "llego", "llegaré", "llegué"], answer: "llegara" },
  { question: "Complete: 'Me sorprendió que ella _____ (renunciar) al puesto.'", options: ["renunciara", "renuncia", "renunciará", "renunció"], answer: "renunciara" },
  { question: "Which sentence triggers the past subjunctive correctly?", options: ["Sé que trabaja aquí.", "Quería que trabajara aquí.", "Trabajará aquí mañana.", "Trabaja aquí todos los días."], answer: "Quería que trabajara aquí." },
  { question: "What is the past subjunctive of <em>tener</em> for <strong>ellos</strong>?", options: ["tenieran", "tuvieran", "tenieron", "teniéran"], answer: "tuvieran" },
  { question: "Complete: 'Le pedí al contador que _____ (invertir) los fondos.'", options: ["invirtiera", "invertiría", "invirtió", "invertirá"], answer: "invirtiera" },
  { question: "Which word triggers the past subjunctive in 'Era importante que los aspirantes _____ un currículum'?", options: ["Era importante que", "los aspirantes", "un currículum", "prepararan"], answer: "Era importante que" },
  { question: "Complete: 'Si _____ (tener) más experiencia, solicitaría el puesto.'", options: ["tuviera", "tenía", "tendría", "tiene"], answer: "tuviera" },
  { question: "Complete: 'No creíamos que el científico _____ (tener) tanto éxito.'", options: ["tuviera", "tenía", "tendrá", "tiene"], answer: "tuviera" },
  { question: "The past subjunctive is formed from which form of the verb?", options: ["yo present", "tú present", "ellos preterite", "nosotros imperfect"], answer: "ellos preterite" },
  { question: "Complete: 'Buscaban un empleado que _____ (hablar) tres idiomas.'", options: ["hablara", "habla", "hablará", "hablando"], answer: "hablara" },
];


// ============================
// INIT QUIZZES
// ============================
buildQuiz('vocab-q-container',  shuffleArr(vocabQuestions).slice(0, 8));
buildQuiz('future-q-container', shuffleArr(futureQuestions).slice(0, 7));
buildQuiz('fp-q-container',     shuffleArr(futurePerfectQuestions).slice(0, 7));
buildQuiz('ps-q-container',     shuffleArr(pastSubjQuestions).slice(0, 7));

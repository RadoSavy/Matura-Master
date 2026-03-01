/**
 * Bulgarian Language Lessons Data
 * This file contains all 21 lessons for the Firestore database
 */

export const BULGARIAN_LESSONS = [
  {
    id: 1,
    title: "Текстът в масовата комуникация. Информационна бележка",
    description: "Научи как работят медиите, какво прави една новина силна и как да разпознаваш типовете медийни текстове",
    icon: "📡",
    xp: 20,
    section: 1,
    content: `<div class="lesson-content"><div class="story-intro"><div class="character-card"><div class="character-avatar">👨🏻‍🏫</div><div class="character-text"><strong>Преподавателят Иван:</strong> "Днес ще се гмурнем в света на масовата комуникация – новини, репортажи, интервюта и още много!"</div></div></div><div class="section-block"><h3>📣 Какво представлява масовата комуникация?</h3><p>Това е общуване, което достига до огромна аудитория чрез посредник – <strong>медия</strong>. Медии са: интернет, телевизия, радио, вестници, списания, социални мрежи и др.</p></div><div class="media-example"><div class="example-card news"><h4>📰 Пример за информационен медиен текст:</h4><p><strong>„Пак българки, пак златни!"</strong></p><p>Новият състав на ансамбъла по художествена гимнастика направи блестяща победа и спечели златния медал в многобоя на Световната купа в Песаро.</p><div class="example-features"><span class="feature-tag">📊 Факти</span><span class="feature-tag">⏱️ Актуалност</span><span class="feature-tag">🌍 Широка аудитория</span></div></div></div><div class="section-block"><h3>🥇 Защо победата е наречена „блестяща"?</h3><p>Защото новият ансамбъл печели голям международен медал още при първото си участие. Това е силно начало и голям успех.</p></div></div>`,
    questions: [
      {
        question: "Кое НЕ е предназначение на медийния текст?",
        options: [
          { text: "Да информира за актуални събития", correct: false },
          { text: "Да развлича аудиторията", correct: false },
          { text: "Да влияе на общественото мнение", correct: false },
          { text: "Да създава метафорични художествени светове", correct: true }
        ],
        explanation: "Медийният текст може да съдържа емоции, но не е художествено произведение."
      }
    ]
  },
  {
    id: 2,
    title: "Репортаж. Интервю",
    description: "Научете да създавате силни медийни текстове – репортаж и интервю",
    icon: "🎬",
    xp: 15,
    section: 1,
    content: `<div class="lesson-content"><div class="media-analyst"><h3>📺 Какво представляват репортажът и интервюто?</h3></div></div>`,
    questions: [
      {
        question: "Кое е вярно за интервюто?",
        options: [
          { text: "Използва диалогична форма", correct: true },
          { text: "Предава само лични впечатления на автора", correct: false },
          { text: "Съдържа само сухи факти", correct: false },
          { text: "Няма информативна стойност", correct: false }
        ],
        explanation: "Интервюто комбинира диалогична форма с информативност."
      }
    ]
  },
  {
    id: 3,
    title: "Извличане и анализ на информация от медиен текст",
    description: "Открийте как журналистите извличат факти, задават въпроси и оформят информацията",
    icon: "📰",
    xp: 20,
    section: 1,
    content: `<div class="lesson-content"><div class="newsroom-simulation"><h3>🏢 Добре дошли в редакцията на 'Вестник Ученик'!</h3></div></div>`,
    questions: [
      {
        question: "Кой от етапите е свързан с проверяване на източници?",
        options: [
          { text: "Етап на запознаване", correct: true },
          { text: "Етап на извличане на информация", correct: false },
          { text: "Етап на обработване на информация", correct: false },
          { text: "Етап на публикуване", correct: false }
        ],
        explanation: "Запознаването включва първоначален прочит, проверка на източници и изясняване на непознати думи."
      }
    ]
  },
  {
    id: 4,
    title: "Художествен текст",
    description: "Научи как работи художествената литература – образи, емоции, стил",
    icon: "📚",
    xp: 15,
    section: 1,
    content: `<div class="lesson-content"><div class="detective-theme"><h3>🎨 Какво прави един текст художествен?</h3></div></div>`,
    questions: [
      {
        question: "Кое отличава художествения текст от другите видове текстове?",
        options: [
          { text: "Предава факти без емоции", correct: false },
          { text: "Цели да създаде образи и емоции чрез езикови средства", correct: true },
          { text: "Използва само кратки и ясни изречения", correct: false },
          { text: "Съдържа задължително диалогична форма", correct: false }
        ],
        explanation: "Художественият текст работи с емоции, образност и художествени средства."
      }
    ]
  },
  {
    id: 5,
    title: "Думата като лексикално средство в текста",
    description: "Открий магията на художествения текст и научи как думите създават образи и емоции",
    icon: "📖",
    xp: 15,
    section: 2,
    content: `<div class="lesson-content"><div class="creative-workshop"><h3>🎨 Творческа работилница</h3></div></div>`,
    questions: [
      {
        question: "Коя функция на думата се проявява в изречението: 'Сърцето ми изпълни с радост'?",
        options: [
          { text: "Информативна функция", correct: false },
          { text: "Емоционална функция", correct: true },
          { text: "Естетическа функция", correct: false },
          { text: "Социална функция", correct: false }
        ],
        explanation: "Изразяването на чувства и емоции е емоционална функция на думите."
      }
    ]
  },
  {
    id: 6,
    title: "Думата в речниковия състав на българския език",
    description: "Разкрий силата на думите и се научи да ги използваш като професионален писател",
    icon: "🔤",
    xp: 15,
    section: 2,
    content: `<div class="lesson-content"><div class="word-power"><h3>💪 Силата на думата</h3></div></div>`,
    questions: [
      {
        question: "Какво представляват синонимите?",
        options: [
          { text: "Думи с противоположно значение", correct: false },
          { text: "Думи, които звучат еднакво", correct: false },
          { text: "Думи с близко или сходно значение", correct: true },
          { text: "Думи с няколко значения", correct: false }
        ],
        explanation: "Синонимите са думи, които имат сходно или близко значение и могат да се използват за избягване на повторения."
      }
    ]
  },
  {
    id: 7,
    title: "Звукови промени в думата",
    description: "Открий произхода и богатството на българския език чрез звуковите промени в думите",
    icon: "🔊",
    xp: 15,
    section: 2,
    content: `<div class="lesson-content"><div class="dictionary-quest"><h3>🗺️ Пътешествие в речника</h3></div></div>`,
    questions: [
      {
        question: "Кой пример показва подвижно ъ?",
        options: [
          { text: "тигърче", correct: false },
          { text: "връв", correct: true },
          { text: "пяха", correct: false },
          { text: "лавка", correct: false }
        ],
        explanation: "Подвижното ъ се появява в едносрични думи като 'връв'."
      }
    ]
  },
  {
    id: 8,
    title: "Наклонение на глагола. Изявително, условно и повелително наклонение",
    description: "Разбери как глаголните форми изразяват отношението на говорещия към действието",
    icon: "📚",
    xp: 15,
    section: 3,
    content: `<div class="lesson-content"><div class="verb-mood-intro"><h3>🔹 Наклонение на глагола</h3></div></div>`,
    questions: [
      {
        question: "В кое наклонение е глаголът 'влязох'?",
        options: [
          { text: "Изявително наклонение", correct: true },
          { text: "Условно наклонение", correct: false },
          { text: "Повелително наклонение", correct: false }
        ],
        explanation: "Глаголът 'влязох' описва реално извършено действие и е в изявително наклонение."
      }
    ]
  },
  {
    id: 9,
    title: "Преизказни глаголни форми",
    description: "Научи се да предаваш чужди думи, съобщения и емоции в минало време",
    icon: "🤔",
    xp: 15,
    section: 3,
    content: `<div class="lesson-content"><div class="indirect-speech-intro"><h3>🗣️ Преизказни глаголни форми</h3></div></div>`,
    questions: [
      {
        question: "Кога се използват преизказни глаголни форми?",
        options: [
          { text: "Когато говорещият е пряк свидетел на действието", correct: false },
          { text: "Когато съобщаваме за действие, чуто от друг човек", correct: true },
          { text: "За изразяване на бъдещи действия", correct: false },
          { text: "За даване на заповеди и молби", correct: false }
        ],
        explanation: "Преизказните форми се използват за предаване на чужди думи, събития или съобщения, които говорещият е чул, а не видял."
      }
    ]
  },
  {
    id: 10,
    title: "Глаголни времена",
    description: "Научи се да говориш за действия в минало, сегашно и бъдеще време",
    icon: "🕰️",
    xp: 15,
    section: 3,
    content: `<div class="lesson-content"><div class="time-lab"><h3>⏳ Лаборатория за глаголни времена</h3></div></div>`,
    questions: [
      {
        question: "Кое изречение е в минало несвършено време?",
        options: [
          { text: "Аз ходих в парка.", correct: false },
          { text: "Аз ходех в парка.", correct: true },
          { text: "Аз ще ходя в парка.", correct: false },
          { text: "Аз съм ходил в парка.", correct: false }
        ],
        explanation: "Миналото несвършено време изразява действие, което е продължавало в минал момент – 'Аз ходех в парка.'"
      }
    ]
  },
  {
    id: 11,
    title: "Съставно сказуемо",
    description: "Овладей всички видове съставни сказуеми и глаголни форми",
    icon: "⏰",
    xp: 20,
    section: 3,
    content: `<div class="lesson-content"><div class="predicate-intro"><h3>📝 Академия за сказуемото</h3></div></div>`,
    questions: [
      {
        question: "Кое изречение съдържа съставно именно сказуемо?",
        options: [
          { text: "Той започва да чете", correct: false },
          { text: "Учителят е строг", correct: true },
          { text: "Продължаваме да говорим", correct: false },
          { text: "Мога да пея", correct: false }
        ],
        explanation: "Съставното именно сказуемо се образува с глагола 'съм' и именна част – 'Учителят е строг'."
      }
    ]
  },
  {
    id: 12,
    title: "Обособени части в простото изречение. Обособено определение",
    description: "Научи се да откриваш и използваш обособени определения за по-богата реч",
    icon: "🔗",
    xp: 15,
    section: 4,
    content: `<div class="lesson-content"><div class="definition-intro"><h3>🖋️ Обособени части</h3></div></div>`,
    questions: [
      {
        question: "Какво е обособено определение?",
        options: [
          { text: "Главна част на изречението", correct: false },
          { text: "Второстепенна част, даваща допълнителна информация за съществителното", correct: true },
          { text: "Глаголно сказуемо", correct: false },
          { text: "Част от повелително наклонение", correct: false }
        ],
        explanation: "Обособеното определение е второстепенна част, която дава допълнителна характеристика за съществителното."
      }
    ]
  },
  {
    id: 13,
    title: "Обособени части в простото изречение. Обособено обстоятелствено пояснение",
    description: "Научи се да добавяш пояснения за време, място, начин и причина към действията",
    icon: "🕵️‍♂️",
    xp: 20,
    section: 4,
    content: `<div class="lesson-content"><div class="definition-intro"><h3>📌 Обособени обстоятелствени пояснения</h3></div></div>`,
    questions: [
      {
        question: "Какво пояснява обособеното обстоятелствено пояснение?",
        options: [
          { text: "Характеристиките на съществителното", correct: false },
          { text: "Действието – време, място, начин, причина, цел", correct: true },
          { text: "Главната част на изречението", correct: false },
          { text: "Глаголната форма на сказуемото", correct: false }
        ],
        explanation: "Обособеното обстоятелствено пояснение дава допълнителна информация за действието – кога, къде, как и защо е извършено."
      }
    ]
  },
  {
    id: 14,
    title: "Сложно съставно изречение",
    description: "Научи се да разпознаваш главни и подчинени изречения и тяхната синтактична функция",
    icon: "📝",
    xp: 15,
    section: 4,
    content: `<div class="lesson-content"><div class="definition-intro"><h3>📌 Сложно съставно изречение</h3></div></div>`,
    questions: [
      {
        question: "Какво отличава подчиненото изречение от главното?",
        options: [
          { text: "Може да стои самостоятелно", correct: false },
          { text: "Не може да стои самостоятелно и зависи от главното", correct: true },
          { text: "Винаги е в сегашно време", correct: false },
          { text: "Не съдържа глаголи", correct: false }
        ],
        explanation: "Подчиненото изречение е незавършено по смисъл и винаги се свързва с главното чрез подчинителни връзки."
      }
    ]
  },
  {
    id: 15,
    title: "Сложно съставно изречение. Словоред и пунктуация",
    description: "Разбери структурата на сложно съставното изречение и видовете съставно сказуемо",
    icon: "🔗",
    xp: 15,
    section: 4,
    content: `<div class="lesson-content"><div class="syntax-intro"><h3>🧩 Словоред и пунктуация</h3></div></div>`,
    questions: [
      {
        question: "Какво показва запетаята между главно и подчинено изречение?",
        options: [
          { text: "Че подчиненото е самостоятелно", correct: false },
          { text: "Че подчиненото е отделено по смисъл и пунктуационно", correct: true },
          { text: "Че главното изречение е непълно", correct: false },
          { text: "Че изречението е въпросително", correct: false }
        ],
        explanation: "Запетаята отделя подчиненото от главното, подчертавайки зависимостта му и осигурявайки яснота."
      }
    ]
  },
  {
    id: 16,
    title: "Сложно смесено изречение",
    description: "Научи се да разпознаваш сложните смесени изречения и обособените определения",
    icon: "📌",
    xp: 15,
    section: 4,
    content: `<div class="lesson-content"><div class="mixed-sentences-intro"><h3>🔗 Какво е сложно смесено изречение?</h3></div></div>`,
    questions: [
      {
        question: "Кога сложно смесено изречение съдържа и съчинителна, и подчинителна връзка?",
        options: [
          { text: "Когато има две подчинени изречения", correct: false },
          { text: "Когато поне три прости изречения са свързани чрез комбинация от съчинителни и подчинителни съюзи", correct: true },
          { text: "Когато има само главно изречение", correct: false },
          { text: "Когато няма съюзи", correct: false }
        ],
        explanation: "Сложното смесено изречение комбинира съчинителна и подчинителна връзка между простите изречения."
      }
    ]
  },
  {
    id: 17,
    title: "Пряко, непряко и полупряко предаване на чужда реч",
    description: "Разбери как се предава речта на герой: пряко, непряко или полупряко",
    icon: "📍",
    xp: 15,
    section: 5,
    content: `<div class="lesson-content"><div class="speech-intro"><h3>🗣️ Видове предаване на чужда реч</h3></div></div>`,
    questions: [
      {
        question: "Кое от следните е характеристика на пряката реч?",
        options: [
          { text: "Предава се по смисъл на автора", correct: false },
          { text: "Дословно предадена и отделена с тире или кавички", correct: true },
          { text: "Представя мислите на героя, без кавички", correct: false },
          { text: "Използва съюзи като че или да", correct: false }
        ],
        explanation: "Пряката реч предава дословно думите на героя и се отделя с тире или кавички."
      }
    ]
  },
  {
    id: 18,
    title: "Правописно и пунктуационно оформяне на цитиране",
    description: "Научи правилата за цитиране и оформяне на цитати в изречението",
    icon: "🧩",
    xp: 20,
    section: 5,
    content: `<div class="lesson-content"><div class="citation-intro"><h3>📖 Цитиране в текста</h3></div></div>`,
    questions: [
      {
        question: "Къде се поставя точката при цитат, който завършва с въпросителен знак?",
        options: [
          { text: "След кавичките", correct: true },
          { text: "Вътре в кавичките", correct: false },
          { text: "Не се слага точка", correct: false },
          { text: "В средата на цитата", correct: false }
        ],
        explanation: "Ако цитатът завършва с въпросителен или удивителен знак и е в края на изречението, точката остава след кавичките."
      }
    ]
  },
  {
    id: 19,
    title: "Отговор на нравствен въпрос",
    description: "Научи как да аргументираш мнение по морални въпроси",
    icon: "⚖️",
    xp: 20,
    section: 5,
    content: `<div class="lesson-content"><div class="moral-intro"><h3>🧠 Отговор на нравствен въпрос</h3></div></div>`,
    questions: [
      {
        question: "Кое от следните най-добре описва отговор на нравствен въпрос?",
        options: [
          { text: "Просто съобщение за факт", correct: false },
          { text: "Разсъждение за добро и зло с аргументи", correct: true },
          { text: "Списък с дати и събития", correct: false },
          { text: "Рецепта или инструкция", correct: false }
        ],
        explanation: "Отговорът на нравствен въпрос разглежда морални дилеми, аргументира позиция и анализира различни гледни точки."
      }
    ]
  },
  {
    id: 20,
    title: "Текстове за преразказ",
    description: "Упражнявай се в преразказа на различни текстове",
    icon: "📖",
    xp: 15,
    section: 5,
    content: `<div class="lesson-content"><div class="retelling-master"><h3>🔄 Майстор на преразказа</h3></div></div>`,
    questions: [
      {
        question: "Каква е основната цел на преразказа?",
        options: [
          { text: "Да се промени напълно смисълът на текста", correct: false },
          { text: "Да се запази смисълът, но да се промени формата на изразяване", correct: true },
          { text: "Да се съкрати текстът максимално", correct: false },
          { text: "Да се добавят нови събития", correct: false }
        ],
        explanation: "Преразказът има за цел да запази основния смисъл на текста, но да го изрази по различен начин."
      }
    ]
  },
  {
    id: 21,
    title: "Таблици",
    description: "Работа с таблици и представяне на информация",
    icon: "📊",
    xp: 10,
    section: 6,
    content: `<div class="lesson-content"><div class="table-master"><h3>📊 Майстор на таблиците</h3></div></div>`,
    questions: [
      {
        question: "Каква е основната цел на таблицата?",
        options: [
          { text: "Да украси текста", correct: false },
          { text: "Да организира и представи информация ясно и систематично", correct: true },
          { text: "Да усложни информацията", correct: false },
          { text: "Да заеме място в документа", correct: false }
        ],
        explanation: "Таблицата има за цел да организира и представи информацията ясно, систематично и лесно за разбиране."
      }
    ]
  }
];

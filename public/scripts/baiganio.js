document.addEventListener('DOMContentLoaded', function () {
  const chat = document.getElementById('chat');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickQuestions = document.querySelectorAll('.quick-question');

  const knowledgeBase = {
    "частици": {
        answer: "Частиците в българския език са:\n1. Отрицателни (не, ни)\n2. Възклицателни (ех, ох, ах)\n3. Утвердителни (да, ами)\n4. Съединителни (и, а, но, че)\n5. Въпросителни (ли, дали, защо)",
        examples: ["Не искам да отида.", "Ех, колко хубаво!", "Ще дойдеш ли утре?"]
    },
    "правопис на не и ни": {
        answer: "Правопис на 'не' и 'ни':\n- 'Не' се пише отделно с глаголи: не искам, не чета\n- 'Не' се пише слитно с прилагателни и наречия: неинтересен, невнимателно\n- 'Ни' се използва за усилване на отрицание: нито идвам, нито пиша\nИзключения:\n- Когато има противопоставяне: 'не висок, а нисък'\n- При повторение: 'нито риба, нито месо'",
        examples: ["Не мога да дойда.", "Нито ми се яде, нито ми се спи."],
        rules: ["Не + глагол = отделно", "Не + прилагателно/наречие = слитно"]
    },
    "ъ и ь": {
        answer: "Правопис на 'ъ' и 'ь':\n1. 'Ъ' се пише:\n- След префикс пред 'я', 'ю': съюз, обезъязвим\n- В корена на думите: ъгъл, мъка\n2. 'Ь' се пише:\n- Между съгласна и 'о': шьов, жьол\n- В някои чужди думи: бульон",
        examples: ["съжалявам", "обезъяна", "шьол"]
    },
    "морфеми": {
        answer: "Морфемите са най-малките значими части на думата:\n1. Корен - носи основното значение\n2. Префикс - пред корена\n3. Суфикс - след корена\n4. Окончание - променя се според граматичните правила",
        examples: ["под-вод-н-и", "пре-пиш-вам"]
    },
    "глаголни времена": {
        answer: "Глаголни времена в българския език:\n1. Сегашно: чета, пишеш\n2. Минало несвършено: четях, пишеше\n3. Минало свършено: прочетох, написа\n4. Минало предварително: бях чел, беше писал\n5. Бъдеще: ще чета, ще пиша\n6. Бъдеще в миналото: щях да чета\n7. Бъдеще предварително: ще съм чел",
        examples: ["Той четяше (минало несвършено)", "Той е чел (минало предварително)", "Той щеше да чете (бъдеще в миналото)"],
        rules: ["Минало свършено за 1 л. ед.ч. завършва на -х: писах"]
    },
    "съществително име": {
        answer: "Съществителното име:\n- Назовава хора, животни, предмети, понятия\n- Има род (мъжки, женски, среден)\n- Има число (единствено и множествено)\n- Склонява се (променя се по падежи)",
        examples: ["мъжки род: ученик", "женски род: учителка", "среден род: дете"]
    },
    "прилагателно име": {
        answer: "Прилагателното име:\n- Означава качество или признак на предмет\n- Съгласува се по род, число и падеж със съществителното\n- Степенува се: положителна, сравнителна, превъзходна",
        examples: ["хубав", "по-хубав", "най-хубав"]
    },
    "числително име": {
        answer: "Числителното име:\n- Означава брой, ред или количество\n- Видове: бройни (едно, две), редни (първи, втори), дробни (половин, една трета)",
        examples: ["пет ученика", "втори клас", "половин ябълка"]
    },
    "местоимения": {
        answer: "Видове местоимения:\n1. Лични: аз, ти, той, тя, то, ние, вие, те\n2. Възвратни: себе си\n3. Притежателни: мой, твой, негов\n4. Въпросителни: кой, какъв, чий\n5. Относителни: който, какъвто\n6. Неопределителни: някой, нещо\n7. Отрицателни: никой, нищо",
        rules: ["Местоименията заместват имена"]
    },
    "глагол": {
        answer: "Глаголът:\n- Означава действие или състояние\n- Има вид (свършен и несвършен)\n- Има време (сегашно, минало, бъдеще)\n- Има наклонение (изявително, повелително, условно)",
        examples: ["чета (несвършен вид)", "прочета (свършен вид)"]
    },
    "причастия": {
        answer: "Видове причастия:\n1. Сегашно деятелно: четящ, пишещ\n2. Минало деятелно: чел, писал\n3. Минало страдателно: четен, писан\n4. Деепричастие: четейки, пишейки\nПравила:\n- Сегашните причастия се образуват с -щ/-ящ\n- Миналото деятелно причастие се образува с -л\n- Миналото страдателно причастие се образува с -н/-т",
        examples: ["Четейки книгата (деепричастие)", "Прочетената книга (минало страдателно)"]
    },
    "наречие": {
        answer: "Наречието:\n- Означава признак на действие, качество или друг признак\n- Видове: начин (бързо, хубаво), място (тук, там), време (сега, тогава), количество (много, малко)",
        examples: ["Той бързо тича.", "Тя пее хубаво."]
    },
    "предлог": {
        answer: "Предлозите:\n- Изразяват отношение между думите в изречението\n- Видове: прост (в, на, за, с) и съставен (въпреки, заради)",
        examples: ["Отивам на училище.", "Вървя с приятел."]
    },
    "съюз": {
        answer: "Съюзите:\n- Свързват думи или изречения\n- Видове: съчинителни (и, а, но, че) и подчинителни (че, защото, ако)",
        examples: ["Искам да чета и да пиша.", "Отивам, защото трябва."]
    },
    "частица": {
        answer: "Частиците:\n- Придават допълнителни нюанси на изречението\n- Видове: възклицателни (ех, ох), отрицателни (не), утвердителни (да)",
        examples: ["Ох, колко боли!", "Не искам да отида."]
    },
    "междуметие": {
        answer: "Междуметията:\n- Изразяват чувства или подражават на звуци\n- Видове: емоционални (ах, ура), звукоподражателни (мряу, бум)",
        examples: ["Ура, утре е уикенд!", "Кучето прави бау-бау."]
    },
    "описание": {
        answer: "Описание:\n- Представя предмети, хора, места или явления\n- Използва много прилагателни и наречия\n- Може да бъде: предметно, пейзажно, портретно, динамично",
        examples: ["Описание на природа", "Описание на човек"]
    },
    "повествование": {
        answer: "Повествование:\n- Разказва за събития или действия\n- Има начало, развитие и край\n- Често се използва в приказки, разкази, романи",
        rules: ["Хронологичен ред на събитията", "Главни герои", "Кулминация"]
    },
    "разсъждение": {
        answer: "Разсъждение:\n- Излага мнение, идеи или твърдения\n- Съдържа теза, аргументи и заключение\n- Използва се в есета, статии, дискусии",
        examples: ["Разсъждение на тема 'Защо трябва да четем'"]
    },
    "изречение": {
        answer: "Части на изречението:\n1. Подлог - кой/какво извършва действието\n2. Сказуемо - какво прави подлогът\n3. Допълнение - обект на действието\n4. Определение - пояснява подлог или допълнение\n5. Обстоятелствено пояснение - място, време, начин",
        examples: ["Ученикът (подлог) чете (сказуемо) книга (допълнение) внимателно (обст. пояснение)"]
    },
    "сложни изречения": {
        answer: "Видове сложни изречения:\n1. Сложносъчинени - съставени от равноправни части (съюзи: и, а, но, ами, или)\n2. Сложноподчинени - има главно и подчинено изречение (съюзи: че, когато, ако, защото, тъй като)\n3. Сложносъставни - комбинация от съчинени и подчинени части\n4. Безсъюзни - частите се разделят със запетая, точка и запетая или двоеточие",
        examples: ["Четях книга, а той гледаше телевизия (съчинено).", "Като влезе в стаята, всички млъкнаха (подчинено)."],
        rules: ["Подчинените изречения винаги се отделят със запетая"]
    },
    "чужда реч": {
        answer: "Начини за предаване на чужда реч:\n1. Пряка реч: \"Ще дойда утре\", каза той.\n2. Непряка реч: Той каза, че ще дойде утре.\n3. Полупряка реч: Той ще дойде утре, каза си.",
        rules: ["Пряката реч се поставя в кавички"]
    },
    "една българка": {
        answer: "Разказ 'Една българка' от Иван Вазов:\n- Героиня: баба Илийца, която пътува до манастира за помощ за болния си син\n- Среща калугера Евтимий, който ѝ помага\n- Теми: майчина любов, вяра, човечност, съпричастност",
        quotes: ["„Бог да го прости, че не ме позна!“"],
        themes: ["Майчина жертва", "Човечност", "Вяра"]
    },
    "по жътва": {
        answer: "Разказ 'По жътва' от Йордан Йовков:\n- Действие по време на жътва\n- Героиня: Пенка, която пее и утешава жътварите\n- Теми: сила на музиката, български фолклор, колективен труд",
        examples: ["Песента на Пенка прави труда по-лек"],
        themes: ["Фолклор", "Колективност", "Сила на изкуството"]
    },
    "серафим": {
        answer: "Разказ 'Серафим' от Йордан Йовков:\n- Герой: беден човек със златно сърце\n- Дарява последните си пари за лечение на непозната\n- Теми: състрадание, човечност, безкористност",
        quotes: ["„Какво съм направил! Никому нищо не съм направил...“"],
        themes: ["Доброта", "Саможертва", "Човечност"]
    },
    "опълченците на шипка": {
        answer: "Стихотворение 'Опълченците на Шипка' от Иван Вазов:\n- Възпява героизма на българските опълченци\n- Ключови символи: Шипка, Балкан, свобода\n- Художествени средства: алегория, метафора, хипербола",
        quotes: ["„Едно име ново, голямо, антично, като Термопили славно, безгранично!“"],
        themes: ["Патриотизъм", "Жертвоготовност", "Историческа памет"]
    },
    "по жицата": {
        answer: "Разказ 'По жицата' от Йордан Йовков:\n- Герои: Моканина, Негованка\n- Конфликт: любов срещу социални норми\n- Теми: невъзможна любов, социална несправедливост, спомен",
        examples: ["Трагичната смърт на героинята при жътва"],
        themes: ["Невъзможна любов", "Патриархално общество", "Трагедия"]
    },
    "неразделни": {
        answer: "Балада 'Неразделни' от Пенчо Слажейков:\n- Трагична любовна история\n- Символи: стройна Калина, кичест Явор\n- Теми: вечна любов, жертва, неразделност",
        quotes: ["„Калино, Калино, стройна Калино, защо си на сърце рана?“"],
        themes: ["Вечна любов", "Жертва", "Невъзможност за разделяне"]
    },
    "до чикаго и назад": {
        answer: "Пътеписи 'До Чикаго и назад' от Алеко Константинов:\n- Герой: Бай Ганьо\n- Културен шок на българина в чужбина\n- Характерни сцени: скандалът с килима във Виена",
        examples: ["„Какво ще ѝ гледам на Виената, град като град: хора, къщи, салтанати“"],
        themes: ["Национална идентичност", "Културни различия", "Комични ситуации"]
    },
    "заточеници": {
        answer: "Стихотворение 'Заточеници' от Иван Вазов:\n- Описва страданията на българските революционери в заточение\n- Теми: страдание, надежда, патриотизъм\n- Художествени средства: метафора, епитет, хипербола",
        quotes: ["„В мрачния зиндан, в подземия студен, където мрак и страх царуват вечно...“"]
    },
    "вятър ечи, балкан стене": {
        answer: "Песен 'Вятър ечи, Балкан стене' от Христо Ботев:\n- Възпява хайдушкия живот и борбата за свобода\n- Теми: свобода, жертва, природа\n- Строфи: 4 стиха, рима aabb",
        quotes: ["„Вятър ечи, Балкан стене, люшка се гора зелена...“"]
    },
    "под игото": {
        answer: "Основни теми в 'Под игото' на Иван Вазов:\n1. Борба за национално освобождение\n2. Любов към родината\n3. Животът по време на османското владичество\n4. Човешките взаимоотношения в трудни времена\nГлавни герои: Бойчо Огнянов, Рада, дядо Йоцо",
        quotes: ["Който падне в бой за свобода, той не умира!"]
    },
    "немили-недраги": {
        answer: "Герои в 'Немили-недраги' на Иван Вазов:\n1. Македонски – смел и буен хъш. Обича битките, но е и емоционален. Представлява борбения дух на българския революционер.\n2. Бръчков – Бръчков е млад, наивен, но идеалистичен хъш. Първо се възхищава на хъшовете, но после осъзнава трудната им съдба. Символ е на новото поколение и надеждата за бъдещето. Помага на Странджата в последните му мигове.\n3. Странджата – Странджата е болен и възрастен хъш, бивш знаменосец. Държи кръчма в Браила и помага на другите хъшове. Символ е на патриотизъм и саможертва. Умира, без да види свободна България.\n4. Хаджият – млад човек, но преждевременно състарен от тежката емигрантска участ. Хаджият е един  от посетителите на кръчмата на Знаменосеца, който също слуша разказите и спомените на своите другари.\nОсновен конфликт: саможертвата и трудностите на емигрантския живот в името на свободата на България.",
        themes: ["Патриотизъм", "Саможертва", "Борба за национално освобождение", "Емигрантски живот"]
    },
    "народни песни": {
        answer: "Видове български народни песни:\n1. Юнашки песни - за исторически събития\n2. Обичайни песни - за празници\n3. Любовни песни - за човешки чувства\n4. Трудови песни - свързани с занаяти",
        examples: ["Край Вардара вее се бяло знаме"]
    },
    "хайдути": {
        answer: "Поема 'Хайдути' на Христо Ботев:\n- Възпява хайдушкия живот и борбата срещу османското владичество\n- Главен герой: Димитър (Димо) хайдутин\n- Основна тема: свободата и готовността да се жертваш за нея",
        quotes: ["Какви е деца раждала българка майка юнашка!"]
    },
    "бай ганьо": {
        answer: "Бай Ганьо - герой на Алеко Константинов:\n- Типичен български образ с добри и лоши черти\n- Показва недостатъците на българското общество\n- Често е невеж, егоистичен, но и симпатичен",
        examples: ["Бай Ганьо пътува из Европа и прави гафове"]
    },
    "езикът на възрожденците": {
        answer: "Характерни черти на възрожденската литература:\n1. Патриотизъм и национална идея\n2. Реалистично описание на живота\n3. Обществени и нравствени теми\n4. Употреба на народен език\nПредставители: Вазов, Ботев, Каравелов",
        examples: ["Под игото", "Хайдути", "Епоха на Българското възраждане"]
    },
    "приказки": {
        answer: "Характеристики на приказките:\n1. Неопределено време и място\n2. Чудотворни елементи\n3. Доброто побеждава злото\n4. Поучителен характер\nВидове: животнински, волшебни, битови",
        examples: ["Котаракът в чизми", "Грозното патенце", "Червената шапчица"]
    },
    "стихотворни размери": {
        answer: "Основни стихотворни размери:\n1. Ямбо: ударение на втората сричка (пример: \"Там в планината висока\")\n2. Хорей: ударение на първата сричка (пример: \"Бързай, бързай, момче младо\")\n3. Дактил: ударение на първата от три срички (пример: \"Тъжно, тъжно, мили друже\")\n4. Амфибрахий: ударение на втората от три срички (пример: \"По синьо небе луна плува\")",
        rules: ["Стихотворният размер определя ритъма на стиха"]
    },
    "анализ на стихотворение": {
        answer: "Стъпки при анализ на стихотворение:\n1. Тема и основна мисъл\n2. Лирически герой\n3. Композиция (строфи, рими)\n4. Стихотворен размер\n5. Художествени средства (метафори, сравнения)\n6. Емоционално въздействие",
        examples: ["Анализ на \"Моята молитва\" от Христо Ботев"]
    },
    "епически произведения": {
        answer: "Характеристики на епическите произведения:\n1. Разказва за събития и герои\n2. Има разказвач (повествовател)\n3. Включва описания и диалози\n4. Обемни творби (повести, романи)\nЖанрове: роман, повест, разказ, епос",
        examples: ["Под игото", "Железният светилник", "Тютюн"]
    },
    "драматични произведения": {
        answer: "Характеристики на драматичните произведения:\n1. Предназначени за поставяне на сцена\n2. Състоят се от диалози и реплики\n3. Разделение на действия и сцени\n4. Сценични указания\nЖанрове: трагедия, комедия, драма",
        examples: ["Госпожа Министершата", "Свекърва", "Хан Аспарух"]
    },
    "лирически произведения": {
        answer: "Характеристики на лирическите произведения:\n1. Изразяват чувства и преживявания\n2. Кратки форми (стихотворения, поеми)\n3. Използват поетични фигури\n4. Силен емоционален заряд\nВидове: медитативна, пейзажна, философска лирика",
        examples: ["Моята молитва", "На прощаване", "Елегия"]
    },
    "преразказ": {
        answer: "Видове преразказ за матура:\n1. Подробен - запазва всички детайли\n2. Подборен - фокус върху ключови моменти\n3. Трансформиращ - промяна на гледна точка\nПравила:\n- Запазване на основната идея\n- Последователност на събитията\n- Обем: 15-20 изречения\n- Употреба на собствени думи",
        examples: ["Преразказ на разказа 'Талисманът' от Красимир Бачков"]
    },
    "анотация": {
        answer: "Анотацията:\n- Кратко представяне на съдържанието на книга или статия\n- Структура: автор, заглавие, основна тема, основни герои/идеи, препоръка\n- Обем: 5-10 изречения\n- Цел: да информира и заинтригува читателя",
        examples: ["Анотация за романа 'Под игото'"]
    },
    "интервю": {
        answer: "Интервюто:\n- Разговор между журналист и интервюиран\n- Цел: събиране на информация или лични мнения\n- Структура: въведение, основни въпроси, заключение\n- Правила: подготвени въпроси, активен слушател, уважение",
        examples: ["Интервю с известен писател"]
    },
    "матура съвети": {
        answer: "Стратегии за успешна матура:\n1. Времеразпределение:\n   - Четене с разбиране: 30-40 мин\n   - Граматика: 20-30 мин\n   - Литература: 30-40 мин\n   - Писане: 40-50 мин\n2. Четене с разбиране:\n   - Два пъти прочитане на текста\n   - Подчертаване на ключови думи\n3. Граматика:\n   - Проверка на правопис\n   - Анализ на изреченията\n4. Литература:\n   - Цитиране на точни примери\n   - Анализ на теми и герои\n5. Писане:\n   - Планиране преди писането\n   - Проверка на граматиката след писането",
        rules: ["Не пропускай нито една задача", "Провери си отговорите преди предаване"]
    },
    "репортаж": {
        answer: "Репортажът:\n- Жанр в журналистиката, който описва събитие на място\n- Елементи: факти, описания, директна реч на участници\n- Структура: привличащо внимание начало, описание на събитието, заключение\n- Цел: да информира и заинтригува читателя",
        themes: ["Репортаж от училищен празник"]
    }  
};

  const messages = [
      { sender: 'ai', text: 'Здравей! Аз съм BAI Ганьо, твоят AI помощник по български език и литература. Как мога да ти помогна днес?' }
  ];

  function renderMessages() {
      if (!chat) return;
      chat.innerHTML = '';
      messages.forEach(msg => {
          const div = document.createElement('div');
          div.classList.add('message', msg.sender);

          if (msg.sender === 'ai' && msg.formatted) {
              div.classList.add('formatted-message');
              div.innerHTML = msg.text;
          } else {
              div.textContent = msg.text;
          }

          chat.appendChild(div);
      });
      chat.scrollTop = chat.scrollHeight;
  }

  function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.classList.add('typing-indicator');
      typingDiv.innerHTML = `
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
      `;
      chat.appendChild(typingDiv);
      chat.scrollTop = chat.scrollHeight;
      return typingDiv;
  }

  function hideTypingIndicator(typingElement) {
      if (typingElement && typingElement.parentNode) {
          typingElement.remove();
      }
  }

  function formatAnswer(answer, examples, rules) {
      let formatted = `<p>${answer.replace(/\n/g, '</p><p>')}</p>`;
      
      if (examples && examples.length > 0) {
          formatted += `<p><strong>Примери:</strong></p><ul>`;
          examples.forEach(ex => {
              formatted += `<li>${ex}</li>`;
          });
          formatted += `</ul>`;
      }
      
      if (rules && rules.length > 0) {
          formatted += `<p><strong>Правила:</strong></p><ul>`;
          rules.forEach(rule => {
              formatted += `<li>${rule}</li>`;
          });
          formatted += `</ul>`;
      }
      
      return formatted;
  }

  function containsEnglish(text) {
      return /[a-zA-Z]/.test(text);
  }

  function findBestAnswer(userText) {
    const lower = userText.toLowerCase();
    
    if (lower.includes('опълченци') || lower.includes('шипка')) {
        return {
            text: formatAnswer(
                knowledgeBase["опълченците на шипка"].answer,
                knowledgeBase["опълченците на шипка"].quotes
            ),
            formatted: true
        };
    }

    if (lower.includes('жица') || lower.includes('моканин') || lower.includes('негованка')) {
        return {
            text: formatAnswer(
                knowledgeBase["по жицата"].answer,
                knowledgeBase["по жицата"].examples,
                knowledgeBase["по жицата"].themes
            ),
            formatted: true
        };
    }

    if (lower.includes('серафим') || lower.includes('йовков')) {
        return {
            text: formatAnswer(
                knowledgeBase["серафим"].answer,
                null,
                knowledgeBase["серафим"].themes
            ),
            formatted: true
        };
    }

    if (lower.includes('една българка') || lower.includes('баба илийца')) {
        return {
            text: formatAnswer(
                knowledgeBase["една българка"].answer,
                knowledgeBase["една българка"].quotes,
                knowledgeBase["една българка"].themes
            ),
            formatted: true
        };
    }

    if (lower.includes('неразделни') || lower.includes('дора габе')) {
        return {
            text: formatAnswer(
                knowledgeBase["неразделни"].answer,
                knowledgeBase["неразделни"].quotes,
                knowledgeBase["неразделни"].themes
            ),
            formatted: true
        };
    }

    if (lower.includes('до чикаго') || lower.includes('бай ганьо')) {
        return {
            text: formatAnswer(
                knowledgeBase["до чикаго и назад"].answer,
                knowledgeBase["до чикаго и назад"].examples,
                knowledgeBase["до чикаго и назад"].themes
            ),
            formatted: true
        };
    }

    if (lower.includes('бъдеще в миналото') || lower.includes('щеше да')) {
        return {
            text: formatAnswer(
                knowledgeBase["глаголни времена"].answer,
                knowledgeBase["глаголни времена"].examples,
                knowledgeBase["глаголни времена"].rules
            ),
            formatted: true
        };
    }

    if (lower.includes('деепричастие') || lower.includes('причастие')) {
        return {
            text: formatAnswer(
                knowledgeBase["причастия"].answer,
                knowledgeBase["причастия"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('сложно изреч') || lower.includes('подчинено изреч')) {
        return {
            text: formatAnswer(
                knowledgeBase["сложни изречения"].answer,
                knowledgeBase["сложни изречения"].examples,
                knowledgeBase["сложни изречения"].rules
            ),
            formatted: true
        };
    }

    if (lower.includes('морфем') || lower.includes('морфологич')) {
        return {
            text: formatAnswer(
                knowledgeBase["морфеми"].answer,
                knowledgeBase["морфеми"].examples
            ),
            formatted: true
        };
    }
    
    if (lower.includes('глагол') || lower.includes('времена') || lower.includes('спрежен')) {
        return {
            text: formatAnswer(
                knowledgeBase["глаголни времена"].answer,
                null,
                knowledgeBase["глаголни времена"].rules
            ),
            formatted: true
        };
    }
    
    if (lower.includes('съществително') || lower.includes('име съществително')) {
        return {
            text: formatAnswer(
                knowledgeBase["съществително име"].answer,
                knowledgeBase["съществително име"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('прилагателно') || lower.includes('име прилагателно')) {
        return {
            text: formatAnswer(
                knowledgeBase["прилагателно име"].answer,
                knowledgeBase["прилагателно име"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('числително') || lower.includes('име числително')) {
        return {
            text: formatAnswer(
                knowledgeBase["числително име"].answer,
                knowledgeBase["числително име"].examples
            ),
            formatted: true
        };
    }

     if (lower.includes('преразказ') || lower.includes('преразкажете')) {
        return {
            text: formatAnswer(
                knowledgeBase["преразказ"].answer,
                knowledgeBase["преразказ"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('матура') || lower.includes('съвет') || lower.includes('стратеги')) {
        return {
            text: formatAnswer(
                knowledgeBase["матура съвети"].answer,
                null,
                knowledgeBase["матура съвети"].rules
            ),
            formatted: true
        };
    }

    if (lower.includes('местоим') || lower.includes('местоимен')) {
        return {
            text: formatAnswer(
                knowledgeBase["местоимения"].answer,
                null,
                knowledgeBase["местоимения"].rules
            ),
            formatted: true
        };
    }

    if (lower.includes('причасти') || lower.includes('деепричасти')) {
        return {
            text: formatAnswer(
                knowledgeBase["причастия"].answer,
                null,
                knowledgeBase["причастия"].rules
            ),
            formatted: true
        };
    }

    if (lower.includes('наречие')) {
        return {
            text: formatAnswer(
                knowledgeBase["наречие"].answer,
                knowledgeBase["наречие"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('предлог')) {
        return {
            text: formatAnswer(
                knowledgeBase["предлог"].answer,
                knowledgeBase["предлог"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('съюз')) {
        return {
            text: formatAnswer(
                knowledgeBase["съюз"].answer,
                knowledgeBase["съюз"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('частица') && !lower.includes('не')) {
        return {
            text: formatAnswer(
                knowledgeBase["частица"].answer,
                knowledgeBase["частица"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('междуметие')) {
        return {
            text: formatAnswer(
                knowledgeBase["междуметие"].answer,
                knowledgeBase["междуметие"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('чужда реч') || lower.includes('пряка реч')) {
        return {
            text: formatAnswer(
                knowledgeBase["чужда реч"].answer,
                null,
                knowledgeBase["чужда реч"].rules
            ),
            formatted: true
        };
    }

    if (lower.includes('сложно изреч') || lower.includes('съчинено изреч') || lower.includes('подчинено изреч')) {
        return {
            text: formatAnswer(
                knowledgeBase["сложно изречение"].answer,
                knowledgeBase["сложно изречение"].examples
            ),
            formatted: true
        };
    }
    
    if (lower.includes('хайдут') || lower.includes('ботев')) {
        return {
            text: formatAnswer(
                knowledgeBase["хайдути"].answer,
                knowledgeBase["хайдути"].quotes
            ),
            formatted: true
        };
    }
    
    if (lower.includes('бай ган') || lower.includes('алеко константинов')) {
        return {
            text: formatAnswer(
                knowledgeBase["бай ганьо"].answer,
                knowledgeBase["бай ганьо"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('приказк') || lower.includes('фолклор')) {
        return {
            text: formatAnswer(
                knowledgeBase["приказки"].answer,
                knowledgeBase["приказки"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('стихотворен размер') || lower.includes('стихотворни размери')) {
        return {
            text: formatAnswer(
                knowledgeBase["стихотворни размери"].answer,
                null,
                knowledgeBase["стихотворни размери"].rules
            ),
            formatted: true
        };
    }

    if (lower.includes('анализ на стихотворен') || lower.includes('стихотворен анализ')) {
        return {
            text: formatAnswer(
                knowledgeBase["анализ на стихотворение"].answer,
                knowledgeBase["анализ на стихотворение"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('епическ') || lower.includes('роман') || lower.includes('повест')) {
        return {
            text: formatAnswer(
                knowledgeBase["епически произведения"].answer,
                knowledgeBase["епически произведения"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('драма') || lower.includes('драматичн')) {
        return {
            text: formatAnswer(
                knowledgeBase["драматични произведения"].answer,
                knowledgeBase["драматични произведения"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('лирическ') || lower.includes('стихотворен')) {
        return {
            text: formatAnswer(
                knowledgeBase["лирически произведения"].answer,
                knowledgeBase["лирически произведения"].examples
            ),
            formatted: true
        };
    }
    
    if (lower.includes('описан') || lower.includes('описвам')) {
        return {
            text: formatAnswer(
                knowledgeBase["описание"].answer,
                knowledgeBase["описание"].examples
            ),
            formatted: true
        };
    }
    
    if (lower.includes('повествован') || lower.includes('разказвам')) {
        return {
            text: formatAnswer(
                knowledgeBase["повествование"].answer,
                null,
                knowledgeBase["повествование"].rules
            ),
            formatted: true
        };
    }
    
    if (lower.includes('разсъжден') || lower.includes('разсъждавам')) {
        return {
            text: formatAnswer(
                knowledgeBase["разсъждение"].answer,
                knowledgeBase["разсъждение"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('преразказ') || lower.includes('преразказвам')) {
        return {
            text: formatAnswer(
                knowledgeBase["преразказ"].answer,
                null,
                knowledgeBase["преразказ"].rules
            ),
            formatted: true
        };
    }

    if (lower.includes('анотац') || lower.includes('реферат')) {
        return {
            text: formatAnswer(
                knowledgeBase["анотация"].answer,
                knowledgeBase["анотация"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('есе') || lower.includes('съчинение разсъждение')) {
        return {
            text: formatAnswer(
                knowledgeBase["есе"].answer,
                null,
                knowledgeBase["есе"].themes
            ),
            formatted: true
        };
    }

    if (lower.includes('интервю')) {
        return {
            text: formatAnswer(
                knowledgeBase["интервю"].answer,
                knowledgeBase["интервю"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('репортаж') || lower.includes('репортьор')) {
        return {
            text: formatAnswer(
                knowledgeBase["репортаж"].answer,
                null,
                knowledgeBase["репортаж"].themes
            ),
            formatted: true
        };
    }
    
    if (lower.includes('изречен') || lower.includes('части на изречението')) {
        return {
            text: formatAnswer(
                knowledgeBase["изречение"].answer,
                knowledgeBase["изречение"].examples
            ),
            formatted: true
        };
    }

    if (lower.includes('немили') || lower.includes('недраги')) {
      return {
        text: formatAnswer(
          knowledgeBase["немили-недраги"].answer,
          null,
          knowledgeBase["немили-недраги"].themes
        ),
        formatted: true
      };
    }
    
    if (lower.includes('под игото') || lower.includes('игото')) {
      return {
        text: formatAnswer(
          knowledgeBase["под игото"].answer,
          knowledgeBase["под игото"].quotes
        ),
        formatted: true
      };
    }
    
    if (lower.includes('вятър ечи') || lower.includes('балкан стене')) {
      return {
        text: formatAnswer(
          knowledgeBase["вятър ечи, балкан стене"].answer,
          knowledgeBase["вятър ечи, балкан стене"].quotes
        ),
        formatted: true
      };
    }
    
    if (lower.includes('заточеници') || lower.includes('вазов заточеници')) {
      return {
        text: formatAnswer(
          knowledgeBase["заточеници"].answer,
          knowledgeBase["заточеници"].quotes
        ),
        formatted: true
      };
    }
    
    if (lower.includes('народни песни') || lower.includes('фолклорни песни')) {
      return {
        text: formatAnswer(
          knowledgeBase["народни песни"].answer,
          knowledgeBase["народни песни"].examples
        ),
        formatted: true
      };
    }
      
    if (lower.includes('правопис') || lower.includes('правописн')) {
        return { 
            text: 'В българския език има много правописни правила. За кое конкретно правило искаш да научиш? Например:\n- Правопис на "не"\n- Употреба на "ъ" и "ь"\n- Глаголни окончания\n- Главни и малки букви',
            formatted: false
        };
    }
      
    if (lower.includes('литература') || lower.includes('книг') || lower.includes('произведени')) {
        return { 
            text: 'Българската литература е богата и разнообразна! За кое произведение или автор искаш да научиш повече? Например:\n- "Под игото" на Иван Вазов\n- "Хайдути" на Христо Ботев\n- "Бай Ганьо" на Алеко Константинов\n- "Грозното патенце" на Андерсен',
            formatted: false
        };
    }
      
    if (lower.includes('тест') || lower.includes('упражнен')) {
        return { 
            text: 'Искаш ли да направим упражнение? Мога да ти задам въпроси по:\n1. Правопис\n2. Граматика\n3. Литературни произведения\n4. Автори и творби\nИзбери тема и започваме!',
            formatted: false
        };
    }
      
    if (lower.includes('консултация') || lower.includes('учител')) {
        return { 
            text: 'Ако имаш трудности с някоя тема, наистина е добра идея да потърсиш помощ от учителя си. Мога да ти помогна с:\n- Обяснение на трудни теми\n- Примери и правила\n- Подготовка за изпит\nНо за персонализирана помощ учителят е най-добрият избор!',
            formatted: false
        };
    }
      
    const randomResponses = [
        "Интересен въпрос! Можеш ли да го зададеш по-конкретно?",
        "Все още се уча, но ще се опитам да помогна. За коя точно тема питаш?",
        "Имам информация за много теми от български език и литература. Опитай да питаш за конкретно произведение, правило или понятие.",
        "Попитай ме за конкретно правило, произведение или автор и ще ти помогна!"
    ];
    return { 
        text: randomResponses[Math.floor(Math.random() * randomResponses.length)],
        formatted: false
    };
}
  chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleUserInput();
  });

  chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleUserInput();
      }
  });

  function handleUserInput() {
      const userText = chatInput.value.trim();
      if (!userText) return;
      
      if (containsEnglish(userText)) {
          const ganioPhrases = [
              "Абе, момко, тука да не ти е Америка?! Пиши на кирилица, че ме хваща срама!",
              "Ганьо не говори на английски! Кирилица, или ще те върна в трети клас!",
              "Като видя латиница и ми пресъхва ракията! Пиши както баба ти те е учила!",
              "Това да не ти е чат с Макдоналдс?! Тука кирилицата е задължителна, момко!",
              "На мен ми дай 'ъ', 'щ', 'ш'... другото го прати на някой Гугъл Транслейт!",
              "Момко, ако не видя една 'а' и една 'ъ' в изречението, нема повече да ти отговарям!"
          ];
          const randomGanioMsg = ganioPhrases[Math.floor(Math.random() * ganioPhrases.length)];
          messages.push({ sender: 'user', text: userText });
          messages.push({ sender: 'ai', text: randomGanioMsg, formatted: false });
          renderMessages();
          chatInput.value = '';
          return;
      }
      
      messages.push({ sender: 'user', text: userText });
      renderMessages();
      chatInput.value = '';
      
      const typingElement = showTypingIndicator();
      
      setTimeout(() => {
          hideTypingIndicator(typingElement);
          
          const aiResponse = findBestAnswer(userText);
          messages.push({ 
              sender: 'ai', 
              text: aiResponse.text,
              formatted: aiResponse.formatted
          });
          renderMessages();
      }, 2500);
  }

  quickQuestions.forEach(button => {
      button.addEventListener('click', function() {
          const question = this.textContent;
          chatInput.value = question;
          chatForm.dispatchEvent(new Event('submit'));
      });
  });

  renderMessages();
});
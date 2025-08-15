// texts.js
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('work-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const workContent = document.getElementById('work-content');
    const analysisContent = document.getElementById('analysis-content');
    const modalTabs = document.querySelectorAll('.modal-tab');
    
    // Данни за произведенията
    const worksData = {
        chintulov1: {
            title: "Стани, стани, юнак балкански",
            work: `Стани, стани, юнак балкански!
Настанал е страшен зор,
всичко е в кръв обагрено,
всичко е в пламък упалено!
...
(Пълният текст на произведението...)`,
            analysis: `Анализ на "Стани, стани, юнак балкански":
            
1. Тема: Призив за национално освобождение
2. Жанр: Патриотична песен
3. Композиция: 
   - Призив за борба
   - Описание на страданието
   - Насърчение за победа
4. Художествени средства:
   - Метафори: "кръв обагрено", "пламък упалено"
   - Повторения: "Стани, стани"
   - Апострофа: "юнак балкански"` 
        },
        chintulov2: {
            title: "Вятър ечи, Балкан стене",
            work: `Вятър ечи, Балкан стене,
мъгла полето покри,
село гори, майка плаче,
дете малко се чуди...
...
(Пълният текст на произведението...)`,
            analysis: `Анализ на "Вятър ечи, Балкан стене":
            
1. Тема: Страданието на българския народ
2. Жанр: Лирическа песен
3. Композиция:
   - Природни образи
   - Описание на страданието
   - Надежда за освобождение
4. Художествени средства:
   - Олицетворение: "Балкан стене"
   - Контраст: природна красота и човешко страдание
   - Символи: "мъгла" - несигурност, "огън" - борба`
        },
        // Добавете данни за всички останали произведения по същия модел
    };

    // Функция за показване на модалния прозорец
    function showWorkModal(workId) {
        const work = worksData[workId];
        if (!work) return;
        
        modalTitle.textContent = work.title;
        workContent.innerHTML = `<h3>Текст на произведението</h3><p>${work.work}</p>`;
        analysisContent.innerHTML = `<h3>Литературен анализ</h3><p>${work.analysis}</p>`;
        
        modal.classList.add('active');
    }

    // Функция за превключване между произведение и анализ
    function switchTab(type) {
        modalTabs.forEach(tab => tab.classList.remove('active'));
        
        if (type === 'work') {
            document.querySelector('.modal-tab[data-type="work"]').classList.add('active');
            workContent.style.display = 'block';
            analysisContent.style.display = 'none';
        } else {
            document.querySelector('.modal-tab[data-type="analysis"]').classList.add('active');
            workContent.style.display = 'none';
            analysisContent.style.display = 'block';
        }
    }

    // Слушатели за бутоните
    document.querySelectorAll('.work-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const workId = this.dataset.work;
            showWorkModal(workId);
            switchTab('work');
        });
    });

    document.querySelectorAll('.analysis-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const workId = this.dataset.work;
            showWorkModal(workId);
            switchTab('analysis');
        });
    });

    // Слушатели за табовете в модалния прозорец
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const type = this.dataset.type;
            switchTab(type);
        });
    });

    // Затваряне на модалния прозорец
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    // Затваряне при клик извън модалния прозорец
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
});
import type { WorksData } from './types';

document.addEventListener('DOMContentLoaded', function(): void {
    // Literary works data with proper typing
    const worksData: WorksData = {
        chintulov1p1: {
            id: "chintulov1p1",
            title: "Стани, стани, юнак балкански",
            author: "Добри Чинтулов",
            text: `Стани, стани юнак балкански
от сън дълбок се събуди,
срещу народа отомански
ти българите поведи!

Че сълзи кървави пролива
във робство милий наш народ;
високо той ръце простира
да го избави вишний бог!

И тъй ний много претърпяхме,
но стига толкоз да търпим,
да бъдем пак, каквито бяхме,
ил' всинца да се изтребим. 

Докога, братя, да се губим?
Защо да се не съберем?
Така ли вечно ще се трудим
и в робство всинца да измрем?

Я вижте, братя, погледнете
на ближните нам племена!
От тях добър пример вземете
как си прославят имена!

Станете, братя, вий станете,
начало покажете вий;
и сабите си запашете,
и помощ ще ви се яви.

На помощ сърби, черногорци
със радост ще се затекат,
а и от север храбри руси
тозчас ще да се появят.

Догде е мъничка змията,
елате да се съберем!
С крака да й строшим главата,
свободни да се назовем!

Да стане лева наш балкански,
от него вятър да повей,
та полумесец отомански
под тъмен облак затъмней! 

Да си развием знамената,
да светне нашата земя,
да си прославим имената,
да гинат турски племена!`,

            analysis: `1. Жанр и обща характеристика

„Стани, стани, юнак балкански" е възрожденска революционна песен с ясно изразен патриотичен и призивен характер. Стихотворението цели да разбуди националното съзнание и да подтикне поробения български народ към обединение и борба срещу османското владичество. Творбата е израз на обществената нужда от свобода в епохата на Българското възраждане.

2. Основна тема

Основната тема е борбата за национално освобождение. Чинтулов представя свободата като морален дълг, който може да бъде постигнат чрез единство, смелост и решителност.

3. Основни мотиви

- Пробуждане – народът трябва да се събуди от духовния „сън".

- Свобода – представена като висша ценност.

- Обединение – всички българи трябва да действат заедно.

- Братска помощ от славяните – сърби, черногорци, руси.

- Пример от други народи – Балканските съседи вече се борят за свобода.

- Поробителят като зло – образът на змията, помръкналият полумесец.

4. Композиция

Стихотворението е изградено стъпаловидно – всяка строфа усилва призива:

- Пробуждане на юнака/народа

- Показване на робското страдание

- Призив за единство

- Сравнение с други освободени народи

- Увереност в подкрепа отвън

- Призив за въоръжена борба и победа

- Така творбата преминава от апатия към активен зов за действие.

5. Лирически говорител

Той е водач, будител и духовен наставник. Обръща се към народа като „братя", което подчертава общността и равенството. Тонът е категоричен, мобилизиращ и настойчив.

6. Художествени средства

Метафори

- „Сън дълбок" – духовна летаргия.

- „Мъничката змия" – поробителят, който трябва да бъде унищожен.

- „Полумесецът под тъмен облак" – символ на залеза на Османската империя.

Епитети

- „кървави сълзи", „храбри руси", „мъничка змия" – подчертават драматизма и силата на призива.

Повторения

- „Стани, стани", „Станете, братя" – придават настойчивост и ритъм на зов.

Повелителни глаголи

- „стани", „погледнете", „запашете", „елате" – създават усещане за спешност и действие.

Риторични въпроси

- „Докога, братя, да се губим?" – предизвикват размисъл и подтикват към промяна.

7. Образът на „юнак балкански"

Юнакът е символ на самия български народ – силен, способен, но заспал. Чинтулов вярва, че този народ само трябва да бъде събуден, за да води борбата.

8. Картина на робството

Робството е показано като тежко страдание:

- „сълзи кървави"

- „трудим вечно"

-„в робство всинца да измрем"

Поетът подчертава, че това положение не може да продължава.

9. Идеята за обединението

Разединението е представено като опасно и пагубно. Само общата борба и съгласуваното действие могат да доведат до свобода и национално възраждане.

10. Външните съюзници

Стихотворението споменава славянските братски народи (сърби, черногорци, руси), които ще дойдат на помощ. Това създава увереност и подкрепя идеята за панславизъм.

11. Символика

- Змията – османският поробител
- Лъвът балкански – българският народ
- Полумесецът – османската империя
- Знамената – символ на свободата

12. Заключение

„Стани, стани, юнак балкански" е силна революционна песен, която не само отразява духа на епохата, но и активно влияе върху него. Чинтулов успява да изрази колективната мечта на българите за свобода и да ги мотивира за активно участие в борбата.`
        },
        // Add more works as needed - truncated for brevity in this example
    };

    // DOM elements with proper typing
    const modal = document.getElementById('text-modal') as HTMLDivElement;
    const closeModalBtn = document.querySelector('.close-modal') as HTMLButtonElement;
    const modalTitle = document.getElementById('modal-work-title') as HTMLHeadingElement;
    const textContent = document.getElementById('text-content') as HTMLDivElement;
    const analysisContent = document.getElementById('analysis-content') as HTMLDivElement;
    const tabs = document.querySelectorAll('.modal-tab') as NodeListOf<HTMLButtonElement>;

    function closeModal(): void {
        modal.classList.remove('active');
    }

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e: MouseEvent): void => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e: KeyboardEvent): void => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    tabs.forEach((tab: HTMLButtonElement): void => {
        tab.addEventListener('click', (): void => {
            tabs.forEach((t: HTMLButtonElement): void => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabType = tab.dataset.tab as 'text' | 'analysis' | undefined;
            
            if (tabType === 'text') {
                textContent.style.display = 'block';
                analysisContent.style.display = 'none';
            } else {
                textContent.style.display = 'none';
                analysisContent.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.show-text').forEach((button: Element): void => {
        (button as HTMLButtonElement).addEventListener('click', (): void => {
            const workId = (button as HTMLElement).dataset.work;
            const work = workId ? worksData[workId] : undefined;
            
            if (work) {
                modalTitle.textContent = work.title;
                textContent.innerHTML = `<pre>${work.text}</pre>`;
                analysisContent.innerHTML = `<pre>${work.analysis}</pre>`;
                
                tabs[0].classList.add('active');
                tabs[1].classList.remove('active');
                textContent.style.display = 'block';
                analysisContent.style.display = 'none';
                
                modal.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.show-analysis').forEach((button: Element): void => {
        (button as HTMLButtonElement).addEventListener('click', (): void => {
            const workId = (button as HTMLElement).dataset.work;
            const work = workId ? worksData[workId] : undefined;
            
            if (work) {
                modalTitle.textContent = work.title;
                textContent.innerHTML = `<pre>${work.text}</pre>`;
                analysisContent.innerHTML = `<pre>${work.analysis}</pre>`;
                
                tabs[0].classList.remove('active');
                tabs[1].classList.add('active');
                textContent.style.display = 'none';
                analysisContent.style.display = 'block';
                
                modal.classList.add('active');
            }
        });
    });
});
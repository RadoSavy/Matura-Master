document.addEventListener('DOMContentLoaded', function () {
  let worksData = (window.remoteWorksData && Object.keys(window.remoteWorksData).length)
    ? window.remoteWorksData
    : {};

  function updateWorksData() {
    if (window.remoteWorksData && Object.keys(window.remoteWorksData).length) {
      worksData = window.remoteWorksData;
    }
  }

  function renderWorks() {
    updateWorksData();

    const main = document.querySelector('main');
    let container = document.getElementById('works-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'works-container';
      const titleEl = main.querySelector('.unit-title');
      if (titleEl && titleEl.nextSibling) {
        main.insertBefore(container, titleEl.nextSibling);
      } else {
        main.appendChild(container);
      }
    }
    container.innerHTML = '';

    main.querySelectorAll('.card, .author-section').forEach(el => el.remove());

    if (!worksData || Object.keys(worksData).length === 0) {
      container.textContent = 'Няма налични произведения.';
      return;
    }

    const authors = {};
    Object.values(worksData).forEach(text => {
      const auth = text.author || text.creator || 'Без автор';
      if (!authors[auth]) authors[auth] = [];
      authors[auth].push(text);
    });

    Object.entries(authors).forEach(([author, texts]) => {
      const section = document.createElement('div');
      section.className = 'author-section';
      const authorHeader = document.createElement('div');
      authorHeader.className = 'author-header';
      const h3 = document.createElement('h3');
      h3.textContent = author;
      authorHeader.appendChild(h3);
      section.appendChild(authorHeader);

      texts.forEach(t => {
        const item = document.createElement('div');
        item.className = 'work-item';
        const authorName = t.author || t.creator || '';

        const workInfo = document.createElement('div');
        workInfo.className = 'work-info';
        const icon = document.createElement('i');
        icon.className = 'fas fa-file-alt work-icon';
        const titleSpan = document.createElement('span');
        titleSpan.className = 'work-title';
        titleSpan.textContent = t.title || t.name || '';
        workInfo.appendChild(icon);
        workInfo.appendChild(titleSpan);

        item.appendChild(workInfo);

        if (authorName) {
          const authorP = document.createElement('p');
          authorP.className = 'work-author';
          authorP.textContent = authorName;
          item.appendChild(authorP);
        }

        const workParts = document.createElement('div');
        workParts.className = 'work-parts';
        const workPart = document.createElement('div');
        workPart.className = 'work-part';
        const partActions = document.createElement('div');
        partActions.className = 'part-actions';
        const textBtn = document.createElement('button');
        textBtn.className = 'btn btn-sm show-text';
        textBtn.setAttribute('data-work', t.id);
        textBtn.textContent = 'Текст';
        const analysisBtn = document.createElement('button');
        analysisBtn.className = 'btn btn-sm btn-outline show-analysis';
        analysisBtn.setAttribute('data-work', t.id);
        analysisBtn.textContent = 'Анализ';
        partActions.appendChild(textBtn);
        partActions.appendChild(analysisBtn);
        workPart.appendChild(partActions);
        workParts.appendChild(workPart);
        item.appendChild(workParts);

        section.appendChild(item);
      });

      container.appendChild(section);
    });
  }

  renderWorks();

  document.addEventListener('remoteWorksDataLoaded', () => {
    renderWorks();
  });

  const modal = document.getElementById('text-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modalTitle = document.getElementById('modal-work-title');
  const textContent = document.getElementById('text-content');
  const analysisContent = document.getElementById('analysis-content');
  const tabs = document.querySelectorAll('.modal-tab');

  function closeModal() {
    modal.classList.remove('active');
  }

  closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.dataset.tab === 'text') {
        textContent.style.display = 'block';
        analysisContent.style.display = 'none';
      } else {
        textContent.style.display = 'none';
        analysisContent.style.display = 'block';
      }
    });
  });

  function openModalForWork(workId, showAnalysis) {
    const work = worksData[workId];
    if (!work) return;
    modalTitle.textContent = work.title;
    const authorLine = work.author || work.creator || '';
    if (authorLine) {
      const existing = modalTitle.nextElementSibling;
      if (!existing || !existing.classList.contains('modal-work-author')) {
        const p = document.createElement('p');
        p.className = 'modal-work-author';
        p.textContent = authorLine;
        modalTitle.insertAdjacentElement('afterend', p);
      } else {
        existing.textContent = authorLine;
      }
    }

    textContent.innerHTML = '';
    const preText = document.createElement('pre');
    preText.textContent = work.text;
    textContent.appendChild(preText);

    analysisContent.innerHTML = '';
    const preAnalysis = document.createElement('pre');
    preAnalysis.textContent = work.analysis;
    analysisContent.appendChild(preAnalysis);

    if (showAnalysis) {
      tabs[0].classList.remove('active');
      tabs[1].classList.add('active');
      textContent.style.display = 'none';
      analysisContent.style.display = 'block';
    } else {
      tabs[0].classList.add('active');
      tabs[1].classList.remove('active');
      textContent.style.display = 'block';
      analysisContent.style.display = 'none';
    }

    modal.classList.add('active');
  }

  const main = document.querySelector('main');
  if (main) {
    main.addEventListener('click', (e) => {
      const textBtn = e.target.closest('.show-text');
      if (textBtn) {
        openModalForWork(textBtn.dataset.work, false);
      }
      const analysisBtn = e.target.closest('.show-analysis');
      if (analysisBtn) {
        openModalForWork(analysisBtn.dataset.work, true);
      }
    });
  }

  document.querySelectorAll('.show-analysis').forEach((button) => {
    button.addEventListener('click', () => {
      const workId = button.dataset.work;
      const work = worksData[workId];

      if (work) {
        modalTitle.textContent = work.title;
        textContent.innerHTML = '';
        const preText = document.createElement('pre');
        preText.textContent = work.text;
        textContent.appendChild(preText);

        analysisContent.innerHTML = '';
        const preAnalysis = document.createElement('pre');
        preAnalysis.textContent = work.analysis;
        analysisContent.appendChild(preAnalysis);

        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
        textContent.style.display = 'none';
        analysisContent.style.display = 'block';

        modal.classList.add('active');
      }
    });
  });
});

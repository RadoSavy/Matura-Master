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
      section.innerHTML = `<div class="author-header"><h3>${author}</h3></div>`;

      texts.forEach(t => {
        const item = document.createElement('div');
        item.className = 'work-item';
        const authorName = t.author || t.creator || '';
        item.innerHTML = `
          <div class="work-info">
            <i class="fas fa-file-alt work-icon"></i>
            <span class="work-title">${t.title || t.name || ''}</span>
          </div>
          ${authorName ? `<p class="work-author">${authorName}</p>` : ''}
          <div class="work-parts">
            <div class="work-part">
              <div class="part-actions">
                <button class="btn btn-sm show-text" data-work="${t.id}">Текст</button>
                <button class="btn btn-sm btn-outline show-analysis" data-work="${t.id}">Анализ</button>
              </div>
            </div>
          </div>`;
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

    textContent.innerHTML = `<pre>${work.text}</pre>`;
    analysisContent.innerHTML = `<pre>${work.analysis}</pre>`;

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

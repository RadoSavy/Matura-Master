const API_BASE_URL = 'http://localhost:5000/api';

async function loadDataFromAPI() {
  try {
    console.log('Loading Bulgarian lessons from API...');
    const bulgarianResponse = await fetch(`${API_BASE_URL}/lessons`);
    if (bulgarianResponse.ok) {
      const bulgarianData = await bulgarianResponse.json();
      window.remoteBulgarianLessons = Array.isArray(bulgarianData) ? bulgarianData : [];
      console.log(`✓ Loaded ${window.remoteBulgarianLessons.length} Bulgarian lessons`);
    } else {
      console.warn('Failed to load Bulgarian lessons:', bulgarianResponse.statusText);
    }
  } catch (error) {
    console.error('Error loading Bulgarian lessons:', error);
  }

  try {
    console.log('Loading literature lessons from API...');
    const literatureResponse = await fetch(`${API_BASE_URL}/literature/lessons`);
    if (literatureResponse.ok) {
      const literatureData = await literatureResponse.json();
      window.remoteLiteratureLessons = Array.isArray(literatureData) ? literatureData : [];
      console.log(`✓ Loaded ${window.remoteLiteratureLessons.length} literature lessons`);
    } else {
      console.warn('Failed to load literature lessons:', literatureResponse.statusText);
    }
  } catch (error) {
    console.error('Error loading literature lessons:', error);
  }

  try {
    console.log('Loading literature texts from API...');
    const textsResponse = await fetch(`${API_BASE_URL}/literature/texts`);
    if (textsResponse.ok) {
      const textsData = await textsResponse.json();
      if (Array.isArray(textsData)) {
        window.remoteWorksData = {};
        textsData.forEach(text => {
          window.remoteWorksData[text.id] = text;
        });
      } else {
        window.remoteWorksData = textsData;
      }
      console.log(`✓ Loaded ${Object.keys(window.remoteWorksData).length} literature texts`);
      document.dispatchEvent(new Event('remoteWorksDataLoaded'));
    } else {
      console.warn('Failed to load literature texts:', textsResponse.statusText);
    }
  } catch (error) {
    console.error('Error loading literature texts:', error);
  }
}

loadDataFromAPI();
/* ============================================
   Custom XP Card Generator - godthedogabs
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---- Card elements ----
  const cardBg = $('#cardBg');
  const cardOverlay = $('#cardOverlay');
  const cardUsername = $('#cardUsername');
  const cardXp = $('#cardXp');
  const cardTabLabel = $('#cardTabLabel');
  const avatarImg = $('#avatarImg');
  const avatarPlaceholder = $('#avatarPlaceholder');
  const xpCard = $('#xpCard');
  const cardGraph = $('#cardGraph');
  const graphCanvas = $('#graphCanvas');

  // ---- Controls ----
  const inputName = $('#inputName');
  const inputXp = $('#inputXp');
  const overlayOpacity = $('#overlayOpacity');
  const overlayVal = $('#overlayVal');
  const overlayDot = $('#overlayDot');
  const pfpUpload = $('#pfpUpload');
  const uploadPfpBtn = $('#uploadPfpBtn');
  const bgGrid = $('#bgGrid');
  const shuffleBtn = $('#shuffleBtn');
  const exportGif = $('#exportGif');

  // ---- Cumulative controls ----
  const inputStartWeek = $('#inputStartWeek');
  const inputEndWeek = $('#inputEndWeek');
  const inputWeeklyData = $('#inputWeeklyData');

  // ---- State ----
  let cardTextColor = '#ffffff';
  let overlayMode = 'black';
  let currentTab = 'weekly';
  let selectedBgIndex = 0;
  let graphLineColor = '#4ade80';

  // ---- Background images from God the Dog MemeDepot ----
  const CDN = 'https://memedepot.com/cdn-cgi/imagedelivery/naCPMwxXX46-hrE49eZovw';
  const bgIds = [
    'd41d679a-2225-443c-d70d-b94f7d013000',
    '3efcb146-70cf-4e05-4d46-ef5bb8f24500',
    '629d8f81-ea83-466f-fa1c-70437efbf500',
    '17924899-b66e-49ad-253d-2df2f5907700',
    '4ce5fcac-e68e-49df-baf7-fbe182bb6500',
    'a85dabb8-bd8c-46fa-c708-5ff140481200',
    '441b9a7d-ccc6-464c-4f2a-b29c7d5a3600',
    'eaa10c32-c104-4456-9351-03d459b3e000',
    '6886ece6-d917-4154-53c7-23a9bfa7bb00',
    '1359ebd3-a161-411f-6704-b59652fdda00',
    '6b86027d-8639-481d-afb0-d670e5cc3600',
    '36f77474-a86b-47b5-361b-99296ddaab00',
    '2da6612d-5865-457a-2dd5-23f2e0184b00',
    'f74ef910-3bec-4b25-a71f-b58a32beeb00',
    '04263352-9eb9-43a0-711c-2e807655a100',
    '742a1c71-a44c-4ed9-719d-d552f386a200',
    '6d5c6acb-3b38-4bf1-5eca-2fa7c4499f00',
    '135aa440-73d8-47f6-1b2d-69b8419fb200',
    '39142c5b-5b34-4294-2fce-c186554ff500',
    '05c54a06-6cf2-4e8b-87eb-2acbf1ef1500',
    '7d3321f4-14c2-469d-7818-528632fd8900',
    '304576ca-8a9d-4942-db33-8ae073bbd200',
    '6dee796a-04bb-426e-dc62-52a590a62500',
    '81cf105e-d135-408f-b8f7-d0ccccc24800',
    '5d3664e4-60e1-429a-20bb-53c645001d00',
    'adb22793-e967-4412-ef23-61bf8fdc9b00',
    '7d7b3277-d645-42dd-4e02-be9e152f8a00',
    'fd437e6b-f4fc-4556-6832-d160b4be0e00',
    '3fd53aac-1d10-4655-a6fb-ac732437ba00',
    '061f4d4b-4c04-4b86-7220-69d5f1cebf00',
    'bf09049c-04e9-41cd-404a-86379b003100',
    '94e69a41-382f-42eb-2d13-37c71737c600',
    'd5d61e96-6d5a-4f9a-de2e-4de1be76c100',
    'a8171325-1758-48f4-d7d6-2d4705fd4300',
    '9cf78fb3-455d-4847-da2e-a23f3edf8b00',
    'c7cd05e0-44a7-497f-956c-da126eb7a800',
    'de95b666-a924-4974-f469-90f4ff6ee000',
    '125a8722-efd2-411a-16a1-6db75fecbf00',
    '8720c0bf-a28e-4d1b-4dd4-c581402d5400',
    '4593b49c-3111-4282-d14f-386b1ccf2c00',
    '330450b2-8828-4e52-d8fd-ebfa7fd64600',
    '785e7bad-89a3-411f-76a0-c61b499b8f00',
    '6360e957-858e-4ef4-1141-1e019401af00',
    '48c25084-434d-4acb-0f17-cc44f530e600',
    '41d445c3-0fe0-4818-1452-e41d304fc600',
    'cb12cbc2-77d0-41fc-6970-cb3498169000',
    'cacdd255-bc8a-4ae5-f486-69a637754100',
    '6f577346-4d06-41e9-014f-dcbcd2c4c600',
  ];

  const backgrounds = bgIds.map(id => ({
    thumb: `${CDN}/${id}/width=400`,
    full: `${CDN}/${id}/width=1920`,
  }));

  // ---- Build background grid ----
  function buildBgGrid() {
    bgGrid.innerHTML = '';

    const uploadTile = document.createElement('div');
    uploadTile.className = 'bg-thumb';
    uploadTile.innerHTML = `
      <div class="bg-thumb-upload">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="17,8 12,3 7,8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        Upload
      </div>
    `;
    const bgFileInput = document.createElement('input');
    bgFileInput.type = 'file';
    bgFileInput.accept = 'image/*';
    bgFileInput.hidden = true;

    uploadTile.addEventListener('click', () => bgFileInput.click());
    bgFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        cardBg.style.backgroundImage = `url(${ev.target.result})`;
        cardBg.style.background = '';
        cardBg.style.backgroundImage = `url(${ev.target.result})`;
        cardBg.style.backgroundSize = 'cover';
        cardBg.style.backgroundPosition = 'center';
        $$('.bg-thumb').forEach(t => t.classList.remove('active'));
        uploadTile.classList.add('active');
        selectedBgIndex = -1;
      };
      reader.readAsDataURL(file);
    });

    bgGrid.appendChild(uploadTile);

    backgrounds.forEach((bg, i) => {
      const tile = document.createElement('div');
      tile.className = 'bg-thumb' + (i === selectedBgIndex ? ' active' : '');
      tile.innerHTML = `<img src="${bg.thumb}" alt="Background ${i + 1}" loading="lazy"><span class="bg-thumb-badge">IMG</span>`;
      tile.addEventListener('click', () => {
        selectedBgIndex = i;
        applyBackground(i);
        $$('.bg-thumb').forEach(t => t.classList.remove('active'));
        tile.classList.add('active');
      });
      bgGrid.appendChild(tile);
    });
  }

  function applyBackground(index) {
    const bg = backgrounds[index];
    cardBg.style.background = '';
    cardBg.style.backgroundImage = `url(${bg.full})`;
    cardBg.style.backgroundSize = 'cover';
    cardBg.style.backgroundPosition = 'center';
  }

  // ---- Draw cumulative line graph ----
  function drawGraph() {
    const raw = inputWeeklyData.value.trim();
    if (!raw) {
      const ctx = graphCanvas.getContext('2d');
      ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
      return;
    }

    const weeklyValues = raw.split(',').map(v => parseInt(v.trim()) || 0);
    if (weeklyValues.length === 0) return;

    // Build cumulative data
    const cumulative = [];
    let sum = 0;
    for (const val of weeklyValues) {
      sum += val;
      cumulative.push(sum);
    }

    const canvas = graphCanvas;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padLeft = 10;
    const padRight = 10;
    const padTop = 20;
    const padBottom = 10;
    const w = canvas.width - padLeft - padRight;
    const h = canvas.height - padTop - padBottom;

    const maxVal = Math.max(...cumulative, 1);
    const points = cumulative.map((val, i) => ({
      x: padLeft + (cumulative.length === 1 ? w / 2 : (i / (cumulative.length - 1)) * w),
      y: padTop + h - (val / maxVal) * h,
    }));

    // Draw gradient fill under line
    const gradient = ctx.createLinearGradient(0, padTop, 0, canvas.height);
    gradient.addColorStop(0, graphLineColor + '40');
    gradient.addColorStop(1, graphLineColor + '05');

    ctx.beginPath();
    ctx.moveTo(points[0].x, canvas.height - padBottom);
    for (const p of points) {
      ctx.lineTo(p.x, p.y);
    }
    ctx.lineTo(points[points.length - 1].x, canvas.height - padBottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = graphLineColor;
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.shadowColor = graphLineColor + '80';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw dots
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = graphLineColor;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }

    // Update XP display with cumulative total
    cardXp.textContent = sum.toLocaleString() + ' XP';
  }

  // ---- Update card ----
  function updateCard() {
    // Name
    cardUsername.textContent = inputName.value || 'Username';

    // Tab label
    cardTabLabel.textContent = currentTab === 'weekly' ? 'Weekly XP' : 'Cumulative XP';

    if (currentTab === 'weekly') {
      const xpVal = parseInt(inputXp.value) || 0;
      cardXp.textContent = xpVal.toLocaleString() + ' XP';
      cardGraph.style.display = 'none';
    } else {
      cardGraph.style.display = 'flex';
      drawGraph();
    }

    // Overlay
    const opacity = overlayOpacity.value / 100;
    overlayVal.textContent = overlayOpacity.value + '%';
    if (overlayMode === 'black') {
      cardOverlay.style.background = `rgba(0, 0, 0, ${opacity})`;
    } else {
      cardOverlay.style.background = `rgba(255, 255, 255, ${opacity})`;
    }

    // Card text color
    cardUsername.style.color = cardTextColor;
    cardXp.style.color = cardTextColor;
    cardTabLabel.style.color = cardTextColor;
    $('.card-logo').style.color = cardTextColor;
    $('.card-branding').style.color = cardTextColor;
  }

  // ---- Toggle controls for tab ----
  function toggleTabControls() {
    const weeklyControls = $$('.controls-weekly');
    const cumulativeControls = $$('.controls-cumulative');

    if (currentTab === 'weekly') {
      weeklyControls.forEach(el => el.style.display = '');
      cumulativeControls.forEach(el => el.style.display = 'none');
    } else {
      weeklyControls.forEach(el => el.style.display = 'none');
      cumulativeControls.forEach(el => el.style.display = '');
    }
  }

  // ---- Tabs ----
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      toggleTabControls();
      updateCard();
    });
  });

  // ---- Color swatches (card text color) ----
  $$('.swatch:not(.graph-color-swatch)').forEach(swatch => {
    swatch.addEventListener('click', () => {
      $$('.swatch:not(.graph-color-swatch)').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      cardTextColor = swatch.dataset.color;
      updateCard();
    });
  });

  // ---- Graph line color swatches ----
  $$('.graph-color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      $$('.graph-color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      graphLineColor = swatch.dataset.graphColor;
      updateCard();
    });
  });

  // ---- Overlay mode ----
  $$('.overlay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.overlay-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      overlayMode = btn.dataset.overlay;
      updateCard();
    });
  });

  // ---- Overlay slider ----
  overlayOpacity.addEventListener('input', updateCard);

  // ---- Name input ----
  inputName.addEventListener('input', updateCard);

  // ---- XP input (weekly) ----
  inputXp.addEventListener('input', updateCard);

  // ---- Cumulative inputs ----
  inputWeeklyData.addEventListener('input', updateCard);
  inputStartWeek.addEventListener('input', updateCard);
  inputEndWeek.addEventListener('input', updateCard);

  // ---- PFP upload ----
  uploadPfpBtn.addEventListener('click', () => pfpUpload.click());
  pfpUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      avatarImg.src = ev.target.result;
      avatarImg.style.display = 'block';
      avatarPlaceholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  // ---- Shuffle ----
  shuffleBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    selectedBgIndex = randomIndex;
    applyBackground(randomIndex);
    $$('.bg-thumb').forEach(t => t.classList.remove('active'));
    const tiles = bgGrid.querySelectorAll('.bg-thumb');
    if (tiles[randomIndex + 1]) tiles[randomIndex + 1].classList.add('active');
  });

  // ---- Export PNG (HD) ----
  exportGif.addEventListener('click', async () => {
    exportGif.disabled = true;
    const origText = exportGif.innerHTML;
    exportGif.textContent = 'Exporting...';

    const cardRect = xpCard.getBoundingClientRect();
    const hdScale = 2;

    // Get the border radius value
    const computedStyle = getComputedStyle(xpCard);
    const borderRadius = parseFloat(computedStyle.borderRadius) || 14;
    const scaledRadius = borderRadius * hdScale;

    try {
      // Store original styles
      const origBorder = xpCard.style.border;
      const origBoxShadow = xpCard.style.boxShadow;

      // Temporarily remove border for clean export
      xpCard.style.border = 'none';
      xpCard.style.boxShadow = 'none';

      // Capture with html2canvas
      const rawCanvas = await html2canvas(xpCard, {
        backgroundColor: null,
        scale: hdScale,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // Restore styles
      xpCard.style.border = origBorder;
      xpCard.style.boxShadow = origBoxShadow;

      // Create a new canvas with rounded corners and transparent background
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = rawCanvas.width;
      finalCanvas.height = rawCanvas.height;
      const ctx = finalCanvas.getContext('2d');

      // Draw rounded rectangle clipping path
      ctx.beginPath();
      ctx.moveTo(scaledRadius, 0);
      ctx.lineTo(finalCanvas.width - scaledRadius, 0);
      ctx.quadraticCurveTo(finalCanvas.width, 0, finalCanvas.width, scaledRadius);
      ctx.lineTo(finalCanvas.width, finalCanvas.height - scaledRadius);
      ctx.quadraticCurveTo(finalCanvas.width, finalCanvas.height, finalCanvas.width - scaledRadius, finalCanvas.height);
      ctx.lineTo(scaledRadius, finalCanvas.height);
      ctx.quadraticCurveTo(0, finalCanvas.height, 0, finalCanvas.height - scaledRadius);
      ctx.lineTo(0, scaledRadius);
      ctx.quadraticCurveTo(0, 0, scaledRadius, 0);
      ctx.closePath();
      ctx.clip();

      // Draw the captured card onto the clipped canvas
      ctx.drawImage(rawCanvas, 0, 0);

      const link = document.createElement('a');
      link.download = currentTab === 'weekly' ? 'xp-card-weekly.png' : 'xp-card-cumulative.png';
      link.href = finalCanvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }

    exportGif.disabled = false;
    exportGif.innerHTML = origText;
  });

  // ---- Init ----
  buildBgGrid();
  applyBackground(0);
  toggleTabControls();
  updateCard();
});

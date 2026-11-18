/**
 * Harikeshav Moorthy — Personal Engineering Portfolio Interactive Engine
 * 100% Native Vanilla JS • 60 FPS HTML5 Canvas Loops • Modular Data Architecture
 * Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  const data = window.PORTFOLIO_DATA || {};

  /* ==========================================================================
     1. CUSTOM CROSSHAIR CURSOR WITH SMOOTH INTERPOLATION
     ========================================================================== */
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactives = document.querySelectorAll('button, a, .os-window, .lab-notebook-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '38px';
        cursor.style.height = '38px';
        cursor.style.borderColor = '#ccff00';
        cursor.style.background = 'rgba(204, 255, 0, 0.08)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = '#ccff00';
        cursor.style.background = 'transparent';
      });
    });
  }

  /* ==========================================================================
     2. LIVE BENGALURU SYSTEM CLOCK (UTC+05:30)
     ========================================================================== */
  const clockEl = document.getElementById('system-clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeStr = now.toLocaleTimeString('en-GB', options);
    clockEl.innerText = `${timeStr} UTC+05:30`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ==========================================================================
     3. HERO CANVAS: 3D NEURAL & KINEMATICS WIREFRAME ENGINE (60 FPS)
     ========================================================================== */
  const heroCanvas = document.getElementById('hero-wireframe-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let angleX = 0.4;
    let angleY = 0;
    let tick = 0;

    function resizeHeroCanvas() {
      heroCanvas.width = heroCanvas.parentElement.clientWidth || 400;
      heroCanvas.height = 260;
    }
    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);

    // 3D Neural Linkage Model Coordinates
    const joints = [
      { x: 0, y: 70, z: 0 },
      { x: 0, y: 10, z: 0 },
      { x: 50, y: -35, z: 25 },
      { x: 25, y: -85, z: 35 },
      { x: -40, y: -35, z: -25 },
      { x: -25, y: -85, z: -35 },
      { x: 0, y: -105, z: 10 },
      { x: 20, y: -125, z: 15 },
      { x: -20, y: -125, z: 5 },
      { x: 60, y: 20, z: -20 },
      { x: -60, y: 20, z: 20 }
    ];

    const bones = [
      [0, 1], [1, 2], [2, 3], [1, 4], [4, 5],
      [1, 6], [6, 7], [6, 8], [2, 4], [3, 7],
      [1, 9], [1, 10], [9, 2], [10, 4]
    ];

    function project(p, w, h) {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = 320;
      const scale = fov / (fov + z2 + 180);
      return {
        x: w / 2 + x1 * scale,
        y: h / 2 + y2 * scale,
        scale: scale,
        z: z2
      };
    }

    function renderHeroKinematics() {
      tick++;
      angleY += 0.015;
      angleX = 0.35 + Math.sin(tick * 0.02) * 0.15;

      const w = heroCanvas.width;
      const h = heroCanvas.height;
      ctx.clearRect(0, 0, w, h);

      // Floor grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 160;
      for (let g = -gridSize; g <= gridSize; g += 40) {
        const pA = project({ x: g, y: 80, z: -gridSize }, w, h);
        const pB = project({ x: g, y: 80, z: gridSize }, w, h);
        ctx.beginPath(); ctx.moveTo(pA.x, pA.y); ctx.lineTo(pB.x, pB.y); ctx.stroke();

        const pC = project({ x: -gridSize, y: 80, z: g }, w, h);
        const pD = project({ x: gridSize, y: 80, z: g }, w, h);
        ctx.beginPath(); ctx.moveTo(pC.x, pC.y); ctx.lineTo(pD.x, pD.y); ctx.stroke();
      }

      const proj = joints.map(j => project(j, w, h));

      // Linkages
      bones.forEach(([i, j]) => {
        const a = proj[i];
        const b = proj[j];
        ctx.strokeStyle = '#ccff00';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Nodes
      proj.forEach((p, idx) => {
        ctx.fillStyle = idx === 0 ? '#ffffff' : '#ccff00';
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, 4 * p.scale), 0, Math.PI * 2);
        ctx.fill();

        if (idx === 1 || idx === 3 || idx === 6) {
          ctx.fillStyle = 'rgba(204, 255, 0, 0.6)';
          ctx.font = '9px monospace';
          ctx.fillText(`NODE_${idx}[${p.x.toFixed(0)},${p.y.toFixed(0)}]`, p.x + 8, p.y - 4);
        }
      });

      requestAnimationFrame(renderHeroKinematics);
    }
    renderHeroKinematics();
  }

  /* ==========================================================================
     4. CANVAS: TACHYON VISIONVAULT 2D LATENT SPACE CLUSTERING
     ========================================================================== */
  const vvCanvas = document.getElementById('canvas-visionvault');
  if (vvCanvas) {
    const vCtx = vvCanvas.getContext('2d');
    let points = [];

    function initVvPoints() {
      points = [];
      const w = vvCanvas.width = vvCanvas.parentElement.clientWidth || 360;
      const h = vvCanvas.height = 135;

      const clusterCenters = [
        { x: w * 0.22, y: h * 0.5, color: '#ccff00' },
        { x: w * 0.52, y: h * 0.4, color: '#00f0ff' },
        { x: w * 0.82, y: h * 0.6, color: '#ff3366' }
      ];

      for (let i = 0; i < 48; i++) {
        const c = clusterCenters[i % 3];
        points.push({
          x: c.x + (Math.random() - 0.5) * 65,
          y: c.y + (Math.random() - 0.5) * 45,
          color: c.color,
          radius: Math.random() * 2 + 1.5,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35
        });
      }
    }

    function renderVisionVault() {
      vCtx.clearRect(0, 0, vvCanvas.width, vvCanvas.height);

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 36 && points[i].color === points[j].color) {
            vCtx.strokeStyle = points[i].color + '33';
            vCtx.lineWidth = 0.8;
            vCtx.beginPath();
            vCtx.moveTo(points[i].x, points[i].y);
            vCtx.lineTo(points[j].x, points[j].y);
            vCtx.stroke();
          }
        }
      }

      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 10 || p.x > vvCanvas.width - 10) p.vx *= -1;
        if (p.y < 10 || p.y > vvCanvas.height - 10) p.vy *= -1;

        vCtx.fillStyle = p.color;
        vCtx.beginPath();
        vCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        vCtx.fill();
      });

      vCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      vCtx.font = '9px monospace';
      vCtx.fillText("ViT 768-DIM HNSW CLUSTERING // p95: 14ms", 10, vvCanvas.height - 8);

      requestAnimationFrame(renderVisionVault);
    }

    initVvPoints();
    renderVisionVault();
    window.addEventListener('resize', initVvPoints);

    vvCanvas.addEventListener('click', (e) => {
      const rect = vvCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      points.forEach(p => {
        p.x += (clickX - p.x) * 0.25;
        p.y += (clickY - p.y) * 0.25;
      });
    });
  }

  /* ==========================================================================
     5. CANVAS: CARRIER AI CALLER BOT & SIP AUDIO EQUALIZER
     ========================================================================== */
  const cbCanvas = document.getElementById('canvas-callerbot');
  if (cbCanvas) {
    const cbCtx = cbCanvas.getContext('2d');
    let cbTick = 0;

    function renderCallerBot() {
      cbTick++;
      cbCanvas.width = cbCanvas.parentElement.clientWidth || 360;
      cbCanvas.height = 135;
      const w = cbCanvas.width;
      const h = cbCanvas.height;

      cbCtx.clearRect(0, 0, w, h);

      const numBars = 36;
      const gap = 3;
      const barWidth = (w - (numBars * gap)) / numBars;

      for (let i = 0; i < numBars; i++) {
        const wave1 = Math.sin((i * 0.24) + (cbTick * 0.08));
        const wave2 = Math.cos((i * 0.16) - (cbTick * 0.06));
        const barHeight = Math.abs(wave1 * 0.65 + wave2 * 0.35) * (h * 0.68) + 6;

        const x = i * (barWidth + gap);
        const y = (h - barHeight) / 2;

        const grad = cbCtx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, '#00f0ff');
        grad.addColorStop(1, '#ccff00');

        cbCtx.fillStyle = grad;
        cbCtx.fillRect(x, y, barWidth, barHeight);
      }

      // VAD indicator threshold
      cbCtx.strokeStyle = 'rgba(204, 255, 0, 0.4)';
      cbCtx.lineWidth = 1;
      cbCtx.setLineDash([3, 3]);
      cbCtx.beginPath();
      cbCtx.moveTo(0, h * 0.45);
      cbCtx.lineTo(w, h * 0.45);
      cbCtx.stroke();
      cbCtx.setLineDash([]);

      cbCtx.fillStyle = '#00f0ff';
      cbCtx.font = '9px monospace';
      cbCtx.fillText("SIP RTP (Opus) // LATENCY: 298ms // VAD: DETECTED", 10, h - 8);

      requestAnimationFrame(renderCallerBot);
    }
    renderCallerBot();
  }

  /* ==========================================================================
     6. CANVAS: TACHYON NEXUS DB MULTI-TENANT SHARD MAP
     ========================================================================== */
  const dbCanvas = document.getElementById('canvas-nexusdb');
  if (dbCanvas) {
    const dbCtx = dbCanvas.getContext('2d');
    let dbTick = 0;

    function renderNexusDb() {
      dbTick++;
      dbCanvas.width = dbCanvas.parentElement.clientWidth || 360;
      dbCanvas.height = 135;
      const w = dbCanvas.width;
      const h = dbCanvas.height;

      dbCtx.clearRect(0, 0, w, h);

      // 4 Shard node rectangles
      const shards = [
        { name: "SHARD_01", x: w * 0.15, y: 35, qps: "4.2k" },
        { name: "SHARD_02", x: w * 0.40, y: 35, qps: "3.8k" },
        { name: "SHARD_03", x: w * 0.65, y: 35, qps: "3.4k" },
        { name: "SHARD_04", x: w * 0.90, y: 35, qps: "2.8k" }
      ];

      shards.forEach(sh => {
        dbCtx.fillStyle = '#101018';
        dbCtx.strokeStyle = '#ffaa00';
        dbCtx.lineWidth = 1.2;
        dbCtx.fillRect(sh.x - 24, sh.y - 14, 48, 28);
        dbCtx.strokeRect(sh.x - 24, sh.y - 14, 48, 28);

        dbCtx.fillStyle = '#ffffff';
        dbCtx.font = '8.5px monospace';
        dbCtx.fillText(sh.name, sh.x - 19, sh.y);
        dbCtx.fillStyle = '#ffaa00';
        dbCtx.fillText(`${sh.qps} qps`, sh.x - 17, sh.y + 10);
      });

      // Synchronizing packet pulse
      const packetPos = (dbTick * 1.5) % w;
      dbCtx.strokeStyle = 'rgba(255, 170, 0, 0.5)';
      dbCtx.lineWidth = 1;
      dbCtx.beginPath();
      dbCtx.moveTo(0, 85);
      dbCtx.lineTo(w, 85);
      dbCtx.stroke();

      dbCtx.fillStyle = '#ccff00';
      dbCtx.beginPath();
      dbCtx.arc(packetPos, 85, 4, 0, Math.PI * 2);
      dbCtx.fill();

      dbCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      dbCtx.font = '9px monospace';
      dbCtx.fillText("ZERO-DRIFT MIGRATION PROTOCOL // SHADOW VERIFIED", 10, h - 8);

      requestAnimationFrame(renderNexusDb);
    }
    renderNexusDb();
  }

  /* ==========================================================================
     7. CANVAS: PROSTHETIC ARM 5-DOF TENDON KINEMATICS
     ========================================================================== */
  const prosthCanvas = document.getElementById('canvas-prosthetic');
  if (prosthCanvas) {
    const pCtx = prosthCanvas.getContext('2d');
    let pTick = 0;

    function renderProsthetic() {
      pTick++;
      prosthCanvas.width = prosthCanvas.parentElement.clientWidth || 360;
      prosthCanvas.height = 135;
      const w = prosthCanvas.width;
      const h = prosthCanvas.height;

      pCtx.clearRect(0, 0, w, h);

      const fingers = ["D1_THUMB", "D2_INDEX", "D3_MID", "D4_RING", "D5_PINKY"];
      const colWidth = w / 5;

      fingers.forEach((name, i) => {
        const cx = i * colWidth + colWidth / 2;
        const flex = Math.sin(pTick * 0.05 + i * 0.8) * 0.5 + 0.5;
        const duty = Math.floor(flex * 100);

        pCtx.fillStyle = '#ffffff';
        pCtx.beginPath();
        pCtx.arc(cx, h - 25, 4, 0, Math.PI * 2);
        pCtx.fill();

        const midY = (h - 25) - (38 * (1 - flex * 0.3));
        const midX = cx + Math.sin(flex * 0.4) * 8;
        pCtx.fillStyle = '#ccff00';
        pCtx.beginPath();
        pCtx.arc(midX, midY, 3, 0, Math.PI * 2);
        pCtx.fill();

        const tipY = midY - (32 * (1 - flex * 0.5));
        const tipX = midX + Math.sin(flex * 0.8) * 14;
        pCtx.fillStyle = '#ccff00';
        pCtx.beginPath();
        pCtx.arc(tipX, tipY, 3, 0, Math.PI * 2);
        pCtx.fill();

        pCtx.strokeStyle = 'rgba(204, 255, 0, 0.7)';
        pCtx.lineWidth = 1.6;
        pCtx.beginPath();
        pCtx.moveTo(cx, h - 25);
        pCtx.lineTo(midX, midY);
        pCtx.lineTo(tipX, tipY);
        pCtx.stroke();

        pCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        pCtx.font = '9px monospace';
        pCtx.fillText(`${duty}%`, cx - 10, h - 8);
      });

      requestAnimationFrame(renderProsthetic);
    }
    renderProsthetic();
  }

  /* ==========================================================================
     8. CANVAS: NEUROSYNC sEMG OSCILLOSCOPE & TINYML CLASSIFIER
     ========================================================================== */
  const semgCanvas = document.getElementById('canvas-semg');
  if (semgCanvas) {
    const smCtx = semgCanvas.getContext('2d');
    let smTick = 0;

    function renderSemgWaveform() {
      smTick++;
      semgCanvas.width = semgCanvas.parentElement.clientWidth || 360;
      semgCanvas.height = 135;
      const w = semgCanvas.width;
      const h = semgCanvas.height;

      smCtx.clearRect(0, 0, w, h);

      smCtx.strokeStyle = 'rgba(255, 51, 102, 0.85)';
      smCtx.lineWidth = 1.3;
      smCtx.beginPath();

      for (let x = 0; x < w; x += 2) {
        const isSpike = (x + smTick * 3) % 180 < 35;
        const amplitude = isSpike ? (Math.random() - 0.5) * 48 : (Math.random() - 0.5) * 8;
        const y = h * 0.5 + amplitude;
        if (x === 0) smCtx.moveTo(x, y);
        else smCtx.lineTo(x, y);
      }
      smCtx.stroke();

      smCtx.fillStyle = '#ff3366';
      smCtx.font = '9px monospace';
      smCtx.fillText("STM32 CMSIS-NN // INFERENCE: 7.8MS // INT8 TCN", 10, h - 8);

      requestAnimationFrame(renderSemgWaveform);
    }
    renderSemgWaveform();
  }

  /* ==========================================================================
     9. CANVAS: SIH HIGH-ALTITUDE RADAR SWEEP HUD
     ========================================================================== */
  const radarCanvas = document.getElementById('canvas-radar');
  if (radarCanvas) {
    const rCtx = radarCanvas.getContext('2d');
    let rAngle = 0;

    function renderRadarSweep() {
      radarCanvas.width = radarCanvas.parentElement.clientWidth || 360;
      radarCanvas.height = 135;

      const w = radarCanvas.width;
      const h = radarCanvas.height;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const radius = Math.min(cx, cy) - 10;

      rCtx.clearRect(0, 0, w, h);

      // Concentric circles
      rCtx.strokeStyle = 'rgba(204, 255, 0, 0.2)';
      rCtx.lineWidth = 1;
      [0.35, 0.7, 1.0].forEach(mult => {
        rCtx.beginPath();
        rCtx.arc(cx, cy, radius * mult, 0, Math.PI * 2);
        rCtx.stroke();
      });

      // Axis lines
      rCtx.beginPath();
      rCtx.moveTo(cx - radius, cy); rCtx.lineTo(cx + radius, cy);
      rCtx.moveTo(cx, cy - radius); rCtx.lineTo(cx, cy + radius);
      rCtx.stroke();

      // Rotating Radar Beam
      rAngle += 0.04;
      rCtx.save();
      rCtx.translate(cx, cy);
      rCtx.rotate(rAngle);

      const sweepGrad = rCtx.createRadialGradient(0, 0, 0, 0, 0, radius);
      sweepGrad.addColorStop(0, 'rgba(204, 255, 0, 0.45)');
      sweepGrad.addColorStop(1, 'rgba(204, 255, 0, 0)');
      rCtx.fillStyle = sweepGrad;
      rCtx.beginPath();
      rCtx.moveTo(0, 0);
      rCtx.arc(0, 0, radius, 0, 0.6);
      rCtx.closePath();
      rCtx.fill();
      rCtx.restore();

      // Drone Target Blip
      const tx = cx + Math.cos(2.4) * (radius * 0.65);
      const ty = cy + Math.sin(2.4) * (radius * 0.65);
      rCtx.fillStyle = '#ccff00';
      rCtx.beginPath();
      rCtx.arc(tx, ty, 3.5, 0, Math.PI * 2);
      rCtx.fill();

      rCtx.strokeStyle = '#ffffff';
      rCtx.strokeRect(tx - 7, ty - 7, 14, 14);

      rCtx.fillStyle = '#ccff00';
      rCtx.font = '9px monospace';
      rCtx.fillText("120Hz YOLOv8 + FMCW RADAR // TARGET LOCKED", 10, h - 8);

      requestAnimationFrame(renderRadarSweep);
    }
    renderRadarSweep();
  }

  /* ==========================================================================
     10. DYNAMIC SKILLS MATRIX & FILTERING
     ========================================================================== */
  const skillsContainer = document.getElementById('skills-matrix-container');

  function renderSkills(category = 'all') {
    if (!skillsContainer || !data.skills) return;
    skillsContainer.innerHTML = '';

    const categories = [
      { key: 'programming', name: '01 / Programming', items: data.skills.programming },
      { key: 'frameworks', name: '02 / AI & Frameworks', items: data.skills.frameworks },
      { key: 'tools', name: '03 / Cloud & Databases', items: data.skills.tools },
      { key: 'engineering', name: '04 / Embedded & Robotics', items: data.skills.engineering },
      { key: 'libraries', name: '05 / Libraries & DSP', items: data.skills.libraries }
    ];

    categories.forEach(cat => {
      if (category === 'all' || category === cat.key) {
        const card = document.createElement('div');
        card.className = 'skill-cluster-card font-mono';
        card.innerHTML = `
          <div class="skill-cluster-name">${cat.name}</div>
          <div class="skill-pills-list">
            ${cat.items.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
          </div>
        `;
        skillsContainer.appendChild(card);
      }
    });
  }

  renderSkills('all');

  window.filterSkills = function(cat, evt) {
    document.querySelectorAll('.skill-filter-btn').forEach(btn => btn.classList.remove('active'));
    if (evt && evt.target) evt.target.classList.add('active');
    renderSkills(cat);
  };

  /* ==========================================================================
     11. DYNAMIC LAB NOTEBOOK RENDERER
     ========================================================================== */
  const labContainer = document.getElementById('lab-container');
  if (labContainer && data.labExperiments) {
    labContainer.innerHTML = data.labExperiments.map(exp => {
      let badgeClass = 'status-building';
      if (exp.status === 'EXPERIMENTING') badgeClass = 'status-experimenting';
      if (exp.status === 'LEARNING') badgeClass = 'status-learning';
      if (exp.status === 'IN DEVELOPMENT') badgeClass = 'status-indevelopment';

      return `
        <article class="lab-notebook-card font-mono">
          <div>
            <div class="lab-card-top">
              <span style="color: var(--text-dim);">${exp.code} // ${exp.category}</span>
              <span class="lab-status-badge ${badgeClass}">[ ${exp.status} ]</span>
            </div>
            <h4 class="lab-card-title" style="margin-top: 10px;">${exp.title}</h4>
            <p class="lab-card-desc" style="margin-top: 8px;">${exp.desc}</p>
          </div>
          <div style="border-top: 1px solid var(--border-hairline); padding-top: 10px; font-size: 10px; color: var(--text-dim);">
            STATUS: ACTIVE INVESTIGATION
          </div>
        </article>
      `;
    }).join('');
  }

  /* ==========================================================================
     12. PROJECT DETAIL EXPANSION MODAL
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-project-content');

  window.openProjectModal = function(projectId) {
    if (!data.projects) return;
    const proj = data.projects.find(p => p.id === projectId);
    if (!proj || !projectModal || !modalContent) return;

    modalContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-hairline); padding-bottom: 12px;">
          <span style="color: var(--accent-lime); font-size: 11px; font-weight: 700; letter-spacing: 0.12em;">${proj.code} // ${proj.tag}</span>
          <span class="window-status-pill">${proj.status}</span>
        </div>

        <h3 style="font-size: 22px; font-weight: 900; color: #fff; text-transform: uppercase;">${proj.title}</h3>
        <div style="font-size: 11px; color: var(--text-muted);">${proj.category}</div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-hairline); border-radius: 6px; padding: 16px; margin: 6px 0;">
          <div style="font-size: 11px; color: var(--accent-lime); font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">Architecture Overview</div>
          <p style="font-size: 13.5px; color: var(--text-primary); line-height: 1.6;">${proj.overview}</p>
        </div>

        <div>
          <div style="font-size: 11px; color: var(--accent-lime); font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">Engineering Contributions</div>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${proj.myContribution}</p>
        </div>

        <div>
          <div style="font-size: 11px; color: var(--accent-lime); font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">Benchmarking &amp; Iteration</div>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${proj.process}</p>
        </div>

        <div>
          <div style="font-size: 11px; color: #ff3366; font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">Technical Bottlenecks Overcome</div>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${proj.challenges}</p>
        </div>

        <div style="border-top: 1px solid var(--border-hairline); padding-top: 14px;">
          <div style="font-size: 10px; color: var(--text-dim); text-transform: uppercase; margin-bottom: 8px;">Stack &amp; Frameworks</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${proj.technologies.map(t => `<span class="window-tag" style="border-color: rgba(204,255,0,0.3); color: #fff;">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) window.closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      window.closeProjectModal();
    }
  });

  /* ==========================================================================
     13. SMOOTH SCROLLING & ACTIVE NAVIGATION DOCK
     ========================================================================== */
  window.scrollToSection = function(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sections = ['hero', 'projects', 'about', 'skills', 'lab', 'contact'];
  const dockBtns = document.querySelectorAll('.dock-item-btn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 250;
    sections.forEach((secId, idx) => {
      const el = document.getElementById(secId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          dockBtns.forEach(b => b.classList.remove('active'));
          if (dockBtns[idx]) dockBtns[idx].classList.add('active');
        }
      }
    });
  });

});

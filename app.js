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

    // Scale up on interactive targets
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
     3. HERO CANVAS: 3D KINEMATICS WIREFRAME ENGINE (60 FPS)
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

    // 3D Joint Model Coordinates (Biomechanical Arm Linkages)
    const joints = [
      { x: 0, y: 80, z: 0 },
      { x: 0, y: 10, z: 0 },
      { x: 45, y: -40, z: 25 },
      { x: 20, y: -90, z: 35 },
      { x: -35, y: -40, z: -25 },
      { x: -20, y: -90, z: -35 },
      { x: 0, y: -110, z: 10 },
      { x: 15, y: -130, z: 15 },
      { x: -15, y: -130, z: 5 }
    ];

    const bones = [
      [0, 1], [1, 2], [2, 3], [1, 4], [4, 5],
      [1, 6], [6, 7], [6, 8], [2, 4], [3, 7]
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

      // Coordinate grid floor
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
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Joint nodes
      proj.forEach((p, idx) => {
        ctx.fillStyle = idx === 0 ? '#ffffff' : '#ccff00';
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, 4 * p.scale), 0, Math.PI * 2);
        ctx.fill();

        if (idx === 1 || idx === 3 || idx === 6) {
          ctx.fillStyle = 'rgba(204, 255, 0, 0.6)';
          ctx.font = '9px monospace';
          ctx.fillText(`J_${idx}[${p.x.toFixed(0)},${p.y.toFixed(0)}]`, p.x + 8, p.y - 4);
        }
      });

      requestAnimationFrame(renderHeroKinematics);
    }
    renderHeroKinematics();
  }

  /* ==========================================================================
     4. CANVAS 2: PROSTHETIC ARM 5-DOF TENDON SIMULATOR
     ========================================================================== */
  const prosthCanvas = document.getElementById('canvas-prosthetic');
  if (prosthCanvas) {
    const pCtx = prosthCanvas.getContext('2d');
    let pTick = 0;

    function renderProsthetic() {
      pTick++;
      prosthCanvas.width = prosthCanvas.parentElement.clientWidth || 360;
      prosthCanvas.height = 130;
      const w = prosthCanvas.width;
      const h = prosthCanvas.height;

      pCtx.clearRect(0, 0, w, h);

      const fingers = ["Thumb (D1)", "Index (D2)", "Middle (D3)", "Ring (D4)", "Pinky (D5)"];
      const colWidth = w / 5;

      fingers.forEach((name, i) => {
        const cx = i * colWidth + colWidth / 2;
        const flex = Math.sin(pTick * 0.05 + i * 0.8) * 0.5 + 0.5;
        const duty = Math.floor(flex * 100);

        pCtx.fillStyle = '#ffffff';
        pCtx.beginPath();
        pCtx.arc(cx, h - 25, 4, 0, Math.PI * 2);
        pCtx.fill();

        const midY = (h - 25) - (35 * (1 - flex * 0.3));
        const midX = cx + Math.sin(flex * 0.4) * 8;
        pCtx.fillStyle = '#ccff00';
        pCtx.beginPath();
        pCtx.arc(midX, midY, 3, 0, Math.PI * 2);
        pCtx.fill();

        const tipY = midY - (30 * (1 - flex * 0.5));
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
     5. CANVAS 3: MECANUM OBSTACLE-AVOIDING ROBOT SIMULATOR
     ========================================================================== */
  const mecanumCanvas = document.getElementById('canvas-mecanum');
  if (mecanumCanvas) {
    const mCtx = mecanumCanvas.getContext('2d');
    let mTick = 0;
    let botX = 80;
    let botY = 65;
    let botVx = 0.8;
    let sonarPing = 0;

    function renderMecanum() {
      mTick++;
      mecanumCanvas.width = mecanumCanvas.parentElement.clientWidth || 300;
      mecanumCanvas.height = 130;
      const w = mecanumCanvas.width;
      const h = mecanumCanvas.height;

      mCtx.clearRect(0, 0, w, h);

      botX += botVx;
      if (botX > w - 80 || botX < 60) {
        botVx *= -1;
      }

      sonarPing = (sonarPing + 0.05) % 1;
      const pingRadius = 30 + sonarPing * 45;
      mCtx.strokeStyle = `rgba(204, 255, 0, ${1 - sonarPing})`;
      mCtx.lineWidth = 1.2;
      mCtx.beginPath();
      mCtx.arc(botX + (botVx > 0 ? 30 : -30), botY, pingRadius, botVx > 0 ? -0.5 : 2.6, botVx > 0 ? 0.5 : 3.6);
      mCtx.stroke();

      mCtx.fillStyle = '#0e0e16';
      mCtx.strokeStyle = '#ccff00';
      mCtx.lineWidth = 1.5;
      mCtx.strokeRect(botX - 22, botY - 26, 44, 52);
      mCtx.fillRect(botX - 22, botY - 26, 44, 52);

      const wheels = [
        { x: botX - 28, y: botY - 26 },
        { x: botX + 20, y: botY - 26 },
        { x: botX - 28, y: botY + 14 },
        { x: botX + 20, y: botY + 14 }
      ];

      wheels.forEach((wh, idx) => {
        mCtx.fillStyle = '#20202c';
        mCtx.strokeStyle = '#ffffff';
        mCtx.lineWidth = 1;
        mCtx.fillRect(wh.x, wh.y, 8, 14);
        mCtx.strokeRect(wh.x, wh.y, 8, 14);

        mCtx.strokeStyle = '#ccff00';
        mCtx.beginPath();
        const sign = idx % 2 === 0 ? 1 : -1;
        mCtx.moveTo(wh.x, wh.y + (sign > 0 ? 0 : 12));
        mCtx.lineTo(wh.x + 8, wh.y + (sign > 0 ? 12 : 0));
        mCtx.stroke();
      });

      mCtx.strokeStyle = '#ccff00';
      mCtx.beginPath();
      mCtx.moveTo(botX, botY);
      mCtx.lineTo(botX + botVx * 20, botY);
      mCtx.stroke();

      mCtx.fillStyle = '#00f0ff';
      mCtx.beginPath();
      mCtx.arc(botX + (botVx > 0 ? 22 : -22), botY, 3, 0, Math.PI * 2);
      mCtx.fill();

      mCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      mCtx.font = '9px monospace';
      mCtx.fillText("MECANUM OMNI-MOTION: ACTIVE", 12, h - 10);

      requestAnimationFrame(renderMecanum);
    }
    renderMecanum();
  }

  /* ==========================================================================
     6. CANVAS 4: MICRO RC CAR ROBOSPRINT TELEMETRY
     ========================================================================== */
  const rcCanvas = document.getElementById('canvas-rc');
  if (rcCanvas) {
    const rcCtx = rcCanvas.getContext('2d');
    let rcTick = 0;

    function renderRcTelemetry() {
      rcTick++;
      rcCanvas.width = rcCanvas.parentElement.clientWidth || 300;
      rcCanvas.height = 120;
      const w = rcCanvas.width;
      const h = rcCanvas.height;

      rcCtx.clearRect(0, 0, w, h);

      rcCtx.strokeStyle = 'rgba(255, 77, 77, 0.8)';
      rcCtx.lineWidth = 1.4;
      rcCtx.beginPath();

      for (let x = 0; x < w; x += 3) {
        const speedWave = Math.sin((x * 0.04) + (rcTick * 0.08)) * 25;
        const noise = (Math.random() - 0.5) * 6;
        const y = h * 0.5 + speedWave + noise;
        if (x === 0) rcCtx.moveTo(x, y);
        else rcCtx.lineTo(x, y);
      }
      rcCtx.stroke();

      const apexX = (rcTick * 3) % w;
      const apexY = h * 0.5 + Math.sin((apexX * 0.04) + (rcTick * 0.08)) * 25;
      rcCtx.fillStyle = '#ff4d4d';
      rcCtx.beginPath();
      rcCtx.arc(apexX, apexY, 4, 0, Math.PI * 2);
      rcCtx.fill();
      rcCtx.strokeStyle = '#ffffff';
      rcCtx.strokeRect(apexX - 7, apexY - 7, 14, 14);

      rcCtx.fillStyle = '#ffffff';
      rcCtx.font = '9px monospace';
      rcCtx.fillText("2.4GHz ESC TELEMETRY // CORNERING APEX", 10, 16);
      rcCtx.fillStyle = '#ff4d4d';
      rcCtx.fillText("THROTTLE: 94% • STEERING: 18°", 10, h - 8);

      requestAnimationFrame(renderRcTelemetry);
    }
    renderRcTelemetry();
  }

  /* ==========================================================================
     7. CANVAS 5: VISION SENSE LAB SENSOR ARRAY
     ========================================================================== */
  const visCanvas = document.getElementById('canvas-vision');
  if (visCanvas) {
    const vCtx = visCanvas.getContext('2d');
    let vTick = 0;

    function renderVisionSense() {
      vTick += 0.035;
      visCanvas.width = visCanvas.parentElement.clientWidth || 300;
      visCanvas.height = 120;
      const w = visCanvas.width;
      const h = visCanvas.height;
      const cx = w * 0.5;
      const cy = h * 0.5;

      vCtx.clearRect(0, 0, w, h);

      vCtx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      vCtx.lineWidth = 1;
      [0.3, 0.6, 0.95].forEach(scale => {
        vCtx.beginPath();
        vCtx.arc(cx, cy, (h * 0.45) * scale, 0, Math.PI * 2);
        vCtx.stroke();
      });

      vCtx.save();
      vCtx.translate(cx, cy);
      vCtx.rotate(vTick);

      const grad = vCtx.createRadialGradient(0, 0, 0, 0, 0, h * 0.45);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      vCtx.fillStyle = grad;
      vCtx.beginPath();
      vCtx.moveTo(0, 0);
      vCtx.arc(0, 0, h * 0.45, 0, 0.7);
      vCtx.closePath();
      vCtx.fill();
      vCtx.restore();

      const t1x = cx + Math.cos(1.8) * 36;
      const t1y = cy + Math.sin(1.8) * 36;
      vCtx.fillStyle = '#00f0ff';
      vCtx.beginPath();
      vCtx.arc(t1x, t1y, 3, 0, Math.PI * 2);
      vCtx.fill();

      vCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      vCtx.font = '9px monospace';
      vCtx.fillText("SPATIAL OBSTACLE: 42cm", t1x + 8, t1y + 3);

      vCtx.fillStyle = '#00f0ff';
      vCtx.fillText("SENSORY MATRIX: R&D ACTIVE", 10, h - 8);

      requestAnimationFrame(renderVisionSense);
    }
    renderVisionSense();
  }

  /* ==========================================================================
     8. DYNAMIC SKILLS MATRIX & FILTERING
     ========================================================================== */
  const skillsContainer = document.getElementById('skills-matrix-container');

  function renderSkills(category = 'all') {
    if (!skillsContainer || !data.skills) return;
    skillsContainer.innerHTML = '';

    const categories = [
      { key: 'programming', name: '01 / Programming', items: data.skills.programming },
      { key: 'engineering', name: '02 / Hardware & Robotics', items: data.skills.engineering },
      { key: 'frameworks', name: '03 / Frameworks & Web', items: data.skills.frameworks },
      { key: 'tools', name: '04 / Tools & Platforms', items: data.skills.tools },
      { key: 'libraries', name: '05 / Scientific Libraries', items: data.skills.libraries }
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
     9. DYNAMIC LAB NOTEBOOK RENDERER
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
     10. PROJECT DETAIL EXPANSION MODAL
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

        <h3 style="font-size: 24px; font-weight: 900; color: #fff; text-transform: uppercase;">${proj.title}</h3>
        <div style="font-size: 11px; color: var(--text-muted);">${proj.category}</div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-hairline); border-radius: 6px; padding: 16px; margin: 6px 0;">
          <div style="font-size: 11px; color: var(--accent-lime); font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">Project Overview</div>
          <p style="font-size: 13.5px; color: var(--text-primary); line-height: 1.6;">${proj.overview}</p>
        </div>

        <div>
          <div style="font-size: 11px; color: var(--accent-lime); font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">My Contribution</div>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${proj.myContribution}</p>
        </div>

        <div>
          <div style="font-size: 11px; color: var(--accent-lime); font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">Engineering Process &amp; Iteration</div>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${proj.process}</p>
        </div>

        <div>
          <div style="font-size: 11px; color: #ff4d4d; font-weight: 700; margin-bottom: 6px; text-transform: uppercase;">Technical Challenges Overcome</div>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${proj.challenges}</p>
        </div>

        <div style="border-top: 1px solid var(--border-hairline); padding-top: 14px;">
          <div style="font-size: 10px; color: var(--text-dim); text-transform: uppercase; margin-bottom: 8px;">Technologies &amp; Components</div>
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
     11. SMOOTH SCROLLING & ACTIVE NAVIGATION DOCK
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

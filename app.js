/**
 * Harikeshav Moorthy — Master Portfolio Interactive Engine
 * 100% Vanilla JS • Native 60 FPS Canvas Loops • Micro-Interactions
 * Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CATEGORY FILTER SYSTEM
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.bento-card');

  window.filterProjects = function(category, evt) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (evt && evt.target) {
      evt.target.classList.add('active');
    }

    projectCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
      } else {
        card.style.display = 'none';
      }
    });
  };

  /* ==========================================================================
     2. DEVOPS LIVE TERMINAL HUD & LOAD SURGE SIMULATOR
     ========================================================================== */
  const terminalStream = document.getElementById('terminal-stream');
  const logs = [
    "⚡ [K8S INGRESS] Dispatched 1,420 incoming SIP channels to media worker node #09",
    "✔ [VISION VAULT] Extracted 1,024-dim embedding vectors via ViT-Base; cached in Redis (0.3ms)",
    "✔ [HPA AUTOSCALE] Triton GPU replicas autoscaled 4 → 12 to match 88% surge",
    "⚡ [TELECOM VAD] Utterance boundary detected in 38ms; LLM token streaming initiated",
    "✔ [SIH GIMBAL] Target lock confirmed at azimuth 144.2° / elevation +18.4° (120 Hz)",
    "✔ [CHAOSVOICE] Automated hot-standby migration completed in 42ms with 0 dropped packets",
    "✔ [NEXUS DB] Multi-tenant partition migration validated with zero lock time",
    "⚡ [eBPF HOOK] Re-routed 48,000 packets/sec to bypass user-space socket bottleneck"
  ];
  let logIdx = 0;

  window.injectTerminalLog = function() {
    if (!terminalStream) return;
    const line = document.createElement('div');
    line.className = "terminal-log-line font-mono log-cyan";
    line.style.opacity = '0';
    line.innerText = logs[logIdx % logs.length];
    logIdx++;
    terminalStream.appendChild(line);
    setTimeout(() => line.style.opacity = '1', 20);
    terminalStream.scrollTop = terminalStream.scrollHeight;
  };

  setInterval(() => {
    window.injectTerminalLog();
  }, 4800);

  /* ==========================================================================
     3. CANVAS 1: VISIONVAULT 2D LATENT SPACE CLUSTERING
     ========================================================================== */
  const vecCanvas = document.getElementById('vision-cluster-canvas');
  if (vecCanvas) {
    const vCtx = vecCanvas.getContext('2d');
    let points = [];

    function initPoints() {
      points = [];
      const w = vecCanvas.width = vecCanvas.parentElement.clientWidth || 600;
      const h = vecCanvas.height = 120;

      const clusterCenters = [
        { x: w * 0.22, y: h * 0.5, color: '#a855f7' },
        { x: w * 0.52, y: h * 0.4, color: '#00f2fe' },
        { x: w * 0.82, y: h * 0.6, color: '#10b981' }
      ];

      for (let i = 0; i < 48; i++) {
        const c = clusterCenters[i % 3];
        points.push({
          x: c.x + (Math.random() - 0.5) * 70,
          y: c.y + (Math.random() - 0.5) * 50,
          color: c.color,
          radius: Math.random() * 2 + 1.6,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35
        });
      }
    }

    function renderVectors() {
      vCtx.clearRect(0, 0, vecCanvas.width, vecCanvas.height);

      // Faint connections
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

      // Nodes
      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 10 || p.x > vecCanvas.width - 10) p.vx *= -1;
        if (p.y < 10 || p.y > vecCanvas.height - 10) p.vy *= -1;

        vCtx.fillStyle = p.color;
        vCtx.beginPath();
        vCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        vCtx.fill();
      });

      requestAnimationFrame(renderVectors);
    }

    initPoints();
    renderVectors();
    window.addEventListener('resize', initPoints);

    window.reclusterVectors = function() {
      initPoints();
      const scoreEl = document.getElementById('vision-sim-score');
      if (scoreEl) {
        const sim = (0.965 + Math.random() * 0.03).toFixed(3);
        scoreEl.innerText = `Cosine Similarity: ${sim}`;
      }
    };

    vecCanvas.addEventListener('click', (e) => {
      const rect = vecCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      points.forEach(p => {
        p.x += (clickX - p.x) * 0.3;
        p.y += (clickY - p.y) * 0.3;
      });
      window.reclusterVectors();
    });
  }

  /* ==========================================================================
     4. CANVAS 2: VOICESTREAM AI AUDIO SPECTRUM EQUALIZER
     ========================================================================== */
  const voiceCanvas = document.getElementById('voice-equalizer-canvas');
  if (voiceCanvas) {
    const vcCtx = voiceCanvas.getContext('2d');
    let isStreaming = true;
    let vTick = 0;

    function renderAudioEqualizer() {
      voiceCanvas.width = voiceCanvas.parentElement.clientWidth || 400;
      voiceCanvas.height = 85;

      vcCtx.clearRect(0, 0, voiceCanvas.width, voiceCanvas.height);

      const numBars = 36;
      const gap = 3;
      const barWidth = (voiceCanvas.width - (numBars * gap)) / numBars;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;
        if (isStreaming) {
          const wave1 = Math.sin((i * 0.25) + (vTick * 0.08));
          const wave2 = Math.cos((i * 0.15) - (vTick * 0.05));
          barHeight = Math.abs(wave1 * 0.6 + wave2 * 0.4) * 60 + 6;
        }

        const x = i * (barWidth + gap);
        const y = (voiceCanvas.height - barHeight) / 2;

        const grad = vcCtx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, '#00f2fe');
        grad.addColorStop(1, '#a855f7');

        vcCtx.fillStyle = grad;
        vcCtx.fillRect(x, y, barWidth, barHeight);
      }

      if (isStreaming) vTick++;
      requestAnimationFrame(renderAudioEqualizer);
    }

    renderAudioEqualizer();

    window.toggleAudioStream = function() {
      isStreaming = !isStreaming;
      const btn = document.getElementById('toggle-stream-btn');
      const badge = document.getElementById('voice-stream-status');
      if (btn && badge) {
        if (isStreaming) {
          btn.innerText = "Pause Stream";
          badge.innerText = "STREAMING AUDIO";
          badge.className = "badge badge-emerald font-mono";
        } else {
          btn.innerText = "Resume Stream";
          badge.innerText = "STREAM PAUSED";
          badge.className = "badge badge-amber font-mono";
        }
      }
    };
  }

  /* ==========================================================================
     5. SIMULATOR: CHAOSVOICE ZERO-DOWNTIME FAILOVER
     ========================================================================== */
  window.simulateFailover = function() {
    const metric = document.getElementById('failover-metric');
    const bar = document.getElementById('failover-progress-bar');
    const status = document.getElementById('failover-status-text');

    if (!metric || !bar || !status) return;

    metric.innerText = "⚡ KILLING PRIMARY POD...";
    metric.style.color = "var(--accent-rose)";
    bar.style.width = "20%";
    bar.style.background = "var(--accent-rose)";
    status.innerText = "State: eBPF XDP hook redirecting sockets...";

    setTimeout(() => {
      bar.style.width = "70%";
      bar.style.background = "var(--accent-amber)";
      metric.innerText = "⚡ HOT REHYDRATION (Standby Taking Over)...";
    }, 250);

    setTimeout(() => {
      bar.style.width = "100%";
      bar.style.background = "linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))";
      metric.innerText = "✔ 42ms Failover (0 Dropped Packets)";
      metric.style.color = "var(--accent-emerald)";
      status.innerText = "State: Pod B Active • Standby Rehydrated";
    }, 550);
  };

  /* ==========================================================================
     6. CANVAS 3: SIH HIGH-ALTITUDE RADAR SWEEP HUD
     ========================================================================== */
  const radarCanvas = document.getElementById('radar-sweep-canvas');
  if (radarCanvas) {
    const rCtx = radarCanvas.getContext('2d');
    let rAngle = 0;

    function renderRadarSweep() {
      radarCanvas.width = radarCanvas.parentElement.clientWidth || 400;
      radarCanvas.height = 110;

      const w = radarCanvas.width;
      const h = radarCanvas.height;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const radius = Math.min(cx, cy) - 10;

      rCtx.clearRect(0, 0, w, h);

      // Concentric circles
      rCtx.strokeStyle = 'rgba(244, 63, 94, 0.2)';
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
      sweepGrad.addColorStop(0, 'rgba(244, 63, 94, 0.45)');
      sweepGrad.addColorStop(1, 'rgba(244, 63, 94, 0)');
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
      rCtx.fillStyle = '#f43f5e';
      rCtx.beginPath();
      rCtx.arc(tx, ty, 3.5, 0, Math.PI * 2);
      rCtx.fill();

      rCtx.strokeStyle = '#f43f5e';
      rCtx.strokeRect(tx - 7, ty - 7, 14, 14);

      requestAnimationFrame(renderRadarSweep);
    }

    renderRadarSweep();
  }

  /* ==========================================================================
     7. CANVAS 4: AETHERMESH SDR WATERFALL SPECTRUM
     ========================================================================== */
  const sdrCanvas = document.getElementById('sdr-waterfall-canvas');
  if (sdrCanvas) {
    const sdrCtx = sdrCanvas.getContext('2d');
    let sdrTick = 0;

    function renderSdrWaterfall() {
      sdrCanvas.width = sdrCanvas.parentElement.clientWidth || 400;
      sdrCanvas.height = 70;

      const w = sdrCanvas.width;
      const h = sdrCanvas.height;

      sdrCtx.clearRect(0, 0, w, h);

      sdrCtx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
      sdrCtx.lineWidth = 1.5;
      sdrCtx.beginPath();

      for (let x = 0; x < w; x += 3) {
        const noise = (Math.random() - 0.5) * 8;
        const carrierPeak = Math.exp(-Math.pow((x - w * 0.48) / 18, 2)) * 45;
        const y = h * 0.8 - carrierPeak + noise + Math.sin(x * 0.05 + sdrTick * 0.05) * 5;
        if (x === 0) sdrCtx.moveTo(x, y);
        else sdrCtx.lineTo(x, y);
      }
      sdrCtx.stroke();

      sdrTick++;
      requestAnimationFrame(renderSdrWaterfall);
    }

    renderSdrWaterfall();
  }

  /* ==========================================================================
     8. CANVAS 5: NEUROSYNC sEMG OSCILLOSCOPE
     ========================================================================== */
  const semgCanvas = document.getElementById('semg-oscilloscope-canvas');
  if (semgCanvas) {
    const smCtx = semgCanvas.getContext('2d');
    let smTick = 0;

    function renderSemgWaveform() {
      semgCanvas.width = semgCanvas.parentElement.clientWidth || 400;
      semgCanvas.height = 70;

      const w = semgCanvas.width;
      const h = semgCanvas.height;

      smCtx.clearRect(0, 0, w, h);

      smCtx.strokeStyle = 'rgba(0, 242, 254, 0.85)';
      smCtx.lineWidth = 1.2;
      smCtx.beginPath();

      for (let x = 0; x < w; x += 2) {
        const isSpike = (x + smTick * 3) % 180 < 35;
        const amplitude = isSpike ? (Math.random() - 0.5) * 45 : (Math.random() - 0.5) * 8;
        const y = h * 0.5 + amplitude;
        if (x === 0) smCtx.moveTo(x, y);
        else smCtx.lineTo(x, y);
      }
      smCtx.stroke();

      smTick++;
      requestAnimationFrame(renderSemgWaveform);
    }

    renderSemgWaveform();
  }

  /* ==========================================================================
     9. CONTACT TRANSMISSION MODAL CONTROLS
     ========================================================================== */
  const contactModal = document.getElementById('contact-modal');

  window.openContactModal = function() {
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeContactModal = function() {
    if (contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        window.closeContactModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
      window.closeContactModal();
    }
  });

  window.handleContactSubmit = function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-msg');
    const submitBtn = document.getElementById('modal-submit-btn');
    const feedback = document.getElementById('modal-feedback');

    if (!emailInput || !msgInput) return;

    submitBtn.innerText = "Transmitting Packet...";
    submitBtn.style.opacity = "0.7";

    setTimeout(() => {
      submitBtn.innerText = "Packet Dispatched ✔";
      submitBtn.style.background = "var(--accent-emerald)";
      submitBtn.style.color = "#ffffff";
      if (feedback) feedback.style.display = "block";

      setTimeout(() => {
        window.closeContactModal();
        submitBtn.innerText = "Transmit Packet ↗";
        submitBtn.style.background = "";
        submitBtn.style.color = "";
        submitBtn.style.opacity = "";
        emailInput.value = "";
        msgInput.value = "";
        if (feedback) feedback.style.display = "none";
      }, 2000);
    }, 600);
  };

});

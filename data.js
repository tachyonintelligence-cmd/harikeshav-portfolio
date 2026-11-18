/**
 * Harikeshav Moorthy — Portfolio Structured Data Store
 * High-Level AI SaaS, Distributed Software, Neural Networks & Deep-Tech Robotics
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Harikeshav Moorthy",
    tagline: "BUILDING WHAT DOESN'T EXIST YET.",
    subheadline: "AI systems engineer. Developer. Robotics & neural networks builder. Architect of intelligent software & machines.",
    label: "AI SYSTEMS · SOFTWARE SAAS · EMBEDDED ROBOTICS · NEURAL NETWORKS",
    institution: "Dayananda Sagar College of Engineering, Bengaluru",
    program: "Electronics and Telecommunications Engineering",
    location: "Bengaluru, Karnataka, India",
    coordinates: "12.9716° N, 77.5946° E",
    email: "harikeshavofficial@gmail.com",
    phone: "+91 73384 35891",
    github: "https://github.com/tachyonintelligence-cmd",
    linkedin: "https://linkedin.com/in/harikeshav-moorthy",
    status: "CURRENTLY BUILDING",
    bio: [
      "I am Harikeshav Moorthy, an engineer and builder based in Bengaluru, developing at the intersection of AI systems, high-scale software SaaS, neural networks, carrier telecommunications, and robotics.",
      "I build production-grade platforms—from sub-300ms autonomous AI voice caller gateways and petabyte visual vector databases to on-device TinyML neural decoders and precision robotics.",
      "My work is grounded in first-principles engineering: high-throughput distributed backends, low-latency media pipelines, real-time sensor fusion, and clean, resilient software architecture.",
      "I approach technology as a continuous process of experimentation, rigorous benchmarking, iteration, and building systems that solve critical real-world problems."
    ]
  },

  projects: [
    {
      id: "project-01",
      code: "PROJECT_01",
      title: "TACHYON VISIONVAULT: MULTIMODAL VISUAL VECTOR DATABASE",
      category: "AI SAAS / VECTOR EMBEDDINGS / DISTRIBUTED SYSTEMS",
      tag: "HIGH-SCALE AI SAAS",
      status: "PRODUCTION ARCHITECTURE",
      badgeColor: "#ccff00",
      shortDesc: "High-throughput enterprise platform built to store, classify, and sort multi-terabyte visual datasets for high-level databases using Vision Transformers and vector indexing.",
      overview: "An enterprise-grade multimodal visual database platform engineered to eliminate unstructured image chaos. Employs ViT (Vision Transformer) feature extractors to generate 768-dimensional latent embeddings, indexing billions of vectors across sharded Milvus and PostgreSQL pgvector nodes with sub-18ms similarity retrieval.",
      myContribution: "Architected the distributed ingestion pipeline, implemented HNSW (Hierarchical Navigable Small World) vector graph partitioning, orchestrated GPU-accelerated embedding inference workers via FastAPI and Redis queues, and cut database storage footprint by 38% through cosine-similarity deduplication.",
      technologies: ["PyTorch ViT", "Milvus Vector DB", "PostgreSQL pgvector", "FastAPI", "Docker & Kubernetes", "Apache Kafka", "Redis Cache", "HNSW Graph Indexing"],
      process: "Trained custom visual projection heads, benchmarked cosine vs. Euclidean distance latency across 10M+ synthetic vector clusters, and tuned memory-mapped vector caches for sub-20ms p95 SLAs.",
      challenges: "Preventing GPU VRAM fragmentation during burst visual ingestion batches, managing index drift on dynamic image additions, and maintaining high vector recall under strict latency constraints."
    },
    {
      id: "project-02",
      code: "PROJECT_02",
      title: "CARRIER-GRADE AI CALLER BOT & SIP MEDIA GATEWAY",
      category: "AI TELECOM / REAL-TIME SPEECH / WEBRTC & SIP",
      tag: "REAL-TIME TELEPHONY AI",
      status: "PRODUCTION ARCHITECTURE",
      badgeColor: "#00f0ff",
      shortDesc: "Full-stack carrier telecommunication infrastructure powering hyper-natural AI conversational caller bots with sub-300ms turnaround.",
      overview: "Carrier-grade telecommunications and AI media routing platform enabling natural, bidirectional phone conversations. Features low-latency SIP/RTP audio trunking, sub-45ms Silero voice activity detection (VAD), chunked streaming Whisper speech recognition, and streaming token audio synthesis over 5,000+ simultaneous phone channels.",
      myContribution: "Engineered low-latency WebRTC and SIP media relays using FreeSWITCH and Go daemons, implemented deterministic barge-in interruption algorithms that cut response latency to sub-300ms, and built zero-downtime hot-standby socket rehydration with 0 dropped audio frames.",
      technologies: ["FreeSWITCH", "SIP Trunking", "RTP / Opus Codec", "WebRTC", "Whisper ASR", "Silero VAD", "Streaming LLM", "Golang Media Relay"],
      process: "Designed bidirectional audio buffer rings, optimized phoneme streaming chunk sizes to balance acoustic quality against latency, and conducted automated chaos testing simulating cellular packet jitter.",
      challenges: "Eliminating acoustic echo without introducing delay, handling cellular packet loss under bad network conditions, and maintaining seamless conversational turns without awkward pauses."
    },
    {
      id: "project-03",
      code: "PROJECT_03",
      title: "TACHYON NEXUS DB: COLLABORATIVE DATABASE CONTROL PLANE",
      category: "SOFTWARE PLATFORM / DATABASE SAAS / CLOUD CONTROL PLANE",
      tag: "DATABASE CONTROL PLANE",
      status: "OPERATIONAL SAAS",
      badgeColor: "#ffaa00",
      shortDesc: "Opinionated cloud database management and migration suite inspired by Basecamp simplicity, orchestrating zero-downtime schema migrations and multi-tenant sharding.",
      overview: "Reimagined the calm, asynchronous operational philosophy of Basecamp into an enterprise-scale database orchestration control plane. Eliminates manual database drift, coordinates automated zero-downtime schema migrations across distributed shards, and provides real-time query observability with cryptographic tenant sandboxing.",
      myContribution: "Designed the full-stack architecture, built shadow schema dry-run verification engines handling 14,200 queries/sec, implemented automated sub-50ms DDL rollbacks, and created clean, calm developer UI dashboards for distributed PostgreSQL and ClickHouse clusters.",
      technologies: ["Next.js & TypeScript", "PostgreSQL Sharding", "ClickHouse", "FastAPI", "Docker", "Terraform", "Redis Streams", "Prometheus"],
      process: "Mapped multi-tenant database isolation boundaries, developed cryptographic tenant schema partitioning, and built automated runbooks that test all SQL migrations against live shadow replicas before live apply.",
      challenges: "Preventing write-locks during large table alter operations on terabyte-scale databases, managing asynchronous replication lag, and designing intuitive visual diff tools for complex schema migrations."
    },
    {
      id: "project-04",
      code: "PROJECT_04",
      title: "RESEARCH-GRADE 5-DOF NEUROMOTOR BIONIC PROSTHETIC ARM",
      category: "BIOMECHATRONICS / EMBEDDED SILICON / NEURAL INTERFACES",
      tag: "HUMAN-MACHINE INTERACTION",
      status: "RESEARCH TESTING",
      badgeColor: "#ccff00",
      shortDesc: "High-precision biomimetic prosthetic limb featuring independent 5-DOF tendon actuation, closed-loop telemetry, and spatial coordinate mapping.",
      overview: "A research-level bionic hand platform featuring independent 5-DOF multi-joint tendon actuation. Developed spatial kinematic landmark tracking mapping 21 skeletal hand coordinates into sub-millisecond PWM micro-actuation curves across dual DRV8833 channels with load-sensing back-EMF feedback.",
      myContribution: "Engineered mechanical tendon drive geometry, integrated dual DRV8833 motor driver channels with PWM micro-timing, and mapped 21 spatial finger joint positions into deterministic embedded actuation routines on ESP32 while avoiding bootstrap strapping pin interference.",
      technologies: ["ESP32 Dual-Core", "MediaPipe Vision", "DRV8833 H-Bridge", "PWM Motor Control", "Mechanical CAD", "Bluetooth BLE"],
      process: "Iterative prototyping through 3D CAD modeling, custom tendon routing, hand-tuned PWM timing profiles, and closed-loop spatial coordinate validation.",
      challenges: "Mitigating electrical noise on motor transients, optimizing power budget, and ensuring smooth non-jerky digit flexion without stalling miniature gearmotors."
    },
    {
      id: "project-05",
      code: "PROJECT_05",
      title: "NEUROSYNC: ON-DEVICE NEUROMUSCULAR TINYML INTENTION DECODER",
      category: "MACHINE LEARNING / TINYML / NEURAL NETWORKS",
      tag: "DEEP LEARNING ON SILICON",
      status: "LAB BENCHMARK",
      badgeColor: "#ff3366",
      shortDesc: "1D Temporal Convolutional Neural Network deployed on ARM Cortex-M4, decoding forearm biological signals to predict motor intention in under 10ms.",
      overview: "Next-generation neural decoding system designed to predict user hand grasp intentions directly from surface electromyography (sEMG) forearm bio-potentials. Quantized a 1D Temporal Convolutional Network (TCN) to INT8 running via CMSIS-NN, predicting discrete and continuous finger actuations before physical muscular contraction completes.",
      myContribution: "Designed the neural network architecture, trained on differential sEMG datasets across 6 dynamic grasp classes, performed post-training INT8 quantization for sub-10ms inference, and interfaced low-noise ADS1299 analog front-ends with STM32 Cortex-M4 silicon.",
      technologies: ["ARM Cortex-M4", "CMSIS-NN", "PyTorch / TinyML", "1D Temporal CNN", "ADS1299 AFE", "Embedded C", "sEMG Signal Processing"],
      process: "Bandpass filtering raw 1,000 Hz bio-signals, extracting time-domain feature windows (RMS, Waveform Length, Zero Crossings), and optimizing tensor memory layout to fit in 64 KB SRAM.",
      challenges: "Overcoming sensor motion artifacts during muscle contraction, user-to-user electrode variance, and keeping MCU power consumption under 38mW."
    },
    {
      id: "project-06",
      code: "PROJECT_06",
      title: "SIH HIGH-ALTITUDE AUTONOMOUS ANTI-DRONE GIMBAL",
      category: "COMPUTER VISION / SENSOR FUSION / DEFENSE ROBOTICS",
      tag: "DEFENSE ROBOTICS & AI",
      status: "COMPLETED / HACKATHON 2026",
      badgeColor: "#ccff00",
      shortDesc: "Defense-grade dual-axis autonomous tracking gimbal fusing 120 Hz YOLOv8-Nano optical vision with FMCW mmWave radar telemetry.",
      overview: "Military-grade dual-axis autonomous tracking and interception platform engineered for high-altitude border security. Real-time sensor fusion combining 120 Hz YOLOv8 edge vision with 24 GHz FMCW mmWave radar telemetry (HLK-LD2452), executing deterministic motor control on STM32 running preemptive FreeRTOS.",
      myContribution: "Developed the sensor fusion loop integrating optical bounding boxes with raw radar range-velocity point clouds via extended Kalman filtering, tuned sub-2.1ms FreeRTOS motor control tasks over CAN bus, and designed closed-loop AS5600 magnetic angle feedback for zero-jitter aiming under gust winds.",
      technologies: ["STM32 Nucleo", "FreeRTOS", "YOLOv8-Nano Edge", "FMCW mmWave Radar", "CAN Bus", "TMC2208 Stepper FOC", "Python & OpenCV"],
      process: "Benchmarked optical occlusion fallbacks in foggy conditions, calibrated dual-axis stepper microstepping (1/256) to eliminate angular jitter, and added thermistor-regulated heating loops for sub-zero operation.",
      challenges: "Synchronizing high-frequency asynchronous radar serial packets with 120 FPS camera frames and rejecting false-positive aerial clutter."
    }
  ],

  labExperiments: [
    {
      code: "EXP_01",
      title: "Distributed vLLM PagedAttention KV-Cache Fabric",
      category: "AI INFRASTRUCTURE",
      status: "EXPERIMENTING",
      desc: "Benchmarking paged attention memory allocation across multi-GPU nodes to maximize token throughput and minimize latency spikes."
    },
    {
      code: "EXP_02",
      title: "eBPF XDP Zero-Copy Telephony Packet Redirection",
      category: "SYSTEMS SOFTWARE",
      status: "BUILDING",
      desc: "Kernel-level XDP hook routing active SIP/RTP audio streams directly to standby containers in under 42ms with zero user-space copy overhead."
    },
    {
      code: "EXP_03",
      title: "Transformer Attention Head Pruning on STM32",
      category: "TINYML & AI",
      status: "IN DEVELOPMENT",
      desc: "Structured pruning and integer quantization of mini-transformer attention matrices for real-time edge sequence modeling on Cortex-M4."
    },
    {
      code: "EXP_04",
      title: "Graph Neural Networks for High-Dimensional Vector Clustering",
      category: "NEURAL NETWORKS",
      status: "LEARNING",
      desc: "Evaluating dynamic k-NN graph construction and message-passing layers to detect semantic clusters in 100M+ visual embedding sets."
    },
    {
      code: "EXP_05",
      title: "Zero-Downtime Distributed Database Raft Shard Replication",
      category: "DATABASE SAAS",
      status: "EXPERIMENTING",
      desc: "Implementing lightweight consensus leader election and log replication across multi-region PostgreSQL instances for instant failover."
    },
    {
      code: "EXP_06",
      title: "Closed-Loop Field-Oriented Control (FOC) Motor Actuation",
      category: "ROBOTICS HARDWARE",
      status: "BUILDING",
      desc: "Space-vector PWM algorithms on STM32 driving brushless gimbals with 14-bit magnetic absolute encoder feedback for sub-0.02° positioning."
    }
  ],

  skills: {
    programming: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL", "HTML", "CSS", "R"],
    frameworks: ["React", "Next.js", "Node.js", "FastAPI", "Flask", "PyTorch", "HuggingFace", "Tailwind CSS"],
    tools: ["Docker", "Kubernetes", "Git", "Terraform", "PostgreSQL", "Milvus Vector DB", "ClickHouse", "Redis", "Kafka", "GCP"],
    libraries: ["NumPy", "Pandas", "Matplotlib", "OpenCV", "MediaPipe", "CMSIS-NN", "vLLM", "TensorRT"],
    engineering: ["STM32", "ESP32", "Arduino", "FreeRTOS", "TinyML", "Embedded C", "CAN Bus", "SIP/RTP Telephony", "mmWave Radar", "KiCad PCB Design"]
  },

  experience: [
    {
      company: "SHOWWORK",
      role: "Marketing Associate",
      period: "ENGAGEMENT",
      type: "STARTUP ECOSYSTEM",
      bullets: [
        "Marketing and promoting the startup to prospective users and ecosystem partners.",
        "Presenting the startup to investors and judges at Dayananda Sagar College of Engineering (DSCE).",
        "Coordinating social media marketing campaigns and strategic outreach.",
        "Conducting in-person promotional activities, booth exhibitions, and live demos.",
        "Translating product features into clear, compelling startup communication."
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PORTFOLIO_DATA };
}

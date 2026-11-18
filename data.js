/**
 * Harikeshav Moorthy — Portfolio Structured Data Store
 * Authentic, Verified Data Object for All Components
 * Universal Browser & ES Module Compatible
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Harikeshav Moorthy",
    tagline: "BUILDING WHAT DOESN'T EXIST YET.",
    subheadline: "Electronics engineer. Developer. Robotics enthusiast. Builder of ideas.",
    label: "ENGINEERING · ROBOTICS · SOFTWARE · INNOVATION",
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
      "I am Harikeshav Moorthy, an Electronics and Telecommunications engineering student at Dayananda Sagar College of Engineering, Bengaluru.",
      "My interests lie at the intersection of electronics, robotics, embedded systems, software, artificial intelligence, and product development.",
      "I enjoy turning ideas into functional systems—whether that means designing hardware, building robots, experimenting with software, or exploring new technologies.",
      "I approach engineering as a process of experimentation, iteration, problem-solving, and building things that have a real purpose."
    ]
  },

  projects: [
    {
      id: "project-01",
      code: "PROJECT_01",
      title: "PROSTHETIC ARM",
      category: "ROBOTICS / ELECTRONICS / HUMAN-MACHINE INTERACTION",
      tag: "BIOMECHATRONICS",
      status: "COMPLETED / RESEARCH TESTING",
      badgeColor: "#ccff00",
      shortDesc: "A prosthetic arm project involving mechanical design, electronics, control systems, and experimentation with assistive technology.",
      overview: "Designed and prototyped a gesture-controlled 5-DOF tendon-actuated prosthetic hand to explore human-machine interaction and accessible assistive technology.",
      myContribution: "Engineered the mechanical tendon drive mechanics, integrated dual DRV8833 motor driver channels with PWM micro-timing, and mapped 21 spatial finger joint positions into deterministic embedded actuation routines on ESP32 while avoiding bootstrap strapping pin interference.",
      technologies: ["ESP32 Dual-Core", "MediaPipe Vision", "DRV8833 H-Bridge", "PWM Motor Control", "Mechanical CAD", "Bluetooth BLE"],
      process: "Iterative prototyping through 3D CAD modeling, custom tendon routing, hand-tuned PWM timing profiles, and closed-loop spatial coordinate validation.",
      challenges: "Mitigating electrical noise on motor transients, optimizing power budget, and ensuring smooth non-jerky digit flexion without stalling miniature gearmotors."
    },
    {
      id: "project-02",
      code: "PROJECT_02",
      title: "MECANUM OBSTACLE-AVOIDING ROBOT",
      category: "ROBOTICS / EMBEDDED SYSTEMS / AUTONOMOUS MOTION",
      tag: "OMNIDIRECTIONAL ROBOTICS",
      status: "COMPLETED / OPERATIONAL",
      badgeColor: "#ccff00",
      shortDesc: "An obstacle-avoiding robotic vehicle built using mecanum wheels, ultrasonic sensing, and Arduino-based control.",
      overview: "Autonomous mobile ground platform capable of instant holonomic movement in any vector (forward, reverse, diagonal, and 360° zero-radius spinning) while continuously surveying obstacles.",
      myContribution: "Designed the 4-wheel independent mecanum chassis, implemented vector decomposition algorithms for omnidirectional kinematic control, and integrated HC-SR04 ultrasonic sensor routines for real-time proximity detection.",
      technologies: ["Arduino Architecture", "Mecanum Kinematics", "Ultrasonic Sensing (HC-SR04)", "Motor Driver Circuitry", "C/C++ Firmware", "Chassis Fabrication"],
      process: "Calculated individual roller contact angles, programmed differential speed matrices for diagonal and lateral translation, and benchmarked collision thresholds across varied indoor surfaces.",
      challenges: "Minimizing wheel slippage on smooth floors and synchronizing 4 distinct DC gearmotors to maintain linear trajectory during diagonal strafing."
    },
    {
      id: "project-03",
      code: "PROJECT_03",
      title: "MICRO RC CAR",
      category: "RC ENGINEERING / COMPETITION / PROTOTYPING",
      tag: "COMPETITION ENGINEERING",
      status: "TESTED @ IISC ROBOTHON",
      badgeColor: "#ff4d4d",
      shortDesc: "A high-performance micro RC car developed for RoboSprint at Robothon conducted at the Indian Institute of Science (IISc).",
      overview: "Custom-engineered miniature electric racing platform built for high-speed agility, tight track cornering, and rapid telemetry response under competitive race conditions.",
      myContribution: "Engineered ultra-compact chassis packaging, tuned high-discharge LiPo power distribution, wired ESC and low-latency 2.4 GHz radio receiver, and optimized steering rack geometry for minimal turning radius.",
      technologies: ["Micro ESC Drives", "Coreless / N20 Motors", "2.4 GHz Radio Link", "LiPo Power Distribution", "Custom Drivetrain", "Precision Steering Rack"],
      process: "Weight shedding through custom 3D printed components, chassis rigidity benchmarking, and high-frequency throttle curve tuning for instantaneous launch response.",
      challenges: "Managing heat dissipation in an ultra-dense enclosure and maintaining stability at high power-to-weight ratios on technical race tracks."
    },
    {
      id: "project-04",
      code: "PROJECT_04",
      title: "VISION SENSE",
      category: "ASSISTIVE TECHNOLOGY / HARDWARE / INNOVATION",
      tag: "INNOVATION LAB",
      status: "CURRENTLY IN DEVELOPMENT",
      badgeColor: "#00f0ff",
      shortDesc: "An ongoing project exploring a technology-based sensory assistance system.",
      overview: "Active research and prototyping initiative investigating multimodal environmental perception tools to aid individuals with visual impairments.",
      myContribution: "Conducting hardware feasibility studies, benchmarking low-power spatial sensors, evaluating embedded camera modules, and designing comfortable wearable form factors.",
      technologies: ["Embedded Vision", "Spatial Proximity Sensors", "Haptic Feedback", "Low-Power Microcontrollers", "Human-Centered Design"],
      process: "Requirements mapping from real accessibility bottlenecks, sensor evaluation in varying ambient lighting, and breadboard circuit iterations.",
      challenges: "Balancing wearable battery life, thermal thresholds, and providing intuitive non-fatiguing feedback to the user."
    }
  ],

  labExperiments: [
    {
      code: "EXP_01",
      title: "STM32 FreeRTOS Multitasking Kernel",
      category: "EMBEDDED SYSTEMS",
      status: "EXPERIMENTING",
      desc: "Investigating deterministic task prioritization, inter-task queues, and sub-millisecond interrupt service routines across Cortex-M4 cores."
    },
    {
      code: "EXP_02",
      title: "Differential mmWave Radar Target Parsing",
      category: "SENSOR INTEGRATION",
      status: "LEARNING",
      desc: "Parsing raw UART point-cloud frames from HLK-LD2410 mmWave sensors for presence, velocity, and distance classification."
    },
    {
      code: "EXP_03",
      title: "KiCad Custom Logic Breakout PCB",
      category: "HARDWARE PROTOTYPES",
      status: "BUILDING",
      desc: "Schematic capture and two-layer PCB routing for low-noise sensor signal conditioning with ground-plane shielding."
    },
    {
      code: "EXP_04",
      title: "TinyML On-Device Gesture Inference",
      category: "AI EXPLORATIONS",
      status: "IN DEVELOPMENT",
      desc: "Quantizing lightweight 1D neural networks for bio-potential time-series signals directly on 32-bit microcontrollers."
    },
    {
      code: "EXP_05",
      title: "Precision Closed-Loop Stepper Actuation",
      category: "MOTOR CONTROL",
      status: "BUILDING",
      desc: "Interfacing AS5600 12-bit magnetic angle encoders with TMC2208 silent stepper drivers over I2C for zero-backlash positioning."
    },
    {
      code: "EXP_06",
      title: "FastAPI Hardware Telemetry Ingestion Bridge",
      category: "SOFTWARE EXPERIMENTS",
      status: "EXPERIMENTING",
      desc: "Building lightweight asynchronous WebSocket daemons to stream real-time serial sensor data into responsive web interfaces."
    }
  ],

  skills: {
    programming: ["Java", "Python", "C", "C++", "JavaScript", "SQL", "HTML", "CSS", "R"],
    frameworks: ["React", "Node.js", "Flask", "FastAPI", "JUnit", "WordPress", "Material UI"],
    tools: ["Git", "Docker", "VS Code", "Visual Studio", "PyCharm", "IntelliJ IDEA", "Eclipse", "Google Cloud Platform"],
    libraries: ["NumPy", "Pandas", "Matplotlib"],
    engineering: ["Arduino", "ESP32", "STM32", "Embedded Systems", "Sensors", "Motor Control", "Robotics", "Electronics Prototyping", "Hardware Integration"]
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

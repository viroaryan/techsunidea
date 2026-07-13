// ==========================================
// Suraj Portfolio - Interactive Engine JS (Light Theme Optimized)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initMagneticCursor();
    initParticleGrid();
    initTypingEffect();
    initScrollReveal();
    initTimelineProgress();
    initSkillsFilter();
    initIDEWorkshop();
    initCaseStudyModals();
    initContactForm();
});

// ==========================================
// Scroll Progress Indicator
// ==========================================
function initScrollProgress() {
    const scrollBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + '%';
    });
}

// ==========================================
// Custom Magnetic Cursor
// ==========================================
function initMagneticCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    const targets = document.querySelectorAll('.magnetic-target, a, button, input, textarea');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for inner dot
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth lag animation for outer circle
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover Scaling effect
    targets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// ==========================================
// Particle Circuit Grid Background (Light Mode)
// ==========================================
function initParticleGrid() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let particles = [];
    const maxParticles = 50;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class CircuitTrace {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.speed = Math.random() * 0.5 + 0.2;
            // 0: Right, 1: Down, 2: Left, 3: Up (orthogonal paths like PCB traces)
            this.direction = Math.floor(Math.random() * 4);
            // Light theme trace colors (soft teal and purple/indigo)
            this.color = Math.random() > 0.5 ? '0, 130, 138' : '99, 102, 241';
            this.length = 0;
            this.maxLength = Math.random() * 150 + 80;
            this.opacity = Math.random() * 0.12 + 0.04;
            this.width = Math.random() * 1.5 + 0.5;
        }

        update() {
            const rad = (this.direction * Math.PI) / 2;
            this.x += Math.cos(rad) * this.speed;
            this.y += Math.sin(rad) * this.speed;
            this.length += this.speed;

            // Turn 90 degrees at intersection bounds
            if (this.length > this.maxLength) {
                this.length = 0;
                this.maxLength = Math.random() * 150 + 80;
                this.direction = (this.direction + (Math.random() > 0.5 ? 1 : -1) + 4) % 4;
            }

            // Viewport checks
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize nodes
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new CircuitTrace());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height); // Pure transparent clear for light mode overlaying HTML backgrounds

        // Draw PCB traces
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Faint grid lines to resemble engineering blueprint sheet
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.015)';
        ctx.lineWidth = 0.5;
        const gridGap = 80;
        for (let x = 0; x < width; x += gridGap) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridGap) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    }
    animate();
}

// ==========================================
// Typing Effect
// ==========================================
function initTypingEffect() {
    const typedText = document.getElementById('typed-text');
    const phrases = [
        'Embedded Architecture.',
        'Custom PCB Layouts.',
        'Firmware in C++.',
        'IoT Telemetry Systems.',
        'Smart Controllers.'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 40;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingDelay = 2200; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingDelay = 300;
        }

        setTimeout(type, typingDelay);
    }

    setTimeout(type, 800);
}

// ==========================================
// Scroll Reveal Observer
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-grid, .timeline-item, .skill-card, .project-card, .ide-window, .workshop-info, .contact-layout'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Trigger Skill bar fill on container active status
                if (entry.target.classList.contains('skill-card')) {
                    const bar = entry.target.querySelector('.skill-bar');
                    if (bar) {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = level + '%';
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// Timeline Scroll Progress
// ==========================================
function initTimelineProgress() {
    const timeline = document.querySelector('.timeline');
    const progressBar = document.querySelector('.timeline-progress');
    if (!timeline || !progressBar) return;

    window.addEventListener('scroll', () => {
        const rect = timeline.getBoundingClientRect();
        const winHeight = window.innerHeight;
        
        // Progress starts when timeline enters screen center, ends when leaves center
        const start = rect.top - (winHeight / 2);
        const totalHeight = rect.height;
        
        let progress = -start / totalHeight;
        progress = Math.max(0, Math.min(1, progress));
        progressBar.style.height = (progress * 100) + '%';
    });
}

// ==========================================
// Technical Skill Grid Category Filters
// ==========================================
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active class status
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================
// Interactive Arduino Compiler Simulator
// ==========================================
const codeTemplates = {
    led: `// led_fade.ino
// Fades pin 9 LED using hardware timer registers

const int ledPin = 9;
int brightness = 0;
int fadeAmount = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(115200);
  Serial.println("MCU initialized. Fade cycle ACTIVE.");
}

void loop() {
  analogWrite(ledPin, brightness);
  brightness += fadeAmount;
  
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
    Serial.println("PWM Boundary reached. Reversing direction.");
  }
  
  delay(30);
}`,
    sensor: `// dht22_mqtt.ino
// Connects to local AP and publishes sensor data

#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "SensorNet_Local";
const char* mqttTopic = "esp32/office/telemetry";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  initWiFi();
  client.setServer("192.168.1.50", 1883);
}

void loop() {
  if (!client.connected()) {
    reconnectBroker();
  }
  client.loop();
  
  float humidity = readDHT22Humidity();
  float temperature = readDHT22Temperature();
  
  String payload = "{\\"temp\\":" + String(temperature) + ",\\"hum\\":" + String(humidity) + "}";
  client.publish(mqttTopic, payload.c_str());
  
  delay(10000); // 10s Sleep interval
}`
};

// Syntax highlighters for the simulator (Light theme optimized values)
function highlightCode(code) {
    return code
        .replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>')
        .replace(/\b(void|int|const|char|float)\b/g, '<span class="syntax-type">$1</span>')
        .replace(/\b(setup|loop|pinMode|analogWrite|digitalWrite|delay|begin|println|print|setServer|connected|publish|readDHT22Humidity|readDHT22Temperature|initWiFi|reconnectBroker|readDHT22)\b/g, '<span class="syntax-function">$1</span>')
        .replace(/\b(OUTPUT|INPUT|HIGH|LOW)\b/g, '<span class="syntax-literal">$1</span>')
        .replace(/("[^"]*")/g, '<span class="syntax-string">$1</span>')
        .replace(/\b(const|if|return)\b/g, '<span class="syntax-keyword">$1</span>');
}

function initIDEWorkshop() {
    const tabBtns = document.querySelectorAll('.ide-tab');
    const displayElement = document.getElementById('code-display');
    const lineNumbers = document.getElementById('editor-line-numbers');
    const consoleOutput = document.getElementById('console-output');
    const verifyBtn = document.getElementById('ide-verify');
    const uploadBtn = document.getElementById('ide-upload');
    const clearBtn = document.getElementById('clear-term');

    let activeTab = 'led';
    let isCompiled = false;

    function renderCode(key) {
        const rawCode = codeTemplates[key];
        displayElement.innerHTML = highlightCode(rawCode);
        
        // Generate Line Numbers
        const lines = rawCode.split('\n').length;
        let lineHTML = '';
        for (let i = 1; i <= lines; i++) {
            lineHTML += `<span>${i}</span><br>`;
        }
        lineNumbers.innerHTML = lineHTML;
    }

    renderCode(activeTab);

    // Tab Switcher
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTab = btn.getAttribute('data-code');
            isCompiled = false;
            renderCode(activeTab);
            writeConsole('<p class="terminal-muted">Tab switched. Build registers reset.</p>');
        });
    });

    function writeConsole(html) {
        consoleOutput.innerHTML += html;
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // Verify / Compile Logic
    verifyBtn.addEventListener('click', () => {
        consoleOutput.innerHTML = '';
        writeConsole('<p class="terminal-info">avr-g++ -c -g -Os -w -std=c++11 -fno-exceptions -ffunction-sections -fdata-sections -MMD -mmcu=atmega328p ...</p>');
        writeConsole('<p class="terminal-info">Compiling file structures...</p>');
        
        setTimeout(() => {
            writeConsole('<p class="terminal-info">Linking external configurations and peripheral architectures...</p>');
        }, 600);

        setTimeout(() => {
            if (activeTab === 'led') {
                writeConsole('<p class="terminal-success">✓ Compilation successful.</p>');
                writeConsole('<p class="terminal-muted">Sketch uses 924 bytes (3%) of program storage space. Maximum is 32256 bytes.</p>');
                writeConsole('<p class="terminal-muted">Global variables use 9 bytes (0%) of dynamic memory, leaving 2039 bytes for local variables.</p>');
            } else {
                writeConsole('<p class="terminal-success">✓ Compilation successful.</p>');
                writeConsole('<p class="terminal-muted">Sketch uses 24810 bytes (76%) of program storage space. Maximum is 32256 bytes.</p>');
                writeConsole('<p class="terminal-muted">Global variables use 740 bytes (36%) of dynamic memory, leaving 1308 bytes.</p>');
            }
            isCompiled = true;
        }, 1400);
    });

    // Upload Firmware Logic
    uploadBtn.addEventListener('click', () => {
        if (!isCompiled) {
            consoleOutput.innerHTML = '';
            writeConsole('<p class="terminal-warn">! Warning: Sketch not verified. Auto-compiling sketch before upload phase.</p>');
            verifyBtn.click();
            setTimeout(executeUpload, 2000);
        } else {
            executeUpload();
        }
    });

    function executeUpload() {
        writeConsole('<p class="terminal-info">Initializing virtual programmer on COM3 @ 115200 baud...</p>');
        
        setTimeout(() => {
            writeConsole('<p class="terminal-info">Found MCU signature: Atmega328P [AVRISP]</p>');
            writeConsole('<p class="terminal-info">Writing flash memory [========================] 100%</p>');
        }, 800);

        setTimeout(() => {
            writeConsole('<p class="terminal-success">✓ Upload success! Bootloader signature cleared. Restarts unit...</p>');
            writeConsole(`<p class="terminal-info">> SERIAL OUTPUT (COM3): [${activeTab === 'led' ? 'MCU initialized. Fade cycle ACTIVE.' : 'WiFi Connected. Initializing broker handshake.'}]</p>`);
        }, 1600);
    }

    clearBtn.addEventListener('click', () => {
        consoleOutput.innerHTML = '<p class="terminal-muted">Console cleared. Awaiting hardware signals...</p>';
    });
}

// ==========================================
// Project Case Study Modal Manager
// ==========================================
function initCaseStudyModals() {
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtns = document.querySelectorAll('.modal-close-btn');
    const overlays = document.querySelectorAll('.modal-overlay');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Block background scroll
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            overlays.forEach(overlay => overlay.classList.remove('active'));
            document.body.style.overflow = '';
        });
    });

    // Close on backdrop overlay click
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on Escape keyboard code
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            overlays.forEach(overlay => overlay.classList.remove('active'));
            document.body.style.overflow = '';
        }
    });
}

// ==========================================
// Contact Form & Message Hub
// ==========================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('form-submit-btn');
        const origContent = submitBtn.innerHTML;

        // Visual loading state
        submitBtn.innerHTML = '<span>Uploading Firmware Packet...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            submitBtn.innerHTML = '<span>Handshake Accepted! ✓</span>';
            submitBtn.style.background = 'var(--accent-primary)';
            submitBtn.style.color = '#ffffff';

            setTimeout(() => {
                submitBtn.innerHTML = origContent;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                form.reset();
            }, 3000);
        }, 1800);
    });
}

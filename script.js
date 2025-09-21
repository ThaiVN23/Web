document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const starsContainer = document.getElementById('stars');
    const studentsContainer = document.getElementById('students');
    const typingElement = document.getElementById('typing-demo');
    const titleElement = document.querySelector('.title');
    const classNameElement = document.querySelector('.class-name');
    const messageElement = document.querySelector('.message');
    const footerElement = document.querySelector('.footer p');
    const moonElement = document.querySelector('.moon');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const bgMusic = document.getElementById('bg-music');
    
    // Configuration
    const config = {
        starCount: 100,
        typingText: "Chúc cả lớp 8/2 một đêm ngủ thật ngon!",
        typingSpeed: 100,
        studentNames: ['Minh', 'An', 'Linh', 'Hùng', 'Trang', 'Đức', 'Hương', 'Nam', 'Chi', 'Long', 'Thảo', 'Tuấn', 'My', 'Khoa', 'Nhi'],
        studentDelay: 150,
        animationsEnabled: true
    };
    
    // Initialize
    createStars();
    animateTitle();
    setTimeout(animateClassName, 800);
    setTimeout(animateMessage, 1600);
    setTimeout(startTypingEffect, 2400);
    setTimeout(createStudents, 5000);
    setTimeout(animateFooter, 7000);
    setTimeout(animateMoon, 1000);
    
    // Control buttons
    playBtn.addEventListener('click', playAnimations);
    pauseBtn.addEventListener('click', pauseAnimations);
    resetBtn.addEventListener('click', resetAnimations);
    
    // Music control
    try {
        bgMusic.volume = 0.3;
        setTimeout(() => {
            bgMusic.play().catch(e => console.log("Autoplay prevented: ", e));
        }, 2000);
    } catch (error) {
        console.log("Audio error: ", error);
    }
    
    // Functions
    function createStars() {
        for (let i = 0; i < config.starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const size = Math.random() * 3 + 1;
            star.style.width = ${size}px;
            star.style.height = ${size}px;
            star.style.left = ${Math.random() * 100}%;
            star.style.top = ${Math.random() * 100}%;
            star.style.animationDelay = ${Math.random() * 5}s;
            
            starsContainer.appendChild(star);
        }
    }
    
    function animateTitle() {
        titleElement.style.animation = 'titleAnimation 2s forwards';
    }
    
    function animateClassName() {
        classNameElement.style.animation = 'classAnimation 2s forwards';
    }
    
    function animateMessage() {
        messageElement.style.animation = 'messageAnimation 2s forwards';
    }
    
    function animateMoon() {
        moonElement.style.opacity = '1';
    }
    
    function startTypingEffect() {
        let i = 0;
        const speed = config.typingSpeed;
        
        function typeWriter() {
            if (i < config.typingText.length) {
                typingElement.innerHTML += config.typingText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                typingElement.style.borderRight = 'none';
                animateMessageTexts();
            }
        }
        
        typeWriter();
    }
    
    function animateMessageTexts() {
        const messageTexts = document.querySelectorAll('.message-text');
        
        messageTexts.forEach((msg, index) => {
            setTimeout(() => {
                if (msg.classList.contains('fade-in')) {
                    msg.style.animation = 'fadeIn 2s forwards';
                } else if (msg.classList.contains('slide-in')) {
                    msg.style.animation = 'slideIn 2s forwards';
                } else if (msg.classList.contains('scale-in')) {
                    msg.style.animation = 'scaleIn 2s forwards';
                }
            }, 800 * index);
        });
    }
    
    function createStudents() {
        config.studentNames.forEach((name, index) => {
            setTimeout(() => {
                const studentEl = document.createElement('div');
                studentEl.classList.add('student');
                studentEl.textContent = name;
                studentsContainer.appendChild(studentEl);
            }, config.studentDelay * index);
        });
    }
    
    function animateFooter() {
        footerElement.style.animation = 'fadeInUp 2s forwards';
    }
    
    function playAnimations() {
        if (!config.animationsEnabled) {
            config.animationsEnabled = true;
            document.querySelectorAll('*').forEach(el => {
                const animation = el.style.animation;
                if (animation) {
                    el.style.animation = 'none';
                    void el.offsetHeight; // Trigger reflow
                    el.style.animation = animation;
                }
            });
            
            try {
                bgMusic.play();
            } catch (error) {
                console.log("Play error: ", error);
            }
        }
    }
    
    function pauseAnimations() {
        if (config.animationsEnabled) {
            config.animationsEnabled = false;
            document.querySelectorAll('*').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
            
            bgMusic.pause();
        }
    }
    
    function resetAnimations() {
        // Reset all elements to initial state
        titleElement.style.animation = '';
        classNameElement.style.animation = '';
        messageElement.style.animation = '';
        footerElement.style.animation = '';
        typingElement.innerHTML = '';
        typingElement.style.borderRight = '2px solid #6ce4ff';
        
        // Remove all students
        while (studentsContainer.firstChild) {
            studentsContainer.removeChild(studentsContainer.firstChild);
        }
        
        // Reset message texts
        document.querySelectorAll('.message-text').forEach(msg => {
            msg.style.animation = '';
            msg.style.opacity = '0';
        });
        
        // Pause and reset music
        bgMusic.pause();
        bgMusic.currentTime = 0;
        
        // Restart animations after a brief delay
        setTimeout(() => {
            config.animationsEnabled = true;
            animateTitle();
            setTimeout(animateClassName, 800);
            setTimeout(animateMessage, 1600);
            setTimeout(startTypingEffect, 2400);
            setTimeout(createStudents, 5000);
            setTimeout(animateFooter, 7000);
            
            try {
                bgMusic.play();
            } catch (error) {
                console.log("Play error: ", error);
            }
        }, 100);
    }
    
    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        if (!config.animationsEnabled) return;
        
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        
        starsContainer.style.transform = translate(${x}px, ${y}px);
        moonElement.style.transform = translate(${x * 0.5}px, ${y * 0.5}px) rotate(${x * 0.1}deg);
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            if (config.animationsEnabled) {
                pauseAnimations();
            } else {
                playAnimations();
            }
        } else if (e.key === 'r' || e.key === 'R') {
            resetAnimations();
        }
    });
});
Đã gửi 2 phút trước
Viết cho

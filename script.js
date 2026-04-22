<script>
    // CURSOR
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = (mx-6)+'px'; cursor.style.top = (my-6)+'px'; });
    function animRing() { rx += (mx - rx - 18) * 0.15; ry += (my - ry - 18) * 0.15; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(animRing); }
    animRing();
    document.querySelectorAll('a,button,.service-card,.project-card,.cert-card,.shop-card,.blog-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform='scale(2)'; ring.style.width='60px'; ring.style.height='60px'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform='scale(1)'; ring.style.width='36px'; ring.style.height='36px'; });
    });

    // HAMBURGER
    function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('open');
    }

    // SCROLL REVEAL
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
        e.target.style.transitionDelay = (i * 0.08) + 's';
        e.target.classList.add('visible');
        }
    });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // SKILL BARS
    const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => bar.classList.add('animate'));
        }
    });
    }, { threshold: 0.3 });
    document.querySelectorAll('#competences').forEach(el => barObserver.observe(el));

    // PROJECTS CAROUSEL
    let projIdx = 0;
    const projTrack = document.getElementById('proj-track');
    const projDots = document.querySelectorAll('.cdot');
    function updateProj() {
    const cardW = 380 + 24;
    projTrack.style.transform = `translateX(-${projIdx * cardW}px)`;
    projDots.forEach((d,i) => d.classList.toggle('active', i===projIdx));
    }
    function slideProj(dir) {
    const max = projTrack.children.length - 1;
    projIdx = Math.max(0, Math.min(max, projIdx + dir));
    updateProj();
    }
    function goProj(i) { projIdx = i; updateProj(); }

    // CERTIFICATIONS
    const certs = [
    { title: 'React Developer Certificate', issuer: 'META / Facebook', year: '2024', emoji: '🏆' },
    { title: 'Laravel Professional', issuer: 'Laravel Academy', year: '2023', emoji: '🎓' },
    { title: 'Flutter & Dart — The Complete Guide', issuer: 'Udemy', year: '2023', emoji: '📱' },
    { title: 'UI/UX Design Fundamentals', issuer: 'Google / Coursera', year: '2022', emoji: '🎨' },
    { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024', emoji: '☁️' },
    { title: 'Cybersécurité — Fondamentaux', issuer: 'IBM / Coursera', year: '2023', emoji: '🔒' },
    ];
    function openCert(i) {
    const c = certs[i];
    document.getElementById('cert-modal-img').innerHTML = `<span style="font-size:64px">${c.emoji}</span>`;
    document.getElementById('cert-modal-title').textContent = c.title;
    document.getElementById('cert-modal-issuer').textContent = c.issuer;
    document.getElementById('cert-modal-year').textContent = c.year;
    document.getElementById('cert-modal').classList.add('open');
    }
    function closeCert() { document.getElementById('cert-modal').classList.remove('open'); }
    document.getElementById('cert-modal').addEventListener('click', function(e) { if (e.target === this) closeCert(); });

    // CHATBOT
    const chatResponses = {
    'bonjour': "Bonjour ! Ravi de vous accueillir 😊 Je suis Charlie, développeur fullstack basé à Cotonou. Que puis-je faire pour vous ?",
    'hello': "Hello! I'm Charlie, a fullstack developer from Cotonou, Benin. How can I help?",
    'services': "Je propose : développement web, apps mobiles, backend/API, formation, UI/UX design et consulting tech. Quel service vous intéresse ? 🚀",
    'prix': "Mes tarifs varient selon le projet. Contactez-moi directement pour un devis personnalisé. En général : sites web dès 300€, apps mobiles dès 800€.",
    'contact': "Vous pouvez me contacter via le formulaire de la page, par email ou WhatsApp. Je réponds sous 24h ! 📱",
    'projet': "Super ! Décrivez-moi votre projet dans le formulaire de contact et je reviendrai vers vous avec une proposition détaillée sous 24h 🎯",
    'formation': "Je propose des formations en développement web, React, Laravel, Flutter. Bootcamps intensifs ou sessions individuelles. Intéressé ? 📚",
    'default': "Merci pour votre message ! Pour une réponse complète, utilisez le formulaire de contact — je vous répondrai sous 24h. 😊"
    };
    let chatOpen = false;
    function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chat-window').classList.toggle('open', chatOpen);
    document.querySelector('.chat-notif').style.display = chatOpen ? 'none' : 'block';
    }
    function sendChat() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    const msgs = document.getElementById('chat-messages');
    msgs.innerHTML += `<div class="chat-msg user">${msg}</div>`;
    msgs.innerHTML += `<div class="chat-msg bot"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
    msgs.scrollTop = msgs.scrollHeight;
    input.value = '';
    setTimeout(() => {
        const key = Object.keys(chatResponses).find(k => msg.toLowerCase().includes(k)) || 'default';
        const last = msgs.lastElementChild;
        last.innerHTML = chatResponses[key];
        msgs.scrollTop = msgs.scrollHeight;
    }, 1200);
    }
    function chatEnter(e) { if (e.key === 'Enter') sendChat(); }

    // ADMIN
    function toggleAdmin() {
    const panel = document.getElementById('admin-panel');
    panel.classList.toggle('open');
    }
    function adminLogin() {
    const pw = document.getElementById('admin-pw').value;
    if (pw === 'charlie2025') {
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
    } else {
        document.getElementById('admin-pw').style.borderColor = '#ff5050';
        setTimeout(() => document.getElementById('admin-pw').style.borderColor = '', 1500);
    }
    }
    function switchAdminTab(tab) {
    document.querySelectorAll('.atab').forEach((t,i) => {
        const tabs = ['projets','services','blog','boutique','certs'];
        t.classList.toggle('active', tabs[i] === tab);
    });
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.getElementById('admin-'+tab).classList.add('active');
    }

    // DOWNLOAD CV
    function downloadCV() {
    alert('CV de Charlie Corentin AGBAYAHOUN LOKOSSOU\n\nIntégrez votre fichier CV.pdf dans le projet pour activer le téléchargement automatique.');
    }

    // SEND MESSAGE
    function sendMessage() {
    alert('✅ Message envoyé avec succès ! Charlie vous répondra sous 24 heures.');
    }

    // NAV SCROLL EFFECT
    window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.background = window.scrollY > 40 ? 'rgba(4,4,10,0.97)' : 'rgba(4,4,10,0.85)';
    });

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        document.getElementById('nav-links').classList.remove('open');
    });
    });
</script>
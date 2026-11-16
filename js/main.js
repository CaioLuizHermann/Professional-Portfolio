const header = fetch('/components/header.html')
    .then(response => response.text())
    .then(html => document.getElementById('header-container').innerHTML = html);
const foto = document.querySelectorAll('.terminal-frame img');
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    foto.forEach(foto => {foto.style.transform = `translateY(${-scroll * 0.11}px)`});
});
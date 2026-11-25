const header = fetch('/components/header.html')
    .then(response => response.text())
    .then(html => document.getElementById('header-container').innerHTML = html);
const foto = document.querySelectorAll('.terminal-frame img');
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    foto.forEach(foto => {foto.style.transform = `translateY(${-scroll * 0.06}px)`});
});
const revealElements = document.querySelectorAll(
    '.skills-header, .skill-card'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element, index) => {
    element.classList.add('reveal');

    element.style.setProperty(
        '--reveal-delay', `${index * 100}ms`
    );

    observer.observe(element);
});
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('form-status');
const contactButton = document.getElementById('contact-submit');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {

        event.preventDefault();

        contactButton.disabled = true;
        contactButton.textContent = 'Sending...';

        contactStatus.style.color = '#A0A0A0';
        contactStatus.textContent = '> Establishing connection...';

        try {

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            contactStatus.style.color = '#38D66B';
            contactStatus.textContent =
                '> Message successfully submitted.';

            contactForm.reset();

        } catch (error) {

            contactStatus.style.color = '#FF5F57';
            contactStatus.textContent =
                '> Connection failed. Please try again.';

        } finally {

            contactButton.disabled = false;
            contactButton.textContent = 'Send message';

        }
    });
}
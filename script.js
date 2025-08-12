document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const grid = document.querySelector('.grid');

    prevBtn.addEventListener('click', () => {
        console.log('Clicou prev');
        grid.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        console.log('Clicou next');
        grid.scrollBy({ left: 300, behavior: 'smooth' });
    });
});

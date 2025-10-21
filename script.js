document.addEventListener('DOMContentLoaded', () => {
  // ======= GALERIA (prev / next) =======
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const grid = document.querySelector('.grid');

  if (prevBtn && nextBtn && grid) {
    prevBtn.addEventListener('click', () => {
      grid.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      grid.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  // ======= TEMPORIZADOR DO LIVRO =======
  const dataLancamento = new Date("2025-11-27T00:00:00").getTime();

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");
  const contadorEl = document.getElementById("contador");
  const botaoCompraEl = document.getElementById("botao-compra");

  if (diasEl && horasEl && minutosEl && segundosEl && contadorEl) {
    const contador = setInterval(() => {
      const agora = new Date().getTime();
      const distancia = dataLancamento - agora;

      if (distancia <= 0) {
        clearInterval(contador);
        contadorEl.innerHTML = "<h3>🚀 O livro já está disponível!</h3>";
        if (botaoCompraEl) botaoCompraEl.style.display = "block";
        return;
      }

      const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

      diasEl.textContent = dias.toString().padStart(2, '0');
      horasEl.textContent = horas.toString().padStart(2, '0');
      minutosEl.textContent = minutos.toString().padStart(2, '0');
      segundosEl.textContent = segundos.toString().padStart(2, '0');
    }, 1000);
  }
});

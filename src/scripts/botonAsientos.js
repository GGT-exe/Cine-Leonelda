document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.boton-asientos');
  botones.forEach(boton => {
    boton.addEventListener('click', async () => {
      const peliculaId = boton.dataset.peliculaid;
      try {
        const { default: ModalAsientos } = await import('../../public/components/modalAsientos.js');
        new ModalAsientos(peliculaId).mostrar();
      } catch (error) {
        console.error('Error al abrir el modal:', error);
        alert('Ocurrió un error al cargar los asientos');
      }
    });
  });
});

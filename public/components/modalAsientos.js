  console.log("✅ modalAsientos.js cargado");

export default class ModalAsientos {
  constructor(peliculaId) {
    this.peliculaId = peliculaId;
    this.modal = this.crearModal();
  }

  crearModal() {
    const modal = document.createElement('div');
    const asientosGuardados = JSON.parse(localStorage.getItem(`asientos-${this.peliculaId}`)) || [];

    modal.className = 'modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';

    modal.innerHTML = `
      <div class="bg-black p-6 rounded-lg shadow-lg relative max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Selecciona tus asientos</h2>
        <div class="grid grid-cols-5 gap-2 mb-4">
        ${Array.from({ length: 20 }, (_, i) => {
          const ocupado = [2, 5, 10].includes(i);
          const seleccionado = asientosGuardados.includes(String(i));

          const clases = ocupado
            ? 'bg-red-500 pointer-events-none'
            : seleccionado
            ? 'bg-green-500'
            : 'bg-gray-300';

          // 🔸 Aquí defines el color del texto
          let textColor = 'text-black';
          if (ocupado) textColor = 'text-white';
          else if (seleccionado) textColor = 'text-white';

          // Etiqueta A1, B2, etc.
          const fila = String.fromCharCode(65 + Math.floor(i / 5));
          const columna = (i % 5) + 1;
          const etiqueta = `${fila}${columna}`;

          return `<div data-index="${i}" class="asiento ${clases} ${textColor} w-10 h-10 rounded cursor-pointer flex items-center justify-center text-sm font-medium">
            ${ocupado ? 'X' : etiqueta}
          </div>`;

        }).join('')}

        </div>
          <div class="flex justify-end gap-2">
            <button id="cerrar-modal" class="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
            <button id="guardar-asientos" class="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
          </div>
      </div>
    `;

    // Eventos de clic para los asientos
    modal.querySelectorAll('.asiento').forEach(el => {
      if (!el.classList.contains('bg-red-500')) {
        el.addEventListener('click', () => {
          el.classList.toggle('bg-green-500');
          el.classList.toggle('bg-gray-300');
        });
      }
    });

    // Evento cerrar
    modal.querySelector('#cerrar-modal').addEventListener('click', () => {
      this.cerrar();
    });

    // Evento guardar
    modal.querySelector('#guardar-asientos').addEventListener('click', () => {
      const seleccionados = Array.from(modal.querySelectorAll('.asiento.bg-green-500')).map(el => el.dataset.index);
      console.log('Asientos seleccionados:', seleccionados);
      localStorage.setItem(`asientos-${this.peliculaId}`, JSON.stringify(seleccionados));
      this.cerrar();
    });

    return modal;
  }

    mostrar() {
      console.log(`🟢 Mostrando modal para: ${this.peliculaId}`);
      document.body.appendChild(this.modal);
    }

  cerrar() {
    this.modal.remove();
  }


}

window.abrirModal = (dia) => {
  console.log("🟡 abrirModal llamado con:", dia);
  const modal = new ModalAsientos(dia);
  modal.mostrar();
};


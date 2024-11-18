// sonorizadores.js
import { sampler } from './sampler.js';
import {
  generarNotasAleatorias,
  generarRitmoAleatorio,
  generarCombinaciones,
  getCadence,
} from './generadores.js';

export function reproducirCombinacion(combinacion) {
  let tiempoInicio = 0;
  combinacion.forEach(({ nota, duracion }) => {
    sampler.triggerAttackRelease(nota, duracion, Tone.now() + tiempoInicio);
    tiempoInicio += Tone.Time(duracion).toSeconds();
  });
}

let currentLoop = null; // Variable para almacenar el bucle generado

export function setUpEventListeners() {
  document.getElementById('generateButton').onclick = async () => {
    const n = parseInt(document.getElementById('noteCount').value, 10);
    const notas = generarNotasAleatorias(n);
    const ritmo = generarRitmoAleatorio(n);
    const combinacion = generarCombinaciones(notas, ritmo);

    // Asegurarse de que Tone.js está inicializado
    await Tone.start();

    // Reproducir la combinación generada
    reproducirCombinacion(combinacion);

    console.log('Combinación generada:', combinacion);
  };

  document.getElementById('setBpmButton').onclick = () => {
    const bpm = parseInt(document.getElementById('bpmInput').value, 10);
    Tone.Transport.bpm.value = bpm;
  };

  document.getElementById('stopButton').onclick = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
  };

  document.getElementById('playCadenceButton').onclick = async () => {
    const key = document.getElementById('key').value;
    const chords = getCadence(key);

    // Asegúrate de que Tone.js está inicializado
    await Tone.start();

    // Calcula la duración entre acordes basada en el BPM actual
    const chordDuration = Tone.Time('4n').toSeconds(); // Un cuarto de nota (4n)

    let time = 0;
    chords.forEach((chord) => {
      sampler.triggerAttackRelease(chord, '8n', `+${time}`);
      time += chordDuration;
    });
  };

  document.getElementById('loopRhythmButton').onclick = async () => {
    const n = parseInt(document.getElementById('noteCount').value, 10);
    const notas = generarNotasAleatorias(n);
    const ritmo = generarRitmoAleatorio(n);
    const combinacion = generarCombinaciones(notas, ritmo);

    // Asegúrate de que Tone.js está inicializado
    await Tone.start();

    // Detén cualquier loop previo
    if (currentLoop) {
      currentLoop.dispose();
    }

    // Actualiza el DOM con las notas y duraciones
    const notasContainer = document.getElementById('notasContainer');
    if (notasContainer) {
      notasContainer.innerHTML = ''; // Limpia el contenido previo
      combinacion.forEach(({ nota, duracion }) => {
        const item = document.createElement('div');
        item.textContent = `Nota: ${nota}, Duración: ${duracion}`;
        notasContainer.appendChild(item);
      });
    }

    // Define el loop
    currentLoop = new Tone.Loop((time) => {
      combinacion.forEach(({ nota, duracion }, i) => {
        sampler.triggerAttackRelease(
          nota,
          duracion,
          time + i * Tone.Time(duracion).toSeconds()
        );
      });
    }, '1m'); // Longitud del loop (1 compás)

    // Inicia el transporte y el loop
    Tone.Transport.start();
    currentLoop.start(0);

    console.log('Ritmo en bucle:', combinacion);

    // Oculta el contenedor de notas
    if (notasContainer) {
      notasContainer.style.display = 'none';
    }
  };

  document.getElementById('toggleNotasButton').onclick = () => {
    const notasContainer = document.getElementById('notasContainer');
    if (
      notasContainer.style.display === 'none' ||
      !notasContainer.style.display
    ) {
      notasContainer.style.display = 'block'; // Muestra el contenedor
    } else {
      notasContainer.style.display = 'none'; // Oculta el contenedor
    }
  };
}

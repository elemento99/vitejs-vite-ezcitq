// generadores.js
export const todasLasNotas = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
export const duraciones = ['8n', '4n', '16n', '2n'];

export function generarNotasAleatorias(n) {
  return Array.from(
    { length: n },
    () => todasLasNotas[Math.floor(Math.random() * todasLasNotas.length)]
  );
}

export function generarRitmoAleatorio(n) {
  return Array.from(
    { length: n },
    () => duraciones[Math.floor(Math.random() * duraciones.length)]
  );
}

export function generarCombinaciones(notas, ritmo) {
  return notas.map((nota, i) => ({ nota, duracion: ritmo[i] }));
}

export function getCadence(key) {
  const notes = {
    C: ['C4', 'E4', 'G4'],
    D: ['D4', 'F#4', 'A4'],
    E: ['E4', 'G#4', 'B4'],
    F: ['F4', 'A4', 'C5'],
    G: ['G4', 'B4', 'D5'],
    A: ['A4', 'C#5', 'E5'],
    B: ['B4', 'D#5', 'F#5'],
  };

  const root = notes[key];
  const fourth =
    notes[Object.keys(notes)[(Object.keys(notes).indexOf(key) + 3) % 7]];
  const fifth =
    notes[Object.keys(notes)[(Object.keys(notes).indexOf(key) + 4) % 7]];

  return [root, fourth, fifth, root];
}

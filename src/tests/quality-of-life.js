export default {
  id: 'quality-of-life',
  name: 'Calidad de Vida',
  description: 'Este test ayuda a evaluar diferentes aspectos del bienestar de un animal.',
  steps: [
    {
      type: 'number',
      key: 'pain',
      title: '1. Dolor (1-10)',
      description: `¿El dolor se ha controlado de forma correcta?<br>
        ¿Se queja mientras está en posición de descanso?<br>
        ¿Respira de forma agitada?<br><br>
        10 = está muy bien, 1 = está muy mal`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'hunger',
      title: '2. Hambre (1-10)',
      description: `¿Come lo suficiente?<br>¿Necesita ayuda para ser alimentado?<br>¿Requiere un tubo de alimentación?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'hydration',
      title: '3. Hidratación (1-10)',
      description: `¿Está deshidratado?<br>¿Toma agua suficiente?<br>¿Requiere hidratación parenteral?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'hygiene',
      title: '4. Higiene (1-10)',
      description: `¿Tiene escaras por presión al estar postrado?<br>¿Puede ser limpiado luego de cada eliminación (orina, heces)?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'happiness',
      title: '5. Felicidad (1-10)',
      description: `¿Expresa felicidad e interés?<br>¿Responde a estímulos?<br>¿Disfruta las mismas cosas?<br>¿Luce deprimido o con miedo?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'mobility',
      title: '6. Movilidad (1-10)',
      description: `¿Puede pararse sin asistencia?<br>¿Necesita un carrito?<br>¿Convulsiona o tiene temblores?`,
      min: 1,
      max: 10
    },
    {
      type: 'select',
      key: 'goodDays',
      title: '7. Días buenos (elige según la tabla)',
      description: 'Contar en una semana cuántos días de buen ánimo, apetito, actividad tiene.',
      options: [
        { label: '1 día bueno → 1 punto', value: 1 },
        { label: '2 días buenos → 3 puntos', value: 3 },
        { label: '3 días buenos → 4 puntos', value: 4 },
        { label: '4 días buenos → 5 puntos', value: 5 },
        { label: '5 días buenos → 7 puntos', value: 7 },
        { label: '6 días buenos → 9 puntos', value: 9 },
        { label: '7 días buenos → 10 puntos', value: 10 }
      ]
    }
  ],
  processResult: (answers) => {
    const total = Object.values(answers).reduce((acc, val) => acc + Number(val), 0);
    return {
      text: total > 35
        ? `✅ Puntaje total: ${total}. La calidad de vida es óptima.`
        : `⚠️ Puntaje total: ${total}. La calidad de vida no es óptima.`,
      score: total
    };
  }
};

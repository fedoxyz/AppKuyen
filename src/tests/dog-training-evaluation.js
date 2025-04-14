export default {
  id: 'dog-training-evaluation',
  name: 'Entrenamiento',
  description: 'Este test ayuda a evaluar el nivel de entrenamiento, obediencia y comportamiento de tu perro.',
  steps: [
    {
      type: 'number',
      key: 'comandosBasicos',
      title: '1. Comandos Básicos (1-10)',
      description: `¿Responde a comandos básicos como "sienta", "quieto", "ven"?<br>
        ¿Obedece a la primera orden o necesita repeticiones?<br>
        ¿Mantiene la posición hasta recibir otra orden?<br><br>
        10 = obedece perfectamente, 1 = no obedece ningún comando`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'correa',
      title: '2. Comportamiento con Correa (1-10)',
      description: `¿Camina sin tirar de la correa?<br>
        ¿Se mantiene a tu lado durante el paseo?<br>
        ¿Presta atención a tus cambios de dirección?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'socializacion',
      title: '3. Socialización (1-10)',
      description: `¿Se comporta adecuadamente con otros perros?<br>
        ¿Es amigable con extraños o muestra miedo/agresividad?<br>
        ¿Se mantiene tranquilo en ambientes con muchos estímulos?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'llamado',
      title: '4. Llamado a Distancia (1-10)',
      description: `¿Acude cuando lo llamas incluso con distracciones?<br>
        ¿Regresa rápidamente o se demora?<br>
        ¿Es necesario llamarlo varias veces?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'impulsos',
      title: '5. Control de Impulsos (1-10)',
      description: `¿Espera permiso para comer?<br>
        ¿Puede quedarse quieto cuando hay distracciones?<br>
        ¿Controla su entusiasmo al saludar personas?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'casa',
      title: '6. Comportamiento en Casa (1-10)',
      description: `¿Respeta las reglas de la casa?<br>
        ¿Sabe dónde puede acostarse y dónde no?<br>
        ¿Evita comportamientos destructivos cuando está solo?`,
      min: 1,
      max: 10
    },
    {
      type: 'select',
      key: 'situacionesNuevas',
      title: '7. Adaptación a Situaciones Nuevas',
      description: '¿Cómo reacciona tu perro ante situaciones o lugares nuevos?',
      options: [
        { label: 'Muestra miedo intenso o agresividad → 1 punto', value: 1 },
        { label: 'Se estresa pero se puede controlar → 3 puntos', value: 3 },
        { label: 'Inicialmente cauteloso pero se adapta → 5 puntos', value: 5 },
        { label: 'Curioso y confiado la mayoría del tiempo → 8 puntos', value: 8 },
        { label: 'Completamente relajado y adaptable → 10 puntos', value: 10 }
      ]
    },
    {
      type: 'select',
      key: 'juegos',
      title: '8. Juego Controlado',
      description: 'Evalúa el comportamiento de tu perro durante el juego:',
      options: [
        { label: 'Demasiado brusco, no controla la mordida → 1 punto', value: 1 },
        { label: 'Se sobreexcita fácilmente y es difícil calmarlo → 3 puntos', value: 3 },
        { label: 'Juega bien pero a veces se descontrola → 5 puntos', value: 5 },
        { label: 'Generalmente controla la intensidad del juego → 8 puntos', value: 8 },
        { label: 'Juega de forma controlada y para cuando se le indica → 10 puntos', value: 10 }
      ]
    },
    {
      type: 'select',
      key: 'comunicacion',
      title: '9. Comunicación con el Dueño',
      description: 'Evalúa cómo tu perro se comunica contigo:',
      options: [
        { label: 'No responde a tus señales ni expresa sus necesidades → 1 punto', value: 1 },
        { label: 'Comunica algunas necesidades básicas (salir, comer) → 4 puntos', value: 4 },
        { label: 'Buena comunicación pero inconsistente → 6 puntos', value: 6 },
        { label: 'Comunicación clara y consistente en la mayoría de situaciones → 9 puntos', value: 9 },
        { label: 'Comunicación excelente en todas las situaciones → 10 puntos', value: 10 }
      ]
    },
    {
      type: 'select',
      key: 'consistencia',
      title: '10. Consistencia de Comportamiento',
      description: 'Evalúa la consistencia del comportamiento de tu perro:',
      options: [
        { label: 'Comportamiento impredecible, cambia constantemente → 1 punto', value: 1 },
        { label: 'A veces obediente, otras veces no → 3 puntos', value: 3 },
        { label: 'Generalmente consistente en ambientes conocidos → 6 puntos', value: 6 },
        { label: 'Consistente en la mayoría de situaciones → 8 puntos', value: 8 },
        { label: 'Comportamiento consistente y predecible en todo momento → 10 puntos', value: 10 }
      ]
    }
  ],
  processResult: (answers) => {
    const total = Object.values(answers).reduce((acc, val) => acc + Number(val), 0);
    
    let assessment;
    
    switch (true) {
      case (total >= 90):
        assessment = `🏆 Puntaje total: ${total}. ¡Excelente! Tu perro muestra un nivel de entrenamiento y obediencia excepcional.`;
        break;
      case (total >= 75):
        assessment = `✅ Puntaje total: ${total}. Muy buen nivel de entrenamiento. Algunas áreas podrían refinarse, pero en general es un perro bien educado.`;
        break;
      case (total >= 60):
        assessment = `🔶 Puntaje total: ${total}. Nivel de entrenamiento aceptable. Hay áreas específicas que requieren más trabajo y práctica.`;
        break;
      case (total >= 40):
        assessment = `⚠️ Puntaje total: ${total}. Nivel de entrenamiento básico. Necesita trabajo consistente en varias áreas fundamentales.`;
        break;
      default:
        assessment = `❌ Puntaje total: ${total}. Nivel de entrenamiento insuficiente. Recomendamos buscar ayuda profesional para establecer un programa de entrenamiento estructurado.`;
        break;
    }
    
    return {
      text: assessment,
      score: total
    };
  }
};

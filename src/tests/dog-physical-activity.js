export default {
  id: 'dog-physical-activity',
  name: 'Actividad Fisica',
  description: 'Este test ayuda a evaluar si tu perro recibe la cantidad adecuada de ejercicio y actividad física según su edad, raza y necesidades.',
  steps: [
    {
      type: 'select',
      key: 'tipoPerro',
      title: '1. Tipo de Perro',
      description: 'Selecciona la categoría que mejor describe a tu perro:',
      options: [
        { label: 'Raza de alta energía (Border Collie, Husky, etc.)', value: 'altaEnergia' },
        { label: 'Raza de energía media (Labrador, Beagle, etc.)', value: 'mediaEnergia' },
        { label: 'Raza de baja energía (Bulldog, Basset Hound, etc.)', value: 'bajaEnergia' },
        { label: 'Cachorro (menor de 1 año)', value: 'cachorro' },
        { label: 'Perro senior (mayor de 7-10 años según raza)', value: 'senior' }
      ]
    },
    {
      type: 'number',
      key: 'paseoDiario',
      title: '2. Paseos Diarios (1-10)',
      description: `¿Con qué frecuencia sale tu perro a pasear?<br>
        ¿Cuánto tiempo dura cada paseo?<br>
        ¿Los paseos incluyen variedad de entornos?<br><br>
        10 = paseos óptimos, 1 = paseos insuficientes`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'juegoActivo',
      title: '3. Juego Activo (1-10)',
      description: `¿Juega activamente tu perro cada día?<br>
        ¿Varía el tipo de juegos (pelota, tirar de la cuerda, etc.)?<br>
        ¿Muestra entusiasmo durante el juego?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'estimulacionMental',
      title: '4. Estimulación Mental (1-10)',
      description: `¿Recibe tu perro desafíos mentales diarios?<br>
        ¿Utiliza juguetes de inteligencia o realiza ejercicios de olfato?<br>
        ¿Aprende nuevos trucos o comandos regularmente?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'socializacion',
      title: '5. Socialización con Otros Perros (1-10)',
      description: `¿Interactúa tu perro con otros perros regularmente?<br>
        ¿Juega de forma apropiada con ellos?<br>
        ¿Tiene oportunidad de correr libremente con otros perros?`,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      key: 'descanso',
      title: '6. Descanso Adecuado (1-10)',
      description: `¿Tiene tu perro un lugar tranquilo para descansar?<br>
        ¿Duerme bien durante la noche?<br>
        ¿Muestra signos de cansancio excesivo o de aburrimiento?`,
      min: 1,
      max: 10
    },
    {
      type: 'select',
      key: 'actividadEspecial',
      title: '7. Actividades Especiales',
      description: '¿Participa tu perro en alguna actividad especial?',
      options: [
        { label: 'Ninguna actividad especial → 1 punto', value: 1 },
        { label: 'Actividad ocasional (mensual) → 3 puntos', value: 3 },
        { label: 'Actividad regular (semanal) → 6 puntos', value: 6 },
        { label: 'Varias actividades semanales → 8 puntos', value: 8 },
        { label: 'Entrenamiento deportivo regular (agility, canicross, etc.) → 10 puntos', value: 10 }
      ]
    },
    {
      type: 'select',
      key: 'espacioLibre',
      title: '8. Acceso a Espacio Libre',
      description: '¿Qué acceso tiene tu perro a espacios abiertos?',
      options: [
        { label: 'Sin acceso a espacio libre → 1 punto', value: 1 },
        { label: 'Pequeño patio o terraza → 3 puntos', value: 3 },
        { label: 'Jardín mediano → 5 puntos', value: 5 },
        { label: 'Amplio jardín o visitas regulares a parques → 8 puntos', value: 8 },
        { label: 'Acceso diario a grandes espacios abiertos → 10 puntos', value: 10 }
      ]
    },
    {
      type: 'select',
      key: 'comportamiento',
      title: '9. Comportamiento en Casa',
      description: 'Evalúa el comportamiento de tu perro cuando está en casa:',
      options: [
        { label: 'Destructivo, ansioso o hiperactivo → 1 punto', value: 1 },
        { label: 'Inquieto, suele demandar atención constante → 3 puntos', value: 3 },
        { label: 'Generalmente tranquilo con episodios de inquietud → 5 puntos', value: 5 },
        { label: 'Equilibrado, alternando actividad y descanso → 8 puntos', value: 8 },
        { label: 'Perfectamente equilibrado y relajado → 10 puntos', value: 10 }
      ]
    },
    {
      type: 'select',
      key: 'condicionFisica',
      title: '10. Condición Física General',
      description: 'Evalúa la condición física general de tu perro:',
      options: [
        { label: 'Sobrepeso significativo o muy bajo tono muscular → 1 punto', value: 1 },
        { label: 'Ligero sobrepeso o bajo tono muscular → 3 puntos', value: 3 },
        { label: 'Peso adecuado pero podría mejorar su resistencia → 5 puntos', value: 5 },
        { label: 'Buena forma física con peso adecuado → 8 puntos', value: 8 },
        { label: 'Excelente condición física, muscular y resistente → 10 puntos', value: 10 }
      ]
    }
  ],
  processResult: (answers) => {
    // Excluimos tipoPerro del cálculo numérico pero lo usamos para contextualizar
    const numericAnswers = {...answers};
    const tipoPerro = numericAnswers.tipoPerro;
    delete numericAnswers.tipoPerro;
    
    // Calculamos el total de los valores numéricos
    const total = Object.values(numericAnswers).reduce((acc, val) => acc + Number(val), 0);
    
    let assessment;
    let recomendaciones = '';
    
    switch (true) {
      case (total >= 80):
        assessment = `🏆 Puntaje total: ${total}. ¡Excelente nivel de actividad física! Tu perro recibe ejercicio óptimo para su bienestar.`;
        break;
      case (total >= 65):
        assessment = `✅ Puntaje total: ${total}. Buen nivel de actividad física. Tu perro está recibiendo un ejercicio adecuado.`;
        break;
      case (total >= 50):
        assessment = `🔶 Puntaje total: ${total}. Nivel moderado de actividad física. Hay áreas que podrían mejorarse.`;
        break;
      case (total >= 35):
        assessment = `⚠️ Puntaje total: ${total}. Nivel de actividad insuficiente. Tu perro necesita más ejercicio para su bienestar.`;
        break;
      default:
        assessment = `❌ Puntaje total: ${total}. Nivel crítico de actividad. Es urgente aumentar significativamente el ejercicio de tu perro.`;
        break;
    }
    
    // Añadimos recomendaciones según el tipo de perro
    if (tipoPerro === 'altaEnergia' && total < 65) {
      recomendaciones = ' Las razas de alta energía necesitan al menos 2 horas de ejercicio diario intenso y estimulación mental adicional.';
    } else if (tipoPerro === 'cachorro' && total < 50) {
      recomendaciones = ' Recuerda que los cachorros necesitan ejercicio regular pero controlado para no dañar sus articulaciones en desarrollo.';
    } else if (tipoPerro === 'senior' && total < 50) {
      recomendaciones = ' Los perros senior necesitan ejercicio regular adaptado a sus capacidades para mantener su movilidad y salud.';
    }
    
    return {
      text: assessment + recomendaciones,
      score: total
    };
  }
};

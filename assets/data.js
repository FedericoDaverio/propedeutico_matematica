/* Shared content + translations for all PropeMate pages. */
var STR = {
  es: {
    hint: "toca la onda para cambiarla",
    title: "Fundamentos de Matemática para Ingeniería de Audio",
    lede: "Las herramientas matemáticas detrás de la acústica, el procesamiento digital de señales, la electrónica y el diseño de equipos de audio. Desde las unidades y las fracciones hasta los vectores y los sistemas lineales.",
    prof: "<b style=\"color:var(--text)\">Prof. Federico Daverio</b> · daveriofederico@gmail.com",
    "temario-h": "Temario", "temario-sub": "Toca un tema para ver sus contenidos, la presentación, su laboratorio y su examen.",
    "goals-h": "Al finalizar el curso, el estudiante podrá:",
    "footer-note": "Material del curso PropeMate, con fines educativos.",
    labLinkText: "Laboratorio ↗", examLinkText: "Examen ↗", pdfLinkText: "PDF ↗",
    backToCourse: "← Volver al curso",
    units: [
      ["Unidades Fundamentales y Derivadas","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad1_Unidades_Fundamentales_y_Derivadas_final.pdf",
       ["Sistemas de medición","Unidades fundamentales y derivadas","Notación científica","Notación de ingeniería","Conversiones simples"]],
      ["Jerarquía de Operaciones","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad2_Jerarquia_de_Operaciones.pdf",
       ["Símbolos de agrupación","Potencias y raíces","Productos y cocientes","Sumas y restas"]],
      ["Fracciones","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad3_Fracciones.pdf",
       ["Componentes de una fracción","Fracciones simples y compuestas","Mínimo Común Múltiplo (MCM)","Máximo Común Divisor (MCD)"]],
      ["Relaciones y Funciones","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad4_Relaciones_y_Funciones.pdf",
       ["Relaciones entre variables","Clasificación de funciones","Estudio de funciones","Representación gráfica"]],
      ["Vectores","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad5_Vectores.pdf",
       ["Concepto de vector","Notación vectorial","Plano cartesiano","Coordenadas polares","Conversión entre sistemas"]],
      ["Sistemas Lineales y Matrices","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad6_Sistemas_Lineales_y_Matrices.pdf",
       ["Ecuaciones lineales","Sistemas de ecuaciones","Matrices y determinantes","Métodos de resolución"]]
    ],
    goals: [
      "Comprender los sistemas de unidades y realizar conversiones.","Aplicar correctamente la jerarquía de operaciones.",
      "Resolver operaciones con fracciones.","Analizar relaciones y funciones matemáticas.",
      "Representar y operar vectores en distintos sistemas de coordenadas.","Resolver sistemas de ecuaciones lineales con métodos matriciales."
    ],
    waves: ["Onda senoidal", "Onda cuadrada", "Onda triangular", "Onda diente de sierra"],
    eqs: ["y(t) = A·sin(2πft + φ)", "y(t) = A·sgn(sin(2πft + φ))", "y(t) = (2A/π)·asin(sin(2πft + φ))", "y(t) = 2A·(ft − floor(ft + 0.5))"],
    labs: [
      { title:"Notación y unidades", blurb:"Convierte una magnitud a notación científica y de ingeniería.",
        value:"Valor", std:"Notación estándar", sci:"Notación científica", eng:"Notación de ingeniería", prefix:"Prefijo SI",
        presets:[[20,"Hz","20 Hz (grave)"],[20000,"Hz","20 000 Hz (agudo)"],[343,"m/s","343 m/s (sonido en aire)"],[0.000001,"s","1 µs"],[100000,"W","100 000 W"]] },
      { title:"Cadena de ganancia", blurb:"Ajusta tres etapas en dB y observa cómo se combinan.",
        s1:"Preamplificador", s2:"Ecualizador", s3:"Amplificador de potencia", totalLin:"Ganancia total (lineal)", totalDb:"Ganancia total (dB)" },
      { title:"Subdivisiones rítmicas", blurb:"Compara dos pulsos y encuentra dónde coinciden.",
        pulseA:"Pulso A", pulseB:"Pulso B", lcm:"Mínimo Común Múltiplo (MCM)", gcd:"Máximo Común Divisor (MCD)", play:"Reproducir", pause:"Pausar" },
      { title:"La escala de decibeles", blurb:"Desliza la relación de amplitudes y observa la curva logarítmica.", ratio:"Relación (P / P₀)", level:"Nivel" },
      { title:"Suma de fasores", blurb:"Combina dos señales como vectores y halla el resultante.", sigA:"Señal A", sigB:"Señal B", resultant:"Resultante", amp:"Amplitud", phase:"Fase" },
      { title:"Matriz de mezcla", blurb:"Resuelve qué niveles de entrada producen los buses de salida deseados.",
        ch1:"Canal 1 → buses", ch2:"Canal 2 → buses", busL:"Bus Izq. deseado", busR:"Bus Der. deseado",
        det:"Determinante", need:"Niveles de entrada necesarios", singular:"Matriz singular — no tiene solución única." }
    ],
    drills: [
      ["Notación científica de una magnitud de audio","La {ctx} de un equipo de audio es {v} {unit}. ¿Cuál es el exponente en su notación científica?"],
      ["Conversión de unidades de audio","Convierte {v} {from} a {to}."],
      ["Prefijo SI en una hoja de datos","En la hoja de datos de un componente ves un valor de 10^{e} {u}. ¿Qué prefijo SI corresponde?"],
      ["Jerarquía en una cadena de señal","Calcula el nivel resultante de esta cadena (respeta la jerarquía de operaciones): ({a}−{b})×{c}−{d}÷{e} ="],
      ["Orden de cálculo en una consola","Al calcular el nivel final de una cadena de audio, ¿cuál de los siguientes órdenes de resolución es el correcto?"],
      ["Potencia y volumen acústico","{p}"],
      ["Repartir tiempo de sesión","En una sesión de grabación, {a}/{b} del tiempo se dedica a grabar y {c}/{d} a mezclar. ¿Qué fracción del tiempo total representan juntas (simplifica)?"],
      ["Sincronía de dos técnicos","Dos técnicos de audio revisan el escenario cada {a} y {b} segundos. Si empiezan juntos, ¿cada cuántos segundos vuelven a coincidir (MCM)?"],
      ["Kits de cable iguales","Un técnico tiene {a} cables XLR y {b} cables TRS, y quiere armar la mayor cantidad de kits idénticos sin que sobre ningún cable. ¿Cuántos cables de cada tipo lleva cada kit (MCD)?"],
      ["Curva de un fader","La ganancia de un fader sigue g(x) = {m}x + {b}, con x en cm de recorrido. ¿Cuál es la ganancia en x = {x} cm?"],
      ["Cadena de procesamiento","Una señal pasa primero por un procesador g(x) = x² + {c} y luego por un amplificador f(x) = {a}x + {b}. Si la entrada es x = {x}, ¿cuál es la salida final (f∘g)(x)?"],
      ["Sensibilidad de un potenciómetro","La respuesta de un potenciómetro de volumen es y = {m}x + {b}. {ask}"],
      ["Fasor de una señal","Una señal senoidal tiene componente real {x} y componente imaginaria {y} (forma fasorial). Encuentra su magnitud y su fase."],
      ["De fasor a componentes","Un fasor tiene magnitud {r} y fase {t}°. Encuentra sus componentes real e imaginaria."],
      ["Suma de dos fasores","Suma los fasores de dos señales: ({x1}, {y1}) y ({x2}, {y2})."],
      ["Nivel de entrada necesario","Un canal tiene ganancia {a} y offset {b} dB. Si el nivel de salida debe ser {c} dB, ¿qué nivel de entrada x se necesita? (resuelve {a}x + {b} = {c})"],
      ["Matriz de mezcla de 2 canales","Dos micrófonos alimentan dos buses: {a1}x + {b1}y = {c1} (bus Izq.) ; {a2}x + {b2}y = {c2} (bus Der.). Encuentra los niveles de entrada x, y."],
      ["Determinante de la matriz de mezcla","Calcula el determinante de la matriz de mezcla [[{a},{b}],[{c},{d}]] para saber si tiene solución única."]
    ],
    drillUi: { check:"Comprobar", next:"Nuevo", correct:"¡Correcto!", incorrect:"Incorrecto. Respuesta: {a}",
      slope:"¿cuál es su pendiente (sensibilidad)?", intercept:"¿cuál es su valor en x = 0 (ordenada al origen)?",
      numerator:"Numerador", denominator:"Denominador" },
    exam: {
      intro: "Lee con atención cada pregunta y selecciona la respuesta que creas correcta. ¡Éxito!",
      nombre:"Nombre(s)", apellido:"Apellido(s)", correo:"Correo electrónico",
      disclaimer:"Tu correo solo se usará para enviarle tus respuestas y tu calificación al profesor; no se usará con ningún otro fin ni se compartirá.",
      submit:"Enviar respuestas", incomplete:"Completa tu nombre, apellido, correo y todas las preguntas antes de enviar.",
      score:"Obtuviste {s} de {t} respuestas correctas.", mail:"Abrir correo con tus resultados",
      titlePrefix:"Examen — Tema"
    }
  },
  en: {
    hint: "tap the wave to change it",
    title: "Mathematics Fundamentals for Audio Engineering",
    lede: "The math behind acoustics, digital signal processing, electronics, and audio equipment design — from units and fractions to vectors and linear systems.",
    prof: "<b style=\"color:var(--text)\">Prof. Federico Daverio</b> · daveriofederico@gmail.com",
    "temario-h": "Syllabus", "temario-sub": "Tap a topic to see its contents, the slide deck, its lab, and its exam.",
    "goals-h": "By the end of the course, students will be able to:",
    "footer-note": "Course material for PropeMate, for educational use.",
    labLinkText: "Lab ↗", examLinkText: "Exam ↗", pdfLinkText: "PDF ↗",
    backToCourse: "← Back to course",
    units: [
      ["Fundamental and Derived Units","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad1_Unidades_Fundamentales_y_Derivadas_final.pdf",
       ["Measurement systems","Fundamental and derived units","Scientific notation","Engineering notation","Simple conversions"]],
      ["Order of Operations","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad2_Jerarquia_de_Operaciones.pdf",
       ["Grouping symbols","Powers and roots","Products and quotients","Sums and differences"]],
      ["Fractions","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad3_Fracciones.pdf",
       ["Parts of a fraction","Simple and compound fractions","Least Common Multiple (LCM)","Greatest Common Divisor (GCD)"]],
      ["Relations and Functions","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad4_Relaciones_y_Funciones.pdf",
       ["Relations between variables","Classification of functions","Function analysis","Graphical representation"]],
      ["Vectors","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad5_Vectores.pdf",
       ["Concept of a vector","Vector notation","Cartesian plane","Polar coordinates","Conversion between systems"]],
      ["Linear Systems and Matrices","https://github.com/FedericoDaverio/PropeMate/blob/main/Slides/Unidad6_Sistemas_Lineales_y_Matrices.pdf",
       ["Linear equations","Systems of equations","Matrices and determinants","Solving methods"]]
    ],
    goals: [
      "Understand unit systems and perform conversions.","Correctly apply order of operations.",
      "Solve operations with fractions.","Analyze mathematical relations and functions.",
      "Represent and operate vectors in different coordinate systems.","Solve linear systems of equations using matrix methods."
    ],
    waves: ["Sine wave", "Square wave", "Triangle wave", "Sawtooth wave"],
    eqs: ["y(t) = A·sin(2πft + φ)", "y(t) = A·sgn(sin(2πft + φ))", "y(t) = (2A/π)·asin(sin(2πft + φ))", "y(t) = 2A·(ft − floor(ft + 0.5))"],
    labs: [
      { title:"Notation & units", blurb:"Convert a magnitude into scientific and engineering notation.",
        value:"Value", std:"Standard notation", sci:"Scientific notation", eng:"Engineering notation", prefix:"SI prefix",
        presets:[[20,"Hz","20 Hz (low)"],[20000,"Hz","20,000 Hz (high)"],[343,"m/s","343 m/s (sound in air)"],[0.000001,"s","1 µs"],[100000,"W","100,000 W"]] },
      { title:"Gain chain", blurb:"Adjust three stages in dB and see how they combine.",
        s1:"Preamp", s2:"Equalizer", s3:"Power amp", totalLin:"Total gain (linear)", totalDb:"Total gain (dB)" },
      { title:"Rhythmic subdivisions", blurb:"Compare two pulses and find where they align.",
        pulseA:"Pulse A", pulseB:"Pulse B", lcm:"Least Common Multiple (LCM)", gcd:"Greatest Common Divisor (GCD)", play:"Play", pause:"Pause" },
      { title:"The decibel scale", blurb:"Slide the amplitude ratio and watch the logarithmic curve.", ratio:"Ratio (P / P₀)", level:"Level" },
      { title:"Phasor addition", blurb:"Combine two signals as vectors and find the resultant.", sigA:"Signal A", sigB:"Signal B", resultant:"Resultant", amp:"Amplitude", phase:"Phase" },
      { title:"Mix matrix", blurb:"Solve which input levels produce the desired output buses.",
        ch1:"Channel 1 → buses", ch2:"Channel 2 → buses", busL:"Desired left bus", busR:"Desired right bus",
        det:"Determinant", need:"Required input levels", singular:"Singular matrix — no unique solution." }
    ],
    drills: [
      ["Scientific notation of an audio magnitude","The {ctx} of a piece of audio gear is {v} {unit}. What is the exponent in its scientific notation?"],
      ["Audio unit conversion","Convert {v} {from} to {to}."],
      ["SI prefix on a datasheet","A component datasheet shows a value of 10^{e} {u}. Which SI prefix is that?"],
      ["Order of operations in a signal chain","Work out the resulting level of this chain (respect the order of operations): ({a}−{b})×{c}−{d}÷{e} ="],
      ["Calculation order on a mixing console","When computing the final level of an audio chain, which of the following resolution orders is correct?"],
      ["Power and acoustic volume","{p}"],
      ["Splitting session time","In a recording session, {a}/{b} of the time goes to tracking and {c}/{d} to mixing. What fraction of the total time is that together (simplify)?"],
      ["Two techs in sync","Two audio techs check the stage every {a} and {b} seconds. If they start together, after how many seconds do they align again (LCM)?"],
      ["Equal cable kits","A tech has {a} XLR cables and {b} TRS cables, and wants to build the largest number of identical kits with no cable left over. How many of each cable per kit (GCD)?"],
      ["A fader's curve","A fader's gain follows g(x) = {m}x + {b}, with x in cm of travel. What is the gain at x = {x} cm?"],
      ["A processing chain","A signal first passes through a processor g(x) = x² + {c}, then through an amplifier f(x) = {a}x + {b}. If the input is x = {x}, what is the final output (f∘g)(x)?"],
      ["A pot's sensitivity","A volume pot's response is y = {m}x + {b}. {ask}"],
      ["A signal's phasor","A sine signal has real part {x} and imaginary part {y} (phasor form). Find its magnitude and phase."],
      ["Phasor to components","A phasor has magnitude {r} and phase {t}°. Find its real and imaginary components."],
      ["Adding two phasors","Add the phasors of two signals: ({x1}, {y1}) and ({x2}, {y2})."],
      ["Required input level","A channel has gain {a} and offset {b} dB. If the output level must be {c} dB, what input level x is needed? (solve {a}x + {b} = {c})"],
      ["Two-channel mix matrix","Two mics feed two buses: {a1}x + {b1}y = {c1} (left bus) ; {a2}x + {b2}y = {c2} (right bus). Find the input levels x, y."],
      ["Mix matrix determinant","Compute the determinant of the mix matrix [[{a},{b}],[{c},{d}]] to check it has a unique solution."]
    ],
    drillUi: { check:"Check", next:"New", correct:"Correct!", incorrect:"Not quite. Answer: {a}",
      slope:"what is its slope (sensitivity)?", intercept:"what is its value at x = 0 (y-intercept)?",
      numerator:"Numerator", denominator:"Denominator" },
    exam: {
      intro: "Read each question carefully and select the answer you believe is correct. Good luck!",
      nombre:"First name(s)", apellido:"Last name(s)", correo:"Email",
      disclaimer:"Your email is only used to send your answers and score to the instructor; it will not be used for any other purpose or shared.",
      submit:"Submit answers", incomplete:"Fill in your name, last name, email and every question before submitting.",
      score:"You got {s} out of {t} correct.", mail:"Open email with your results",
      titlePrefix:"Exam — Topic"
    }
  }
};

var EXAM_DATA = [
  [ // unit 0
    ["Resuelve: (3.4 × 10⁵) + (5.6 × 10⁴) =", ["3.96 × 10⁵","9.0 × 10⁴","3.4 × 10⁹","Ninguna de las anteriores"], 0],
    ["¿Cuál de los siguientes NO es un sistema de medición utilizado en física?", ["Sistema Internacional","Sistema Imperial","Sistema CGS","Notación científica"], 3],
    ["¿Cuál de las siguientes es notación científica?", ["840","0.012","10⁻⁷","15 kΩ"], 2],
    ["Elige el enunciado correcto:", ["Las unidades derivadas resultan de combinar unidades fundamentales.","El Sistema Internacional define 7 unidades fundamentales.","La intensidad luminosa es una unidad fundamental.","Todas las anteriores."], 3],
    ["¿Qué prefijo SI corresponde a 82 × 10⁻⁹ H?", ["µH","nH","pH","mH"], 1],
    ["La notación científica correspondiente a 265 kΩ es:", ["265 × 10³","265 × 10⁶","265000","265 × 10⁻³"], 0],
    ["¿Cuántos mA contienen 5 A?", ["5","1000","0.005","5000"], 3],
    ["Resuelve: (60 µm − 4.20 mm) / (0.08 m) =", ["5.175","−0.05175 m","−0.05175","−5.175 m"], 2],
    ["Convierte 620 metros a kilómetros.", ["620000 km","0.62 km","6.2 km","6200 m"], 1],
    ["Pagué $950 dólares por 5 interfaces de audio. 1 USD = 17 MXN. ¿Cuánto pagué en pesos por una interfaz?", ["$2800","$16150","$3230","$3230.6"], 2]
  ],
  [ // unit 1
    ["Resuelve: (9 − 3) × 4 − 16 ÷ 4 =", ["20","8","14","16"], 0],
    ["Según la jerarquía de operaciones, ¿cuál de los siguientes órdenes de resolución es el correcto?",
      ["Suma y resta → Multiplicación y división → Paréntesis","Corchetes y paréntesis → Suma y resta → Potencias y raíces",
       "Paréntesis → Potencias y raíces → Multiplicación y división → Suma y resta","Multiplicación y división → Potencias y raíces → Suma y resta"], 2],
    ["Resuelve: 2(3 + 2)² − 3(5 − 3)³ =", ["26","−8","74","Ninguna de las anteriores"], 0],
    ["Resuelve: −3 × [(−4×2) ÷ (−3+1)] + 5 − [−(8−2)+3] =", ["−4","12","4","−12"], 0]
  ],
  [ // unit 2
    ["Dos técnicos de audio revisan los cables cada 30 y 50 segundos. Si empiezan juntos, ¿después de cuánto tiempo volverán a coincidir?", ["5 minutos","300 segundos","2.5 minutos","150 metros"], 2],
    ["Un técnico tiene 72 cables XLR, 108 TRS y 144 RCA, y quiere armar la mayor cantidad posible de kits iguales sin que sobre ningún cable. ¿Cuántos cables de cada tipo lleva cada kit?", ["24 cables","144 cables","36 cables","Ninguna de las anteriores"], 2],
    ["Tengo 7/8 de una torta, comparto la mitad con Marco y el resto lo divido con Sofía. ¿Con qué porción me quedé?", ["1/8","7/32","1/4","5/16"], 1],
    ["Resuelve: 1/2 + 3/4 × (2/3 − 1/6) =", ["5/8","9/8","7/8","3/4"], 2],
    ["Resuelve: 3 1/4 × 1 2/5 =", ["91/20","4.55","182/40","Todas las anteriores"], 3]
  ],
  [ // unit 3
    ["Determina la intersección de las rectas: y = 3x + 2 ; y = 0.5x − 1", ["(−6/5, −8/5)","(6/5, 8/5)","(1/2, 2)","Ninguna de las anteriores"], 0],
    ["Es la función compuesta (f∘g)(x) si f(x) = 3x − 2 y g(x) = x² + 4.", ["3x² + 10","x² + 14","3x² + 4","x + 14"], 0],
    ["¿Cuál de las siguientes es una función lineal?", ["y = 7x + 1","y = 2x³ − 5","f(x) = sin(x)","4 + 2 = 6"], 0],
    ["En la ecuación y = 6x + 3, ¿cuál es la variable dependiente?", ["y","x"], 0],
    ["Una recta pasa por los puntos (0, −2) y (4, 0). ¿Cuál es su función?", ["y = 0.5x − 2","y = 2x − 2","x = 0.5y − 2","y = x − 2"], 0],
    ["Toda función es una relación entre dos conjuntos.", ["Verdadero","Falso"], 0]
  ],
  [ // unit 4
    ["¿Cuál de las siguientes es la representación polar de un vector?", ["(5, 12)","[2, 9]","10∠53.13°","|7, −3|"], 2],
    ["Encuentra el vector en coordenadas cartesianas de: 10∠60°", ["(5, 8.66)","(8.66, 5)","(5, 5)","(10, 8.66)"], 0],
    ["Un vector debe tener:", ["Dirección, Fuerza y Rango","Amplitud, Fuerza y Sentido","Dirección, Magnitud y Sentido","Magnitud, Rango y Dirección"], 2],
    ["Dado el vector a = (9, −12), encuentra sus coordenadas polares.", ["15, −53.13°","21, 45°","225, 53.1°","15, −37°"], 0]
  ],
  [ // unit 5
    ["Un sistema de ecuaciones lineales con más incógnitas que ecuaciones puede tener infinitas soluciones.", ["Verdadero","Falso"], 0],
    ["Resuelve: 4x − 7 = 21", ["5","6","7","8"], 2],
    ["¿Cuál es la solución de la ecuación cuadrática x² − 8x + 16 = 0?", ["2","3","4","5"], 2],
    ["Resuelve el sistema de ecuaciones: 2x + y = 5; 3x − 2y = 4", ["x = 2, y = 1","x = 1, y = 2","x = −2, y = 9","x = 3, y = −1"], 0],
    ["Despeja el valor de x: 2(5 − 3x) + 9x/3 = 4", ["−1","1","3/2","2"], 3],
    ["Despeja y: y = 12/x − 5y", ["y = 2/x","x = 2/y","y = −2/x","Ninguna de las anteriores"], 0],
    ["Resuelve el sistema de ecuaciones: x + y = −1; 2x − y = 7", ["x = 2, y = −3","x = −2, y = 3","x = 3, y = −4","x = 1, y = −2"], 0],
    ["Resuelve el sistema de ecuaciones: 2x + 3y = z; 3y − z = 1; 2y + z = 5", ["x = −0.5, y = 1.2, z = 2.6","x = 0.5, y = −1.2, z = −2.6","Sistema indeterminado","x = 1, y = 0, z = 5"], 0]
  ]
];

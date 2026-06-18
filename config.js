// ============================================
// ⚙️ CONFIGURACIÓN DE LA PLANTILLA — HANI & MANGO 🌈🐾
// ============================================
//
// 📝 INSTRUCCIONES:
// Este archivo controla TODO el contenido de tu sitio de Hani y Mango.
// Solo necesitas editar los textos, fechas y rutas de archivos aquí.
// NO necesitas tocar ningún otro archivo del proyecto.
//
// 💡 CONSEJOS:
// - Los textos entre comillas ("") pueden contener emojis
// - Las fechas deben estar en formato: "YYYY-MM-DD" (Año-Mes-Día)
// - Las rutas de archivos deben apuntar a la carpeta assets/
// - Puedes usar <br> para saltos de línea en los textos
// ============================================

const config = {
    // ============================================
    // 1️⃣ CONFIGURACIÓN GENERAL
    // ============================================
    pageTitle: "Hani & Mango 🌈🐾",
    favicon: "assets/favicon.svg",

    // ============================================
    // 2️⃣ MÚSICA DE FONDO
    // ============================================
    music: {
        // Pon aquí el archivo de audio extraído de tu canción
        // (ver guía de extracción que te explico aparte del código)
        path: "Monsieur Périné - Nuestra canción.mp3", // 🔇 Déjalo vacío si no tienes música aún

        volume: 0.3,
        autoPlay: true
    },

    // ============================================
    // 3️⃣ PANTALLA DE CARGA
    // ============================================
    loading: {
        message: "Un jardín lleno de bigotes te espera...",
        buttonText: "Entrar ✨",
        clickHint: "Toca para entrar"
    },

    // ============================================
    // 4️⃣ SECCIÓN HERO (PANTALLA PRINCIPAL)
    // ============================================
    hero: {
        title: "Hani & Mango",

        // ⚠️ IMPORTANTE: Fecha en la que llegaron a tu vida (YYYY-MM-DD)
        startDate: "2024-01-01",

        finalText: "Una gruñona y un bobito, el dúo perfecto 🌸",
        scrollText: "Desliza para conocer su historia",

        // Emoji que aparece "floreciendo" en el hero y al final
        heartCharacter: "🌸"
    },

    // ============================================
    // 4️⃣.5 ESCUDO DE PERSONALIDAD (debajo del título)
    // ============================================
    // Si dejas "photo" vacío, se muestra el emoji.
    // Si pones una ruta (ej. "assets/hani.jpg"), se muestra esa foto en círculo.
    pets: {
        hani: {
            name: "Hani",
            label: "la arrechita",
            emoji: "😼",
            photo: "assets/hani-17.jpg"
        },
        mango: {
            name: "Mango",
            label: "el bobito",
            emoji: "😄",
            photo: "assets/mango-extra-01.jpg"
        }
    },

    // ============================================
    // 5️⃣ LÍNEA DE TIEMPO (SUS MOMENTOS)
    // ============================================
    // Cuenta los hitos de Hani y Mango. Copia el bloque de un evento
    // para agregar más cuando quieras.
    timeline: [
        // ========== EVENTO 1 ==========
        {
            title: "🌟 El día que Hani llegó a casa",
            content: `Llegó pequeñita, cabía en una caja... y desde el primer día ya tenía personalidad de sobra.`,
            images: [
                "assets/hani-08.jpg",
                "assets/hani-11.jpg"
            ],
            footer: "un carboncito ñiej"
        },

        // ========== EVENTO 2 ==========
        {
            title: "😼 El bufido que la define",
            content: `Hani perfeccionó su cara de "quiubo me va a dar whiskas o que?" desde muy joven, y la mantiene impecable hasta hoy.`,
            images: ["assets/hani-12.jpg"],
            videos: ["assets/hani-video.mp4"],
            footer: "Amargada desde el primer segundo, y la amamos así"
        },

        // ========== EVENTO 3 ==========
        {
            title: "🥥 Mango se roba el show",
            content: `Mientras Hani juzgaba todo a su alrededor, Mango llegó con su talento natural para verse adorablemente bobo.`,
            images: ["assets/mango-12.jpg"],
            footer: "El cerebro más pequeño, el corazón más grande.. sobre todo la panchita"
        },

        // ========== EVENTO 4 ==========
        {
            title: "🌈 Hoy, en familia",
            content: `Entre bufidos, siestas y bostezos, Hani y Mango se volvieron el corazón ruidoso (y peludo) de la casa.`,
            images: ["assets/hani-15.jpg"],
            extra: `<br>Y así, cada día, una gruñona y un bobito goldos hacen que todo tenga más sentido.`
        },

        // 💡 Para agregar más eventos, copia este bloque:
        /*
        {
            title: "🎈 Título del momento",
            content: `Descripción del momento...`,
            images: ["assets/placeholder.svg"],
            footer: "Comentario adicional"
        },
        */
    ],

    // ============================================
    // 6️⃣ GALERÍA DE FOTOS
    // ============================================
    gallery: {
        title: "Momentos icónicos",

        // 📌 Cada foto puede ser solo una ruta ("assets/foto.jpg") o un
        // objeto con más detalle, como aquí abajo:
        //   src:     ruta de la imagen (obligatorio)
        //   caption: frase corta tipo meme que aparece bajo la foto (opcional)
        //   pet:     "hani" | "mango" | "ambos"  -> colorea la etiqueta (opcional)
        images: [
            { src: "assets/hani-03.jpg", caption: "lista para juzgarte desde las alturas", pet: "hani" },
            { src: "assets/mango-01.jpg", caption: "siesta en posición de máximo abandono", pet: "mango" },
            { src: "assets/hani-06.jpg", caption: "bebé gruñona en entrenamiento", pet: "hani" },
            { src: "assets/mango-07.jpg", caption: "demasiado cerca, demasiado bobo", pet: "mango" },
            { src: "assets/hani-02.jpg", caption: "el único segundo en que se le ve contenta", pet: "hani" },
            { src: "assets/mango-10.jpg", caption: "su gorrito favorito (él no opina lo mismo)", pet: "mango" },
            { src: "assets/hani-09.jpg", caption: "tan chiquita, ya con mal genio", pet: "hani" },
            { src: "assets/mango-03.jpg", caption: "modo vigilante (dura 10 segundos)", pet: "mango" },
            { src: "assets/hani-18.jpg", caption: "el drama de estar ligeramente cansada", pet: "hani" },
            { src: "assets/mango-13.jpg", caption: "blep oficial", pet: "mango" },
            { src: "assets/hani-01.jpg", caption: "posando, pero no feliz de hacerlo", pet: "hani" },
            { src: "assets/mango-06.jpg", caption: "cara de inocente, pero algo rompió", pet: "mango" },
            { src: "assets/hani-19.jpg", caption: "viene a reclamar algo, seguro", pet: "hani" },
            { src: "assets/mango-extra-02.jpg", caption: "su lado serio (dura 2 segundos)", pet: "mango" },
            { src: "assets/hani-07.jpg", caption: "ojitos de inocencia que no duraron nada", pet: "hani" },
            { src: "assets/mango-02.jpg", caption: "su mejor ángulo, obviamente", pet: "mango" },
            { src: "assets/hani-10.jpg", caption: "el burrito de gato más amargado", pet: "hani" },
            { src: "assets/mango-08.jpg", caption: "cara oficial de el bobito", pet: "mango" },
            { src: "assets/hani-04.jpg", caption: "domina el piso como si fuera su trono", pet: "hani" },
            { src: "assets/mango-11.jpg", caption: "dormido, en paz con el mundo", pet: "mango" },
            { src: "assets/hani-14.jpg", caption: "su trono temporal del día", pet: "hani" },
            { src: "assets/mango-04.jpg", caption: "estirado como alfombra naranja", pet: "mango" },
            { src: "assets/hani-05.jpg", caption: "atrapada en modo travieso", pet: "hani" },
            { src: "assets/mango-09.jpg", caption: "intentó tomarse una selfie", pet: "mango" },
            { src: "assets/hani-16.jpg", caption: "ablandando la almohada a su gusto", pet: "hani" },
            { src: "assets/mango-05.jpg", caption: "¿me vas a dar comida o no?", pet: "mango" },
            { src: "assets/hani-13.jpg", caption: "explorando los rincones de la casa", pet: "hani" }
        ]
    },

    // ============================================
    // 7️⃣ MENSAJE FINAL
    // ============================================
    finalMessage: {
        content: "Gracias por llenar esta casa de flores, pelos y bufidos 🌸<br>Hani, Mango: los amamos tal como son. con amorcito eterno tu apas"
    }
};

// ============================================
// ✅ ¡LISTO!
// ============================================
// Guarda este archivo y recarga tu navegador para ver los cambios.
// Recuerda colocar tus fotos, videos y música en la carpeta assets/
// ============================================

# 💝 Plantilla de aniversario web

Una plantilla web interactiva y personalizable para crear un regalo digital único para tu pareja. Con efectos 3D, música, contador de días, línea de tiempo y galería de fotos.

## ✨ Características

- 🎨 **Pantalla de carga animada**: Símbolo de infinito con mensaje personalizable
- 🎵 **Música de fondo**: Reproducción automática de tu canción favorita
- ⏱️ **Contador dinámico**: Calcula automáticamente años, meses y días desde tu fecha especial
- 📖 **Línea de tiempo**: Cuenta tu historia con eventos, fotos y videos
- 🖼️ **Galería de fotos**: Estilo polaroid con efectos hover
- ✨ **Efectos visuales**: Partículas 3D, animaciones suaves con GSAP
- 📱 **Responsive**: Funciona perfectamente en móviles y tablets
- 🎯 **Fácil de personalizar**: Todo se configura desde un solo archivo

## 🚀 Inicio rápido

### Opción 1: Descarga directa

1. Haz clic en el botón verde **"Code"** → **"Download ZIP"**
2. Descomprime el archivo en tu computadora
3. ¡Listo para personalizar!

### Opción 2: Clonar con Git

```bash
git clone https://github.com/Zwartmit/Web-aniversario.git
cd web-aniversario
```

## 📝 Guía de personalización

### Paso 1: Preparar tus archivos multimedia

#### 📁 Organiza tus archivos en la carpeta `assets/`:

```
assets/
├── tu_cancion.mp3          # Tu canción favorita
├── foto1.jpg               # Fotos para la línea de tiempo
├── foto2.jpg
├── video1.mp4              # Videos (opcional)
└── fotos/                  # Carpeta para la galería
    ├── galeria1.jpg
    ├── galeria2.jpg
    └── ...
```

**💡 Formatos soportados:**

- **Imágenes**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Audio**: `.mp3`, `.wav`, `.ogg`
- **Video**: `.mp4`, `.webm`, `.ogg`

---

### Paso 2: Editar `config.js`

Abre el archivo `config.js` con cualquier editor de texto (Bloc de Notas, VS Code, Sublime Text, etc.).

#### 🎯 Secciones principales:

#### 1️⃣ **Configuración general**

```javascript
pageTitle: "Nuestro Aniversario ❤️",
favicon: "assets/favicon.svg" // Icono de la pestaña
```

Este texto título y el ícono aparecerán en la pestaña del navegador.

---

#### 2️⃣ **Música de fondo**

```javascript
music: {
    path: "assets/tu_cancion.mp3",  // Nombre de tu archivo de música
    volume: 0.3,                     // 0.0 (silencio) a 1.0 (máximo)
    autoPlay: true                   // true = reproducir automáticamente
}
```

---

#### 3️⃣ **Pantalla de carga**

```javascript
loading: {
    message: "Algo especial te espera...",
    buttonText: "Comenzar ✨",
    clickHint: "Haz clic para comenzar"
}
```

---

#### 4️⃣ **Sección Hero (Pantalla principal)**

```javascript
hero: {
    title: "Nuestra historia de amor...",
    startDate: "2024-02-14",  // ⚠️ IMPORTANTE: Formato YYYY-MM-DD
    finalText: "¡Y seguimos escribiendo nuestra historia!",
    scrollText: "Desliza para continuar"
}
```

**⚠️ Formato de fecha:** `"YYYY-MM-DD"` (Año-Mes-Día)

- ✅ Correcto: `"2024-02-14"` (14 de febrero de 2024)
- ❌ Incorrecto: `"14-02-2024"` o `"02/14/2024"`

---

#### 5️⃣ **Línea de tiempo (Tu historia)**

Aquí cuentas tu historia en eventos cronológicos. Puedes agregar tantos eventos como quieras:

```javascript
timeline: [
    {
        title: "🌟 El primer encuentro",
        content: `Escribe aquí cómo se conocieron...<br>Puedes usar <br> para saltos de línea.`,
        images: ["assets/foto1.jpg", "assets/foto2.jpg"],
        videos: ["assets/video1.mp4"],  // Opcional
        footer: "Ese día cambió todo...",
        extra: `<br>Texto adicional al final del evento.`  // Opcional
    },
    // Agrega más eventos aquí...
]
```

**📌 Campos disponibles:**

- `title`: Título del evento (puedes usar emojis 🎉)
- `content`: Descripción (acepta HTML)
- `images`: Array de rutas de imágenes (opcional)
- `videos`: Array de rutas de videos (opcional)
- `footer`: Pie de foto o comentario
- `extra`: Contenido adicional al final (opcional)

**💡 Para agregar más eventos**, copia y pega este bloque:

```javascript
{
    title: "🎈 Nuevo evento",
    content: `Descripción...`,
    images: ["assets/nueva_foto.jpg"],
    footer: "Comentario"
},
```

---

#### 6️⃣ **Galería de fotos**

```javascript
gallery: {
    title: "Momentos icónicos",
    images: [
        { src: "assets/foto1.jpg", caption: "la cara de \"no me hables\"", pet: "hani" },
        { src: "assets/foto2.jpg", caption: "se cayó solito", pet: "mango" },
        // También puedes usar solo la ruta, sin caption ni pet:
        "assets/foto3.jpg"
    ]
}
```

**📌 Campos de cada foto:**

- `src`: ruta de la imagen (obligatorio)
- `caption`: frase corta tipo meme que aparece bajo la foto, estilo polaroid (opcional)
- `pet`: `"hani"`, `"mango"` o `"ambos"` — colorea la etiqueta de la esquina (opcional)

---

#### 7️⃣ **Mensaje final**

```javascript
finalMessage: {
    content: "Gracias por ser parte de mi vida ❤️<br>Te amo más cada día..."
}
```

---

### Paso 3: Probar localmente

#### Opción A: Con Live server (Recomendado)

1. Instala [Visual Studio Code](https://code.visualstudio.com/)
2. Instala la extensión **"Live server"**
3. Haz clic derecho en `index.html` → **"Open with Live server"**
4. Se abrirá automáticamente en tu navegador

#### Opción B: Con Python

```bash
# Python 3
python -m http.server 8000

# Luego abre: http://localhost:8000
```

#### Opción C: Con Node.js

```bash
npx -y live-server .
```

#### Opción D: Abrir directamente

Simplemente haz doble clic en `index.html` (puede que algunos navegadores bloqueen la música por políticas de seguridad).

### 📱 Probando en tu celular (WiFi)

Si quieres ver cómo queda en tu celular antes de publicar:

1. Asegúrate de que tu celular y tu PC estén conectados a la **misma red WiFi**.
2. Abre la terminal en tu PC (donde estás ejecutando `live-server`).
3. Busca tu **dirección IP local**:

   - **Windows**: Escribe `ipconfig` y busca "Dirección IPv4" (ej: `192.168.1.15`).
   - **Mac/Linux**: Escribe `ifconfig` o `ip a` (ej: `192.168.1.15`).
4. En el navegador de tu celular, escribe esa IP seguida del puerto `8080`:

   ```
   http://192.168.1.15:8080
   ```

   _(Reemplaza `192.168.1.15` por tu IP real)_

---

## 🌐 Publicar en internet (GRATIS)

### Opción 1: GitHub pages (Recomendado)

1. **Crea una cuenta en [GitHub](https://github.com/)**
2. **Crea un nuevo repositorio:**

   - Haz clic en el botón **"+"** → **"New repository"**
   - Nombre: `mi-aniversario` (o el que prefieras)
   - Marca como **"Public"**
   - Haz clic en **"Create repository"**
3. **Sube tus archivos:**

   - Arrastra todos los archivos del proyecto a la página del repositorio
   - O usa Git:
     ```bash
     git init
     git add .
     git commit -m "Mi sitio de aniversario"
     git branch -M main
     git remote add origin https://github.com/tu-usuario/mi-aniversario.git
     git push -u origin main
     ```
4. **Activa GitHub pages:**

   - Ve a **Settings** → **Pages**
   - En **"Source"**, selecciona **"main"** (o **"master"**)
   - Haz clic en **"Save"**
5. **¡Listo!** Tu sitio estará disponible en:

   ```
   https://tu-usuario.github.io/mi-aniversario/
   ```

### Opción 2: Netlify

1. Ve a [Netlify](https://www.netlify.com/)
2. Arrastra la carpeta del proyecto a la página
3. ¡Listo! Te dará un link automáticamente

### Opción 3: Vercel

1. Ve a [Vercel](https://vercel.com/)
2. Importa tu repositorio de GitHub
3. Deploy automático

---

## 🎨 Personalización avanzada (Opcional)

### Cambiar colores

Edita `style.css` y busca estas variables CSS:

```css
:root {
    --primary-color: #ff6b9d;      /* Color principal */
    --secondary-color: #c44569;    /* Color secundario */
    --bg-dark: #0a0a0a;            /* Fondo oscuro */
    --text-light: #ffffff;         /* Texto claro */
}
```

### Modificar animaciones

Las animaciones están en `script.js` usando GSAP. Busca secciones como:

```javascript
gsap.from(".timeline-event", {
    scrollTrigger: { ... },
    opacity: 0,
    y: 50,
    duration: 1
});
```

---

## 🐛 Solución de problemas

### ❌ La música no se reproduce

**Causa:** Los navegadores bloquean la reproducción automática de audio.
**Solución:** El usuario debe interactuar primero (hacer clic en el botón de inicio).

### ❌ Las imágenes no se muestran

**Causa:** Ruta incorrecta en `config.js`.**Solución:** Verifica que las rutas sean correctas:

- ✅ `"assets/foto.jpg"`
- ❌ `"foto.jpg"` o `"/assets/foto.jpg"`

### ❌ El contador no funciona

**Causa:** Formato de fecha incorrecto.**Solución:** Usa el formato `"YYYY-MM-DD"`:

- ✅ `"2024-02-14"`
- ❌ `"14-02-2024"`

### ❌ Los videos no se reproducen

**Causa:** Formato no soportado.
**Solución:** Convierte tus videos a `.mp4` usando [HandBrake](https://handbrake.fr/) o [CloudConvert](https://cloudconvert.com/).

---

## 🛠️ Tecnologías utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript (Vanilla)** - Lógica
- **[Three.js](https://threejs.org/)** - Efectos 3D de fondo
- **[GSAP](https://greensock.com/)** - Animaciones suaves
- **Google Fonts** - Tipografías (Outfit, Playfair Display, Permanent Marker)

---

## 📂 Estructura del proyecto

```
web-aniversario/
├── index.html              # Estructura HTML principal
├── config.js               # ⚙️ ARCHIVO DE CONFIGURACIÓN (edita este)
├── script.js               # Lógica principal
├── style.css               # Estilos principales
├── loading.js              # Lógica de pantalla de carga
├── loading.css             # Estilos de pantalla de carga
├── backgrounds.js          # Efectos 3D con Three.js
├── favicon.svg             # Ícono de la pestaña
├── README.md               # Esta guía
└── assets/                 # 📁 Tus archivos multimedia
    ├── tu_cancion.mp3
    ├── foto1.jpg
    ├── video1.mp4
    └── fotos/
        └── galeria1.jpg
```

---

## 💡 Consejos y buenas prácticas

✅ **Optimiza tus imágenes** antes de subirlas (usa [TinyPNG](https://tinypng.com/))
✅ **Usa nombres descriptivos** para tus archivos (`primera_cita.jpg` en vez de `IMG_1234.jpg`)
✅ **Prueba en diferentes dispositivos** (móvil, tablet, desktop)
✅ **Guarda copias de seguridad** de tus archivos originales
✅ **Comprime videos grandes** para que carguen más rápido

---

## 🤝 Contribuciones

¿Tienes ideas para mejorar esta plantilla? ¡Las contribuciones son bienvenidas!

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## ❤️ Autor y Créditos

- 📸 **Instagram**: [devmit.tech](https://www.instagram.com/devmit.tech)
- 🎵 **TikTok**: [@zwart_mit](https://www.tiktok.com/@zwart_mit)

Si usaste esta plantilla y te gustó, ¡comparte tu experiencia! 💝

---

## 📞 Soporte

¿Necesitas ayuda? Abre un [Issue](https://github.com/Zwartmit/Web-aniversario/issues) en GitHub.

---

**¡Disfruta creando tu regalo digital! 🎁✨**

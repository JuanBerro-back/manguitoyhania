let scene, camera, renderer, animationId;
let currentObjects = [];
let materialRef = null;

const container = document.getElementById('canvas-container');

// Setup Basic ThreeJS Scene
function initBase() {
    scene = new THREE.Scene();
    // Adjust camera for different scenes if needed, but standard is fine
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Clear Scene Helper
function clearScene() {
    if (animationId) cancelAnimationFrame(animationId);
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    camera.position.set(0, 0, 30);
    camera.rotation.set(0, 0, 0);
    scene.fog = null; // Reset fog
}

// ---------------------------------------------------------
// SCENE 1: PETALS
// ---------------------------------------------------------
function initPetals() {
    clearScene();
    document.body.style.background = '#0b0b12';

    const geometry = new THREE.BufferGeometry();
    const count = 400;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        scales[i] = Math.random();
        speeds[i] = Math.random() * 0.05 + 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#ff4d80') } },
        vertexShader: `
      uniform float uTime;
      attribute float aScale;
      attribute float aSpeed;
      varying float vScale;
      void main() {
        vScale = aScale;
        vec3 pos = position;
        pos.y = mod(pos.y - uTime * aSpeed * 10.0 + 30.0, 60.0) - 30.0;
        pos.x += sin(uTime * 1.5 + pos.y * 0.5) * 0.5;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = (6.0 * aScale) * (10.0 / -mvPosition.z);
      }
    `,
        fragmentShader: `
      uniform vec3 uColor;
      void main() {
        if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard; 
        gl_FragColor = vec4(uColor, 0.8);
      }
    `,
        transparent: true
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
    const animate = () => {
        material.uniforms.uTime.value += 0.01;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    };
    animate();
}

// ---------------------------------------------------------
// SCENE 2: AURORA
// ---------------------------------------------------------
function initAurora() {
    clearScene();
    document.body.style.background = '#050510';
    const geometry = new THREE.PlaneGeometry(100, 100, 64, 64);
    const material = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uColor1: { value: new THREE.Color('#3b005e') }, uColor2: { value: new THREE.Color('#00264d') } },
        vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave = sin(pos.x * 0.1 + uTime) * cos(pos.y * 0.1 + uTime) * 2.0;
        pos.z += wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
        fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1; uniform vec3 uColor2;
      varying vec2 vUv;
      void main() {
        float noise = sin(vUv.x * 10.0 + uTime) * cos(vUv.y * 10.0 - uTime * 0.5);
        vec3 color = mix(uColor1, uColor2, vUv.y + noise * 0.2);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.z = -10;
    scene.add(plane);
    const animate = () => { material.uniforms.uTime.value += 0.005; renderer.render(scene, camera); animationId = requestAnimationFrame(animate); };
    animate();
}

// ---------------------------------------------------------
// SCENE 3: CONSTELLATION
// ---------------------------------------------------------
function initConstellation() {
    clearScene();
    document.body.style.background = '#0f172a';
    const particleCount = 100;
    const particles = new THREE.Group();
    const geometry = new THREE.SphereGeometry(0.15, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xaecbe3 });
    for (let i = 0; i < particleCount; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20);
        particles.add(mesh);
    }
    scene.add(particles);
    const animate = () => {
        particles.rotation.y += 0.002; particles.rotation.x += 0.001;
        renderer.render(scene, camera); animationId = requestAnimationFrame(animate);
    };
    animate();
}

// ---------------------------------------------------------
// SCENE 4: BOKEH
// ---------------------------------------------------------
function initBokeh() {
    clearScene();
    document.body.style.background = '#1a0505';
    const count = 50; const geometry = new THREE.CircleGeometry(1, 32); const group = new THREE.Group();
    for (let i = 0; i < count; i++) {
        const material = new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? 0xffd700 : 0xff6b81, transparent: true, opacity: Math.random() * 0.3 + 0.1 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30);
        mesh.scale.setScalar(Math.random() * 3 + 1);
        group.add(mesh);
    }
    scene.add(group);
    const animate = () => {
        group.children.forEach((m, i) => { m.position.y += Math.sin(Date.now() * 0.001 + i) * 0.02; m.position.x += Math.cos(Date.now() * 0.001 + i) * 0.01; });
        renderer.render(scene, camera); animationId = requestAnimationFrame(animate);
    };
    animate();
}

// ---------------------------------------------------------
// SCENE 5: GALAXY
// ---------------------------------------------------------
function initGalaxy() {
    clearScene();
    document.body.style.background = '#000000';
    const parameters = { count: 3000, size: 0.1, radius: 30, branches: 4, spin: 1, randomness: 0.5, randomnessPower: 3, insideColor: '#ff6030', outsideColor: '#1b3984' };
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);
        colors[i3] = mixedColor.r; colors[i3 + 1] = mixedColor.g; colors[i3 + 2] = mixedColor.b;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: parameters.size, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    points.rotation.x = 0.5;
    const animate = () => { points.rotation.y += 0.001; renderer.render(scene, camera); animationId = requestAnimationFrame(animate); };
    animate();
}

// ---------------------------------------------------------
// SCENE 6: FLUID
// ---------------------------------------------------------
function initFluid() {
    clearScene();
    document.body.style.background = '#0d0d0d';
    const geometry = new THREE.IcosahedronGeometry(10, 32);
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#3300ff') } },
        vertexShader: `
      uniform float uTime; varying vec3 vNormal;
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i); 
        vec4 p = permute( permute( permute( 
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }
      void main() {
        vNormal = normal;
        vec3 pos = position;
        float noise = snoise(pos * 0.2 + uTime * 0.3);
        pos = pos + normal * noise * 3.0; 
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
        fragmentShader: `
      uniform vec3 uColor; varying vec3 vNormal;
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        gl_FragColor = vec4(uColor + intensity, 1.0);
      }
    `,
        wireframe: true
    });
    const blob = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(blob);
    const animate = () => { shaderMaterial.uniforms.uTime.value += 0.02; blob.rotation.y += 0.005; renderer.render(scene, camera); animationId = requestAnimationFrame(animate); };
    animate();
}

// ---------------------------------------------------------
// SCENE 7: RETRO GRID
// ---------------------------------------------------------
function initGrid() {
    clearScene();
    document.body.style.background = '#0e001f';
    const gridHelper = new THREE.GridHelper(100, 40, 0xff00cc, 0x220044);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    const sunGeo = new THREE.CircleGeometry(15, 32);
    const sunMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
      varying vec2 vUv; uniform float uTime;
      void main() {
        vec3 color = mix(vec3(1.0, 0.8, 0.0), vec3(1.0, 0.0, 0.5), vUv.y);
        float stripes = sin(vUv.y * 50.0 - uTime * 2.0);
        if(stripes > 0.8 && vUv.y < 0.6) discard; 
        gl_FragColor = vec4(color, 1.0);
      }
    `,
        transparent: true
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.z = -30; sun.position.y = 5;
    scene.add(sun);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 100;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const animate = () => {
        gridHelper.position.z = (gridHelper.position.z + 0.1) % 2.5;
        sunMat.uniforms.uTime.value += 0.01;
        stars.position.z += 0.2;
        if (stars.position.z > 20) stars.position.z = -20;
        renderer.render(scene, camera); animationId = requestAnimationFrame(animate);
    };
    animate();
}

// ---------------------------------------------------------
// SCENE 8: WARP SPEED 🚀
// ---------------------------------------------------------
function initWarp() {
    clearScene();
    document.body.style.background = '#000000';

    const count = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
        positions[i * 3 + 2] = Math.random() * 100; // z (depth)
        velocities[i] = 0; // Starts 0, accelerates
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Fancy streaks? Just stretching them might be hard with Points.
    // We'll just move them very fast towards camera.

    const animate = () => {
        const positions = starField.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            let z = positions[i * 3 + 2];
            z += 0.5; // Speed
            if (z > 50) z = -100; // Loop
            positions[i * 3 + 2] = z;
        }

        starField.geometry.attributes.position.needsUpdate = true;
        starField.rotation.z += 0.002;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    };
    animate();
}

// ---------------------------------------------------------
// SCENE 9: WAVE (Geometric) 🌊
// ---------------------------------------------------------
function initWave() {
    clearScene();
    document.body.style.background = '#eee'; // Light mode!

    // Grid of spheres
    const amountX = 20;
    const amountY = 20;
    const separation = 2;
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x4f4f4f });
    const group = new THREE.Group();

    for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set((ix - amountX / 2) * separation, 0, (iy - amountY / 2) * separation);
            group.add(mesh);
        }
    }
    scene.add(group);

    // Adjust camera to look down
    camera.position.set(0, 30, 30);
    camera.lookAt(0, 0, 0);

    const light = new THREE.PointLight(0xff0000, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const animate = () => {
        const time = Date.now() * 0.002;
        let i = 0;
        for (let ix = 0; ix < amountX; ix++) {
            for (let iy = 0; iy < amountY; iy++) {
                const mesh = group.children[i++];
                // Sine wave
                mesh.position.y = (Math.sin((ix + time) * 0.5) * 3) + (Math.sin((iy + time) * 0.5) * 3);
                // Scale effect
                const scale = (Math.sin((ix + time) * 0.5) + 1.5) * 0.5;
                mesh.scale.set(scale, scale, scale);
            }
        }
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    };
    animate();
}

// ---------------------------------------------------------
// SCENE 10: FIREFLIES (Forest) 🦗
// ---------------------------------------------------------
function initFireflies() {
    clearScene();
    document.body.style.background = '#021205'; // Dark Green

    // Trees placeholder (cylinders)
    const treeGeo = new THREE.CylinderGeometry(0.2, 0.5, 20, 8);
    const treeMat = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.5, transparent: true });
    for (let i = 0; i < 20; i++) {
        const tree = new THREE.Mesh(treeGeo, treeMat);
        tree.position.set((Math.random() - 0.5) * 50, 0, (Math.random() - 0.5) * 20 - 10);
        scene.add(tree);
    }

    // Fireflies
    const count = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40 + 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        offsets[i] = Math.random() * 100;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffff00, // Yellow
        size: 0.4,
        transparent: true,
        opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const animate = () => {
        const time = Date.now() * 0.001;
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            // Complex noise-like movement
            const x = i * 3;
            pos[x] += Math.sin(time + offsets[i]) * 0.05;
            pos[x + 1] += Math.cos(time * 0.5 + offsets[i]) * 0.05;
            // Blink
            if (Math.random() > 0.99) material.opacity = Math.random();
        }
        geometry.attributes.position.needsUpdate = true;

        // Rotate camera slightly
        camera.position.x = Math.sin(time * 0.1) * 5;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    };
    animate();
}

// ---------------------------------------------------------
// LOGIC
// ---------------------------------------------------------

window.switchScene = (sceneName) => {
    document.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + sceneName).classList.add('active');

    if (sceneName === 'petals') initPetals();
    if (sceneName === 'aurora') initAurora();
    if (sceneName === 'constellation') initConstellation();
    if (sceneName === 'bokeh') initBokeh();

    // Set 2
    if (sceneName === 'galaxy') initGalaxy();
    if (sceneName === 'fluid') initFluid();
    if (sceneName === 'grid') initGrid();

    // Set 3
    if (sceneName === 'warp') initWarp();
    if (sceneName === 'wave') initWave();
    if (sceneName === 'fireflies') initFireflies();
};

initBase();
initWarp(); // Start with latest

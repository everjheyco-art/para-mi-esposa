// --- CONFIGURACIÓN DE TUS 12 FOTOS Y MENSAJES ---
const recuerdos = [
    { foto: 'img/foto1.jpg.jpeg', titulo: 'Flores Amarillas Para Ti', texto: 'Hoy mi universo florece en amarillo por ti. Eres mi luz y mi alegría de cada día.', etiqueta: 'MI PERSONA FAVORITA' },
    { foto: 'img/foto2.jpg.jpeg', titulo: 'Para Siempre', texto: 'Estas rosas se marchitarán algún día, pero lo que siento por ti no. Te elegiría en cada vida, en cada universo, siempre.', etiqueta: 'LA MEJOR ESPOSA' },
    { foto: 'img/foto3.jpg.jpeg', titulo: 'Amarillo Por Ti', texto: 'El color de lo que siento cuando pienso en ti: alegría pura, cálida e infinita.', etiqueta: 'ERES MI LUZ' },
    { foto: 'img/foto4.jpg.jpeg', titulo: 'Mil Colores', texto: 'Antes de ti mi vida era de un solo color. Llegaste tú y la llenaste de motivos para sonreír.', etiqueta: 'MI LUGAR FAVORITO' },
    { foto: 'img/foto5.jpg.jpeg', titulo: 'Nuestro Viaje', texto: 'Contigo hasta el fin del mundo. Tú y yo, sin prisa, sin rumbo fijo, pero felices.', etiqueta: 'JUNTOS X SIEMPRE' },
    { foto: 'img/foto6.jpg.jpeg', titulo: 'Eres Mi Primavera', texto: 'Cada día a tu lado se siente como un día soleado lleno de vida y flores.', etiqueta: 'AMOR DE MI VIDA' },
    { foto: 'img/foto7.jpg.jpeg', titulo: 'Mi Lugar Favorito', texto: 'Mi lugar favorito en todo el universo no es un sitio, es estar a tu lado.', etiqueta: 'MI REGALO PRECIADO' },
    { foto: 'img/foto8.jpg.jpeg', titulo: 'Amor Infinito', texto: 'Gracias por cada sonrisa, por cada abrazo y por hacer que mi vida sea más bonita.', etiqueta: 'TU Y YO' },
    { foto: 'img/foto9.jpg.jpeg', titulo: 'Juntos en Cada Universo', texto: 'No importa dónde nos lleve el destino, siempre buscaré la forma de llegar a ti.', etiqueta: 'MI SUEÑO HECHO REALIDAD' },
    { foto: 'img/foto10.jpg.jpeg', titulo: 'Tu Luz en Mi', texto: 'Iluminas mis días oscuros y haces que cada momento juntos sea inolvidable.', etiqueta: 'MI UNIVERSO ENTERO' },
    { foto: 'img/foto11.jpg.jpeg', titulo: 'Nuestra Historia', texto: 'Una historia de amor hermosa que seguimos escribiendo paso a paso juntos.', etiqueta: 'SIEMPRE MI AMOR' },
    { foto: 'img/foto12.jpg.jpeg', titulo: 'Te Amo', texto: 'Eres mi regalo más preciado en esta vida. Gracias por existir y por acompañarme.', etiqueta: 'TE AMO INFINITO' }
];

// --- ESCENA 3D Y CÁMARA ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enabled = false;

const mainGroup = new THREE.Group();
scene.add(mainGroup);

// TEXTURA DE PARTÍCULA BRILLANTE AMARILLA
function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 225, 60, 0.95)');
    gradient.addColorStop(0.6, 'rgba(255, 140, 0, 0.45)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
}

// TEXTURA DE PARTÍCULA BRILLANTE ROJA
function createRedGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 30, 60, 0.95)');
    gradient.addColorStop(0.6, 'rgba(200, 0, 30, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
}

const particleGlowTexture = createGlowTexture();
const redGlowTexture = createRedGlowTexture();

// TEXTO DORADO BRILLANTE CON VOLUMEN 3D
function createTextLabelTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 192;
    const ctx = canvas.getContext('2d');

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.font = '900 52px "Montserrat", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowColor = '#ffea00';
    ctx.shadowBlur = 25;

    ctx.lineWidth = 10;
    ctx.strokeStyle = '#b8860b';
    ctx.strokeText(text, cx + 2, cy + 4);

    ctx.lineWidth = 8;
    ctx.strokeStyle = '#8b6508';
    ctx.strokeText(text, cx, cy + 2);

    const gradient = ctx.createLinearGradient(0, cy - 30, 0, cy + 30);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.35, '#fff066');
    gradient.addColorStop(0.7, '#ffd700');
    gradient.addColorStop(1, '#ff9900');

    ctx.fillStyle = gradient;
    ctx.fillText(text, cx, cy);

    ctx.shadowBlur = 0;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeText(text, cx, cy);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// --- 1. UNIVERSO AGRANDADO CON CORAZONES FLOTANTES ---
const starTunnelCount = 8000;
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(starTunnelCount * 3);

for (let i = 0; i < starTunnelCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1 + Math.random() * 32;
    const z = (Math.random() - 0.5) * 260;

    starPos[i * 3] = Math.cos(angle) * radius;
    starPos[i * 3 + 1] = Math.sin(angle) * radius;
    starPos[i * 3 + 2] = z;
}

starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const starMat = new THREE.PointsMaterial({
    size: 0.42,
    map: particleGlowTexture,
    color: 0xffea00,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const starTunnel = new THREE.Points(starGeo, starMat);
scene.add(starTunnel);

// CORAZONES ROJOS Y AMARILLOS DISPERSOS
const floatingHeartsCount = 400;
const floatingHeartGeo = new THREE.BufferGeometry();
const floatingHeartPos = new Float32Array(floatingHeartsCount * 3);
const floatingHeartCols = new Float32Array(floatingHeartsCount * 3);

for (let i = 0; i < floatingHeartsCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 35;
    const z = (Math.random() - 0.5) * 220;

    floatingHeartPos[i * 3] = Math.cos(angle) * radius;
    floatingHeartPos[i * 3 + 1] = Math.sin(angle) * radius;
    floatingHeartPos[i * 3 + 2] = z;

    const color = new THREE.Color();
    if (Math.random() < 0.5) {
        color.setRGB(1.0, 0.15, 0.25);
    } else {
        color.setRGB(1.0, 0.88, 0.0);
    }

    floatingHeartCols[i * 3] = color.r;
    floatingHeartCols[i * 3 + 1] = color.g;
    floatingHeartCols[i * 3 + 2] = color.b;
}

floatingHeartGeo.setAttribute('position', new THREE.BufferAttribute(floatingHeartPos, 3));
floatingHeartGeo.setAttribute('color', new THREE.BufferAttribute(floatingHeartCols, 3));

const floatingHeartMat = new THREE.PointsMaterial({
    size: 0.75,
    map: redGlowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const floatingHearts = new THREE.Points(floatingHeartGeo, floatingHeartMat);
scene.add(floatingHearts);

// --- 2. GALAXIA DE BRAZOS ESPIRALES EXTENDIDOS ---
const galaxyParticleCount = 75000;
const galaxyGeo = new THREE.BufferGeometry();
const galaxyPos = new Float32Array(galaxyParticleCount * 3);
const galaxyCol = new Float32Array(galaxyParticleCount * 3);

const armsCount = 4;

for (let i = 0; i < galaxyParticleCount; i++) {
    const isArmParticle = Math.random() < 0.85;
    let r, theta;

    if (isArmParticle) {
        r = Math.random() * 23.2 + 0.3;
        const armIndex = i % armsCount;
        const baseAngle = (armIndex * 2 * Math.PI) / armsCount;
        const spin = r * 0.32;
        const spread = (Math.random() - 0.5) * (0.35 + r * 0.05);
        theta = baseAngle + spin + spread;
    } else {
        r = Math.random() * 23.5 + 0.2;
        theta = Math.random() * Math.PI * 2;
    }

    galaxyPos[i * 3] = r * Math.cos(theta);
    galaxyPos[i * 3 + 1] = (Math.random() - 0.5) * (0.3 + (1 - r / 23.5) * 0.4);
    galaxyPos[i * 3 + 2] = r * Math.sin(theta);

    const color = new THREE.Color();
    const rand = Math.random();

    if (r < 2.5) {
        color.setRGB(1.0, 0.98, 0.85);
    } else if (isArmParticle) {
        if (rand < 0.25) {
            color.setRGB(1.0, 1.0, 0.8);
        } else if (rand < 0.70) {
            color.setRGB(1.0, 0.88, 0.0);
        } else {
            color.setRGB(1.0, 0.70, 0.0);
        }
    } else {
        color.setRGB(0.70, 0.50, 0.05);
    }

    galaxyCol[i * 3] = color.r;
    galaxyCol[i * 3 + 1] = color.g;
    galaxyCol[i * 3 + 2] = color.b;
}

galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3));
galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyCol, 3));

const galaxyMat = new THREE.PointsMaterial({
    size: 0.27,
    map: particleGlowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
mainGroup.add(galaxy);

// --- 3. CORAZÓN TOTALMENTE RELLENO EN 3D ---
const heartParticleCount = 30000;
const heartGeo = new THREE.BufferGeometry();
const heartCurrentPos = new Float32Array(heartParticleCount * 3);
const heartTargetPos = new Float32Array(heartParticleCount * 3);
const heartCol = new Float32Array(heartParticleCount * 3);

for (let i = 0; i < heartParticleCount; i++) {
    heartCurrentPos[i * 3] = 0;
    heartCurrentPos[i * 3 + 1] = 0;
    heartCurrentPos[i * 3 + 2] = 0;

    const t = Math.random() * Math.PI * 2;
    const fillFactor = Math.sqrt(Math.random()); 

    const scale = 0.45;
    const x = 16 * Math.pow(Math.sin(t), 3) * scale * fillFactor;
    const y = ((13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale + 1.2) * fillFactor;
    const z = (Math.random() - 0.5) * 1.5 * fillFactor;

    heartTargetPos[i * 3] = x + (Math.random() - 0.5) * 0.1;
    heartTargetPos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
    heartTargetPos[i * 3 + 2] = z + (Math.random() - 0.5) * 0.1;

    const color = new THREE.Color();
    const randColor = Math.random();
    if (randColor < 0.75) {
        color.setRGB(1.0, 0.88, 0.0);
    } else {
        color.setRGB(1.0, 0.98, 0.5);
    }

    heartCol[i * 3] = color.r;
    heartCol[i * 3 + 1] = color.g;
    heartCol[i * 3 + 2] = color.b;
}

heartGeo.setAttribute('position', new THREE.BufferAttribute(heartCurrentPos, 3));
heartGeo.setAttribute('color', new THREE.BufferAttribute(heartCol, 3));

const heartMat = new THREE.PointsMaterial({
    size: 0.32,
    map: particleGlowTexture,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0
});

const heartMesh = new THREE.Points(heartGeo, heartMat);
mainGroup.add(heartMesh);

// --- 4. TEXTO DE PUNTITOS AMARILLOS RELLENO ---
function generateTextAndHeartPoints(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');

    ctx.font = 'Bold 56px "Montserrat", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    const textX = 60;
    const textY = canvas.height / 2;
    ctx.fillText(text, textX, textY);
    
    const textWidth = ctx.measureText(text).width;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const yellowPoints = [];
    const redHeartPoints = [];

    const scaleFactor = 0.038;
    const xOffset = (canvas.width / 2) * scaleFactor;
    const thicknessZ = 0.45; 

    for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
            const alpha = data[(y * canvas.width + x) * 4 + 3];
            if (alpha > 128) {
                const posX = x * scaleFactor - xOffset;
                const posY = -(y - canvas.height / 2) * scaleFactor;

                for (let k = 0; k < 2; k++) {
                    const posZ = (Math.random() - 0.5) * thicknessZ;
                    yellowPoints.push({ x: posX, y: posY, z: posZ });
                }
            }
        }
    }

    const heartCenterX = (textX + textWidth + 45) * scaleFactor - xOffset;
    const heartCenterY = 0;
    const heartSize = 0.11;

    for (let i = 0; i < 800; i++) {
        const t = Math.random() * Math.PI * 2;
        const fillFactor = Math.sqrt(Math.random());

        const hx = 16 * Math.pow(Math.sin(t), 3) * heartSize * fillFactor;
        const hy = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * heartSize * fillFactor;
        const hz = (Math.random() - 0.5) * thicknessZ;

        redHeartPoints.push({
            x: heartCenterX + hx,
            y: heartCenterY + hy,
            z: hz
        });
    }

    return { yellowPoints, redHeartPoints };
}

const { yellowPoints, redHeartPoints } = generateTextAndHeartPoints('MIA Y EVER X SIEMPRE MI AMOR');

const TEXT_Y_POSITION = 16.5;

const textParticleCount = yellowPoints.length;
const textGeo = new THREE.BufferGeometry();
const textCurrentPos = new Float32Array(textParticleCount * 3);
const textTargetPos = new Float32Array(textParticleCount * 3);

yellowPoints.forEach((p, i) => {
    textCurrentPos[i * 3] = p.x + (Math.random() - 0.5) * 15;
    textCurrentPos[i * 3 + 1] = p.y + TEXT_Y_POSITION + (Math.random() - 0.5) * 10;
    textCurrentPos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 5;

    textTargetPos[i * 3] = p.x;
    textTargetPos[i * 3 + 1] = p.y + TEXT_Y_POSITION;
    textTargetPos[i * 3 + 2] = p.z;
});

textGeo.setAttribute('position', new THREE.BufferAttribute(textCurrentPos, 3));
const textMat = new THREE.PointsMaterial({
    size: 0.35,
    map: particleGlowTexture,
    color: 0xffea00,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const textPointsMesh = new THREE.Points(textGeo, textMat);
scene.add(textPointsMesh);

const redHeartCount = redHeartPoints.length;
const redHeartGeo = new THREE.BufferGeometry();
const redHeartCurrentPos = new Float32Array(redHeartCount * 3);
const redHeartTargetPos = new Float32Array(redHeartCount * 3);

redHeartPoints.forEach((p, i) => {
    redHeartCurrentPos[i * 3] = p.x + (Math.random() - 0.5) * 15;
    redHeartCurrentPos[i * 3 + 1] = p.y + TEXT_Y_POSITION + (Math.random() - 0.5) * 10;
    redHeartCurrentPos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 5;

    redHeartTargetPos[i * 3] = p.x;
    redHeartTargetPos[i * 3 + 1] = p.y + TEXT_Y_POSITION;
    redHeartTargetPos[i * 3 + 2] = p.z;
});

redHeartGeo.setAttribute('position', new THREE.BufferAttribute(redHeartCurrentPos, 3));
const redHeartMat = new THREE.PointsMaterial({
    size: 0.38,
    map: redGlowTexture,
    color: 0xff1e3c,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const redHeartMesh = new THREE.Points(redHeartGeo, redHeartMat);
scene.add(redHeartMesh);

// --- 5. CÍRCULOS DE FOTOS EN ÓRBITA CON ETIQUETAS ---
const textureLoader = new THREE.TextureLoader();
const clickableObjects = [];
const labelMeshes = [];
const circleGeo = new THREE.CircleGeometry(1.8, 32);

recuerdos.forEach((item, index) => {
    const angle = (index / recuerdos.length) * Math.PI * 2;
    const radius = 13.5;

    const texture = textureLoader.load(item.foto);
    const circleMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0 });
    const photoMesh = new THREE.Mesh(circleGeo, circleMat);

    photoMesh.position.x = Math.cos(angle) * radius;
    photoMesh.position.z = Math.sin(angle) * radius;
    photoMesh.position.y = 0;

    photoMesh.userData = item;
    mainGroup.add(photoMesh);
    clickableObjects.push(photoMesh);

    const labelTexture = createTextLabelTexture(item.etiqueta);
    const labelMat = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, opacity: 0, depthWrite: false });
    const labelGeo = new THREE.PlaneGeometry(8.5, 2.1);
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);

    labelMesh.position.x = photoMesh.position.x;
    labelMesh.position.z = photoMesh.position.z;
    labelMesh.position.y = photoMesh.position.y - 2.5;

    mainGroup.add(labelMesh);
    labelMeshes.push(labelMesh);
});

// CLIC EN FOTOS
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects);

    if (intersects.length > 0) {
        const clickedObj = intersects[0].object;
        mostrarModal(clickedObj.userData);
    }
});

function mostrarModal(data) {
    const modalImg = document.getElementById('modal-img');
    modalImg.src = data.foto;

    document.getElementById('modal-title').innerText = data.titulo;
    document.getElementById('modal-text').innerText = data.texto;
    document.getElementById('modal').classList.remove('hidden');
}

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

// --- LÓGICA DE ENTRADA DIRECTA Y VALIDACIÓN DE CLAVE ---
const SECRET_PASSWORD = "150726"; // Clave requerida: 150726
const inputs = document.querySelectorAll('.pin-input');

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, '');
        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

let isAnimationStarted = false;

function validarClave() {
    let currentPass = "";
    inputs.forEach(input => currentPass += input.value);

    const errorMsg = document.getElementById('error-msg');

    if (currentPass === SECRET_PASSWORD) {
        if (errorMsg) errorMsg.classList.add('hidden');
        document.getElementById('step-1-card').classList.add('hidden');
        document.getElementById('step-2-card').classList.remove('hidden');
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
        inputs.forEach(input => {
            input.style.borderColor = "#ff4d4d";
        });
        setTimeout(() => {
            inputs.forEach(input => {
                input.style.borderColor = "rgba(255, 215, 0, 0.4)";
            });
        }, 1500);
    }
}

document.getElementById('start-btn').addEventListener('click', validarClave);

// EVENTO EN EL BOTÓN "CONTINUAR AL UNIVERSO"
document.getElementById('continue-btn').addEventListener('click', () => {
    iniciarAnimacion();
});

function iniciarAnimacion() {
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.classList.add('hidden');
    }

    // --- ACTIVACIÓN DE MÚSICA MP3 ---
    const music = document.getElementById('bg-music');
    if (music) {
        music.currentTime = 0; // Inicia desde el segundo 0
        music.play().catch(error => {
            console.log("Error de reproducción de audio:", error);
        });
    }

    // ANIMACIÓN DE CÁMARA
    new TWEEN.Tween(camera.position)
        .to({ x: 0, y: 10, z: 35 }, 4500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
            if (camera.position.z < 70) {
                galaxyMat.opacity = Math.min(1, (70 - camera.position.z) / 30);
            }
        })
        .onComplete(() => {
            controls.enabled = true;
            heartMat.opacity = 1;
            textMat.opacity = 1;
            redHeartMat.opacity = 1;
            isAnimationStarted = true;

            clickableObjects.forEach((photo, idx) => {
                setTimeout(() => {
                    new TWEEN.Tween(photo.material)
                        .to({ opacity: 1 }, 1000)
                        .start();

                    new TWEEN.Tween(labelMeshes[idx].material)
                        .to({ opacity: 1 }, 1000)
                        .start();
                }, idx * 180);
            });
        })
        .start();
}

// --- BUCLE DE ANIMACIÓN ---
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();

    const elapsedTime = clock.getElapsedTime();

    starTunnel.rotation.z += 0.0012;
    floatingHearts.rotation.z -= 0.0008;
    mainGroup.rotation.y += 0.0012;

    if (isAnimationStarted) {
        const heartPos = heartGeo.attributes.position.array;
        for (let i = 0; i < heartParticleCount; i++) {
            const idx = i * 3;
            heartPos[idx] += (heartTargetPos[idx] - heartPos[idx]) * 0.035;
            heartPos[idx + 1] += (heartTargetPos[idx + 1] - heartPos[idx + 1]) * 0.035;
            heartPos[idx + 2] += (heartTargetPos[idx + 2] - heartPos[idx + 2]) * 0.035;
        }
        heartGeo.attributes.position.needsUpdate = true;

        const textPos = textGeo.attributes.position.array;
        for (let i = 0; i < textParticleCount; i++) {
            const idx = i * 3;
            textPos[idx] += (textTargetPos[idx] - textPos[idx]) * 0.025;
            textPos[idx + 1] += (textTargetPos[idx + 1] - textPos[idx + 1]) * 0.025;
            textPos[idx + 2] += (textTargetPos[idx + 2] - textPos[idx + 2]) * 0.025;
        }
        textGeo.attributes.position.needsUpdate = true;

        const redPos = redHeartGeo.attributes.position.array;
        for (let i = 0; i < redHeartCount; i++) {
            const idx = i * 3;
            redPos[idx] += (redHeartTargetPos[idx] - redPos[idx]) * 0.025;
            redPos[idx + 1] += (redHeartTargetPos[idx + 1] - redPos[idx + 1]) * 0.025;
            redPos[idx + 2] += (redHeartTargetPos[idx + 2] - redPos[idx + 2]) * 0.025;
        }
        redHeartGeo.attributes.position.needsUpdate = true;
    }

    const beat = 1 + Math.sin(elapsedTime * 3.5) * 0.04;
    heartMesh.scale.set(beat, beat, beat);

    const miniBeat = 1 + Math.sin(elapsedTime * 4.0) * 0.06;
    redHeartMesh.scale.set(miniBeat, miniBeat, miniBeat);

    clickableObjects.forEach(obj => obj.lookAt(camera.position));
    labelMeshes.forEach(label => label.lookAt(camera.position));

    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// Ініціалізація сцени та камери
const container = document.getElementById('car-3d-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 1.5, 7.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
container.appendChild(renderer.domElement);

// Реалістичне фото-освітлення
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
mainLight.position.set(5, 10, 7);
scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0x00ff66, 1.0);
fillLight.position.set(-5, -2, -5);
scene.add(fillLight);

let carModel = null;
let wheels = [];

// Завантаження фотореалістичної 3D-моделі авто через надійний CDN
const loader = new THREE.GLTFLoader();
loader.load(
    'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/SportsCar/glTF-Binary/SportsCar.glb',
    (gltf) => {
        carModel = gltf.scene;
        carModel.scale.set(1.1, 1.1, 1.1);
        carModel.position.set(-8, -0.9, 0);
        carModel.rotation.y = Math.PI / 2; // Поворот боком до камери

        // Знаходимо всі 4 колеса всередині 3D-ієрархії моделі
        carModel.traverse((child) => {
            if (child.isMesh && (child.name.toLowerCase().includes('wheel') || child.name.toLowerCase().includes('tire'))) {
                wheels.push(child);
            }
        });

        scene.add(carModel);
        animate();
    },
    undefined,
    (error) => {
        console.error('Помилка завантаження 3D моделі:', error);
    }
);

// Цикл анімації
function animate() {
    requestAnimationFrame(animate);

    if (carModel) {
        // Рух машини вперед по осі X
        carModel.position.x += 0.035;

        // Фізично правильне обертання коліс навколо власної осі качення (rotation.x)
        wheels.forEach(wheel => {
            wheel.rotation.x += 0.08;
        });

        // Плавна циклічність (повернення на початок)
        if (carModel.position.x > 8) {
            carModel.position.x = -8;
        }
    }

    renderer.render(scene, camera);
}

// Адаптивність під екрани
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
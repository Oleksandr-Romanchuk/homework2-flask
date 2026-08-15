// Ініціалізація баз Three.js: Сцена, Камера, Рендерер
const container = document.getElementById('car-3d-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Освітлення 3D-сцени (Неонові та точкові джерела)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0x00ff66, 2.5);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const blueLight = new THREE.DirectionalLight(0x0088ff, 1.5);
blueLight.position.set(-5, -2, -5);
scene.add(blueLight);

let carModel = null;
let wheels = [];

// Завантаження фотореалістичної 3D-моделі авто
const loader = new THREE.GLTFLoader();
// Використовуємо оптимізовану 3D-модель спорткара білого кольору
loader.load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SportsCar/glTF-Binary/SportsCar.glb', (gltf) => {
    carModel = gltf.scene;
    carModel.scale.set(1.2, 1.2, 1.2);
    carModel.position.set(-10, -0.8, 0); // Початкова позиція за межами екрана ліворуч
    carModel.rotation.y = Math.PI / 2;    // Поворот боком до глядача

    // Пошук та виокремлення коліс у структурі 3D-моделі для анімації
    carModel.traverse((child) => {
        if (child.isMesh && child.name.toLowerCase().includes('wheel')) {
            wheels.push(child);
        }
    });

    scene.add(carModel);
    animate();
});

// Головний цикл анімації руху та кручення коліс
function animate() {
    requestAnimationFrame(animate);

    if (carModel) {
        // Плавно переміщуємо автомобіль зліва направо через увесь екран
        carModel.position.x += 0.04;

        // Обертаємо колеса відповідно до швидкості руху
        wheels.forEach(wheel => {
            wheel.rotation.x += 0.1;
        });

        // Якщо машина виїхала за праву межу екрана — повертаємо її на початок
        if (carModel.position.x > 10) {
            carModel.position.x = -10;
        }
    }

    renderer.render(scene, camera);
}

// Адаптивність при зміні розміру вікна браузера
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
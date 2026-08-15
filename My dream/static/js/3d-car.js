// Отримання контейнера та ініціалізація 3D-сцени
const container = document.getElementById('car-3d-container');
const scene = new THREE.Scene();

// Налаштування камери
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 7);

// Налаштування рендерера
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Освітлення
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0x00ff66, 2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
frontLight.position.set(-5, 5, 5);
scene.add(frontLight);

// Створення групового об'єкта "АВТОМОБІЛЬ"
const carGroup = new THREE.Group();

// 1. Кузов авто (Білий глянець)
const bodyGeometry = new THREE.BoxGeometry(3.2, 0.7, 1.5);
const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xf0f0f0, shininess: 100 });
const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
carBody.position.y = 0.5;
carGroup.add(carBody);

// 2. Кабіна/Дах (Тоноване скло)
const cabinGeometry = new THREE.BoxGeometry(1.6, 0.5, 1.3);
const cabinMaterial = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 90 });
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.position.set(-0.2, 1.0, 0);
carGroup.add(cabin);

// 3. Створення 4 коліс з дисками
const wheels = [];
const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 24);
const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
const rimMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff66 }); // Зелений неоновий диск

const wheelPositions = [
    { x: -1.0, y: 0.35, z: 0.75 },
    { x: 1.0, y: 0.35, z: 0.75 },
    { x: -1.0, y: 0.35, z: -0.75 },
    { x: 1.0, y: 0.35, z: -0.75 }
];

wheelPositions.forEach(pos => {
    const wheelMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);

    // Візуальна позначка на колесі, щоб було чітко видно обертання
    const rim = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.32, 0.32), rimMaterial);
    wheelMesh.add(rim);

    wheelMesh.rotation.z = Math.PI / 2;
    wheelMesh.position.set(pos.x, pos.y, pos.z);

    carGroup.add(wheelMesh);
    wheels.push(wheelMesh);
});

// Початкова позиція автомобіля
carGroup.position.set(-6, -0.5, 0);
carGroup.rotation.y = Math.PI / 2; // Поворот боком
scene.add(carGroup);

// Анімація руху та обертання коліс
function animate() {
    requestAnimationFrame(animate);

    // Автомобіль їде праворуч
    carGroup.position.x += 0.03;

    // Обертаємо колеса навколо власної осі
    wheels.forEach(wheel => {
        wheel.rotation.y += 0.1;
    });

    // Повернення машини на початок після виїзду за екран
    if (carGroup.position.x > 6) {
        carGroup.position.x = -6;
    }

    renderer.render(scene, camera);
}

animate();

// Адаптивність при зміні розміру екрана
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
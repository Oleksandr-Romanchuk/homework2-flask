const container = document.getElementById('car-3d-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0x00ff66, 2.5);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

let carModel = null;
let wheels = [];

const loader = new THREE.GLTFLoader();
loader.load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SportsCar/glTF-Binary/SportsCar.glb', (gltf) => {
    carModel = gltf.scene;
    carModel.scale.set(1.2, 1.2, 1.2);
    carModel.position.set(-10, -0.8, 0);
    carModel.rotation.y = Math.PI / 2;

    carModel.traverse((child) => {
        if (child.isMesh && child.name.toLowerCase().includes('wheel')) {
            wheels.push(child);
        }
    });

    scene.add(carModel);
    animate();
});

function animate() {
    requestAnimationFrame(animate);

    if (carModel) {
        carModel.position.x += 0.04;
        wheels.forEach(wheel => wheel.rotation.x += 0.1);

        if (carModel.position.x > 10) {
            carModel.position.x = -10;
        }
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
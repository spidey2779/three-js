import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();
group.position.set(-.5, 0, 0);
group.rotation.set(0,Math.PI * 0.5,Math.PI *0)
scene.add(group);
/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 2;
// mesh.rotation.reorder("YZX");
// // mesh.rotation.reorder("XYZ");
// mesh.rotation.y = Math.PI * 0.2;
// mesh.rotation.x = Math.PI * 0.2;
// mesh.scale.set(2, 0.5, 0.5);
// mesh.position.set(0.7, -0.6, 1);
// scene.add(mesh);
// mesh.position.normalize();
// console.log(mesh.position.length());

const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 0.8, 0.8),
  new THREE.MeshBasicMaterial({ color: "red" })
);
box1.position.set(-1.3, 0, 0);
group.add(box1);

const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 0.8, 0.8),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
group.add(box2);

const box3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 0.8, 0.8),
  new THREE.MeshBasicMaterial({ color: "greenyellow" })
);
box3.position.set(1.3, 0, 0);

group.add(box3);
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3;
camera.position.set(0, 0, 3);
scene.add(camera);

// camera.lookAt(new THREE.Vector3(1, 0, 0))

// const axisHelper = new THREE.AxesHelper();
// scene.add(axisHelper);
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

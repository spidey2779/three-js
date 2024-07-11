import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
//canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();
const sizes = {
  width: 800,
  height: 600,
};
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: "#33d0ff" })
);

scene.add(mesh);
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 2);
camera.lookAt(mesh.position);
scene.add(camera);

const controls=new OrbitControls(camera,canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

//render using clock
const clock = new THREE.Clock();
const cursor = {
  x: 0,
  y: 0,
};
// window.addEventListener("mousemove", (e) => {
//   cursor.x = e.clientX / sizes.width - 0.5;
//   cursor.y = -1 * (e.clientY / sizes.height - 0.5);
// });
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // mesh.rotation.y = elapsedTime;

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2 ;
  // camera.position.z= Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position)
  controls.update()
  //renderer
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

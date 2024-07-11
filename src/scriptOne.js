import * as THREE from "three";
import gsap from "gsap";
//canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();
const sizes = {
  width: 800,
  height: 600,
};
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#33d0ff" })
);

scene.add(mesh);
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 3);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

//renderer using time

// let time = Date.now();
// const tick = () => {
//   let currentTime = Date.now();
//   const delta = currentTime - time;
//   time = currentTime;
//   mesh.rotation.y+= delta * 0.001;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

//render using clock
const clock = new THREE.Clock();
gsap.from(mesh.position, {
  x: 1,
  duration: 1,
  delay: 0.5,
  repeat:Infinity,
  ease:"linear",
  yoyo: true
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime;
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

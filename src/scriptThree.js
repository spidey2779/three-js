import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
//canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();
window.addEventListener('dblclick',()=>{
  if(!document.fullscreenElement){
    canvas.requestFullscreen()
  }
  else{
    document.exitFullscreen();
  }
})
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#33d0ff" })
);

scene.add(mesh);
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 2);
camera.lookAt(mesh.position);
scene.add(camera);

//contorls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enableDamping = true;

//resizing
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

//renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//render using clock
const clock = new THREE.Clock();
const cursor = {
  x: 0,
  y: 0,
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  //renderer
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

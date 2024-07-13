import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// const gui = new GUI();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
//texture
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcap = textureLoader.load("/textures/matcaps/2.png");
const gradient = textureLoader.load("/textures/gradients/5.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcap.colorSpace = THREE.SRGBColorSpace;
gradient.magFilter = THREE.NearestFilter;
gradient.minFilter = THREE.NearestFilter;

const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (envionmentMap) => {
  envionmentMap.mapping = THREE.EquirectangularReflectionMapping;
  // envionmentMap.mapping = THREE.EquirectangularRefractionMapping;
  scene.background = envionmentMap;
  scene.environment = envionmentMap;
});

// object
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color.set("red");
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap=doorAlphaTexture;
// material.side=THREE.DoubleSide

// const material= new THREE.MeshNormalMaterial()
// material.wireframe = true;
// material.flatShading=true;

// const material = new THREE.MeshMatcapMaterial()
// material.side = THREE.DoubleSide
// material.matcap=matcap

// const material=new THREE.MeshDepthMaterial()

//lights
// const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight("#ffffff", 70);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshToonMaterial();
// material.map=gradient

const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 0;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.alphaMap = doorAlphaTexture;
material.transparent = true;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.01;
material.normalMap = doorNormalTexture;
material.normalScale.x=0.5;
material.normalScale.y=0.5;
material.side=THREE.DoubleSide
// gui.add(material, "roughness").min(0).max(1);
// gui.add(material, "metalness").min(0).max(1);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
scene.add(plane);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
scene.add(sphere);
sphere.position.x = -1.5;
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
scene.add(torus);
torus.position.x = 1.5;

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  plane.rotation.x = elapsedTime * 0.3;
  sphere.rotation.x = elapsedTime * 0.3;
  torus.rotation.x = elapsedTime * 0.3;
  plane.rotation.y = elapsedTime * 0.3;
  sphere.rotation.y = elapsedTime * 0.3;
  torus.rotation.y = elapsedTime * 0.3;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

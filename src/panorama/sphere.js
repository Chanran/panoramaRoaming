import * as THREE from 'three';
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import panoramaImage from '../img/panorama.png';

var camera, controls;
var renderer;
var scene;

init();
animate();

function init() {

	var container = document.getElementById('container');

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 0.01;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.enableDamping = true;
	controls.rotateSpeed = -0.25;

	var texture = new THREE.TextureLoader().load(panoramaImage)
	var	material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });

  var sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 100, 100), material);
	scene.add(sphere);

	window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

	requestAnimationFrame(animate);

	controls.update(); // required when damping is enabled

	renderer.render(scene, camera);

}
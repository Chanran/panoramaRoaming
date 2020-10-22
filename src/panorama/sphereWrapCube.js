import * as THREE from 'three';
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import rightImage from '../img/px.png';
import leftImage from '../img/nx.png';
import upImage from '../img/py.png';
import downImage from '../img/ny.png';
import frontImage from '../img/pz.png';
import backImage from '../img/nz.png';

import panoramaImage from '../img/pano.jpg';

var camera, controls;
var renderer;
var scene;

init();
animate();

function init() {

	var container = document.getElementById('container');

	renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff);
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

	var cubeTextures = new THREE.CubeTextureLoader()
  .load([
    leftImage, // left = nx
    rightImage, // right = px
    downImage, // down = ny
    upImage, // up = py
    frontImage, // front = pz
    backImage, // back = nz
  ]);
	var	cubeMaterial = new THREE.MeshBasicMaterial({
    envMap: cubeTextures,
    side: THREE.BackSide,
  });
  var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), cubeMaterial);
  scene.add(cube);

  // var sphereTexture = new THREE.TextureLoader().load(panoramaImage)
	// var	sphereMaterial = new THREE.MeshBasicMaterial({
  //   map: sphereTexture,
  //   side: THREE.BackSide,
  // });
  // var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(100, 100, 100), sphereMaterial);
	// scene.add(sphere);

  
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
import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import rightImage from '../img/mobile_r.jpg';
import leftImage from '../img/mobile_l.jpg';
import upImage from '../img/mobile_u.jpg';
import downImage from '../img/mobile_d.jpg';
import frontImage from '../img/mobile_f.jpg';
import backImage from '../img/mobile_b.jpg';

export function SceneBackground() {
  const containerRef = useRef(null);

  let camera;
  let controls;
  let renderer;
  let scene;

  const init = function (container) {

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
  
    scene = new THREE.Scene();
  
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 0.01;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = -0.25;
  
    var textures = new THREE.CubeTextureLoader().load([
      rightImage,
      leftImage,
      upImage,
      downImage,
      frontImage,
      backImage,
    ]);
  
    scene.background = textures;
  
    window.addEventListener('resize', onWindowResize, false);
  
  }
  
  const onWindowResize = function() {
  
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  const animate = function() {
  
    requestAnimationFrame(animate);
  
    controls.update(); // required when damping is enabled
  
    renderer.render(scene, camera);
  
  }

  useEffect(() => {
    init(containerRef.current)
    console.log('fuck', containerRef);
    animate();
  }, []);
  
  return (
    <div ref={containerRef} />
  )
}
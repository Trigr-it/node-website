import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export function init3D(){
  const container=document.getElementById('model-container');
  const canvas=document.getElementById('model-canvas');
  const placeholder=document.getElementById('model-placeholder');
  const scene=new THREE.Scene();

  const camera=new THREE.PerspectiveCamera(36,container.clientWidth/container.clientHeight,0.1,1000);
  camera.position.set(3,2.66,3);

  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFShadowMap;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.0;

  const ambient=new THREE.AmbientLight(0xffffff,0.4);
  scene.add(ambient);

  const dirLight=new THREE.DirectionalLight(0xffffff,2.5);
  dirLight.position.set(5,8,4);
  dirLight.castShadow=true;
  dirLight.shadow.mapSize.width=512;
  dirLight.shadow.mapSize.height=512;
  dirLight.shadow.camera.near=0.1;
  dirLight.shadow.camera.far=50;
  dirLight.shadow.camera.left=-10;
  dirLight.shadow.camera.right=10;
  dirLight.shadow.camera.top=10;
  dirLight.shadow.camera.bottom=-10;
  dirLight.shadow.bias=-0.001;
  dirLight.shadow.normalBias=0.02;
  scene.add(dirLight);

  const fillLight=new THREE.DirectionalLight(0xfff0e6,0.6);
  fillLight.position.set(-3,2,-2);
  scene.add(fillLight);

  const controls=new OrbitControls(camera,canvas);
  controls.enableDamping=true;
  controls.dampingFactor=0.05;
  controls.enablePan=false;
  controls.minDistance=2;
  controls.maxDistance=12;
  controls.autoRotate=true;
  controls.autoRotateSpeed=2.0;

  const dracoLoader=new DRACOLoader();
  dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/');
  const gltfLoader=new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  let modelLoaded=false,visible=true,running=false;

  function animate(){
    if(!running) return;
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
  }
  function maybeStart(){
    if(modelLoaded && visible && !running){
      running=true;
      animate();
    }
  }

  gltfLoader.load('/images/Shard Model.glb',function(gltf){
    const model=gltf.scene;
    model.traverse(function(child){
      if(child.isMesh){
        child.castShadow=true;
        child.receiveShadow=true;
      }
    });
    scene.add(model);
    const box=new THREE.Box3().setFromObject(model);
    const center=box.getCenter(new THREE.Vector3());
    const size=box.getSize(new THREE.Vector3());
    const maxDim=Math.max(size.x,size.y,size.z);
    const scale=4/maxDim;
    model.scale.setScalar(scale);
    model.position.sub(center.multiplyScalar(scale));
    dirLight.shadow.camera.left=-size.x*scale;
    dirLight.shadow.camera.right=size.x*scale;
    dirLight.shadow.camera.top=size.y*scale;
    dirLight.shadow.camera.bottom=-size.y*scale;
    dirLight.shadow.camera.updateProjectionMatrix();
    controls.target.set(0,0.56,0);
    controls.update();
    renderer.render(scene,camera);
    if(placeholder) placeholder.style.opacity='0';
    canvas.style.opacity='1';
    modelLoaded=true;
    maybeStart();
  });

  function onResize(){
    const w=container.clientWidth,h=container.clientHeight;
    camera.aspect=w/h;
    camera.updateProjectionMatrix();
    renderer.setSize(w,h);
  }
  window.addEventListener('resize',onResize);

  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(function(entries){
      visible=entries[0].isIntersecting;
      if(visible) maybeStart();
      else running=false;
    },{threshold:0.01});
    io.observe(container);
  }
}

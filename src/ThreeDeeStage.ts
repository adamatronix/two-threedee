import * as THREE from 'three';
import ThreeDeeShape from './ThreeDeeShape';

class ThreeDeeStage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.start();
  }

  start = () => {
    this.setupWorld();
    this.renderFrame();
    
  }

  addShape = (splineArray: object[]) => {
    new ThreeDeeShape(this.scene, splineArray);
  }

  setupWorld = () => {
    this.scene = new THREE.Scene();

    const planeGeometry = new THREE.PlaneGeometry( this.container.offsetWidth, this.container.offsetHeight );
    const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );

    const ground = new THREE.Mesh( planeGeometry, planeMaterial );

    ground.position.set( this.container.offsetWidth/2, -100, (this.container.offsetHeight/2));
    ground.rotation.x -= Math.PI / 2;

    ground.castShadow = false;
    ground.receiveShadow = true;

    this.scene.add( ground );

    //setup the camera
    /*this.camera = new THREE.OrthographicCamera( 0, this.container.offsetWidth, 0, this.container.offsetHeight, 0, 3000 );
    this.camera.position.set(0, 1000, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));*/

    this.camera = new THREE.PerspectiveCamera( 49, this.container.offsetWidth / this.container.offsetHeight, 10, 3000 );
		this.camera.position.set( this.container.offsetWidth/2, 1000, (this.container.offsetHeight/2));
    this.camera.lookAt(new THREE.Vector3(this.container.offsetWidth/2, 0, this.container.offsetHeight/2));

    const ambient = new THREE.AmbientLight( 0x444444 );
	  this.scene.add( ambient );

    const light = new THREE.PointLight( 0xffffff, 0.8);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 3000;
    light.shadow.mapSize.width = 2024;
    light.shadow.mapSize.height = 2024;
    // move the light back and up a bit
    light.position.set( this.container.offsetWidth / 2, 500, this.container.offsetHeight );
    this.scene.add(light);

    const light2 = new THREE.PointLight( 0xffffff, 0.2);
    light2.castShadow = true;
    light2.shadow.camera.near = 0.1;
    light2.shadow.camera.far = 3000;
    light2.shadow.mapSize.width = 2024;
    light2.shadow.mapSize.height = 2024;
    // move the light back and up a bit
    light2.position.set( this.container.offsetWidth, 1000, 0);
    this.scene.add(light2);
    //setup renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
    this.container.appendChild( this.renderer.domElement );
  }

  renderFrame = () => {
    this.renderer.clear();
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.renderFrame);
  }

}

export default ThreeDeeStage
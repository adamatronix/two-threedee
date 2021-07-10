import * as THREE from 'three';

class ThreeDeeStage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  constructor() {
    this.start();
  }

  start = () => {
    this.setupWorld();
    this.renderFrame();
  }

  setupWorld = () => {
    this.scene = new THREE.Scene();

    //setup the camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 5000);
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    //setup renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor( 0xffffff, 0 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }

  renderFrame = () => {
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.renderFrame);
  }

}

export default ThreeDeeStage
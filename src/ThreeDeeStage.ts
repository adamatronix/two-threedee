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

    //setup the camera
    this.camera = new THREE.PerspectiveCamera(60, this.container.offsetWidth / this.container.offsetHeight, 0.2, 5000);
    this.camera.position.set(1000, 1000, 1000);
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    //setup renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor( 0xffffff, 0 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
    this.container.appendChild( this.renderer.domElement );
  }

  renderFrame = () => {
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.renderFrame);
  }

}

export default ThreeDeeStage
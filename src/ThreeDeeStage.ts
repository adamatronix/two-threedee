import * as THREE from 'three';
import ThreeDeeShape from './ThreeDeeShape';

class ThreeDeeStage {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
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

    const geometry = new THREE.SphereGeometry( 50, 10, 10 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const sphere = new THREE.Mesh( geometry, material );
    this.scene.add( sphere );

    //setup the camera
    this.camera = new THREE.OrthographicCamera( 0, this.container.offsetWidth, 0, this.container.offsetHeight, 0, 3000 );
    this.camera.position.set(0, 2900, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    const light = new THREE.PointLight( 0xffffff, 2 );
    light.position.set( 0, 3000, 0 );
    light.castShadow = true;
    this.scene.add( light );

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
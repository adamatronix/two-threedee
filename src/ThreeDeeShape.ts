import * as THREE from 'three';

class ThreeDeeShape { 
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.createShape();
  }

  createShape = () => {
    const length = 12, width = 8;

    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
      steps: 2,
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1
    };
    
    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    const mesh = new THREE.Mesh( geometry, material ) ;
    this.scene.add( mesh );

  }
}

export default ThreeDeeShape;
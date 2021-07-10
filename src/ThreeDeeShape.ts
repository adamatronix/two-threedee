import * as THREE from 'three';

class ThreeDeeShape { 
  scene: THREE.Scene;

  constructor(scene: THREE.Scene, splineArray: object[]) {
    this.scene = scene;
    this.createShape(splineArray);
  }

  createShape = (splineArray: any[]) => {

    const shape = new THREE.Shape();

    splineArray.forEach((point,i) => {
      if(i === 0) {
        shape.moveTo( point.x, point.y );
      } else {
        shape.lineTo( point.x, point.y );
      }
    });

    const extrudeSettings = {
      steps: 10,
      depth: 16,
    };
    
    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    const mesh = new THREE.Mesh( geometry, material ) ;
    this.scene.add( mesh );

  }
}

export default ThreeDeeShape;
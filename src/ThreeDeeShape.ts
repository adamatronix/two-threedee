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
        shape.moveTo( point.x, -1 * point.y );
      } else {
        shape.lineTo( point.x, -1 * point.y );
      }
    });

    const extrudeSettings = {
      steps: 10,
      depth: 100,
    };
    
    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings ); 
    const cubeMat = new THREE.MeshPhongMaterial({color: '#CCC'});
    const mesh = new THREE.Mesh( geometry, cubeMat ) ;
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = 2000;

    this.scene.add( mesh );

  }
}

export default ThreeDeeShape;
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
      depth: 400,
    };
    
    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings ); 
    const cubeMat = new THREE.MeshPhongMaterial({color: '#FFF'});
    const mesh = new THREE.Mesh( geometry, cubeMat ) ;
    this.scene.add( mesh );

  }
}

export default ThreeDeeShape;
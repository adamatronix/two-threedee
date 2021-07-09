import * as P5 from 'p5';

class TwoThreeDee {
  container: HTMLDivElement;

  // Normal signature with defaults
  constructor(container: HTMLDivElement) {
    this.container = container;

    new P5(this.sketch);

  }

  sketch = (p5: P5) => {

    // The sketch setup method 
    p5.setup = () => {
      // Creating and positioning the canvas
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      // Configuring the canvas
      p5.background("white");
    };
  
    // The sketch draw method
    p5.draw = () => {
   
    };
  };
}

export { TwoThreeDee };
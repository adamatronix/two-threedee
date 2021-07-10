import * as P5 from 'p5';
import Shape from './Shape';

interface LooseObject {
  [key: string]: any
}

class TwoThreeDee {
  container: HTMLDivElement;
  currentShape: LooseObject;

  // Normal signature with defaults
  constructor(container: HTMLDivElement) {
    this.container = container;

    new P5(this.sketch);

  }

  sketch = (p5: P5) => {
    const self = this;

    // The sketch setup method 
    p5.setup = () => {
      // Creating and positioning the canvas
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      // Configuring the canvas
      p5.background("white");
      self.currentShape = null;
    };
  
    // The sketch draw method
    p5.draw = function () {
      p5.clear();
      if(self.currentShape) {
        self.currentShape.draw();
      }
   
    };

    p5.mousePressed = function () {
      self.currentShape = new Shape(p5, {x: p5.mouseX, y: p5.mouseY})
    }
  
    p5.mouseReleased = function() {
    

    }
  
    p5.mouseDragged = function() {
      self.currentShape.addPoint({x: p5.mouseX, y: p5.mouseY});
    }
  };
}

export { TwoThreeDee };
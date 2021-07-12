import * as P5 from 'p5';
import Shape from './Shape';
import ThreeDeeStage from './ThreeDeeStage';

interface LooseObject {
  [key: string]: any
}

interface PointObject {
  x: number,
  y: number
}

class TwoThreeDee {
  container: HTMLDivElement;
  currentShape: LooseObject;
  cachedPoint: PointObject;
  steps: number;
  stage: ThreeDeeStage;

  // Normal signature with defaults
  constructor(container: HTMLDivElement, steps?: number) {
    this.container = container;
    this.steps = steps || 0;

    this.stage = new ThreeDeeStage(this.container);
    new P5(this.sketch);

  }

  sketch = (p5: P5) => {
    const self = this;

    // The sketch setup method 
    p5.setup = () => {
      // Creating and positioning the canvas
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      canvas.style('position', 'absolute');
      canvas.style('left', 0);
      canvas.style('top', 0);
      canvas.style('z-index', 1);
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
      const firstPoint = { x: p5.mouseX, y: p5.mouseY };
      self.cachedPoint = firstPoint;
      self.currentShape = new Shape(p5, firstPoint)
    }
  
    p5.mouseReleased = function() {
      self.stage.addShape(self.currentShape.points);
      self.currentShape = null;
    }
  
    p5.mouseDragged = function() {
      const currentPoint = {x: p5.mouseX, y: p5.mouseY};
      const distance = self.distanceBetweenTwoPoints(self.cachedPoint, currentPoint);

      if(distance.dist > self.steps) {
        self.currentShape.addPoint(currentPoint);
        self.cachedPoint = currentPoint;
      }
      
    }
  };

  distanceBetweenTwoPoints = (p1: PointObject, p2: PointObject) => {
    const xDist = p2.x - p1.x;
    const yDist = p2.y - p1.y;
    const distance = Math.sqrt(xDist * xDist + yDist * yDist);
    return {
        xDist: xDist,
        yDist: yDist,
        dist: distance
    };
  }
}

export { TwoThreeDee };
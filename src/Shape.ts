import P5 from 'p5';

interface PointObject {
  x: number,
  y: number
}

class Shape {
  _p5: P5;
  points: any[];

  // Normal signature with defaults
  constructor(p5: P5, point: PointObject) {
    this._p5 = p5;
    this.points = [];
    this.addPoint(point);
    // On instantiation we must get the inital point to start the shape
  }

  addPoint = (point: PointObject) => {
    this.points.push(point);
  }

  draw = () => {
    const p5 = this._p5;
    const self = this;
    const c = p5.color(65);

    p5.fill(c);
    p5.noStroke();
    p5.beginShape();
    this.points.forEach((point,i) => {
      p5.vertex(point.x, point.y);
      /*if(i - 1 >= 0) {
        p5.line(self.points[i-1].x, self.points[i-1].y, point.x, point.y);
      }*/
    });
    p5.endShape(p5.CLOSE);
  }

}

export default Shape ;
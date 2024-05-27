'use client';
// p5js particle system that uses a blurred image as the particle color
// The particles behave like smoke and can be interacted with the mouse (like a wind effect)

import { P5CanvasInstance, ReactP5Wrapper, Sketch } from '@p5-wrapper/react';
import { Color, Vector } from 'p5';
import { useEffect, useRef, useState } from 'react';

type Particle = {
  originPosition: Vector;
  position: Vector;
  velocity: Vector;
  color: Color;
  timeToLive: number;
};

type MouseEvent = {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
  layerX: number;
  layerY: number;
  movementX: number;
  movementY: number;
};

const sketch: Sketch = (p5: P5CanvasInstance) => {
  const particles: Particle[] = [];
  p5.disableFriendlyErrors = true; // disables FES

  const width = 500;
  const height = 500;
  const imgWidth = 300;
  const imgHeight = 300;
  const ttl = () => p5.random(2000, 5000);
  const randomVelocity = () =>
    p5.createVector(p5.random(0, 15), p5.random(0, 15));
  let blurPosition = p5.createVector(0, 0);
  let canvasPosition = p5.createVector(0, 0);
  let offset = p5.createVector(0, 0);
  let imageOffset = p5.createVector(0, 0);
  let halfDimensions = p5.createVector(0, 0);

  let step = 0;
  let fpsIntegral = 0;
  let lastError = 0;
  let disabledParticles = Math.floor(particles.length / 2);
  const Kp = 8;
  const Ki = 3;
  const Kd = 1;
  const targetFPS = 30;

  p5.setup = () => {
    p5.frameRate(120);
    p5.createCanvas(
      document.body.clientWidth,
      document.body.clientHeight,
      p5.WEBGL,
    );
    halfDimensions = p5.createVector(p5.width / 2, p5.height / 2);
    p5.loadImage('/me.webp', img => {
      img.loadPixels();
      img.resize(width, height);
      img.filter(p5.BLUR, 16);
      for (let x = 0; x < img.width; x += 1) {
        for (let y = 0; y < img.height; y += 1) {
          // skip if pixel is in radius of img.width/2 - 15
          if (
            p5.dist(x, y, img.width / 2, img.height / 2) < img.width / 2 - 15 || // inner circle
            p5.dist(x, y, img.width / 2, img.height / 2) > img.width / 2 + 15 // outer circle
          ) {
            continue;
          }
          const color = img.get(x, y);
          // skip if pixel is too dark
          if (color[0] < 30 && color[1] < 30 && color[1] < 30) {
            continue;
          }
          const position = p5.createVector(
            p5.map(x, 0, img.width, -imgWidth / 2, imgWidth / 2),
            p5.map(y, 0, img.height, -imgHeight / 2, imgHeight / 2),
          );
          const velocity = position.copy().normalize().mult(randomVelocity());
          particles.push({
            originPosition: position.copy(),
            position,
            velocity,
            color: p5.color(color),
            timeToLive: ttl(),
          });
        }
      }
      // sort the particles according to their distance from the center
      particles.sort(
        (a, b) =>
          p5.dist(a.position.x, a.position.y, 0, 0) -
          p5.dist(b.position.x, b.position.y, 0, 0),
      );
    });
    p5.noStroke();
  };

  p5.mouseMoved = (event: MouseEvent) => {
    const delta = p5.deltaTime / 1000;
    const position = p5
      .createVector(event.clientX, event.clientY)
      .sub(offset)
      .sub(halfDimensions);
    const velocity = p5.createVector(event.movementX, event.movementY);
    for (const [index, particle] of particles.entries()) {
      if (isDisabled(index)) continue;
      const distance = p5.dist(
        particle.position.x,
        particle.position.y,
        position.x,
        position.y,
      );
      if (distance > 100) {
        continue;
      }
      const force = velocity
        .copy()
        .normalize()
        .mult(1200 / (distance + 1))
        .mult(delta);
      particle.velocity.add(force);
    }
  };

  p5.updateWithProps = (newProps: any) => {
    blurPosition = p5.createVector(
      newProps.blurPosition.x,
      newProps.blurPosition.y,
    );
    // .div(2)
    canvasPosition = p5.createVector(
      newProps.canvasPosition.x,
      newProps.canvasPosition.y,
    );
    offset = blurPosition.copy().sub(halfDimensions);
    imageOffset = offset.copy().sub(canvasPosition);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(document.body.clientWidth, document.body.clientHeight);
    halfDimensions = p5.createVector(p5.width / 2, p5.height / 2);
    offset = blurPosition.copy().sub(halfDimensions);
    imageOffset = offset.copy().sub(canvasPosition);
  };

  // arrays to store the FPS, error, integral and derivative values
  // const histories = {
  //   fps: [] as number[],
  //   error: [] as number[],
  // };

  // const historyColors = [
  //   p5.color(0, 0, 255), // blue
  //   p5.color(255, 0, 0), // green
  // ];

  // function to determine if index is disabled based on the number of disabled particles and the number of particles
  const isDisabled = (index: number) => {
    return index < disabledParticles;
  };

  let lastFps = 0;
  p5.draw = () => {
    const delta = p5.deltaTime / 1000;
    const fps = p5.frameRate();
    // console.debug('FPS: ', fps.toFixed(2));
    // disable a number of particles based on the difference between the current FPS and 30
    // use a pid controller to adjust the number of particles
    // https://en.wikipedia.org/wiki/PID_controller
    const error = targetFPS - (fps + lastFps) / 2; // the error is the difference between the target FPS and the current FPS
    lastFps = fps;
    fpsIntegral += error * delta; // the integral is the sum of the errors over time
    const derivative = (error - lastError) / delta; // the derivative is the rate of change of the error
    lastError = error;
    const output = Kp * error + Ki * fpsIntegral + Kd * derivative;
    disabledParticles += output;
    disabledParticles = Math.max(0, disabledParticles);

    // console.debug(
    //   'FPS: ' + fpsMovingAverage.toFixed(2),
    //   'Error: ' + error.toFixed(2),
    //   'Integral: ' + fpsIntegral.toFixed(2),
    //   'Derivative: ' + derivative.toFixed(2),
    //   'Output: ' + output.toFixed(2),
    //   'Disabled particles: ' + disabledParticles.toFixed(2),
    //   'Particles: ' + particles.length.toFixed(2),
    // );

    // histories.fps.push(
    //   p5.map(fpsMovingAverage, targetFPS - 10, targetFPS + 10, -100, 100),
    // );
    // histories.error.push(error);
    // if (histories.fps.length > 800) {
    //   histories.fps.shift();
    //   histories.error.shift();
    // }
    p5.background(0, 0);

    // // draw the histories autoscale
    // for (const history of Object.values(histories)) {
    //   // draw the history as a line each has own color
    //   p5.stroke(historyColors[Object.values(histories).indexOf(history)]);
    //   p5.beginShape(p5.LINE_STRIP);
    //   for (const [index, value] of history.entries()) {
    //     p5.vertex(-200 + index * 2, -value * 2);
    //   }
    //   p5.endShape();
    // }
    // p5.noStroke();
    // p5.stroke(0, 255, 0);
    // // target FPS line
    // p5.line(-200, 0, 600, 0);
    // p5.noStroke();
    for (const [index, particle] of particles.entries()) {
      if (isDisabled(index)) continue;
      particle.timeToLive -= p5.deltaTime;
      if (particle.timeToLive <= 0) {
        particle.position = particle.originPosition.copy();
        particle.velocity = particle.position
          .copy()
          .normalize()
          .mult(randomVelocity());
        particle.timeToLive = ttl();
      }
      // air resistance
      particle.velocity.mult(1 - 0.01 * delta);

      // random angle change
      step += 0.01;
      particle.velocity.rotate(p5.noise(step) * delta * 0.1);

      p5.fill(particle.color);

      const position = imageOffset.copy().add(particle.position);
      p5.circle(position.x, position.y, 1);
      particle.position.add(particle.velocity.copy().mult(delta));
    }
  };
};

export default function Blur({
  className,
  blurPosition,
}: {
  className?: string;
  blurPosition?: { x: number; y: number };
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCanvasPosition = () => {
      // console.debug(
      //   'updateCanvasPosition',
      //   canvasRef.current?.getBoundingClientRect().x,
      //   canvasRef.current?.getBoundingClientRect().y,
      // );
      setCanvasPosition({
        x: canvasRef.current?.getBoundingClientRect().x || 0,
        y: canvasRef.current?.getBoundingClientRect().y || 0,
      });
    };
    window.addEventListener('scroll', updateCanvasPosition);
    window.addEventListener('resize', updateCanvasPosition);
    updateCanvasPosition();
    return () => {
      window.removeEventListener('scroll', updateCanvasPosition);
      window.removeEventListener('resize', updateCanvasPosition);
    };
  }, [canvasRef]);

  return (
    <div ref={canvasRef} className={className}>
      <ReactP5Wrapper
        sketch={sketch}
        blurPosition={blurPosition}
        canvasPosition={canvasPosition}
      />
    </div>
  );
}

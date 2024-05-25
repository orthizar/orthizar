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

  const width = 300;
  const height = 300;
  const ttl = () => p5.random(2000, 5000);
  let blurPosition = p5.createVector(0, 0);
  let canvasPosition = p5.createVector(0, 0);
  let offset = p5.createVector(0, 0);
  let imageOffset = p5.createVector(0, 0);
  let halfDimensions = p5.createVector(0, 0);

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    halfDimensions = p5.createVector(p5.width / 2, p5.height / 2);
    p5.loadImage('/me.webp', img => {
      img.loadPixels();
      img.resize(width, height);
      img.filter(p5.BLUR, 15);
      for (let x = 0; x < img.width; x += 1) {
        for (let y = 0; y < img.height; y += 1) {
          // skip if pixel is in radius of img.width/2
          if (
            p5.dist(x, y, img.width / 2, img.height / 2) < img.width / 2 || // inner circle
            p5.dist(x, y, img.width / 2, img.height / 2) > img.width / 2 + 40 // outer circle
          ) {
            continue;
          }
          const color = p5.color(img.get(x, y));
          const position = p5.createVector(
            p5.map(x, 0, img.width, -width / 2, width / 2),
            p5.map(y, 0, img.height, -height / 2, height / 2),
          );
          const velocity = position
            .copy()
            .normalize()
            .mult(p5.createVector(p5.random(0, 10), p5.random(0, 10)));
          particles.push({
            originPosition: position.copy(),
            position,
            velocity,
            color,
            timeToLive: ttl(),
          });
        }
      }
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
    for (const particle of particles) {
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
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
    halfDimensions = p5.createVector(p5.width / 2, p5.height / 2);
    offset = blurPosition.copy().sub(halfDimensions);
    imageOffset = offset.copy().sub(canvasPosition);
  };

  p5.draw = () => {
    const delta = p5.deltaTime / 1000;
    // const fps = p5.frameRate();
    // console.log('FPS: ' + fps.toFixed(2));
    p5.background(0, 0);
    for (const particle of particles) {
      particle.timeToLive -= p5.deltaTime;
      if (particle.timeToLive <= 0) {
        particle.position = particle.originPosition.copy();
        particle.velocity = particle.position
          .copy()
          .normalize()
          .mult(p5.createVector(p5.random(0, 10), p5.random(0, 10)));
        particle.timeToLive = ttl();
      }
      // air resistance
      particle.velocity.mult(1 - 0.01 * delta);

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
      setCanvasPosition({
        x: canvasRef.current?.getBoundingClientRect().x || 0,
        y: canvasRef.current?.getBoundingClientRect().y || 0,
      });
    };
    window.addEventListener('scroll', updateCanvasPosition);
    window.addEventListener('resize', updateCanvasPosition);
    updateCanvasPosition();
    return () => {
      // window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('scroll', updateCanvasPosition);
      window.removeEventListener('resize', updateCanvasPosition);
    };
  }, []);

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

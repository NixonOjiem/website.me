"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { SplitText } from "gsap/SplitText"; // Added SplitText import

interface StageSize {
  w: number;
  h: number;
}

interface SpawnParticleProps {
  className: string;
  cssVars?: Record<string, string>;
  text?: string;
  startX: number;
  startY: number;
  scale?: number;
  duration: number;
  delay?: number;
  velocity: number;
  angle: number;
  gravity: number;
}

const CreatureStates = {
  spawning: "spawning",
  idle: "idle",
  pulling: "pulling",
  dragging: "dragging",
  dropping: "dropping",
  leaving: "leaving",
} as const;

type CreatureStateTypes = keyof typeof CreatureStates;

interface CreatureGroupProps {
  color?: string;
  size?: string;
  leg?: string;
}

function HeroSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const instructionRef = useRef<HTMLParagraphElement>(null); // Ref for instruction text

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin, Physics2DPlugin, SplitText);

    const $stage = stageRef.current;
    if (!$stage) return;

    const stageSize: StageSize = {
      w: $stage.clientWidth,
      h: $stage.clientHeight,
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      stageSize.w = Math.round(width);
      stageSize.h = Math.round(height);
    });

    resizeObserver.observe($stage);

    const distance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const length = (x: number, y: number): number => {
      return Math.sqrt(x * x + y * y);
    };

    const angle = (x1: number, y1: number, x2: number, y2: number): number => {
      return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    };

    const spawnParticle = ({
      className,
      cssVars = {},
      text = "",
      startX,
      startY,
      scale = 1,
      duration,
      delay = 0,
      velocity,
      angle,
      gravity,
    }: SpawnParticleProps) => {
      const $el = document.createElement("div");
      $el.classList.add(className);
      $el.innerText = text;
      Object.entries(cssVars).forEach(([key, value]) => {
        $el.style.setProperty(key, value);
      });

      gsap.set($el, {
        x: startX,
        y: startY,
        xPercent: -50,
        yPercent: -50,
        scale: scale,
      });

      const tl = gsap.timeline({
        delay,
        onStart: () => {
          $stage.appendChild($el);
        },
        onComplete: () => {
          $el.remove();
        },
      });

      tl.to(
        $el,
        {
          duration,
          physics2D: { velocity, angle, gravity },
        },
        0
      );
      tl.to(
        $el,
        {
          duration,
          opacity: 0,
        },
        0
      );
    };

    const createGroup = ({
      color = "yellow",
      size = "80",
      leg = "40",
    }: CreatureGroupProps): HTMLDivElement => {
      const html = `
      <div class="group" style="--color: ${color}; --leg: ${leg}px; --size: ${size}px;">
        <div class="dragger"></div>
        <div class="creature">
          <div class="leg"></div>
          <div class="leg"></div>
          <div class="body"></div>
        </div>
      </div>
      `;

      const template = document.createElement("div");
      template.innerHTML = html;

      return template.querySelector(".group") as HTMLDivElement;
    };

    abstract class CreatureState {
      protected creature: Creature;
      constructor(creature: Creature) {
        this.creature = creature;
      }
      onEnter(fromState: CreatureStateTypes | null): void {}
      onExit(toState: CreatureStateTypes): void {}
    }

    class CreatureIdleState extends CreatureState {
      private transition: gsap.core.Timeline | null = null;
      private idleAnimation: gsap.core.Timeline | null = null;

      onEnter(fromState: CreatureStateTypes | null): void {
        if (fromState === CreatureStates.spawning) {
          this.spawningToIdle();
        } else if (fromState === CreatureStates.pulling) {
          this.pullingToIdle();
        }
      }

      spawningToIdle(): void {
        this.transition?.kill();

        const tl = gsap.timeline({
          onComplete: this.playIdleAnimation,
        });

        tl.fromTo(
          this.creature.$el,
          {
            scaleX: 0,
            scaleY: 0,
          },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "elastic.out",
            duration: gsap.utils.random(0.8, 1),
          },
          0
        );

        this.transition = tl;
      }

      pullingToIdle(): void {
        this.transition?.kill();

        const tl = gsap.timeline({
          onComplete: this.playIdleAnimation,
        });

        tl.set(this.creature.$dragger, {
          x: this.creature.startX,
          y: this.creature.startY,
        });
        tl.to(
          this.creature.$el,
          {
            scaleX: 1,
            scaleY: 1,
            ease: "elastic.out",
            duration: 1,
          },
          0
        );
        tl.set(this.creature.$el, {
          rotation: 0,
        });

        this.transition = tl;
      }

      playIdleAnimation = () => {
        const tl = gsap.timeline({
          repeat: -1,
        });

        tl.add(() => {
          for (let i = 0; i < 3; i++) {
            spawnParticle({
              className: "snooze-particle",
              text: "Z",
              startX: this.creature.startX + 20,
              startY: this.creature.startY - 20,
              velocity: gsap.utils.random(90, 110),
              angle: gsap.utils.random(-55, -65),
              gravity: -100,
              duration: 2,
              delay: i * 0.25,
            });
          }
        }, 0.5);
        tl.to(
          this.creature.$el,
          {
            scaleX: 1.1,
            scaleY: 0.9,
            duration: 2,
          },
          0.25
        );
        tl.to(
          this.creature.$el,
          {
            scaleX: 1,
            scaleY: 1,
            duration: 1,
          },
          2.5
        );

        this.idleAnimation = tl;
      };

      onExit(toState: CreatureStateTypes): void {
        this.idleAnimation?.kill();
        this.transition?.kill();
      }
    }

    class CreaturePullingState extends CreatureState {
      onEnter(fromState: CreatureStateTypes | null): void {
        gsap.ticker.add(this.tick);
      }

      onExit(toState: CreatureStateTypes): void {
        gsap.ticker.remove(this.tick);
      }

      tick = (): void => {
        const d = distance(
          this.creature.startX,
          this.creature.startY,
          this.creature.dragX,
          this.creature.dragY
        );
        const a = angle(
          this.creature.startX,
          this.creature.startY,
          this.creature.dragX,
          this.creature.dragY
        );
        const stretch = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, stageSize.h * 0.5, 0, 1, d)
        );

        gsap.set(this.creature.$el, {
          rotation: a,
          scaleX: 1 + stretch * 2,
          scaleY: 1 - stretch * 0.25,
        });

        if (stretch === 1) {
          this.creature.setState(CreatureStates.dragging);

          for (let i = 0; i < 20; i++) {
            spawnParticle({
              className: "ground-particle",
              startX:
                this.creature.startX +
                gsap.utils.random(
                  -this.creature.radius * 0.5,
                  this.creature.radius * 0.5
                ),
              startY: this.creature.startY,
              scale: gsap.utils.random(0.25, 1),
              velocity: gsap.utils.random(400, 800),
              angle: a + gsap.utils.random(-40, 40),
              gravity: 1200,
              duration: gsap.utils.random(0.5, 2),
              delay: 0,
            });
          }
        }
      };
    }

    class CreatureDraggingState extends CreatureState {
      private transition: gsap.core.Timeline | null = null;
      private lockStretch: boolean = false;

      onEnter(fromState: CreatureStateTypes | null): void {
        gsap.ticker.add(this.tick);

        const tl = gsap.timeline({
          onComplete: () => {
            this.lockStretch = false;
          },
        });

        this.lockStretch = true;
        this.transition = tl.to(
          this.creature.$el,
          {
            scaleX: 1,
            scaleY: 1,
            ease: "elastic.out",
            duration: 1,
          },
          0
        );
      }

      onExit(toState: CreatureStateTypes): void {
        gsap.ticker.remove(this.tick);
      }

      tick = (): void => {
        const { deltaX, deltaY, x, y } = this.creature.draggable;
        const l = length(deltaX, deltaY);

        this.creature.qX(x);
        this.creature.qY(y);

        if (l > 20) {
          this.transition?.kill();
          this.lockStretch = false;
        }

        if (this.lockStretch) {
          return;
        }

        const a = angle(0, 0, deltaX, deltaY);
        const stretch = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, 50, 0, 1, l)
        );

        gsap.set(this.creature.$el, {
          rotation: a,
          scaleX: 1 + stretch * 0.5,
          scaleY: 1 - stretch * 0.125,
        });
      };
    }

    class CreatureDroppingState extends CreatureState {
      onEnter(): void {
        this.creature.draggable.disable();

        const tl = gsap.timeline({
          onComplete: () => {
            this.creature.setState(CreatureStates.leaving);
          },
        });
        const d = stageSize.h - this.creature.dragY;
        const duration = d * 0.002;
        const squish = gsap.utils.mapRange(0, stageSize.h, 0.25, 1, d);

        tl.set(this.creature.$el, { zIndex: 1 });
        tl.to(
          this.creature.$el,
          {
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: duration * 0.5,
          },
          0
        );
        tl.to(
          this.creature.$el,
          {
            y: stageSize.h - this.creature.radius,
            ease: "power3.in",
            duration: duration,
          },
          0
        );
        tl.add(() => {
          const count = gsap.utils.mapRange(0, stageSize.h, 4, 20, d) | 0;
          const impact = gsap.utils.mapRange(0, stageSize.h, 1, 4, d);

          for (let i = 0; i < count; i++) {
            spawnParticle({
              className: "ground-particle",
              startX: this.creature.dragX,
              startY: this.creature.startY,
              scale: gsap.utils.random(0.25, 1),
              velocity: gsap.utils.random(100, 300) * impact,
              angle: -90 + gsap.utils.random(-30, 30),
              gravity: 1200,
              duration: gsap.utils.random(1, 4),
              delay: 0,
            });
          }
        });
        tl.set(this.creature.$el, {
          transformOrigin: "50% 100%",
        });
        tl.to(this.creature.$el, {
          scaleY: 1 - 0.75 * squish,
          scaleX: 1 + 0.5 * squish,
          duration: 0.25,
          ease: "expo.out",
        });
        tl.to(this.creature.$el, {
          scaleY: 1,
          scaleX: 1,
          duration: 1,
          ease: "elastic.out",
        });
        tl.set(this.creature.$el, {
          transformOrigin: "50% 50%",
        });
      }
    }

    class CreatureLeavingState extends CreatureState {
      onEnter(): void {
        const tl = gsap.timeline({
          onComplete: this.creature.handleComplete,
        });
        const legs = Array.from(this.creature.$el.querySelectorAll(".leg"));
        const body = this.creature.$el;
        const gait =
          ((this.creature.radius + this.creature.leg) * Math.PI * 2) / 8;
        const dir = gsap.utils.random([-1, 1]);
        const start = 0;
        const steps =
          Math.ceil(
            dir === 1
              ? this.creature.dragX / gait
              : (stageSize.w - this.creature.dragX) / gait
          ) + 1;

        tl.set(body, {
          scaleX: dir,
          rotation: 0,
        });
        tl.to(
          body,
          {
            y: stageSize.h - (this.creature.radius + this.creature.leg),
            duration: 0.5,
            ease: "back.out(3)",
          },
          start
        );
        tl.to(
          legs,
          {
            y: this.creature.leg * 0.5 + this.creature.radius,
            duration: 0.125,
            ease: "expo.out",
          },
          start
        );
        tl.to(legs[0], {
          rotation: "+=45",
          duration: 1,
        });

        const step = (even: boolean) => {
          tl.to(
            body,
            {
              rotation: dir === 1 ? "-=45" : "+=45",
              x: (dir === 1 ? "-=" : "+=") + gait,
              duration: 0.25,
              ease: "circ.inOut",
            },
            "-=0.25"
          );

          tl.to(legs[even ? 1 : 0], {
            rotation: "+=90",
            duration: 0.5,
            ease: "back.out",
          });
        };

        for (let i = 0; i < steps; i++) {
          step(i % 2 === 0);
        }
      }
    }

    class Creature {
      previousState: CreatureStateTypes | null = null;
      state: CreatureStateTypes = CreatureStates.spawning;
      startX: number = 0;
      startY: number = 0;
      width: number = 80;
      height: number = 80;
      leg: number = 40;
      radius: number;
      $group: HTMLDivElement;
      $dragger: HTMLDivElement;
      $el: HTMLDivElement;
      draggable: Draggable;
      qX: gsap.QuickToFunc;
      qY: gsap.QuickToFunc;
      states: Record<CreatureStateTypes, CreatureState>;
      onComplete: () => void;

      constructor(
        x: number,
        y: number,
        color: string,
        size: number,
        leg: number,
        onComplete: () => void
      ) {
        this.$group = createGroup({
          color,
          size: size.toString(),
          leg: leg.toString(),
        });
        if ($stage) {
          $stage.appendChild(this.$group);
        }

        this.$dragger = this.$group.querySelector(".dragger") as HTMLDivElement;
        this.$el = this.$group.querySelector(".creature") as HTMLDivElement;
        this.onComplete = onComplete;
        this.startX = x;
        this.startY = y;
        this.width = size;
        this.height = size;
        this.leg = leg;
        this.radius = this.width * 0.5;

        gsap.set([this.$dragger, this.$el], {
          xPercent: -50,
          yPercent: -50,
          x: this.startX,
          y: this.startY,
        });

        this.qX = gsap.quickTo(this.$el, "x", {
          duration: 0.2,
          ease: "back.out",
        });
        this.qY = gsap.quickTo(this.$el, "y", {
          duration: 0.2,
          ease: "back.out",
        });

        this.draggable = Draggable.create(this.$dragger, {
          bounds: {
            top: 0,
            left: 0,
            width: stageSize.w,
            height: stageSize.h + this.radius,
          },
          onDragStart: this.onDragStart,
          onDragEnd: this.onDragEnd,
        })[0] as Draggable;

        this.states = {
          [CreatureStates.spawning]: new CreatureIdleState(this), // temporary
          [CreatureStates.idle]: new CreatureIdleState(this),
          [CreatureStates.pulling]: new CreaturePullingState(this),
          [CreatureStates.dragging]: new CreatureDraggingState(this),
          [CreatureStates.dropping]: new CreatureDroppingState(this),
          [CreatureStates.leaving]: new CreatureLeavingState(this),
        };

        this.setState(CreatureStates.idle);
      }

      setState(state: CreatureStateTypes): void {
        const prev = this.states[this.state];
        const next = this.states[state];

        if (prev) {
          prev.onExit(state);
        }
        if (next) {
          next.onEnter(this.state);
        }

        this.previousState = this.state;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = state;
      }

      onDragStart = (): void => {
        this.setState(CreatureStates.pulling);
      };

      onDragEnd = (): void => {
        if (this.state === CreatureStates.dragging) {
          this.setState(CreatureStates.dropping);
        } else if (this.state === CreatureStates.pulling) {
          this.setState(CreatureStates.idle);
        }
      };

      handleComplete = (): void => {
        this.destroy();
        this.onComplete();
      };

      destroy(): void {
        this.draggable.kill();
        this.$group.remove();
      }

      get dragX(): number {
        return this.draggable.x;
      }
      get dragY(): number {
        return this.draggable.y;
      }
    }

    let creatureCount = 0;
    const spawnCreature = ({
      startX = gsap.utils.random(100, stageSize.w - 100, 1),
      color = gsap.utils.random([
        "gold",
        "salmon",
        "lightpink",
        "coral",
        "violet",
        "slateblue",
      ]),
      size = gsap.utils.random(40, 180, 1),
      leg = size * gsap.utils.random(0.1, 0.8, 0.1),
    }: {
      startX?: number;
      color?: string;
      size?: number;
      leg?: number;
    } = {}): void => {
      creatureCount++;
      const creature = new Creature(
        startX,
        stageSize.h,
        color,
        size,
        leg,
        () => {
          if (--creatureCount < 5) {
            spawnCreature();
          }
          spawnCreature();
        }
      );
    };

    spawnCreature({
      color: "gold",
      size: 160,
      leg: 60,
      startX: stageSize.w * 0.5,
    });

    // INITIAL SPAWN: Create at least 3 creatures at different positions
    const positions = [
      stageSize.w * 0.25,
      //    stageSize.w * 0.15,
      stageSize.w * 0.75,
    ];

    positions.forEach((pos, index) => {
      spawnCreature({
        color: ["gold", "salmon", "violet"][index],
        size: [160, 100, 140][index],
        leg: [60, 40, 50][index],
        startX: pos,
      });
    });

    // ===== INSTRUCTION TEXT ANIMATION =====
    let animation: gsap.core.Timeline | null;
    if (instructionRef.current) {
      const split = new SplitText(instructionRef.current, {
        type: "words",
        wordsClass: "instruction-word",
      });

      animation = gsap.timeline().from(split.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7,
        ease: "back",
        stagger: 0.15,
      });
    }

    return () => {
      resizeObserver.disconnect();
      const elementsToRemove = $stage.querySelectorAll(
        ".group, .snooze-particle, .ground-particle"
      );
      elementsToRemove.forEach((el) => el.remove());
      Draggable.get($stage.querySelector(".dragger"))?.kill();
      if (animation) {
        animation.revert();
        animation.kill();
      }
      const words = document.querySelectorAll(".instruction-word");
      words.forEach((word) => word.remove());
    };
  }, []);

  return (
    <>
      <div className="stage" ref={stageRef}>
        <p
          className="instruction text-10xl font-bold text-green"
          // ref={instructionRef}
        >
          Drag and drop the sleeping creatures!
        </p>
      </div>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          font-family: sans-serif;
        }
        body {
          margin: 0;
          overflow-x: hidden;
        }
        /* --- ADDED CSS FOR CLOUDS --- */
        @keyframes moveClouds {
          0% {
            background-position: 0px 50px, 0px 100px, 0px 150px;
          }
          100% {
            background-position: -1000px 50px, -800px 100px, -600px 150px;
          }
        }
        .stage {
          outline: 2px solid black;
          background-color: lightblue;
          position: relative;
          inset: 0;
          margin: 0 auto;
          overflow: hidden;
          height: 70vh;
          /* Cloud SVG as a data URI for multiple layers */
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath fill='rgba(255,255,255,0.8)' d='M415.7,192.3c0-79.5-64.4-143.9-143.9-143.9c-64.6,0-119.3,42.8-137.5,100.9c-4.4-1-8.9-1.6-13.5-1.6c-49.5,0-89.8,40.3-89.8,89.8c0,49.5,40.3,89.8,89.8,89.8h281.4c49.5,0,89.8-40.3,89.8-89.8C505.5,232.6,465.2,192.3,415.7,192.3z'/%3e%3c/svg%3e"),
            url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath fill='rgba(255,255,255,0.7)' d='M415.7,192.3c0-79.5-64.4-143.9-143.9-143.9c-64.6,0-119.3,42.8-137.5,100.9c-4.4-1-8.9-1.6-13.5-1.6c-49.5,0-89.8,40.3-89.8,89.8c0,49.5,40.3,89.8,89.8,89.8h281.4c49.5,0,89.8-40.3,89.8-89.8C505.5,232.6,465.2,192.3,415.7,192.3z'/%3e%3c/svg%3e"),
            url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath fill='rgba(255,255,255,0.6)' d='M415.7,192.3c0-79.5-64.4-143.9-143.9-143.9c-64.6,0-119.3,42.8-137.5,100.9c-4.4-1-8.9-1.6-13.5-1.6c-49.5,0-89.8,40.3-89.8,89.8c0,49.5,40.3,89.8,89.8,89.8h281.4c49.5,0,89.8-40.3,89.8-89.8C505.5,232.6,465.2,192.3,415.7,192.3z'/%3e%3c/svg%3e");
          background-repeat: repeat-x;
          background-size: 350px, 250px, 150px;
          animation: moveClouds 60s linear infinite;
        }
        /* --- END OF ADDED CSS --- */
        .instruction {
          position: absolute;
          top: 50vh;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          color: #333;
          user-select: none;
          pointer-events: none;
          z-index: 10;
        }
        .group {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .dragger,
        .creature {
          position: absolute;
          width: var(--size);
          height: var(--size);
        }
        .dragger {
          border-radius: 50%;
          pointer-events: all;
        }
        .body {
          position: absolute;
          background: var(--color);
          width: var(--size);
          height: var(--size);
          left: 0;
          top: 0;
          border-radius: 50%;
          outline: 2px solid black;
        }
        .leg {
          position: absolute;
          width: 20px;
          height: var(--leg);
          border: 10px solid black;
          border-style: none solid solid none;
          right: calc(var(--size) * 0.5);
          top: calc(var(--size) * 0.5 - var(--leg) * 0.5);
          transform-origin: 100% calc(var(--size) * -0.5);
        }
        .snooze-particle {
          position: absolute;
          width: 20px;
          height: 20px;
          color: black;
          font-size: 20px;
          user-select: none;
          pointer-events: none;
        }
        .ground-particle {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: black;
          z-index: 2;
        }
      `}</style>
    </>
  );
}

export default HeroSection;

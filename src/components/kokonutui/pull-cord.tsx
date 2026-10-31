"use client";

/**
 * @author: @dorianbaffier
 * @description: Pull Cord — Top-hanging physical ceiling lamp
 * @license: MIT
 * @website: https://kokonutui.com
 */

import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

// ViewBox coordinate bounding box centered around the lamp
const VIEW_X = 64;
const VIEW_Y = 0;
const VIEW_W = 160;
const VIEW_H = 280;

// Coordinates in Kokonut UI simulation units (x=144 is lamp center)
const WIDTH = 288;
const ANCHOR = { x: 144 + 36, y: 116 }; // x: 180, y: 116
const LINKS = 12;
const LINK = 8.5;
const STEP = 1 / 120;
const GRAVITY = 1400;
const DAMPING = 0.992;
const MAX_SPEED = 4;
const BEND_MIN = LINK * 1.9;
const BEND_STIFFNESS = 0.8;
const ITERATIONS = 14;
const CLICK_PULL = 22;
const MAX_STRETCH = 34;
const REST_EPSILON = 0.015;
const REST_STEPS = 24;

function damp(distance: number, max: number) {
  return max * (1 - Math.exp(-distance / max));
}

function haptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(8);
  }
}

function relax(
  chain: { xs: Float64Array; ys: Float64Array; held: number },
  a: number,
  b: number,
  length: number,
  bend: boolean
) {
  const { xs, ys, held } = chain;
  const aFixed = a === 0 || a === held;
  const bFixed = b === held;
  if (aFixed && bFixed) {
    return;
  }
  const dx = xs[b] - xs[a];
  const dy = ys[b] - ys[a];
  const dist = Math.hypot(dx, dy) || 0.0001;
  if (bend && dist >= length) {
    return;
  }
  const diff = ((dist - length) / dist) * (bend ? BEND_STIFFNESS : 1);
  let wa = 0.5;
  if (aFixed) {
    wa = 0;
  } else if (bFixed) {
    wa = 1;
  }
  xs[a] += dx * diff * wa;
  ys[a] += dy * diff * wa;
  xs[b] -= dx * diff * (1 - wa);
  ys[b] -= dy * diff * (1 - wa);
}

function cordPath(xs: Float64Array, ys: Float64Array) {
  let d = `M${xs[0].toFixed(2)} ${ys[0].toFixed(2)}`;
  for (let i = 1; i < xs.length - 1; i++) {
    const mx = (xs[i] + xs[i + 1]) / 2;
    const my = (ys[i] + ys[i + 1]) / 2;
    d += ` Q${xs[i].toFixed(2)} ${ys[i].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  const n = xs.length - 1;
  d += ` L${xs[n].toFixed(2)} ${ys[n].toFixed(2)}`;
  return d;
}

function restingChain() {
  const xs = new Float64Array(LINKS + 1);
  const ys = new Float64Array(LINKS + 1);
  for (let i = 0; i <= LINKS; i++) {
    xs[i] = ANCHOR.x;
    ys[i] = ANCHOR.y + i * LINK;
  }
  return { xs, ys };
}

const REST = restingChain();
const REST_PATH = cordPath(REST.xs, REST.ys);

export interface PullCordProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export default function PullCord({
  checked: checkedProp,
  defaultChecked = true,
  onCheckedChange,
  label = "Desk lamp",
  className,
}: PullCordProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = checkedProp ?? internal;
  const [focused, setFocused] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const hitRef = useRef<SVGPathElement>(null);
  const beadRef = useRef<SVGGElement>(null);

  const sim = useRef({
    xs: Float64Array.from(REST.xs),
    ys: Float64Array.from(REST.ys),
    pxs: Float64Array.from(REST.xs),
    pys: Float64Array.from(REST.ys),
    raf: 0,
    last: 0,
    carry: 0,
    still: 0,
    held: -1,
    targetX: 0,
    targetY: 0,
    armed: true,
    reduceMotion: false,
    downTime: 0,
    didToggle: false,
  });

  const latest = useRef<{ checked: boolean; toggle: (next: boolean) => void }>({
    checked,
    toggle: () => undefined,
  });

  const toggle = useCallback(
    (next: boolean) => {
      if (checkedProp === undefined) {
        setInternal(next);
      }
      onCheckedChange?.(next);
    },
    [checkedProp, onCheckedChange]
  );
  latest.current = { checked, toggle };

  const draw = useCallback(() => {
    const { xs, ys } = sim.current;
    const d = cordPath(xs, ys);
    cordRef.current?.setAttribute("d", d);
    hitRef.current?.setAttribute("d", d);
    const n = LINKS;
    const angle =
      (Math.atan2(xs[n] - xs[n - 1], ys[n] - ys[n - 1]) * 180) / Math.PI;
    beadRef.current?.setAttribute(
      "transform",
      `translate(${xs[n].toFixed(2)} ${ys[n].toFixed(2)}) rotate(${(-angle).toFixed(2)})`
    );
  }, []);

  const integrate = useCallback(() => {
    const s = sim.current;
    const { xs, ys, pxs, pys } = s;
    let moved = 0;
    for (let i = 1; i <= LINKS; i++) {
      if (i === s.held) {
        continue;
      }
      let vx = (xs[i] - pxs[i]) * DAMPING;
      let vy = (ys[i] - pys[i]) * DAMPING;
      const speed = Math.hypot(vx, vy);
      if (speed > MAX_SPEED) {
        vx *= MAX_SPEED / speed;
        vy *= MAX_SPEED / speed;
      }
      pxs[i] = xs[i];
      pys[i] = ys[i];
      xs[i] += vx;
      ys[i] += vy + GRAVITY * STEP * STEP;
      moved = Math.max(moved, Math.abs(vx) + Math.abs(vy));
    }
    if (s.held > 0) {
      const i = s.held;
      moved = Math.max(
        moved,
        Math.abs(s.targetX - xs[i]) + Math.abs(s.targetY - ys[i])
      );
      pxs[i] = xs[i];
      pys[i] = ys[i];
      xs[i] = s.targetX;
      ys[i] = s.targetY;
    }
    return moved;
  }, []);

  const constrain = useCallback(() => {
    const s = sim.current;
    for (let k = 0; k < ITERATIONS; k++) {
      for (let i = 0; i < LINKS; i++) {
        relax(s, i, i + 1, LINK, false);
      }
      for (let i = 0; i + 2 <= LINKS; i++) {
        relax(s, i, i + 2, BEND_MIN, true);
      }
    }
  }, []);

  const step = useCallback(() => {
    const moved = integrate();
    constrain();
    return moved;
  }, [integrate, constrain]);

  const tick = useCallback(
    (now: number) => {
      const s = sim.current;
      s.raf = 0;
      const elapsed = s.last ? Math.min((now - s.last) / 1000, 0.05) : STEP;
      s.last = now;
      s.carry += elapsed;
      let moved = 0;
      while (s.carry >= STEP) {
        moved = Math.max(moved, step());
        s.carry -= STEP;
      }
      draw();
      s.still = moved < REST_EPSILON ? s.still + 1 : 0;
      if (s.held > 0 || s.still < REST_STEPS) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.last = 0;
      }
    },
    [draw, step]
  );

  const wake = useCallback(() => {
    const s = sim.current;
    s.still = 0;
    if (!s.raf) {
      s.raf = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    const s = sim.current;
    s.reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  // Map pointer events accurately through the custom cropped viewBox
  const localPoint = (event: PointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 0, y: 0 };
    }
    return {
      x: VIEW_X + ((event.clientX - rect.left) / rect.width) * VIEW_W,
      y: VIEW_Y + ((event.clientY - rect.top) / rect.height) * VIEW_H,
    };
  };

  const reach = (index: number, x: number, y: number) => {
    const dx = x - ANCHOR.x;
    const dy = y - ANCHOR.y;
    const dist = Math.hypot(dx, dy) || 0.0001;
    const length = index * LINK;
    if (dist <= length) {
      return { x, y, pull: 0 };
    }
    const allowed = length + damp(dist - length, MAX_STRETCH);
    return {
      x: ANCHOR.x + (dx / dist) * allowed,
      y: ANCHOR.y + (dy / dist) * allowed,
      pull: dy > 0 ? (allowed - length) * (dy / dist) : 0,
    };
  };

  const handlePointerDown = (event: PointerEvent<SVGElement>) => {
    const s = sim.current;
    if (s.held > 0) {
      return;
    }
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    event.preventDefault();
    const point = localPoint(event);
    let nearest = LINKS;
    let best = Number.POSITIVE_INFINITY;
    for (let i = 1; i <= LINKS; i++) {
      const d = Math.hypot(s.xs[i] - point.x, s.ys[i] - point.y);
      if (d < best) {
        best = d;
        nearest = i;
      }
    }
    svgRef.current?.setPointerCapture(event.pointerId);
    s.held = nearest;
    s.targetX = s.xs[nearest];
    s.targetY = s.ys[nearest];
    s.armed = true;
    s.downTime = Date.now();
    s.didToggle = false;
    setGrabbing(true);
    wake();
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const s = sim.current;
    if (s.held < 0) {
      return;
    }
    const point = localPoint(event);
    const target = reach(s.held, point.x, point.y);
    s.targetX = target.x;
    s.targetY = target.y;
    if (s.armed && target.pull > CLICK_PULL) {
      s.armed = false;
      s.didToggle = true;
      haptic();
      latest.current.toggle(!latest.current.checked);
    } else if (!s.armed && target.pull < CLICK_PULL * 0.4) {
      s.armed = true;
    }
    wake();
  };

  const handlePointerUp = () => {
    const s = sim.current;
    if (s.held < 0) {
      return;
    }
    // If released quickly without pulling past threshold, trigger a tactile click-pull
    if (!s.didToggle && Date.now() - s.downTime < 500) {
      s.didToggle = true;
      haptic();
      latest.current.toggle(!latest.current.checked);
      if (!s.reduceMotion) {
        s.pys[LINKS] = s.ys[LINKS] + 18;
      }
    }
    s.held = -1;
    setGrabbing(false);
    if (s.reduceMotion) {
      s.xs.set(REST.xs);
      s.ys.set(REST.ys);
      s.pxs.set(REST.xs);
      s.pys.set(REST.ys);
      draw();
      return;
    }
    wake();
  };

  const handleKeyToggle = () => {
    toggle(!checked);
    const s = sim.current;
    if (!s.reduceMotion) {
      s.pys[LINKS] = s.ys[LINKS] - 5;
      wake();
    }
  };

  return (
    <div
      className={cn(
        "relative select-none pointer-events-none drop-shadow-sm",
        className
      )}
      style={{ width: "100%", height: "100%" }}
    >
      <svg
        aria-hidden="true"
        className={cn(
          "w-full h-full overflow-visible",
          grabbing ? "pointer-events-auto" : "pointer-events-none"
        )}
        onLostPointerCapture={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        ref={svgRef}
        viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
      >
        <defs>
          <filter id="lamp-bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ceiling wire descending from very top edge */}
        <line
          className="stroke-[#9E9E9E] transition-colors duration-300"
          strokeWidth={1.5}
          x1={WIDTH / 2}
          x2={WIDTH / 2}
          y1={0}
          y2={62}
        />

        {/* Trapezoid Lamp Shade */}
        <path
          className="fill-[#1A1A1E] transition-colors duration-300"
          d={`M${WIDTH / 2 - 14} 62 h28 l38 50 q2 4 -3 4 h-98 q-5 0 -3 -4 Z`}
        />

        {/* Bulb: Golden amber when checked, dark zinc when unlit */}
        <path
          className="transition-[fill] duration-300 ease-out"
          style={{
            fill: checked ? "#FFC72C" : "#3F3F46",
            filter: checked ? "url(#lamp-bulb-glow)" : "none",
          }}
          d={`M${WIDTH / 2 - 15} 116 a15 13 0 0 0 30 0 Z`}
        />

        {/* Visible Pull Cord */}
        <path
          className="stroke-[#A0A0A5] transition-[stroke] duration-300 ease-out pointer-events-none"
          d={REST_PATH}
          fill="none"
          ref={cordRef}
          strokeLinecap="round"
          strokeWidth={1.5}
        />

        {/* Transparent wide touch target along cord */}
        <path
          className={cn(
            "pointer-events-auto",
            grabbing ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{ pointerEvents: "stroke" }}
          d={REST_PATH}
          fill="none"
          onPointerDown={handlePointerDown}
          stroke="rgba(0,0,0,0.001)"
          strokeWidth={28}
          ref={hitRef}
        />

        {/* Pull Cord Bead at End */}
        <g
          className={cn(
            "pointer-events-auto",
            grabbing ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{ pointerEvents: "all" }}
          onPointerDown={handlePointerDown}
          ref={beadRef}
          transform={`translate(${ANCHOR.x} ${ANCHOR.y + LINKS * LINK})`}
        >
          {/* Circular hit area */}
          <circle fill="rgba(0,0,0,0.001)" r={24} />

          {focused && (
            <rect
              className="fill-none stroke-[#E10600]"
              height={30}
              rx={9}
              strokeWidth={2}
              width={20}
              x={-10}
              y={-4}
            />
          )}

          {/* Bead body */}
          <rect
            className="fill-[#27272A] stroke-[#52525B] stroke-[0.75] transition-colors duration-200"
            height={20}
            rx={5}
            width={10}
            x={-5}
            y={1}
          />
        </g>
      </svg>

      <button
        aria-checked={checked}
        aria-label={label}
        className="sr-only"
        onBlur={() => setFocused(false)}
        onClick={handleKeyToggle}
        onFocus={(event) =>
          setFocused(event.currentTarget.matches(":focus-visible"))
        }
        role="switch"
        type="button"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Scene 04 — HOW A ROBOT WORKS.
 * Six selectable systems. Advanced detail is hidden behind an optional
 * control. Where URRT publishes no built implementation, we say so.
 */
interface System {
  id: string;
  num: string;
  name: string;
  plain: string;
  technical: string;
  detail: string;
  status: string;
  published: boolean;
}

const systems: System[] = [
  {
    id: "mobility",
    num: "01",
    name: "Mobility",
    plain: "Tracks and articulated flippers let the rover climb stairs, ramps and rubble instead of being stopped by them.",
    technical:
      "AEGIS uses continuous rubber tracks with articulated front and rear flippers to traverse stairs, rubble piles and extreme terrain profiles. Zugbee X1 used 4-wheel drive with basic mobility.",
    detail: "Published as a core AEGIS sub-system and documented in official test-course photographs.",
    status: "Published",
    published: true,
  },
  {
    id: "sensors",
    num: "02",
    name: "Sensors",
    plain: "Instruments measure the space around the robot so it can act without a person standing next to it.",
    technical:
      "AEGIS integrates LiDAR, a depth (RGB-D) camera and an IMU. Zugbee X1 used a camera and ultrasonic sensors and established the sensor integration pipeline.",
    detail: "Sensor models, ranges and calibration data are Not published.",
    status: "Published · component classes only",
    published: true,
  },
  {
    id: "camera",
    num: "03",
    name: "Camera",
    plain: "A depth camera gives the robot a view of what is in front of it, even when the room is dark or cluttered.",
    technical:
      "An RGB-D depth camera is listed among AEGIS's sensors and feeds a 360° spatial-awareness pipeline. Zugbee X1 carried a camera. No camera model, resolution or field of view is published.",
    detail: "No camera specifications are published on the official site.",
    status: "Published · component class only",
    published: true,
  },
  {
    id: "controller",
    num: "04",
    name: "Controller",
    plain: "Electronics turn decisions into motor movement — the low-level logic between software and hardware.",
    technical:
      "Microcontroller / microprocessor work (Arduino, STM32, ESP32, Raspberry Pi, PlatformIO, MicroPython) and circuit / PCB design are listed as Electrical Sub-Team requirements. A specific built rover control implementation is not published.",
    detail: "Control architecture, firmware and loop rates: Not published.",
    status: "Not published",
    published: false,
  },
  {
    id: "power",
    num: "05",
    name: "Power",
    plain: "Batteries and power management keep the robot running while it is away from an outlet.",
    technical:
      "Power system management is listed as an Electrical Sub-Team requirement in URRT recruitment material, but no built power subsystem for a specific rover is published.",
    detail: "Battery chemistry, voltage, capacity and endurance: Not published.",
    status: "Not published",
    published: false,
  },
  {
    id: "communication",
    num: "06",
    name: "Communication",
    plain: "The link that carries commands out and video or telemetry back to the operators.",
    technical:
      "Remote operation, communication protocols, telemetry and RF systems are listed under the Aerial & Communication Sub-Team in recruitment material. A specific rover communication implementation is not published.",
    detail: "Radio, range, protocol and bandwidth details: Not published.",
    status: "Not published",
    published: false,
  },
];

/** Authentic component callouts over the official AEGIS photograph. */
function Annotations() {
  const marks = [
    { x: 70, y: 38, tx: 118, ty: 24, label: "6-DOF arm" },
    { x: 96, y: 60, tx: 122, ty: 60, label: "Perception" },
    { x: 52, y: 92, tx: 48, ty: 106, label: "Tracks + flippers" },
  ];
  return (
    <svg className="n-works__annot" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {marks.map((m) => {
        const w = m.label.length * 2.1 + 6;
        const rectX = m.tx > m.x ? m.tx : m.tx - w;
        return (
          <g key={m.label}>
            <line x1={m.x} y1={m.y} x2={m.tx} y2={m.ty} stroke="#191C1A" strokeWidth="0.45" vectorEffect="non-scaling-stroke" />
            <circle cx={m.x} cy={m.y} r="2.2" fill="#E56B3F" stroke="#FFFFFF" strokeWidth="0.8" />
            <rect x={rectX} y={m.ty - 5} width={w} height="9" rx="1.5" fill="#191C1A" />
            <text
              x={rectX + w / 2}
              y={m.ty + 1.1}
              fill="#FFFFFF"
              fontSize="3.4"
              fontFamily="IBM Plex Mono, monospace"
              letterSpacing="0.2"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {m.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function InsideRobot() {
  const [active, setActive] = useState(0);
  const s = systems[active];

  return (
    <section id="how-it-works" className="n-section" aria-labelledby="works-title">
      <div className="n-wrap">
        <span id="works-title" className="u-sr-only">How a robot works</span>
        <SectionHead
          index="04"
          eyebrow="How a Robot Works"
          title={<>What&apos;s inside <em>the machine.</em></>}
          intro="Six systems, one robot. Select a system to see what it does."
        />

        <div className="n-works__grid">
          <Reveal className="n-works__stage">
            <img src="/assets/rovers/t1.jpeg" alt="AEGIS tracked UGV with a raised 6-DOF arm and articulated flippers on a wooden test course" loading="lazy" />
            <Annotations />
            <span className="n-works__caption">AEGIS (V2) · Official URRT photograph · annotated</span>
          </Reveal>

          <Reveal className="n-works__panel" delay={80}>
            <div className="n-works__tabs" role="tablist" aria-label="Robot systems">
              {systems.map((item, i) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={i === active}
                  className={`n-works__tab${i === active ? " is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span>{item.num}</span>
                  <strong>{item.name}</strong>
                </button>
              ))}
            </div>

            <div className="n-works__detail" key={s.id} role="tabpanel">
              <div className="n-works__detail__num">SYSTEM {s.num} / 06</div>
              <h3>{s.name}</h3>
              <p>{s.plain}</p>

              <details className="n-works__more">
                <summary>Technical details</summary>
                <div className="n-works__more__body">
                  <p>{s.technical}</p>
                  <p style={{ marginTop: 10 }}>{s.detail}</p>
                </div>
              </details>

              <div className="n-works__status">
                Status: <b>{s.published ? s.status : "Not published"}</b>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

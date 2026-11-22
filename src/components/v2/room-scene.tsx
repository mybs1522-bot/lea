"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// A funky pastel 3D living room corner: arched window, curvy sofa, terrazzo table,
// globe lamp, plant, rug, art. Drag to spin; it drifts by itself. Pauses offscreen.
export default function RoomScene({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block", touchAction: "pan-y" });

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    scene.add(new THREE.HemisphereLight("#fff7ec", "#f4c7a8", 1.35));
    const sun = new THREE.DirectionalLight("#fff1dc", 2.4);
    sun.position.set(-4, 7, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.radius = 6;
    Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 });
    scene.add(sun);

    const M = (c: string, r = 0.8) => new THREE.MeshStandardMaterial({ color: c, roughness: r });
    const room = new THREE.Group();
    scene.add(room);
    const add = (g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = room) => {
      const o = new THREE.Mesh(g, m);
      o.position.set(x, y, z);
      o.castShadow = o.receiveShadow = true;
      parent.add(o);
      return o;
    };
    const rb = (w: number, h: number, d: number, r = 0.08) => new RoundedBoxGeometry(w, h, d, 4, r);

    // floor + walls
    add(rb(5, 0.2, 5, 0.06), M("#e9c9a3", 0.9), 0, -0.1, 0); // oak-ish floor
    const wallM = M("#ffe1cf", 0.95);
    add(rb(5, 3.2, 0.2, 0.05), wallM, 0, 1.6, -2.4);
    // left wall with an arched window (shape with a hole)
    const ws = new THREE.Shape();
    ws.moveTo(-2.5, 0); ws.lineTo(2.5, 0); ws.lineTo(2.5, 3.2); ws.lineTo(-2.5, 3.2); ws.lineTo(-2.5, 0);
    const hole = new THREE.Path();
    hole.moveTo(-0.7, 0.7); hole.lineTo(0.7, 0.7); hole.lineTo(0.7, 1.9); hole.absarc(0, 1.9, 0.7, 0, Math.PI, false); hole.lineTo(-0.7, 0.7);
    ws.holes.push(hole);
    const wallL = add(new THREE.ExtrudeGeometry(ws, { depth: 0.2, bevelEnabled: false }), M("#ffd3c2", 0.95), -2.4, 0, 0);
    wallL.rotation.y = Math.PI / 2;
    // window glass + sky glow
    const sky = add(new THREE.CircleGeometry(0.7, 40, 0, Math.PI), new THREE.MeshBasicMaterial({ color: "#9fd3ff" }), -2.38, 1.9, 0);
    sky.rotation.y = Math.PI / 2;
    const sky2 = add(new THREE.PlaneGeometry(1.4, 1.2), new THREE.MeshBasicMaterial({ color: "#bfe2ff" }), -2.38, 1.3, 0);
    sky2.rotation.y = Math.PI / 2;

    // rug
    add(new THREE.CylinderGeometry(1.5, 1.5, 0.03, 48), M("#a8c69f", 1), 0.2, 0.02, 0.3);
    add(new THREE.TorusGeometry(1.2, 0.025, 8, 64), M("#f2643a", 0.9), 0.2, 0.045, 0.3).rotation.x = Math.PI / 2;

    // curvy sofa (terracotta)
    const sofa = new THREE.Group();
    room.add(sofa);
    const sofaM = M("#f2643a", 0.75);
    add(rb(2.4, 0.45, 0.95, 0.2), sofaM, 0, 0.32, 0, sofa);
    add(rb(2.4, 0.7, 0.3, 0.15), sofaM, 0, 0.75, -0.38, sofa);
    add(new THREE.CylinderGeometry(0.28, 0.28, 0.95, 24), sofaM, -1.2, 0.48, 0, sofa).rotation.x = Math.PI / 2;
    add(new THREE.CylinderGeometry(0.28, 0.28, 0.95, 24), sofaM, 1.2, 0.48, 0, sofa).rotation.x = Math.PI / 2;
    add(rb(0.55, 0.35, 0.2, 0.1), M("#ffd84d", 0.8), -0.6, 0.72, -0.15, sofa).rotation.z = 0.15; // cushion
    add(rb(0.5, 0.33, 0.2, 0.1), M("#c9b6ff", 0.8), 0.55, 0.72, -0.15, sofa).rotation.z = -0.12;
    sofa.position.set(0.3, 0, -1.6);

    // terrazzo coffee table
    const terr = new THREE.CanvasTexture((() => {
      const c = document.createElement("canvas"); c.width = c.height = 256; const g = c.getContext("2d")!;
      g.fillStyle = "#f6efe6"; g.fillRect(0, 0, 256, 256);
      const cols = ["#f2643a", "#a8c69f", "#ffd84d", "#8ec5ff", "#141210"];
      for (let i = 0; i < 160; i++) { g.fillStyle = cols[i % 5]; g.beginPath(); g.ellipse((i * 97) % 256, (i * 57) % 256, 2 + (i % 4), 1.5 + (i % 3), i, 0, 7); g.fill(); }
      return c; })());
    terr.colorSpace = THREE.SRGBColorSpace;
    add(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 48), new THREE.MeshStandardMaterial({ map: terr, roughness: 0.5 }), 0.3, 0.42, 0.25);
    add(new THREE.CylinderGeometry(0.18, 0.28, 0.38, 24), M("#141210", 0.6), 0.3, 0.19, 0.25);
    add(new THREE.SphereGeometry(0.11, 24, 24), M("#8ec5ff", 0.3), 0.15, 0.58, 0.2); // vase
    add(rb(0.35, 0.06, 0.25, 0.02), M("#ffb8c6", 0.7), 0.5, 0.5, 0.35); // book

    // globe lamp
    add(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 12), M("#141210", 0.5), 1.85, 0.8, -1.7);
    add(new THREE.CylinderGeometry(0.22, 0.25, 0.04, 24), M("#141210", 0.5), 1.85, 0.02, -1.7);
    const bulb = add(new THREE.SphereGeometry(0.26, 32, 32), new THREE.MeshStandardMaterial({ color: "#fff4cf", emissive: "#ffd36b", emissiveIntensity: 1.1 }), 1.85, 1.7, -1.7);
    const lampLight = new THREE.PointLight("#ffd36b", 2.5, 4);
    lampLight.position.copy(bulb.position);
    room.add(lampLight);

    // plant
    add(new THREE.CylinderGeometry(0.24, 0.18, 0.42, 24), M("#ffd84d", 0.7), -1.7, 0.21, -1.7);
    [[0, 0.75, 0, 0.32], [0.18, 0.62, 0.08, 0.24], [-0.16, 0.68, -0.06, 0.26], [0.02, 1.0, 0.04, 0.22]].forEach(([x, y, z, r]) =>
      add(new THREE.IcosahedronGeometry(r, 1), M("#5f8f57", 0.8), -1.7 + x, y, -1.7 + z));

    // art on the back wall: arch print + circle
    add(rb(0.9, 1.1, 0.04, 0.02), M("#141210", 0.5), -0.6, 2.1, -2.28);
    add(new THREE.CircleGeometry(0.3, 32), new THREE.MeshBasicMaterial({ color: "#f2643a" }), -0.6, 2.25, -2.25);
    add(new THREE.PlaneGeometry(0.7, 0.3), new THREE.MeshBasicMaterial({ color: "#a8c69f" }), -0.6, 1.85, -2.25);
    add(new THREE.CircleGeometry(0.32, 40), M("#8ec5ff", 0.6), 0.9, 2.2, -2.28);

    // pendant ring light
    add(new THREE.TorusGeometry(0.45, 0.035, 12, 64), new THREE.MeshStandardMaterial({ color: "#fff", emissive: "#ffe8b0", emissiveIntensity: 0.8 }), 0.3, 2.65, 0.2).rotation.x = Math.PI / 2;

    // interaction: drag to spin, gentle auto drift
    let yaw = -0.62, target = -0.62, dragging = false, lastX = 0;
    const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; };
    const move = (e: PointerEvent) => { if (!dragging) return; target += (e.clientX - lastX) * 0.008; target = Math.max(-1.35, Math.min(0.15, target)); lastX = e.clientX; };
    const up = () => (dragging = false);
    renderer.domElement.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    let vis = true;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting));
    io.observe(el);
    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!vis || document.hidden) return;
      const t = clock.getElapsedTime();
      if (!dragging && !reduce) target += Math.sin(t * 0.35) * 0.0012;
      yaw += (target - yaw) * 0.08;
      const r = 8.4;
      cam.position.set(Math.sin(yaw) * r, 4.9, Math.cos(yaw) * r);
      cam.lookAt(0, 0.95, -0.3);
      bulb.position.y = 1.7 + Math.sin(t * 1.2) * 0.02;
      renderer.render(scene, cam);
      if (reduce) cancelAnimationFrame(raf);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | undefined;
        mat?.dispose?.();
      });
      terr.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div ref={ref} className={className} />;
}

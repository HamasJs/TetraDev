"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

/** Decorative, lazy-loaded Three.js scene. No models, remote assets, or trackers. */
export default function BrandScene() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef(false);
  const drawRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const element = host.current;
    if (!element) return;
    import("three")
      .then((THREE) => {
        if (disposed) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          return;
        } // The branded CSS fallback remains visible without WebGL.
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.7;
        element.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
        camera.position.set(0, 0, 9.8);
        scene.add(new THREE.AmbientLight(0xbacfff, 2.2));
        const key = new THREE.DirectionalLight(0xffffff, 5);
        key.position.set(-3, 5, 6);
        scene.add(key);
        const rim = new THREE.PointLight(0x9affdf, 36);
        rim.position.set(4, 1, 3);
        scene.add(rim);
        const coral = new THREE.PointLight(0xff9679, 20);
        coral.position.set(-3, -3, 2);
        scene.add(coral);
        const group = new THREE.Group();
        scene.add(group);
        const blue = new THREE.MeshPhysicalMaterial({
          color: 0x174dff,
          metalness: 0.58,
          roughness: 0.24,
          clearcoat: 1,
        });
        const edge = new THREE.LineBasicMaterial({
          color: 0x7d9dff,
          transparent: true,
          opacity: 0.5,
        });
        const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
        const polygons = [
          [
            [-2, 1.4],
            [-0.55, 1.4],
            [-0.08, 0.94],
            [-0.08, 0.55],
            [-2, 0.55],
          ],
          [
            [0.55, 1.4],
            [2, 1.4],
            [2, 0.55],
            [0.08, 0.55],
            [0.08, 0.94],
          ],
          [
            [-0.08, 0.35],
            [-0.08, -1.25],
            [-0.95, -1.9],
            [-0.95, -0.15],
          ],
          [
            [0.08, 0.35],
            [0.95, -0.15],
            [0.95, -1.9],
            [0.08, -1.25],
          ],
        ];
        const pieces = polygons.map((points) => {
          const shape = new THREE.Shape();
          points.forEach(([x, y], i) =>
            i ? shape.lineTo(x, y) : shape.moveTo(x, y),
          );
          shape.closePath();
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.43,
            bevelEnabled: true,
            bevelSegments: 3,
            steps: 1,
            bevelSize: 0.045,
            bevelThickness: 0.045,
          });
          geometry.translate(0, 0, -0.21);
          geometries.push(geometry);
          const mesh = new THREE.Mesh(geometry, blue);
          const edges = new THREE.EdgesGeometry(geometry, 25);
          geometries.push(edges);
          mesh.add(new THREE.LineSegments(edges, edge));
          group.add(mesh);
          return mesh;
        });
        const mint = new THREE.MeshStandardMaterial({
          color: 0xa5f6d9,
          metalness: 0.45,
          roughness: 0.3,
        });
        const warm = new THREE.MeshStandardMaterial({
          color: 0xff9679,
          metalness: 0.2,
          roughness: 0.35,
        });
        const ringGeo = new THREE.TorusGeometry(2.65, 0.009, 8, 160);
        geometries.push(ringGeo);
        const ring = new THREE.Mesh(ringGeo, mint);
        ring.rotation.set(1.1, 0.3, -0.3);
        scene.add(ring);
        const sphereGeo = new THREE.IcosahedronGeometry(0.15, 2);
        geometries.push(sphereGeo);
        const satellite = new THREE.Mesh(sphereGeo, warm);
        scene.add(satellite);
        group.rotation.set(0.08, -0.35, -0.08);
        let visible = true;
        let previous = 0;
        let elapsed = 0;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        const pointer = { x: 0, y: 0 };
        function draw() {
          if (disposed) return;
          renderer.render(scene, camera);
        }
        drawRef.current = draw;
        function frame(time: number) {
          if (
            !visible ||
            document.hidden ||
            pauseRef.current ||
            reduced.matches
          ) {
            previous = 0;
            return;
          }
          if (time - previous < 32) return;
          elapsed += previous ? Math.min((time - previous) / 1000, 0.1) : 0;
          previous = time;
          group.rotation.y =
            -0.35 + Math.sin(elapsed * 0.3) * 0.2 + pointer.x * 0.15;
          group.rotation.x +=
            (0.08 + pointer.y * 0.1 - group.rotation.x) * 0.04;
          group.position.y = Math.sin(elapsed * 0.7) * 0.09;
          pieces.forEach((piece, i) => {
            piece.position.z = Math.sin(elapsed * 0.65 + i * 0.8) * 0.1;
          });
          satellite.position.set(
            Math.cos(elapsed * 0.3) * 2.65,
            Math.sin(elapsed * 0.3) * 1.05,
            Math.sin(elapsed * 0.3) * 1.8,
          );
          draw();
        }
        function resize() {
          const { width, height } = element!.getBoundingClientRect();
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          draw();
        }
        function move(event: PointerEvent) {
          const box = element!.getBoundingClientRect();
          pointer.x = (event.clientX - box.left) / box.width - 0.5;
          pointer.y = (event.clientY - box.top) / box.height - 0.5;
        }
        function reset() {
          pointer.x = 0;
          pointer.y = 0;
        }
        function preference() {
          previous = 0;
          draw();
        }
        const observer = new ResizeObserver(resize);
        observer.observe(element);
        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          previous = 0;
        });
        intersection.observe(element);
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", reset);
        reduced.addEventListener("change", preference);
        satellite.position.set(2.1, -0.6, 1.2);
        resize();
        renderer.setAnimationLoop(frame);
        setReady(true);
        cleanup = () => {
          renderer.setAnimationLoop(null);
          observer.disconnect();
          intersection.disconnect();
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", reset);
          reduced.removeEventListener("change", preference);
          geometries.forEach((geometry) => geometry.dispose());
          [blue, edge, mint, warm].forEach((material) => material.dispose());
          renderer.dispose();
          renderer.domElement.remove();
          drawRef.current = null;
        };
      })
      .catch(() => {});
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  function toggleMotion() {
    pauseRef.current = !pauseRef.current;
    setPaused(pauseRef.current);
    drawRef.current?.();
  }
  return (
    <div className="brand-art">
      <div className="art-grid" />
      <div className="art-orbit" />
      <div
        className={`scene-host ${ready ? "is-ready" : ""}`}
        ref={host}
        aria-hidden="true"
      />
      <div
        className={`scene-fallback ${ready ? "is-hidden" : ""}`}
        aria-hidden="true"
      >
        T
      </div>
      <div className="art-index">
        FIG. 01 <span>BUILT FROM FIRST PRINCIPLES</span>
      </div>
      <div className="art-caption">
        <span className="live-dot" /> FOUR PARTS. ONE DIRECTION.
      </div>
      {ready && (
        <button
          className="motion-toggle"
          type="button"
          onClick={toggleMotion}
          aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
        >
          {paused ? (
            <Play size={13} aria-hidden="true" />
          ) : (
            <Pause size={13} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}

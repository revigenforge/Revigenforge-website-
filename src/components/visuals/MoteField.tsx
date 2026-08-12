import { useEffect, useRef } from 'react';

type Spark = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
};

/**
 * Sparse rising motes behind the hero — white on black, no colour. A low
 * particle count, capped DPR, paused when the hero scrolls away or the tab
 * is hidden, and switched off entirely for reduced-motion users.
 */
export function MoteField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.innerWidth < 768 ? 18 : 34;
    const sparks: Spark[] = [];

    const seed = (spark: Spark, initial = false) => {
      spark.x = Math.random() * width;
      spark.y = initial ? Math.random() * height : height + Math.random() * 40;
      spark.r = 0.4 + Math.random() * 1.15;
      spark.vy = -(0.12 + Math.random() * 0.4);
      spark.vx = (Math.random() - 0.5) * 0.16;
      spark.maxLife = 260 + Math.random() * 420;
      spark.life = initial ? Math.random() * spark.maxLife : 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    for (let i = 0; i < count; i += 1) {
      const spark = { x: 0, y: 0, r: 1, vy: 0, vx: 0, life: 0, maxLife: 1 };
      seed(spark, true);
      sparks.push(spark);
    }

    const draw = () => {
      if (!running) return;
      frame = requestAnimationFrame(draw);
      if (!visible) return;

      ctx.clearRect(0, 0, width, height);

      for (const spark of sparks) {
        spark.life += 1;
        spark.x += spark.vx;
        spark.y += spark.vy;
        // Gentle horizontal drift so the field never looks like falling rain in reverse.
        spark.vx += (Math.random() - 0.5) * 0.01;

        if (spark.life > spark.maxLife || spark.y < -20) {
          seed(spark);
          continue;
        }

        const t = spark.life / spark.maxLife;
        // Fade in fast, out slow.
        const alpha = Math.min(t * 6, 1) * (1 - t) * 0.55;

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    frame = requestAnimationFrame(draw);

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === 'visible';
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}

import { useCallback, useEffect, useRef, useState } from 'react';

export type UseSpeedMeterOptions = {
  initialAngle?: number;
  maxAngle?: number;
  resetDelayMs?: number;
  speedMultiplier?: number;
};

export const useSpeedMeter = (options: UseSpeedMeterOptions = {}) => {
  const {
    initialAngle = -55,
    maxAngle = 65,
    resetDelayMs = 220,
    speedMultiplier = 3.2,
  } = options;

  const [meterAngle, setMeterAngle] = useState(initialAngle);
  const lastScrollTopRef = useRef<number>(0);
  const resetTimerRef = useRef<number | null>(null);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const dy = Math.abs(el.scrollTop - lastScrollTopRef.current);
      lastScrollTopRef.current = el.scrollTop;

      // 瞬間的な大移動時はメーターの針の暴走を防ぐ
      if (dy > 120) {
        return;
      }

      const nextAngle = Math.min(maxAngle, initialAngle + dy * speedMultiplier);
      setMeterAngle(nextAngle);

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => {
        setMeterAngle(initialAngle);
      }, resetDelayMs);
    },
    [initialAngle, maxAngle, speedMultiplier, resetDelayMs]
  );

  const triggerSpike = useCallback(
    (angle: number = 58, durationMs: number = 650) => {
      setMeterAngle(angle);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => {
        setMeterAngle(initialAngle);
      }, durationMs);
    },
    [initialAngle]
  );

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  return {
    meterAngle,
    handleScroll,
    triggerSpike,
  };
};

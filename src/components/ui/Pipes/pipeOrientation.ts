export type PipeDirection = 'top' | 'bottom' | 'left' | 'right';

export type ElbowTransformProps = {
  flipX: boolean;
  flipY: boolean;
  rotate: number;
};

export type CheeseTransformProps = {
  rotate: number;
  flipX: boolean;
  flipY: boolean;
};

export const resolveElbowOrientation = (
  dir1: PipeDirection,
  dir2: PipeDirection
): ElbowTransformProps => {
  const ports = new Set([dir1, dir2]);

  if (ports.has('top') && ports.has('right')) {
    return { flipX: true, flipY: true, rotate: 0 };
  }
  if (ports.has('top') && ports.has('left')) {
    return { flipX: false, flipY: true, rotate: 0 };
  }
  if (ports.has('bottom') && ports.has('right')) {
    return { flipX: true, flipY: false, rotate: 0 };
  }
  if (ports.has('bottom') && ports.has('left')) {
    return { flipX: false, flipY: false, rotate: 0 };
  }

  return { flipX: false, flipY: false, rotate: 0 };
};

export const resolveCheeseOrientation = (
  passThrough: 'vertical' | 'horizontal',
  branch: PipeDirection
): CheeseTransformProps => {
  if (passThrough === 'vertical') {
    if (branch === 'right') {
      return { rotate: 270, flipX: false, flipY: false };
    }
    if (branch === 'left') {
      return { rotate: 90, flipX: false, flipY: false };
    }
  }

  if (passThrough === 'horizontal') {
    if (branch === 'top') {
      return { rotate: 180, flipX: false, flipY: false };
    }
    return { rotate: 0, flipX: false, flipY: false };
  }

  return { rotate: 0, flipX: false, flipY: false };
};

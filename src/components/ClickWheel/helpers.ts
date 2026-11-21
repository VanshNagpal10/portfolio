import { ScrollDirection } from "./sharedTypes";

export const getCircularBoundingInfo = (rect: DOMRect) => {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const radius = Math.max(rect.width, rect.height) / 2;

  return {
    radius,
    diameter: radius * 2,
    centerPoint: { x: centerX, y: centerY },
  };
};

export const getAngleBetweenPoints = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) => {
  return Math.round(
    (Math.atan2(point1.y - point2.y, point1.x - point2.x) * 180) / Math.PI
  );
};

export const checkIsPointWithinElement = (
  point: { x: number; y: number },
  element: HTMLElement | null | undefined
) => {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();

  return (
    point.x >= rect.left &&
    point.x <= rect.right &&
    point.y >= rect.top &&
    point.y <= rect.bottom
  );
};

export const getScrollDirection = (
  angleDelta: number,
  threshold: number
): ScrollDirection => {
  if (Math.abs(angleDelta) > threshold * 2) {
    return angleDelta > 0 ? "counter-clockwise" : "clockwise";
  }

  return angleDelta > 0 ? "clockwise" : "counter-clockwise";
};

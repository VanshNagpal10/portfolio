export const ANGLE_OFFSET_THRESHOLD = 15;
export const TOUCH_ANGLE_OFFSET_THRESHOLD = 23;
export const PAN_THRESHOLD = 5;
export const TOUCH_PAN_THRESHOLD = 15;
export const VELOCITY_TIMEOUT_MS = 250;

export const VELOCITY_SKIP_THRESHOLDS = [
  { minVelocity: 0, skip: 1 },
  { minVelocity: 6, skip: 3 },
  { minVelocity: 10, skip: 5 },
  { minVelocity: 14, skip: 8 },
];

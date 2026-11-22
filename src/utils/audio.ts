/**
 * Synthetic Retro Audio Engine for iPod tactile interactions.
 * Uses vanilla Web Audio API so it runs immediately with zero dependencies and no missing file errors.
 */

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleAudioMute(): boolean {
  isAudioMuted = !isAudioMuted;
  return isAudioMuted;
}

export function isMuted(): boolean {
  return isAudioMuted;
}

/**
 * Plays a piezoelectric tick (classic iPod click wheel detent sound).
 */
export function playClickTick() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Quick burst at ~1800Hz with exponential decay
    osc.frequency.setValueAtTime(1750, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.015);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.02);
  } catch {
    // Audio context may be restricted before user gesture
  }
}

/**
 * Plays a pleasant tactile confirmation chime (e.g. for copying email or selecting item).
 */
export function playConfirmChime() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "triangle";
    osc2.type = "sine";

    // Two-tone harmonic chime: 587Hz (D5) -> 880Hz (A5)
    osc1.frequency.setValueAtTime(587.33, now);
    osc1.frequency.setValueAtTime(880.0, now + 0.08);

    osc2.frequency.setValueAtTime(880.0, now);
    osc2.frequency.setValueAtTime(1174.66, now + 0.08);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
  } catch {
    // Graceful fallback
  }
}

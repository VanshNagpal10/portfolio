"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Howl } from "howler";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TrackInfo {
  name: string;
  src: string;
}

interface AudioState {
  isPlugged: boolean;
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: TrackInfo | null;
  isDucked: boolean;
}

interface AudioActions {
  plugIn: () => void;
  unplug: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setDucked: (ducked: boolean) => void;
}

type AudioContextValue = AudioState & AudioActions;

/* ------------------------------------------------------------------ */
/*  Playlist – Local lo-fi tracks                                     */
/*  Place MP3s in public/audio/. If missing, foley still works fine.   */
/* ------------------------------------------------------------------ */

const PLAYLIST: TrackInfo[] = [
  { name: "lofi drift — vol.1", src: "/audio/track-01.mp3" },
  { name: "evening compile", src: "/audio/track-02.mp3" },
  { name: "midnight deploy", src: "/audio/track-03.mp3" },
];

const NORMAL_VOLUME = 0.32;
const DUCK_VOLUME = 0.04;
const FADE_IN_MS = 600;
const FADE_OUT_MS = 400;

/* ------------------------------------------------------------------ */
/*  Foley synthesis (zero-dependency, using Web Audio API)             */
/* ------------------------------------------------------------------ */

let _audioCtx: AudioContext | null = null;
let synthInterval: NodeJS.Timeout | null = null;
let synthGain: GainNode | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (Ctor) _audioCtx = new Ctor();
  }
  if (_audioCtx?.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}

function startSyntheticLofi(gainVal: number) {
  stopSyntheticLofi();
  const ctx = getAudioCtx();
  if (!ctx) return;

  synthGain = ctx.createGain();
  synthGain.gain.setValueAtTime(gainVal * 0.5, ctx.currentTime);
  synthGain.connect(ctx.destination);

  // Soothing chord frequencies (Fmaj7 / G / Am7 / Em7)
  const chords = [
    [174.61, 220.0, 261.63, 329.63],
    [196.0, 246.94, 293.66, 349.23],
    [220.0, 261.63, 329.63, 392.0],
    [164.81, 196.0, 246.94, 293.66],
  ];
  let chordIdx = 0;

  const playChord = () => {
    if (!ctx || !synthGain) return;
    const now = ctx.currentTime;
    const chord = chords[chordIdx % chords.length];
    chordIdx++;

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.15);

      noteGain.gain.setValueAtTime(0.001, now + i * 0.15);
      noteGain.gain.linearRampToValueAtTime(0.04, now + i * 0.15 + 0.5);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.15 + 2.8);

      osc.connect(noteGain).connect(synthGain!);
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 3.0);
    });
  };

  playChord();
  synthInterval = setInterval(playChord, 3200);
}

function stopSyntheticLofi() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
  if (synthGain && _audioCtx) {
    try {
      synthGain.gain.exponentialRampToValueAtTime(
        0.0001,
        _audioCtx.currentTime + 0.3,
      );
      setTimeout(() => {
        synthGain?.disconnect();
        synthGain = null;
      }, 350);
    } catch {
      synthGain = null;
    }
  }
}

/** Metallic plug-insertion clack (synthesised) */
function playPlugClack() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Initial transient – snappy metallic click
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(2400, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);
  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.04);

  // Secondary body thud
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(180, now + 0.005);
  osc2.frequency.exponentialRampToValueAtTime(60, now + 0.06);
  gain2.gain.setValueAtTime(0.09, now + 0.005);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
  osc2.connect(gain2).connect(ctx.destination);
  osc2.start(now + 0.005);
  osc2.stop(now + 0.08);
}

/** Soft pop when unplugging */
function playUnplugPop() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.05);
}

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

const AudioCtx = createContext<AudioContextValue | null>(null);

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx)
    throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                          */
/* ------------------------------------------------------------------ */

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AudioState>({
    isPlugged: false,
    isPlaying: false,
    currentTrackIndex: 0,
    currentTrack: PLAYLIST[0] ?? null,
    isDucked: false,
  });

  const howlRef = useRef<Howl | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  /* ---------- helpers ---------- */

  const stopCurrent = useCallback(() => {
    stopSyntheticLofi();
    if (howlRef.current) {
      howlRef.current.fade(howlRef.current.volume(), 0, FADE_OUT_MS);
      const h = howlRef.current;
      setTimeout(() => {
        h.stop();
        h.unload();
      }, FADE_OUT_MS + 50);
      howlRef.current = null;
    }
  }, []);

  const startTrack = useCallback(
    (index: number) => {
      stopCurrent();
      const track = PLAYLIST[index];
      if (!track) return;

      const targetVol = stateRef.current.isDucked
        ? DUCK_VOLUME
        : NORMAL_VOLUME;

      const howl = new Howl({
        src: [track.src],
        html5: true,
        loop: false,
        volume: 0,
        onloaderror: () => {
          // Fallback to synthetic lo-fi chords if mp3 not present yet
          startSyntheticLofi(targetVol);
        },
        onend: () => {
          // Auto-advance
          const next = (stateRef.current.currentTrackIndex + 1) % PLAYLIST.length;
          setState((s) => ({
            ...s,
            currentTrackIndex: next,
            currentTrack: PLAYLIST[next] ?? null,
          }));
          startTrack(next);
        },
      });

      howl.play();
      howl.fade(0, targetVol, FADE_IN_MS);

      howlRef.current = howl;
      setState((s) => ({
        ...s,
        isPlaying: true,
        currentTrackIndex: index,
        currentTrack: track,
      }));
    },
    [stopCurrent],
  );

  /* ---------- actions ---------- */

  const plugIn = useCallback(() => {
    playPlugClack();
    setState((s) => ({ ...s, isPlugged: true }));
    // Start music 120ms after the clack
    setTimeout(() => startTrack(stateRef.current.currentTrackIndex), 120);
  }, [startTrack]);

  const unplug = useCallback(() => {
    playUnplugPop();
    stopCurrent();
    setState((s) => ({ ...s, isPlugged: false, isPlaying: false }));
  }, [stopCurrent]);

  const togglePlay = useCallback(() => {
    if (!stateRef.current.isPlugged) return;
    const h = howlRef.current;
    if (h && h.playing()) {
      h.pause();
      setState((s) => ({ ...s, isPlaying: false }));
    } else if (h) {
      h.play();
      setState((s) => ({ ...s, isPlaying: true }));
    } else {
      startTrack(stateRef.current.currentTrackIndex);
    }
  }, [startTrack]);

  const nextTrack = useCallback(() => {
    if (!stateRef.current.isPlugged) return;
    const next =
      (stateRef.current.currentTrackIndex + 1) % PLAYLIST.length;
    startTrack(next);
  }, [startTrack]);

  const prevTrack = useCallback(() => {
    if (!stateRef.current.isPlugged) return;
    const prev =
      (stateRef.current.currentTrackIndex - 1 + PLAYLIST.length) %
      PLAYLIST.length;
    startTrack(prev);
  }, [startTrack]);

  const setDucked = useCallback((ducked: boolean) => {
    setState((s) => ({ ...s, isDucked: ducked }));
    const h = howlRef.current;
    if (h && h.playing()) {
      h.fade(
        h.volume(),
        ducked ? DUCK_VOLUME : NORMAL_VOLUME,
        300,
      );
    }
  }, []);

  /* sync with iPod click wheel buttons */
  useEffect(() => {
    const handlePlayPause = () => togglePlay();
    const handleForward = () => nextTrack();
    const handleBackward = () => prevTrack();

    window.addEventListener("playpauseclick", handlePlayPause);
    window.addEventListener("forwardclick", handleForward);
    window.addEventListener("backwardclick", handleBackward);

    return () => {
      window.removeEventListener("playpauseclick", handlePlayPause);
      window.removeEventListener("forwardclick", handleForward);
      window.removeEventListener("backwardclick", handleBackward);
    };
  }, [togglePlay, nextTrack, prevTrack]);

  /* cleanup on unmount */
  useEffect(() => {
    return () => {
      howlRef.current?.unload();
    };
  }, []);

  return (
    <AudioCtx.Provider
      value={{ ...state, plugIn, unplug, togglePlay, nextTrack, prevTrack, setDucked }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

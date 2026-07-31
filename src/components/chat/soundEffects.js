// Lightweight Web Audio API synthesizer for cute retro-futuristic UI sounds.
// Does not require external audio files, works completely in the browser.

let audioCtx = null;
let isMuted = localStorage.getItem("ai_chat_muted") === "true";

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundEffects = {
  getMuted: () => isMuted,
  
  setMuted: (muted) => {
    isMuted = muted;
    localStorage.setItem("ai_chat_muted", String(muted));
  },

  playClick: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  },

  playBubble: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      // Slide frequency up for a bubble pop effect
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  },

  playChime: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Note 1 (E5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.start(now);
      osc1.stop(now + 0.2);

      // Note 2 (A5) - delayed slightly for arpeggio
      setTimeout(() => {
        if (isMuted) return;
        try {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(880, ctx.currentTime);
          gain2.gain.setValueAtTime(0.06, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.25);
        } catch (e) {}
      }, 70);

    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  },

  playPop: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  }
};

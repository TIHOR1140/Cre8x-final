// Web Audio API helper for ambient hub chimes and emergency wake-up sirens
class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentAlarmInterval: number | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAlarm();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft temple-bell / singing bowl chime for Malani's ambient reminder
  public playSoftChime() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, this.ctx.currentTime); // 528 Hz gentle chime
      osc.frequency.exponentialRampToValueAtTime(396, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.1);
    } catch {
      // Audio playback fails silently if browser blocks autoplay
    }
  }

  // Subtle tap tone
  public playTap() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }

  // High-urgency piercing wake-up alarm for Arjun (Emergency screen)
  public startEmergencyAlarm() {
    if (this.isMuted || this.currentAlarmInterval) return;
    try {
      this.init();
      if (!this.ctx) return;

      let high = true;
      const playPulse = () => {
        if (!this.ctx || this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(high ? 880 : 660, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.38);
        high = !high;
      };

      playPulse();
      this.currentAlarmInterval = window.setInterval(playPulse, 400);
    } catch {
      // Ignore
    }
  }

  public stopAlarm() {
    if (this.currentAlarmInterval) {
      clearInterval(this.currentAlarmInterval);
      this.currentAlarmInterval = null;
    }
  }
}

export const sound = new SoundController();


class SoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initCtx() {
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
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Sound effect for WRONG drop:
   * "Nổ tung nhẹ (bùm / explosion)"
   */
  public playExplosion() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Noise Burst for impact
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.35);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      whiteNoise.start(now);

      // 2. Sub-bass boom oscillator ("bùm")
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.38);

      oscGain.gain.setValueAtTime(0.65, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);

      // 3. Wobbly cartoon fail "buzz"
      const buzz = this.ctx.createOscillator();
      const buzzGain = this.ctx.createGain();
      buzz.type = 'sawtooth';
      buzz.frequency.setValueAtTime(160, now + 0.05);
      buzz.frequency.exponentialRampToValueAtTime(90, now + 0.35);
      buzzGain.gain.setValueAtTime(0.15, now + 0.05);
      buzzGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      buzz.connect(buzzGain);
      buzzGain.connect(this.ctx.destination);
      buzz.start(now + 0.05);
      buzz.stop(now + 0.38);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Sound effect for CORRECT drop:
   * "Pháo hoa lách tách + Nhạc chúc mừng ngắn tươi vui"
   */
  public playFireworks() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Firework crackles (lách tách)
      const crackleCount = 5;
      for (let i = 0; i < crackleCount; i++) {
        const crackleTime = now + (i * 0.06) + Math.random() * 0.03;
        const bSize = Math.floor(this.ctx.sampleRate * 0.035);
        const b = this.ctx.createBuffer(1, bSize, this.ctx.sampleRate);
        const d = b.getChannelData(0);
        for (let j = 0; j < bSize; j++) {
          d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (this.ctx.sampleRate * 0.008));
        }
        const bSource = this.ctx.createBufferSource();
        bSource.buffer = b;

        const bFilter = this.ctx.createBiquadFilter();
        bFilter.type = 'highpass';
        bFilter.frequency.setValueAtTime(2500 + Math.random() * 2000, crackleTime);

        const bGain = this.ctx.createGain();
        bGain.gain.setValueAtTime(0.25, crackleTime);
        bGain.gain.exponentialRampToValueAtTime(0.001, crackleTime + 0.03);

        bSource.connect(bFilter);
        bFilter.connect(bGain);
        bGain.connect(this.ctx.destination);

        bSource.start(crackleTime);
      }

      // 2. Cheerful Chime Fanfare (C5, E5, G5, C6)
      const notes = [
        { freq: 523.25, time: 0.02 },  // C5
        { freq: 659.25, time: 0.12 },  // E5
        { freq: 783.99, time: 0.22 },  // G5
        { freq: 1046.50, time: 0.32 }, // C6
      ];

      notes.forEach(({ freq, time }) => {
        if (!this.ctx) return;
        const noteTime = now + time;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.28, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

        // Add slight shimmer overtone
        const overtone = this.ctx.createOscillator();
        const overtoneGain = this.ctx.createGain();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(freq * 2, noteTime);
        overtoneGain.gain.setValueAtTime(0.08, noteTime);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        overtone.connect(overtoneGain);
        overtoneGain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.5);
        overtone.start(noteTime);
        overtone.stop(noteTime + 0.35);
      });
    } catch {
      // Audio fallback
    }
  }

  public playCardPick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.07);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // silent
    }
  }

  public playVictory() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.18 }, // G5
        { f: 1046.5, d: 0.4 },  // C6
        { f: 880.00, d: 0.2 },  // A5
        { f: 1046.5, d: 0.6 },  // C6
      ];
      let t = now;
      melody.forEach(m => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(m.f, t);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + m.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + m.d);
        t += m.d * 0.85;
      });
    } catch {
      // silent
    }
  }
}

export const soundManager = new SoundController();

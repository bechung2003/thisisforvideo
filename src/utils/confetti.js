import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    // Left burst
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
    });
    // Right burst
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
    });
  } catch {
    // Graceful fallback
  }
};

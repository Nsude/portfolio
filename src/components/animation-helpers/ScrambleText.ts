// Function to scramble text
export const scrambleText = (
  element: HTMLElement | null,
  finalText: string,
  duration = 350,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
) => {
  if (!element) return;
  const length = finalText.length;
  let currentFrame = 0;
  const fps = 1000 / 30;
  const totalFrames = Math.floor(duration / fps);
  let scrambledText = "";

  const randomChar = () => chars[Math.floor(Math.random() * length)];

  const scramInterval = setInterval(() => {
    scrambledText = "";
    for (let i = 0; i < length; i++) {
      if (currentFrame >= totalFrames * (1 / length)) {
        // reveal current frame text
        scrambledText += finalText[i];
      } else {
        // randomize characters during scramble
        scrambledText += randomChar();
      }
    }
    element.innerText = scrambledText;

    currentFrame++;
    if (currentFrame < totalFrames) return;
    clearInterval(scramInterval);
    element.innerText = finalText;
  }, fps);
};
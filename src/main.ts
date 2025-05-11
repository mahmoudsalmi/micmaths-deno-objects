import { runCheckerboardInversion } from './math-objects/01-checker-board-inversion/run-checker-board-inversion.ts';

if (import.meta.main) {
  console.log("\n🪄  Welcome to wonderland of Maths ! ✨✨✨\n");

  // 01 - generate checkerboard and inverted checkerboard
  console.log("⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ 01 - Checkerboard inversion");
  await runCheckerboardInversion();
  console.log("⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n");

  console.log("👋🏽 See you soon !");
}

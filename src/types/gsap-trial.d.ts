declare module "gsap/SplitText" {
  export class SplitText {
    chars: HTMLElement[];
    lines: HTMLElement[];
    words: HTMLElement[];

    constructor(
      target: string | Element | Array<string | Element>,
      vars?: Record<string, unknown>
    );

    revert(): void;
  }
}

declare module "gsap/ScrollSmoother";

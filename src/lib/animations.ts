import { Variants, Easing } from "framer-motion";

export const PREMIUM_EASE: Easing = [0.22, 1, 0.36, 1];

export const BLUR_REVEAL: Variants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(12px)", 
    y: 20 
  },
  show: (i: number = 0) => ({
    opacity: 1, 
    filter: "blur(0px)", 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: PREMIUM_EASE,
      delay: i * 0.1 
    }
  }),
};

export const SPRING_LOW: any = {
  type: "spring",
  stiffness: 100,
  damping: 20
};

export const SPRING_MED: any = {
  type: "spring",
  stiffness: 150,
  damping: 15
};

export const MASK_REVEAL: Variants = {
  hidden: { 
    y: "100%",
  },
  show: (i: number = 0) => ({
    y: 0,
    transition: { 
      duration: 0.9, 
      ease: PREMIUM_EASE,
      delay: i * 0.12 
    }
  }),
};

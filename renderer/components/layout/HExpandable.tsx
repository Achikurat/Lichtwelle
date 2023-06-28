import { motion } from "framer-motion";
import React, { ReactNode, useState } from "react";

type Props = {
  isVisible: boolean;
  children: ReactNode;
};

export default function HExpandable({ isVisible, children }: Props) {
  const [hidden, setHidden] = useState(!isVisible);

  return (
    <motion.div
      hidden={hidden}
      initial={false}
      onAnimationStart={() => setHidden(false)}
      onAnimationComplete={() => setHidden(!isVisible)}
      animate={{ width: isVisible ? 100 : 0 }}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </motion.div>
  );
}

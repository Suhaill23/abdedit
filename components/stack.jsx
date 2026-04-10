import { motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import './Stack.css';

const createDefaultCards = () => [
  {
    id: 1,
    content: (
      <div className="flex h-full w-full items-center justify-center bg-brand-blue text-2xl font-bold text-white">
        تصميم إبداعي
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex h-full w-full items-center justify-center bg-brand-cyan text-2xl font-bold text-black">
        تجربة مستخدم
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="flex h-full w-full items-center justify-center bg-brand-green text-2xl font-bold text-black">
        هوية بصرية
      </div>
    ),
  },
];

const createStackItems = (cards = []) =>
  cards.length > 0
    ? cards.map((content, index) => ({ id: index + 1, content }))
    : createDefaultCards();

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
      return;
    }

    x.set(0);
    y.set(0);
  };

  if (disableDrag) {
    return <motion.div className="card-rotate-disabled">{children}</motion.div>;
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ rotateX, rotateY, x, y }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stack, setStack] = useState(() => createStackItems(cards));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    setStack(createStackItems(cards));
  }, [cards]);

  const cardRotations = useMemo(
    () =>
      stack.reduce((acc, card) => {
        acc[card.id] = randomRotation ? ((card.id * 7) % 11) - 5 : 0;
        return acc;
      }, {}),
    [randomRotation, stack],
  );

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const sendToBack = (id) => {
    setStack((prev) => {
      const cardIndex = prev.findIndex((card) => card.id === id);

      if (cardIndex < 0 || prev.length < 2) {
        return prev;
      }

      const next = [...prev];
      const [card] = next.splice(cardIndex, 1);
      next.unshift(card);
      return next;
    });
  };

  useEffect(() => {
    if (!autoplay || isPaused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setStack((prev) => {
        if (prev.length < 2) {
          return prev;
        }

        const next = [...prev];
        const card = next.pop();

        if (!card) {
          return prev;
        }

        next.unshift(card);
        return next;
      });
    }, autoplayDelay);

    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => (
        <CardRotate
          key={card.id}
          onSendToBack={() => sendToBack(card.id)}
          sensitivity={sensitivity}
          disableDrag={shouldDisableDrag}
        >
          <motion.div
            className="card"
            onClick={() => shouldEnableClick && sendToBack(card.id)}
            animate={{
              rotateZ: (stack.length - index - 1) * 4 + (cardRotations[card.id] ?? 0),
              scale: 1 + index * 0.06 - stack.length * 0.06,
              transformOrigin: '90% 90%',
            }}
            initial={false}
            transition={{
              type: 'spring',
              stiffness: animationConfig.stiffness,
              damping: animationConfig.damping,
            }}
          >
            {card.content}
          </motion.div>
        </CardRotate>
      ))}
    </div>
  );
}

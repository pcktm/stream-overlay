import ReactCanvasConfetti from 'react-canvas-confetti';
import React, {
  Ref, useCallback, useEffect, useState,
} from 'react';
import {effectsChannel} from '../utils/client';

export const CanvasBackgroundConfetti = () => {
  const refAnimationInstance = React.useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current({
        origin: {y: 0, x: 1},
        angle: -(100 + Math.random() * 20),
        particleCount: Math.floor(200 * particleRatio),
        ...opts,
        ...(opts.startVelocity ? {} : {startVelocity: opts.startVelocity * Math.random() * 3}),
      });
      refAnimationInstance.current({
        origin: {y: 0, x: 0},
        angle: -(30 + Math.random() * 20),
        particleCount: Math.floor(200 * particleRatio),
        ...opts,
        ...(opts.startVelocity ? {} : {startVelocity: opts.startVelocity * Math.random() * 3}),
      });
    }
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    const handler = (event: any) => {
      fire();
    };
    effectsChannel.on('broadcast', {event: 'confetti'}, handler);
    return () => {
      // eslint-disable-next-line no-underscore-dangle
      (effectsChannel as any)._off('broadcast', {event: 'confetti'});
    };
  }, [fire]);
  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={
      {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }
    }
    />
  );
};

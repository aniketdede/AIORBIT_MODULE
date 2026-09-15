'use client';

import React from 'react';

// Double-density matrix dot definitions for "A I O R B I T"
// 0 = empty, 1 = white dot, 2 = red/orange accent dot
const LETTERS: Record<string, number[][]> = {
  A: [
    [0, 1, 1, 2, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 2, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 2, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 2, 1],
  ],
  I: [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 2, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],
  O: [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 2, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 2, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 2, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],
  R: [
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 2, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 2, 0, 0],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 2],
  ],
  B: [
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 2],
    [1, 1, 1, 1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
  ],
};

export const AiOrbitDotMatrix: React.FC = () => {
  const word = ['A', 'I', 'O', 'R', 'B', 'I', 'T'];

  return (
    <div className="w-full bg-black py-16 px-4 border-t border-b border-white/10 overflow-x-auto flex justify-center items-center">
      <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 min-w-max select-none">
        {word.map((char, charIdx) => {
          const matrix = LETTERS[char];
          if (!matrix) return null;

          return (
            <div key={charIdx} className="flex flex-col gap-1.5 sm:gap-2">
              {matrix.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1.5 sm:gap-2">
                  {row.map((cell, cIdx) => {
                    if (cell === 0) {
                      return (
                        <div
                          key={cIdx}
                          className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-zinc-900/30"
                        />
                      );
                    }

                    if (cell === 2) {
                      return (
                        <div
                          key={cIdx}
                          className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse"
                        />
                      );
                    }

                    return (
                      <div
                        key={cIdx}
                        className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-zinc-300/90 shadow-[0_0_4px_rgba(255,255,255,0.4)]"
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

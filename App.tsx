import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { PHRASES, IMAGES } from './constants';

const App: React.FC = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  // Calculates the text for the "No" button based on clicks
  const getNoButtonText = () => {
    return PHRASES[Math.min(noCount, PHRASES.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4 overflow-hidden selection:bg-pink-200">
      <div className="max-w-md w-full text-center">
        {yesPressed ? (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <img 
              src={IMAGES.HAPPY} 
              alt="Osito diciendo te amo" 
              className="w-64 h-64 object-cover mb-6 rounded-lg shadow-xl"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
              ¡Siii! ¡Sabía que dirías que sí! ❤️
            </h1>
            <p className="text-xl text-pink-800">
              Eres mi persona favorita en el mundo.
            </p>
          </motion.div>
        ) : (
          /* Asking State */
          <div className="flex flex-col items-center">
            <motion.img
              key="asking-image"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              src={IMAGES.ASKING}
              alt="Osito lindo"
              className="w-48 h-48 md:w-64 md:h-64 object-contain mb-8 mix-blend-multiply"
            />
            
            <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-12 text-center leading-tight">
              ¿Quieres ser mi San Valentín?
            </h1>

            <div className="flex flex-wrap flex-col md:flex-row items-center justify-center gap-4 w-full relative">
              
              {/* YES Button - Grows bigger */}
              <motion.button
                className="bg-green-500 hover:bg-green-600 text-white font-bold rounded shadow-lg transition-all duration-300 z-10"
                style={{
                  fontSize: `${noCount * 20 + 16}px`, // Grows by 20px per click
                  padding: `${noCount * 10 + 12}px ${noCount * 15 + 24}px`,
                }}
                onClick={handleYesClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 1 }}
              >
                Sí
              </motion.button>

              {/* NO Button - Changes text */}
              <motion.button
                onClick={handleNoClick}
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-6 rounded shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 1 }}
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </motion.button>
            </div>
            
            {/* Funny helper text if she persists */}
            {noCount > 2 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-pink-400 italic text-sm"
              >
                (El botón verde se ve muy tentador... 😏)
              </motion.p>
            )}
          </div>
        )}
      </div>

      <footer className="absolute bottom-4 text-pink-400 text-xs">
        Hecho con mucho amor 💖
      </footer>
    </div>
  );
};

export default App;
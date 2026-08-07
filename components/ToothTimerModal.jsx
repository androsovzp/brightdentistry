import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Sparkles, Smile, Trophy } from 'lucide-react';
import { useCart } from '@/lib/store';

const BRUSHING_TIPS = [
  '🪥 Тримайте щітку під кутом 45° до поверхні зуба, м’якими рухами вимітайте лише від ясни. Жувальні поверхні рухом щітки вперед-назад.',
  '🦷 Приділіть по 30 секунд кожній з 4 квадрантів ротової порожнини!',
  '🍓 Не забувайте про внутрішню поверхню зубів та язик.',
  '✨ Зубна щітка Curaprox з 5460 щетинками робить дива без натиску!',
  '💖 Після чищення скористайтеся ремінералізуючим гелем Tooth Mousse.',
];

export default function ToothTimerModal() {
  const { isTimerOpen, setIsTimerOpen, showToast } = useCart();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      showToast('🎉 Вітаємо! 2 хвилини минули — твоя посмішка сяє на всі 100%! 💖');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, showToast]);

  // Rotate tips every 15 seconds while running
  useEffect(() => {
    if (!isRunning) return;
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % BRUSHING_TIPS.length);
    }, 12000);
    return () => clearInterval(tipInterval);
  }, [isRunning]);

  if (!isTimerOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const progressPercent = ((120 - timeLeft) / 120) * 100;
  const strokeDashoffset = 440 - (440 * progressPercent) / 100;

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(120);
    setTipIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden text-slate-800 text-center">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-brand-600 via-rosebrand-500 to-brand-500 p-5 text-white relative">
          <button
            onClick={() => setIsTimerOpen(false)}
            className="absolute right-4 top-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>2-Хвилиний Рожевий Таймер</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl">
            Час чистити зуби! 🪥✨
          </h3>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 flex flex-col items-center">
          
          {/* Animated Mascot Tooth & Circular Progress Bar */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            
            {/* SVG Circular Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                className="text-rose-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                className="text-brand-500 transition-all duration-1000 ease-linear"
                strokeWidth="10"
                strokeDasharray="440"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Content: Tooth Icon & Countdown */}
            <div className="absolute flex flex-col items-center justify-center text-center space-y-1">
              <div className={`text-4xl transition-transform duration-300 ${isRunning ? 'animate-bounce' : ''}`}>
                🦷
              </div>
              <div className="font-heading font-extrabold text-3xl text-slate-900 tracking-tight">
                {formattedTime}
              </div>
              <div className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">
                {timeLeft === 0 ? 'Завершено!' : isRunning ? 'Чистимо...' : 'Пауза'}
              </div>
            </div>
          </div>

          {/* Tip Box */}
          <div className="w-full p-4 bg-rose-50/80 rounded-2xl border border-rose-100 text-xs text-slate-700 font-medium leading-relaxed min-h-[64px] flex items-center justify-center">
            {timeLeft === 0 ? (
              <div className="flex items-center gap-2 text-brand-700 font-bold">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Чудова робота! Ваша емаль каже дякую! 💖</span>
              </div>
            ) : (
              <span>{BRUSHING_TIPS[tipIndex]}</span>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 w-full">
            <button
              onClick={handleReset}
              className="p-3 bg-rose-100 hover:bg-rose-200 text-brand-700 rounded-2xl transition-colors font-bold text-xs flex items-center gap-1.5"
              title="Скинути таймер"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Скинути</span>
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-3.5 rounded-2xl font-extrabold text-xs text-white shadow-pink-soft hover:shadow-pink-glow transition-all flex items-center gap-2 active:scale-95 ${
                isRunning
                  ? 'bg-rosebrand-600 hover:bg-rosebrand-700'
                  : 'bg-brand-600 hover:bg-brand-700'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Пауза</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{timeLeft === 120 ? 'Почати чищення' : 'Продовжити'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

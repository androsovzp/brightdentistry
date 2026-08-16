import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store';
import { getProducts } from '@/lib/data';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Який твій головний ранковий ритуал?',
    subtitle: 'Це допоможе нам зрозуміти навантаження на емаль',
    options: [
      {
        text: '☕ Ароматна кава або міцний чай',
        trait: 'coffee',
        icon: '☕',
      },
      {
        text: '🍓 Рожевий фреш / ягідний смузі',
        trait: 'fresh',
        icon: '🍓',
      },
      {
        text: '🧊 Холодна вода з лимоном',
        trait: 'sensitive',
        icon: '🧊',
      },
    ],
  },
  {
    id: 2,
    question: 'Скільки хвилин чесно чистиш зуби?',
    subtitle: 'Будьмо відвертими, тут немає правильних відповідностей 😉',
    options: [
      {
        text: '⏱️ Чесні 2 хвилини щоранку й щовечора!',
        trait: 'pro',
        icon: '⏱️',
      },
      {
        text: '⚡ Швидкі 45 секунд і побіг підкорювати світ',
        trait: 'express',
        icon: '⚡',
      },
      {
        text: '🪥 Залежить від того, наскільки сплю на ходу',
        trait: 'casual',
        icon: '🪥',
      },
    ],
  },
  {
    id: 3,
    question: 'Який рожевий вайб тобі найближчий?',
    subtitle: 'Обирай стиль своєї ідеальної усмішки',
    options: [
      {
        text: '💅 Тотальний гламур & сліпуче сяйво білосніжних зубів',
        trait: 'shine',
        icon: '✨',
      },
      {
        text: '🌿 Лагідний захист та турбота про емаль і ясна',
        trait: 'gentle',
        icon: '🌿',
      },
      {
        text: '🎀 Свіжість та захист від карієсу для всієї родини',
        trait: 'family',
        icon: '🎀',
      },
    ],
  },
];

export default function PinkQuizModal() {
  const { isQuizOpen, setIsQuizOpen, setActiveModalProduct, addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  if (!isQuizOpen) return null;

  const products = getProducts();

  const handleSelectOption = (option) => {
    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(nextAnswers);
    }
  };

  const calculateResult = (userAnswers) => {
    const coffeeChoice = userAnswers.some((a) => a.trait === 'coffee');
    const shineChoice = userAnswers.some((a) => a.trait === 'shine');
    const sensitiveChoice = userAnswers.some((a) => a.trait === 'sensitive' || a.trait === 'gentle');

    let recommendedProducts = [];
    let title = '';
    let description = '';
    let badge = '';

    if (shineChoice || coffeeChoice) {
      title = '💅 Рожевий Сяючий Гламур';
      badge = 'Шик & Білосніжність';
      description =
        'Ви полюбляєте яскраві моменти та каву! Для вашої усмішки ідеально підійде відбілюючий та захисний догляд від BioRepair та Curaprox.';
      recommendedProducts = products.filter(
        (p) => p.category === 'Дорослі пасти' || p.category === 'Щітки'
      ).slice(0, 3);
    } else if (sensitiveChoice) {
      title = '💎 Захисник Шовкової Емалі';
      badge = 'Ремінералізація';
      description =
        'Вашій емалі потрібна ніжна турбота та ремінералізація! Гелі Tooth Mousse та пасти BioRepair відновлять емаль і знімуть чутливість.';
      recommendedProducts = products.filter(
        (p) => p.category === 'Мінералізація' || p.category === 'Дорослі пасти'
      ).slice(0, 3);
    } else {
      title = '🍓 Ягідний Fresh Вайб';
      badge = 'Комплексний захист';
      description =
        'Ви цінуєте якісний догляд і легкість! Рекомендуємо ультрам’які щітки Curaprox та смачні пасти для всієї родини.';
      recommendedProducts = products.filter(
        (p) => p.category === 'Дитячі пасти' || p.category === 'Додаткові засоби' || p.category === 'Щітки'
      ).slice(0, 3);
    }

    setResult({
      title,
      badge,
      description,
      recommendedProducts,
    });
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden text-slate-800">
        
        {/* Top Gradient Bar & Close Button */}
        <div className="bg-gradient-to-r from-brand-600 via-rosebrand-500 to-brand-500 p-5 text-white relative">
          <button
            onClick={() => setIsQuizOpen(false)}
            className="absolute right-4 top-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow" />
            </span>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl">
                Pink Tooth Routine Quiz 💖
              </h3>
              <p className="text-white/80 text-xs font-medium">
                Знайди свій ідеальний рожевий догляд за 30 секунд
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {!result ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
                <span>Питання {currentStep + 1} з {QUIZ_QUESTIONS.length}</span>
                <span className="text-brand-600 font-extrabold">
                  {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-rose-100 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-rosebrand-500 transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Current Question */}
              <div className="space-y-1 mb-6 text-center">
                <h4 className="font-heading font-bold text-xl text-slate-900">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h4>
                <p className="text-slate-500 text-xs">
                  {QUIZ_QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className="w-full p-4 rounded-2xl border-2 border-rose-100 hover:border-brand-400 bg-rose-50/40 hover:bg-rose-50 text-left transition-all duration-200 flex items-center justify-between group active:scale-98 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-brand-700">
                        {option.text}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Display */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="inline-block px-3 py-1 bg-brand-100 text-brand-700 font-bold text-xs rounded-full uppercase tracking-wider mb-1">
                  {result.badge}
                </div>
                <h4 className="font-heading font-extrabold text-2xl text-slate-900">
                  {result.title}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-medium">
                  {result.description}
                </p>
              </div>

              {/* Recommended Products Grid */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Рекомендовані товари для вас:
                </div>
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {result.recommendedProducts.map((p) => {
                    // Clean redundant prefix for ultra-compact display
                    const cleanTitle = p.title.replace(/^Зубна паста\s+/i, '');

                    return (
                      <div
                        key={p.id}
                        className="p-3 bg-rose-50/70 rounded-2xl border border-rose-100 flex items-center justify-between gap-2.5 hover:bg-rose-100/60 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <img
                            src={p.image || '/images/products/placeholder.webp'}
                            alt={p.title}
                            className="w-11 h-11 object-contain bg-white rounded-xl p-1 border border-rose-100 shrink-0"
                            onError={(e) => {
                              e.target.src = '/images/products/placeholder.webp';
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 leading-tight line-clamp-2">
                              {cleanTitle}
                            </div>
                            <div className="text-[11px] font-extrabold text-brand-600 mt-0.5">
                              {p.priceFormatted}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setIsQuizOpen(false);
                              setActiveModalProduct(p);
                            }}
                            className="px-2.5 py-1.5 bg-white text-slate-700 hover:text-brand-600 border border-rose-200 rounded-xl text-[11px] font-bold transition-colors shadow-2xs"
                          >
                            Детальніше
                          </button>
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-colors shadow-2xs"
                            title="Додати в кошик"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reset Quiz Button */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Пройти тест ще раз
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

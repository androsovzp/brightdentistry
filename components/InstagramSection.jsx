import React from 'react';
import { Instagram, Heart, Sparkles, ExternalLink, MessageCircle } from 'lucide-react';

const INSTA_POSTS = [
  {
    id: 1,
    title: 'Рожева посилочка Tooth Mousse 🎀',
    likes: '248',
    tag: '#BrightDentistry',
    imgBg: 'from-pink-400 to-rose-500',
    emoji: '📦💖',
  },
  {
    id: 2,
    title: 'Curaprox 5460 - тотальний рожевий любов 🪥',
    likes: '312',
    tag: '#PinkCare',
    imgBg: 'from-rose-400 to-pink-600',
    emoji: '🪥✨',
  },
  {
    id: 3,
    title: 'Посмішка після ремінералізації BioRepair 💎',
    likes: '420',
    tag: '#ВінницяСтоматологія',
    imgBg: 'from-fuchsia-400 to-pink-500',
    emoji: '😁💎',
  },
  {
    id: 4,
    title: 'Дитячі смачні пасти без цукру 👶🍓',
    likes: '189',
    tag: '#HappyKids',
    imgBg: 'from-pink-300 to-rose-400',
    emoji: '🍓👶',
  },
];

export default function InstagramSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-br from-pink-50 via-rose-50/60 to-white rounded-3xl p-6 sm:p-10 border border-rose-100/90 shadow-2xs relative overflow-hidden">
        
        {/* Background Sparkles */}
        <div className="absolute top-4 right-6 text-brand-300 text-3xl animate-float-sparkle pointer-events-none">
          ✨
        </div>
        <div className="absolute bottom-6 left-6 text-pink-300 text-2xl animate-float-sparkle pointer-events-none delay-500">
          💖
        </div>

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-rose-200 text-brand-700 text-xs font-bold rounded-full mb-2 shadow-2xs">
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>@bright_dentistry.ua</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              Bright Dentistry Aesthetic 📸 💖
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Слідкуйте за нашими рожевими розпаковками, порадами стоматологів клініки у Вінниці та реальними відгуками пацієнтів!
            </p>
          </div>

          <a
            href="https://www.instagram.com/bright_dentistry.ua/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-brand-600 hover:from-pink-600 hover:to-brand-700 text-white rounded-full font-extrabold text-xs flex items-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95 shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Підписатися в Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Polaroid Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/bright_dentistry.ua/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 block"
            >
              {/* Image Preview Box */}
              <div className={`w-full h-44 rounded-xl bg-gradient-to-tr ${post.imgBg} flex flex-col items-center justify-center text-white relative overflow-hidden p-4 text-center group-hover:scale-[1.02] transition-transform`}>
                <div className="text-4xl mb-2 drop-shadow-md">{post.emoji}</div>
                <div className="text-xs font-extrabold drop-shadow-sm px-2">
                  {post.title}
                </div>
                
                {/* Instagram Hover Badge */}
                <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                  <Instagram className="w-5 h-5" />
                  <span>Переглянути в IG</span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                <span className="text-brand-600 font-bold">{post.tag}</span>
                <div className="flex items-center gap-1 text-pink-600">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

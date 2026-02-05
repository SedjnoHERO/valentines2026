import { useEffect, useState } from 'react';
import './App.css';

const correct = ['Будешь', 'моим', 'Валентином', 'Динара?'];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default function App() {
  const [step, setStep] = useState(1);
  const [beats, setBeats] = useState(0);

  const [placed, setPlaced] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'bg-heart';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = 8 + Math.random() * 6 + 's';
      heart.style.opacity = Math.random() * 0.5 + 0.2;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 14000);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 3) {
      setShuffled(shuffle(correct));
      setPlaced([]);
    }
  }, [step]);

  if (step === 1) {
    return (
      <div className="screen fade">
        <h1>Динара</h1>
        <p>У меня есть к тебе один вопрос</p>
        <button
          onTouchStart={() => setStep(2)}
          onClick={() => setStep(2)}>
          Продолжить
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="screen fade">
        <p>Дотронься до моего сердца</p>

        <div className="heart-slot">
          <div
            className="heart-big"
            style={{ '--scale': 1 + beats * 0.08 }}
            onTouchStart={() => {
              setBeats(v => {
                if (v + 1 >= 12) {
                  setStep(3);
                  return v;
                }
                return v + 1;
              });
            }}
            onClick={() => {
              setBeats(v => {
                if (v + 1 >= 12) {
                  setStep(3);
                  return v;
                }
                return v + 1;
              });
            }}>
            <span className="heart-text">ЖМИ</span>
          </div>
        </div>

        <span className="hint">
          {
            [
              'чуть ближе',
              'ещё',
              'я чувствую',
              'почти',
              'ещё чуть-чуть',
              'вот оно',
            ][Math.min(beats, 5)]
          }
        </span>
      </div>
    );
  }

  if (step === 3) {
    const nextWord = correct[placed.length];
    const completed = placed.length === correct.length;

    return (
      <div className="screen fade">
        {!completed && (
          <>
            <p>Собери фразу</p>
            <span className="hint">Выбирай слова по порядку</span>

            <div className="sentence">
              {placed.map(w => (
                <span
                  key={w}
                  className="word fixed">
                  {w}
                </span>
              ))}
            </div>

            <div className="words">
              {shuffled.map(w => (
                <span
                  key={w}
                  className={`word ${wrong && w !== nextWord ? 'shake' : ''}`}
                  onTouchStart={() => {
                    if (w === nextWord) {
                      setPlaced(p => [...p, w]);
                      setShuffled(s => s.filter(x => x !== w));
                      setWrong(false);
                    } else {
                      setWrong(true);
                      setTimeout(() => setWrong(false), 300);
                    }
                  }}
                  onClick={() => {
                    if (w === nextWord) {
                      setPlaced(p => [...p, w]);
                      setShuffled(s => s.filter(x => x !== w));
                      setWrong(false);
                    } else {
                      setWrong(true);
                      setTimeout(() => setWrong(false), 300);
                    }
                  }}>
                  {w}
                </span>
              ))}
            </div>
          </>
        )}

        {completed && (
          <div className="final soft">
            <img
              src="/public/kitty.png"
              alt="котик"
              className="kitty"
            />
            <h1>Будешь моим Валентином, Динара? 💖</h1>
            <button
              onTouchStart={() => setStep(4)}
              onClick={() => setStep(4)}>
              Да
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="screen fade">
      <h1>Я очень счастлив 💗</h1>
      <p>Спасибо тебе, пердюля </p>
      <p>Ты лучшая! 😘</p>

      <p className="leavetext">(можно выходить с сайта)</p>
    </div>
  );
}

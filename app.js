const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const playButton = document.querySelector('.play-button');
const musicCard = document.querySelector('.music-card');
const playIcon = document.querySelector('.play-icon');
const volumeInput = document.querySelector('.volume-control input');
const quoteButton = document.querySelector('.refresh-quote');
const quoteElement = document.querySelector('.quote-card p');

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('.note-date').textContent = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' }).format(new Date()).toUpperCase();

if (localStorage.getItem('ane-theme') === 'dark') body.classList.add('dark');
themeButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('ane-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

let audioContext;
let musicTimer;
let masterGain;
let nextNoteTime = 0;
let noteIndex = 0;
let isPlaying = false;
const notes = [261.63, 329.63, 392, 493.88, 392, 329.63, 293.66, 349.23];

function playTone(frequency, time) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.11, time + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.85);
  oscillator.connect(gain).connect(masterGain);
  oscillator.start(time);
  oscillator.stop(time + 0.9);
}

function scheduleMusic() {
  while (nextNoteTime < audioContext.currentTime + 0.35) {
    playTone(notes[noteIndex % notes.length], nextNoteTime);
    if (noteIndex % 4 === 0) playTone(notes[(noteIndex + 2) % notes.length] / 2, nextNoteTime);
    nextNoteTime += 0.44;
    noteIndex += 1;
  }
}

function startMusic() {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  masterGain = masterGain || audioContext.createGain();
  masterGain.gain.value = Number(volumeInput.value) / 100;
  masterGain.connect(audioContext.destination);
  audioContext.resume();
  nextNoteTime = audioContext.currentTime;
  musicTimer = window.setInterval(scheduleMusic, 80);
  isPlaying = true;
  musicCard.classList.add('playing');
  playIcon.textContent = 'Ⅱ';
  playButton.setAttribute('aria-label', '暂停背景音乐');
}

function stopMusic() {
  window.clearInterval(musicTimer);
  isPlaying = false;
  musicCard.classList.remove('playing');
  playIcon.textContent = '▶';
  playButton.setAttribute('aria-label', '播放背景音乐');
}

playButton.addEventListener('click', () => isPlaying ? stopMusic() : startMusic());
volumeInput.addEventListener('input', () => { if (masterGain) masterGain.gain.value = Number(volumeInput.value) / 100; });

const quotes = ['慢一点也没关系，<br />只要方向是自己选的。', '保持热爱，<br />奔赴下一场山海。', '把平凡的日子，<br />过成自己的作品。', '想法要落地，<br />灵感才有回声。'];
let quoteIndex = 0;
quoteButton.addEventListener('click', () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteElement.style.opacity = '0';
  window.setTimeout(() => { quoteElement.innerHTML = quotes[quoteIndex]; quoteElement.style.opacity = '1'; }, 160);
});

document.querySelector('.back-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

import { writable } from 'svelte/store';

export const frequencyData = writable<number[]>([])
export const currentTime = writable(0)
export const duration = writable(0)
export const isPlaying = writable(false)
export const fileName = writable("")

const FFT_SIZE = 256

let audio: HTMLAudioElement;
let context: AudioContext;
let timeAnimationFrame = 0;
let source: MediaElementAudioSourceNode;
let analyser: AnalyserNode;
let dataArray: Uint8Array;

const updateTime = () => {
  currentTime.set(audio.currentTime)
  analyser.getByteFrequencyData(dataArray)
  frequencyData.set(Array.from(dataArray))
  timeAnimationFrame = requestAnimationFrame(updateTime)
}

const diminishFrequencyData = () => {
  frequencyData.update(data => data.map(d => d * 0.9))
  timeAnimationFrame = requestAnimationFrame(diminishFrequencyData)
}

export const loadAudioFile = async (file: File) => {
  fileName.set(file.name)
  audio = new Audio(URL.createObjectURL(file))
  audio.setAttribute("preload", "metadata")
  audio.addEventListener('loadedmetadata', () => {
    duration.set(audio.duration)
  })
  audio.addEventListener("ended", () => {
    pause()
    seek(0)
  })
  audio.load()
  currentTime.set(0)
  duration.set(audio.duration)

  // Set up audio context
  context = new AudioContext()
  source = context.createMediaElementSource(audio)
  analyser = context.createAnalyser()
  analyser.fftSize = FFT_SIZE

  source.connect(analyser)
  analyser.connect(context.destination)
}

export const play = () => {
  audio.play()
  isPlaying.set(true)
  dataArray = new Uint8Array(analyser.frequencyBinCount)
  cancelAnimationFrame(timeAnimationFrame)
  timeAnimationFrame = requestAnimationFrame(updateTime)
}

export const pause = () => {
  audio.pause()
  isPlaying.set(false)
  cancelAnimationFrame(timeAnimationFrame)
  timeAnimationFrame = requestAnimationFrame(diminishFrequencyData)
}

export const seek = (time: number) => {
  audio.pause()
  currentTime.set(time)
  audio.currentTime = time
}

export const timestamp = (time: number) => {
  const round = Math.round(time);
  const minutes = Math.floor(round / 60);
  const seconds = round % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

import { writable } from 'svelte/store';

export const frequencyData = writable<number[]>([])
export const waveformData = writable<number[]>([])
export const currentTime = writable(0)
export const duration = writable(0)
export const isPlaying = writable(false)
export const fileName = writable("")

const FFT_SIZE = 256
const SAMPLES = 60;

let audio: HTMLAudioElement;
let context: AudioContext;
let timeAnimationFrame = 0;
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

const processAudioFile = async (file: File) => {
  const url = URL.createObjectURL(file)
  const result = await fetch(url)
  const arrayBuffer = await result.arrayBuffer()
  const context = new AudioContext()
  const audioBuffer = await context.decodeAudioData(arrayBuffer)
  currentTime.set(0)
  duration.set(audioBuffer.duration)

  const channelData = audioBuffer.getChannelData(0)
  const blockSize = Math.floor(channelData.length / SAMPLES)
  const sampledChannelData: number[] = []
  for (let i = 0; i < SAMPLES; i++) {
    let start = i * blockSize
    let sum = 0
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(channelData[start + j])
    }
    sampledChannelData.push(sum / blockSize)
  }
  const multiplier = 1 / Math.max(...sampledChannelData)
  waveformData.set(sampledChannelData.map(d => d * multiplier))
}

export const loadAudioFile = async (file: File) => {
  fileName.set(file.name)
  await processAudioFile(file)
  audio = new Audio(URL.createObjectURL(file))
  audio.addEventListener("ended", () => {
    pause()
    seek(0)
  })

  // Set up audio context
  context = new AudioContext()
  const source = context.createMediaElementSource(audio)
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

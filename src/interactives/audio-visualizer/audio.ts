import { Readable, derived, writable } from 'svelte/store';

export const frequencyData = writable<number[]>([])
export const waveformData = writable<number[]>([])
export const currentTime = writable(0)
export const duration = writable(0)
export const isPlaying = writable(false)
export const fileName = writable("")

const FFT_SIZE = 256
const SAMPLES = 256;

let timeAnimationFrame = 0

let audio: HTMLAudioElement
let analyser: AnalyserNode

const updateTime = () => {
  currentTime.set(audio.currentTime)
  const dataArray = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(dataArray)
  frequencyData.set(Array.from(dataArray))
  timeAnimationFrame = requestAnimationFrame(updateTime)
}

const diminishFrequencyData = () => {
  frequencyData.update(data => data.map(d => d * 0.9))
  timeAnimationFrame = requestAnimationFrame(diminishFrequencyData)
}

const samplingData = (data: Float32Array, samples: number) => {
  const sampled: number[] = []
  const blockSize = Math.floor(data.length / SAMPLES)
  for (let i = 0; i < SAMPLES; i++) {
    let start = i * blockSize
    let sum = 0
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(data[start + j])
    }
    sampled.push(sum / blockSize)
  }
  return sampled
}

const extractWaveformData = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const context = new AudioContext()
  const audioBuffer = await context.decodeAudioData(arrayBuffer)

  const channelData = audioBuffer.getChannelData(0)
  const sampledChannelData = samplingData(channelData, SAMPLES)
  const multiplier = 1 / Math.max(...sampledChannelData)
  waveformData.set(sampledChannelData.map(d => d * multiplier))
}

const setupAnalyzer = (audio: HTMLAudioElement) => {
  const context = new AudioContext()
  const source = context.createMediaElementSource(audio)
  const analyser = context.createAnalyser()
  analyser.fftSize = FFT_SIZE
  source.connect(analyser)
  analyser.connect(context.destination)
  return analyser
}

export const loadAudioFile = async (file: File) => {
  fileName.set(file.name)
  audio = new Audio(URL.createObjectURL(file))
  audio.preload = "metadata"
  currentTime.set(0)
  audio.onloadedmetadata = () => {
    duration.set(audio.duration)
  }
  audio.onended = () => {
    pause()
    seek(0)
  }
  
  await extractWaveformData(file)
  analyser = setupAnalyzer(audio)
}

export const play = () => {
  audio.play()
  isPlaying.set(true)
  cancelAnimationFrame(timeAnimationFrame)
  timeAnimationFrame = requestAnimationFrame(updateTime)
}

export const pause = () => {
  audio.pause()
  isPlaying.set(false)
  cancelAnimationFrame(timeAnimationFrame)
  timeAnimationFrame = requestAnimationFrame(diminishFrequencyData)
}

export const toggle: Readable<() => void> = derived(isPlaying, ($isPlaying) => $isPlaying ? pause : play)

export const seek = (time: number) => {
  audio.pause()
  currentTime.set(time)
  audio.currentTime = time
}

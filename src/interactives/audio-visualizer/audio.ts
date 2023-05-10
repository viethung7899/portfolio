import {writable} from 'svelte/store'

export const rawData = writable<number[]>([])
export const currentTime = writable(0)
export const duration = writable(0)

let context: AudioContext;
let audioBuffer: AudioBuffer;
let source: AudioBufferSourceNode;
let animationFrame: number;

const update = () => {
  currentTime.set(context.currentTime)
  animationFrame = requestAnimationFrame(update)
}

export const loadAudioFile = async (file: File) => {
  const buffer = await file.arrayBuffer()
  context = new AudioContext()
  audioBuffer = await context.decodeAudioData(buffer)
  currentTime.set(0)
  duration.set(audioBuffer.duration)
  
  source = context.createBufferSource()
  source.buffer = audioBuffer

  source.connect(context.destination)

}

export const play = () => {
  source.start()
  animationFrame = requestAnimationFrame(update)
}

export const pause = () => {
  source.stop()
  cancelAnimationFrame(animationFrame)
}

export const startFromFile = async () => {
  const res = await fetch('/StarWars60.wav')
  const byteArray = await res.arrayBuffer()

  context = new AudioContext()
  const audioBuffer = await context.decodeAudioData(byteArray)

  const source = context.createBufferSource()
  source.buffer = audioBuffer

  const analyser = context.createAnalyser()
  analyser.fftSize = 512

  source.connect(analyser)
  analyser.connect(context.destination)
  source.start()

  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  const update = () => {
    analyser.getByteFrequencyData(dataArray)
    rawData.set(Array.from(dataArray))
    requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}
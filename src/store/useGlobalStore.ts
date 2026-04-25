import { create } from 'zustand'

interface GlobalState {
  velocity: number
  setVelocity: (v: number) => void
  assetsLoaded: boolean
  setAssetsLoaded: (state: boolean) => void
  loadProgress: number
  setLoadProgress: (progress: number) => void
  audioReady: boolean
  setAudioReady: (state: boolean) => void
  activeServiceIndex: number
  setActiveServiceIndex: (index: number) => void
  visionMode: boolean
  setVisionMode: (state: boolean) => void
  warpMode: boolean
  setWarpMode: (state: boolean) => void
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  velocity: 0,
  setVelocity: (v) => set({ velocity: v }),
  
  assetsLoaded: false,
  setAssetsLoaded: (state) => set({ assetsLoaded: state }),
  
  loadProgress: 0,
  setLoadProgress: (progress) => {
    set({ loadProgress: progress })
    if (progress >= 1 && get().audioReady) {
      set({ assetsLoaded: true })
    }
  },
  
  audioReady: false,
  setAudioReady: (state) => {
    set({ audioReady: state })
    if (state && get().loadProgress >= 1) {
      set({ assetsLoaded: true })
    }
  },

  activeServiceIndex: 0,
  setActiveServiceIndex: (index) => set({ activeServiceIndex: index }),

  visionMode: false,
  setVisionMode: (state) => set({ visionMode: state }),

  warpMode: false,
  setWarpMode: (state) => set({ warpMode: state })
}))

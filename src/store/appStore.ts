import { defineStore } from 'pinia'
import type { DomainDetailsApi, StateFlag } from '@/types/common'

interface State {
  data: DomainDetailsApi | null
  isPanelOpened: boolean
  isVerboseView: boolean
  isPageDataLoading: boolean
}

export const useAppStore = defineStore('appStore', {
  state: (): State => ({
    data: null,
    isPanelOpened: true,
    isVerboseView: false,
    isPageDataLoading: true
  }),
  getters: {
    activeStateFlags(state): StateFlag[] {
      return state.data!.state_flags.flags.filter((item) => item.active)
    }
  },
  actions: {
    async fetchData() {
      try {
        const response = await fetch('/src/assets/domain-detail.json')
        if (!response.ok) {
          throw new Error('Error from server')
        }
        this.data = await response.json()
      } catch (error) {
        console.error('Error in fetch data:')
        this.data = null
      } finally {
        this.isPageDataLoading = false
      }
    },
    togglePanel() {
      this.isPanelOpened = !this.isPanelOpened
    },
    updateSwitchValue() {
      this.isVerboseView = !this.isVerboseView
    }
  }
})

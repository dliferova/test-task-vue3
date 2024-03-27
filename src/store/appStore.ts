import { defineStore } from 'pinia'
import type { DomainDetailsApi, StateFlag } from '@/types/common'

interface State {
  verboseViewMode: boolean
  data: DomainDetailsApi | null
  isPanelOpened: boolean
  isPageDataLoading: boolean
}

export const useAppStore = defineStore('appStore', {
  state: (): State => ({
    isPanelOpened: true,
    verboseViewMode: false,
    isPageDataLoading: true,
    data: null
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
      this.verboseViewMode = !this.verboseViewMode
    }
  }
})

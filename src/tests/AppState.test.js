import { expect, describe, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import PageContent from '@/components/PageContent.vue'
import { createTestingPinia } from '@pinia/testing'
import { mockData } from './test-data.js'

describe('Data loading logic tests', () => {
  test('If data is not yet loaded, only page loading displayed', () => {
    render(PageContent, {
      props: {},
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              appStore: {
                data: null,
                isPanelOpened: true,
                isVerboseView: false,
                isPageDataLoading: true
              }
            }
          })
        ]
      }
    })

    const pageLoadingElement = screen.queryByText('Page loading...')
    const errorElement = screen.queryByText('Ooops, something went wrong... please try again')
    const dataElement = screen.queryByText('neviditelna-univerzita.cz')

    expect(pageLoadingElement).not.toBeNull()
    expect(errorElement).toBeNull()
    expect(dataElement).toBeNull()
  })

  test('If data loading errored, only error message displayed', () => {
    render(PageContent, {
      props: {},
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              appStore: {
                data: null,
                isPanelOpened: true,
                isVerboseView: false,
                isPageDataLoading: false
              }
            }
          })
        ]
      }
    })

    const pageLoadingElement = screen.queryByText('Page loading...')
    const errorElement = screen.queryByText('Ooops, something went wrong... please try again')
    const dataElement = screen.queryByText('neviditelna-univerzita.cz')

    expect(pageLoadingElement).toBeNull()
    expect(errorElement).not.toBeNull()
    expect(dataElement).toBeNull()
  })

  test('If data loading success, fqdn displayed', () => {
    render(PageContent, {
      props: {},
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              appStore: {
                data: mockData,
                isPanelOpened: true,
                isVerboseView: false,
                isPageDataLoading: false
              }
            }
          })
        ]
      }
    })

    const pageLoadingElement = screen.queryByText('Page loading...')
    const errorElement = screen.queryByText('Ooops, something went wrong... please try again')
    const dataElement = screen.queryByText(mockData.fqdn)

    expect(pageLoadingElement).toBeNull()
    expect(errorElement).toBeNull()
    expect(dataElement).not.toBeNull()
  })
})

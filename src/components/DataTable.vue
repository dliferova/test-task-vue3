<script setup lang="ts">
import { ref } from 'vue'
import InputSwitch from 'primevue/inputswitch'
import Button from 'primevue/button'
import type { DomainDetailsApi } from '@/types/common'

const domainDetails = ref<DomainDetailsApi | null>(null)

fetch('/src/assets/domain-detail.json')
  .then((response) => response.json())
  .then((data: DomainDetailsApi) => {
    console.log(data)
    domainDetails.value = data
  })

const checked = ref(false)

const administrativeContactsMock = ref([
  {
    handle: 'KNIHOVNIK',
    organization: 'Neviditelná univerzita',
    name: 'Knihovník',
    publish: {
      organization: true,
      name: true
    }
  },
  {
    handle: 'Test',
    organization: 'Neviditelná univerzita',
    name: 'Knihovník',
    publish: {
      organization: true,
      name: true
    }
  }
])
</script>

<template>
  <div v-if="domainDetails">
    <div class="pt-3 pr-6 pb-2 pl-6">
      <h1 class="text-xl font-bold m-0 mb-3">{{ domainDetails.fqdn }}</h1>
      <div class="inline-flex align-items-center mb-3">
        <InputSwitch inputId="switch-mode" v-model="checked" />
        <label class="ml-2" for="switch-mode">Verbose view</label>
      </div>

      <div class="grid-desktop-layout-columns">
        <div>
          <!-- Start card AuthInfo -->
          <div class="flex flex-column bg-white shadow-4 mb-4">
            <div class="pt-2 pr-1 pb-2 pl-3">
              <table>
                <tr>
                  <td>AuthInfo:</td>
                  <td>
                    <Button>Show</Button>
                  </td>
                </tr>
                <tr>
                  <td>Expires at:</td>
                  <td>{{ domainDetails.expires_at }}</td>
                </tr>
              </table>
            </div>
          </div>
          <!-- End card AuthInfo -->

          <!-- Start card Events -->
          <div class="flex flex-column bg-white shadow-4 mb-4">
            <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
              <p class="m-0 font-bold">Events:</p>
            </div>
            <div>
              <div class="pt-2 pr-1 pb-2 pl-3">
                <table>
                  <tr>
                    <td>Create date:</td>
                    <td>Jan 15, 2021 12:00:00 AM</td>
                    <td>Registrar:</td>
                    <td>REG-CZNIC</td>
                  </tr>
                  <tr>
                    <td>Update date:</td>
                    <td>Jan 15, 2021 12:00:00 AM</td>
                    <td>Registrar:</td>
                    <td>REG-CZNIC</td>
                  </tr>
                  <tr>
                    <td>Transfer date:</td>
                    <td>Jan 15, 2021 12:00:00 AM</td>
                    <td>Registrar:</td>
                    <td>REG-CZNIC</td>
                  </tr>
                  <tr>
                    <td>Delete date:</td>
                    <td>Jan 15, 2021 12:00:00 AM</td>
                    <td>Registrar:</td>
                    <td>REG-CZNIC</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- End card Events -->

          <!-- Start card state flags -->
          <div class="flex flex-column bg-white shadow-4 mb-4">
            <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
              <p class="m-0 font-bold">State flags:</p>
            </div>
            <div>
              <div class="pt-2 pr-1 pb-2 pl-3">
                <ul class="list">
                  <li
                    v-for="(flag, index) in domainDetails.state_flags.flags"
                    :key="index"
                    class="card__flag-description"
                    :class="{ green: flag.active, red: !flag.active }"
                  >
                    <span class="icon-wrapper">
                      <i
                        class="pi"
                        :class="{ 'pi-check': flag.active, 'pi-times': !flag.active }"
                        style="font-size: 0.7rem"
                        :style="{ color: flag.active ? 'green' : 'red' }"
                      ></i>
                    </span>
                    <p>{{ flag.description }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- End card state flags -->
        </div>

        <div>
          <!-- Start card owner, administrative contacts -->
          <div v-for="(contact, index) in administrativeContactsMock" :key="index">
            <div class="flex flex-column bg-white shadow-4 mb-4">
              <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
                <p class="m-0 font-bold">Owner:</p>
              </div>
              <div class="pt-2 pr-1 pb-2 pl-3">
                <table>
                  <tr>
                    <td class="font-bold">Handle:</td>
                    <td>{{ contact.handle }}</td>
                  </tr>
                  <tr>
                    <td class="font-bold">
                      <i
                        class="pi"
                        :class="{
                          'pi-eye': contact.publish.organization,
                          'pi-eye-slash': !contact.publish.organization
                        }"
                        style="color: green; font-size: 0.7rem"
                      ></i>
                      Organization:
                    </td>
                    <td>{{ contact.organization }}</td>
                  </tr>
                  <tr>
                    <td class="font-bold">
                      <i
                        class="pi"
                        :class="{
                          'pi-eye': contact.publish.organization,
                          'pi-eye-slash': !contact.publish.organization
                        }"
                        style="color: green; font-size: 0.7rem"
                      ></i>
                      Name:
                    </td>
                    <td>{{ contact.name }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- End card owner -->

          <!-- Start NSSet -->
          <div class="flex flex-column bg-white shadow-4 mb-4">
            <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
              <p class="m-0 font-bold">NSSet:</p>
            </div>
            <div class="pt-2 pr-1 pb-2 pl-3">Content</div>
          </div>
          <!-- End NSSet -->

          <!-- Start KeySet -->
          <div class="flex flex-column bg-white shadow-4 mb-4">
            <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
              <p class="m-0 font-bold">KeySet:</p>
            </div>
            <div class="pt-2 pr-1 pb-2 pl-3">Content</div>
          </div>
          <!-- End KeySet -->
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="inline-flex align-items-center">
      <i class="pi pi-spin pi-spinner text-2xl mr-3" />
      <p class="m-0 text-2xl">Loading...</p>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1023px) {
  .grid-desktop-layout-columns {
    display: grid;
    grid-template-columns: 60% 40%;
    column-gap: 2%;
  }
}
</style>

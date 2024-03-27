<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InputSwitch from 'primevue/inputswitch'
import Button from 'primevue/button'
import { useAppStore } from '@/store/appStore'

const isPageDataLoading = ref<boolean>(true)
const switchValue = ref<boolean>(false)
const appStore = useAppStore()

const fetchData = async () => {
  try {
    await appStore.fetchData()
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isPageDataLoading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <div v-if="isPageDataLoading">
    <div class="inline-flex align-items-center">
      <i class="pi pi-spin pi-spinner text-2xl mr-3" />
      <p class="m-0 text-2xl">Loading...</p>
    </div>
  </div>
  <div v-else>
    <div class="pt-3 pr-6 pb-2 pl-6">
      <h1 class="text-xl font-bold m-0 mb-3">{{ appStore.data!.fqdn }}</h1>
      <div class="inline-flex align-items-center mb-3">
        <InputSwitch
          inputId="switch-mode"
          v-model="switchValue"
          @change="appStore.updateSwitchValue"
        />
        <label class="ml-2" for="switch-mode">Verbose view</label>
      </div>

      <div class="grid-desktop-layout-columns">
        <div>
          <!-- Start card AuthInfo -->
          <div class="flex flex-column bg-white shadow-4 mb-4 text-sm">
            <div class="pt-2 pr-3 pb-2 pl-3">
              <table class="w-full">
                <tr class="two-columns-tr">
                  <td class="font-bold">AuthInfo:</td>
                  <td>
                    <Button class="p-disabled">Show</Button>
                  </td>
                </tr>
                <tr class="two-columns-tr">
                  <td class="font-bold">Expires at:</td>
                  <td>{{ appStore.data!.expires_at }}</td>
                </tr>
              </table>
            </div>
          </div>
          <!-- End card AuthInfo -->

          <!-- Start card Events -->
          <div class="flex flex-column bg-white shadow-4 mb-4 text-sm">
            <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
              <p class="m-0 font-bold">Events:</p>
            </div>
            <div>
              <div class="pt-2 pr-3 pb-2 pl-3">
                <table class="w-full">
                  <tr class="four-columns-tr">
                    <td class="font-bold">Create date:</td>
                    <td>{{ appStore.data!.events.registered.timestamp }}</td>
                    <td class="font-bold">Registrar:</td>
                    <td class="text-primary">
                      {{ appStore.data!.events.registered.registrar_handle }}
                    </td>
                  </tr>
                  <tr class="four-columns-tr">
                    <td class="font-bold">Update date:</td>
                    <td>{{ appStore.data!.events.updated.timestamp }}</td>
                    <td class="font-bold">Registrar:</td>
                    <td class="text-primary">
                      {{ appStore.data!.events.updated.registrar_handle }}
                    </td>
                  </tr>
                  <tr class="four-columns-tr">
                    <td class="font-bold">Transfer date:</td>
                    <td>{{ appStore.data!.events.transferred.timestamp }}</td>
                    <td class="font-bold">Registrar:</td>
                    <td class="text-primary">
                      {{ appStore.data!.events.transferred.registrar_handle }}
                    </td>
                  </tr>
                  <tr class="four-columns-tr">
                    <td class="font-bold">Delete date:</td>
                    <td v-if="appStore.data!.events.unregistered === null"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- End card Events -->

          <!-- Start card state flags -->
          <div class="flex flex-column bg-white shadow-4 mb-4 text-sm">
            <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
              <p class="m-0 font-bold">State flags:</p>
            </div>
            <div>
              <div class="pt-2 pr-3 pb-2 pl-3">
                <template v-if="!appStore.verboseViewMode">
                  <ul class="flex flex-column">
                    <li v-for="(flag, index) in appStore.activeStateFlags" :key="index">
                      <div class="inline-flex align-items-baseline">
                        <i
                          class="pi text-sm mr-1"
                          :class="{
                            'pi-check text-green-500': flag.active,
                            'pi-times text-red-500': !flag.active
                          }"
                        ></i>
                        <p
                          class="m-0"
                          :class="{
                            'text-green-500': flag.active,
                            'text-red-500': !flag.active
                          }"
                        >
                          {{ flag.description }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <ul class="fff">
                    <li
                      v-for="(flag, index) in appStore.data!.state_flags.flags"
                      :key="`state-flag-${index}`"
                    >
                      <div class="inline-flex align-items-baseline">
                        <i
                          class="pi text-sm mr-1"
                          :class="{
                            'pi-check text-green-500': flag.active,
                            'pi-times text-red-500': !flag.active
                          }"
                        ></i>
                        <p
                          class="m-0"
                          :class="{
                            'text-green-500': flag.active,
                            'text-red-500': !flag.active
                          }"
                        >
                          {{ flag.description }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </template>
              </div>
            </div>
          </div>
          <!-- End card state flags -->
        </div>

        <div>
          <!-- Start card owner-->
          <div>
            <div class="flex flex-column bg-white shadow-4 mb-4 text-sm">
              <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
                <p class="m-0 font-bold">Owner:</p>
              </div>
              <div class="pt-2 pr-3 pb-2 pl-3">
                <table class="w-full">
                  <tr class="two-columns-tr">
                    <td class="font-bold ml-4">Handle:</td>
                    <td class="text-primary">{{ appStore.data!.owner.handle }}</td>
                  </tr>
                  <tr class="two-columns-tr">
                    <td>
                      <i
                        class="pi text-sm mr-2"
                        :class="{
                          'pi-eye text-green-500': appStore.data!.owner.publish.organization,
                          'pi-eye-slash text-red-500': !appStore.data!.owner.publish.organization
                        }"
                      ></i>
                      <span class="font-bold">Organization:</span>
                    </td>
                    <td>{{ appStore.data!.owner.organization }}</td>
                  </tr>
                  <tr class="two-columns-tr">
                    <td class="font-bold">
                      <i
                        class="pi text-green-500 text-sm mr-2"
                        :class="{
                          'pi-eye': appStore.data!.owner.publish.organization,
                          'pi-eye-slash': !appStore.data!.owner.publish.organization
                        }"
                      ></i>
                      Name:
                    </td>
                    <td>{{ appStore.data!.owner.name }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- End card owner -->

          <!-- Start administrative contacts-->
          <template v-if="!appStore.verboseViewMode">
            <div>
              <div class="flex flex-column bg-white shadow-4 mb-4 text-sm">
                <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
                  <p class="m-0 font-bold">Administrative contacts:</p>
                </div>
                <div class="pt-2 pr-3 pb-2 pl-3">
                  <table class="w-full">
                    <tr
                      v-for="(contact, index) in appStore.data!.administrative_contacts"
                      :key="index"
                      class="two-columns-tr"
                    >
                      <td class="font-bold pr-4">{{ contact.handle }}:</td>
                      <td class="text-primary">{{ contact.handle }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              v-for="(contact, index) in appStore.data!.administrative_contacts"
              :key="`administrative-${index}`"
            >
              <div class="flex flex-column bg-white shadow-4 mb-4 text-sm">
                <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
                  <p class="m-0 font-bold">Administrative contacts:</p>
                </div>
                <div class="pt-2 pr-3 pb-2 pl-3">
                  <table class="w-full">
                    <tr class="two-columns-tr">
                      <td class="font-bold ml-4">Handle:</td>
                      <td class="text-primary">{{ contact.handle }}</td>
                    </tr>
                    <tr class="two-columns-tr">
                      <td>
                        <i
                          class="pi text-sm mr-2"
                          :class="{
                            'pi-eye text-green-500': contact.publish.organization,
                            'pi-eye-slash text-red-500': !contact.publish.organization
                          }"
                        ></i>
                        <span class="font-bold">Organization:</span>
                      </td>
                      <td>{{ contact.organization }}</td>
                    </tr>
                    <tr class="two-columns-tr">
                      <td class="font-bold">
                        <i
                          class="pi text-sm mr-2"
                          :class="{
                            'pi-eye text-green-500': contact.publish.name,
                            'pi-eye-slash text-red-500': !contact.publish.name
                          }"
                        ></i>
                        Name:
                      </td>
                      <td>{{ contact.name }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </template>
          <!-- End card owner-->

          <!-- Start NSSet -->
          <div class="flex flex-column bg-white shadow-4 mb-4 text-sm">
            <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
              <p class="m-0 font-bold">NSSet:</p>
            </div>
            <div class="pt-2 pr-3 pb-2 pl-3">
              <table class="w-full">
                <tr class="two-columns-tr">
                  <td class="font-bold">Handle:</td>
                  <td class="text-primary">{{ appStore.data!.nsset.handle }}</td>
                </tr>
                <tr class="two-columns-tr">
                  <td class="font-bold">Registrar:</td>
                  <td class="text-primary">{{ appStore.data!.nsset.registrar }}</td>
                </tr>
                <tr class="two-columns-tr">
                  <td class="font-bold">DNS:</td>
                  <td>
                    <ul class="flex flex-column">
                      <li
                        v-for="(dnsItem, index) in appStore.data!.nsset.dns"
                        :key="`dns-${index}`"
                      >
                        {{ dnsItem.name }}({{ dnsItem.ip_address }})
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!-- End NSSet -->

          <!-- Start KeySet -->
          <div class="flex flex-column bg-white shadow-4 mb-4 text-sm">
            <div class="bg-gray-200 border-bottom-1 border-400 pt-2 pr-1 pb-2 pl-3">
              <p class="m-0 font-bold">KeySet:</p>
            </div>
            <div class="pt-2 pr-3 pb-2 pl-3">
              <table class="w-full">
                <tr class="two-columns-tr">
                  <td class="font-bold">Handle:</td>
                  <td class="text-primary">{{ appStore.data!.keyset.handle }}</td>
                </tr>
                <tr class="two-columns-tr">
                  <td class="font-bold">Registrar:</td>
                  <td class="text-primary">{{ appStore.data!.nsset.registrar }}</td>
                </tr>
                <tr class="two-columns-tr">
                  <td class="font-bold">DNS:</td>
                  <td>
                    <ul class="flex flex-column">
                      <li
                        v-for="(dnsItem, index) in appStore.data!.keyset.dns_keys"
                        :key="`dns-${index}`"
                      >
                        {{ dnsItem }}
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!-- End KeySet -->
        </div>
      </div>
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

.two-columns-tr {
  max-width: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  column-gap: 20px;
}

.four-columns-tr {
  max-width: 100%;
  display: grid;
  grid-template-columns: 25% 35% max-content max-content;
  column-gap: 20px;
}

.test {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(7, max-content);
  colimn-gap: 20px;
}

.fff {
  column-count: 3;
  column-gap: 20px;
}
</style>

<template>
  <div class="display-grid desktop-table-layout w-full">
    <div>
      <!-- Start card AuthInfo -->
      <BaseCard card-size="large">
        <table class="w-full">
          <tr class="two-columns-tr">
            <td class="font-bold">AuthInfo:</td>
            <td>
              <Button @click="isAuthInfoModalVisible = true">Show</Button>
            </td>
          </tr>
          <tr class="two-columns-tr">
            <td class="font-bold">Expires at:</td>
            <td>{{ formatTime(props.data!.expires_at) }}</td>
          </tr>
        </table>
      </BaseCard>
      <!-- End card AuthInfo -->

      <!-- Start card Events -->
      <BaseCard
        card-size="large"
        heading="Events"
      >
        <table class="w-full">
          <tr class="four-columns-tr">
            <td class="font-bold">Create date:</td>
            <td>{{ formatTime(props.data!.events.registered.timestamp) }}</td>
            <td class="font-bold">Registrar:</td>
            <td>
              <a
                class="text-primary"
                href="#"
              >
                {{ props.data!.events.registered.registrar_handle }}
              </a>
            </td>
          </tr>
          <tr class="four-columns-tr">
            <td class="font-bold">Update date:</td>
            <td>{{ formatTime(props.data!.events.updated.timestamp) }}</td>
            <td class="font-bold">Registrar:</td>
            <td>
              <a
                class="text-primary"
                href="#"
              >
                {{ props.data!.events.updated.registrar_handle }}
              </a>
            </td>
          </tr>
          <tr class="four-columns-tr">
            <td class="font-bold">Transfer date:</td>
            <td>{{ formatTime(props.data!.events.transferred.timestamp) }}</td>
            <td class="font-bold">Registrar:</td>
            <td>
              <a
                class="text-primary"
                href="#"
              >
                {{ props.data!.events.transferred.registrar_handle }}
              </a>
            </td>
          </tr>
          <tr class="four-columns-tr">
            <td class="font-bold">Delete date:</td>
            <td v-if="props.data!.events.unregistered === null"></td>
          </tr>
        </table>
      </BaseCard>
      <!-- End card Events -->

      <!-- Start card state flags -->
      <BaseCard
        card-size="large"
        heading="State flags"
      >
        <div v-if="!props.isVerboseView">
          <ul class="flex flex-column">
            <li
              v-for="(flag, index) in appStore.activeStateFlags"
              :key="`flag-${index}`"
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
        </div>
        <div v-else>
          <ul class="display-grid flags-layout">
            <li
              v-for="(flag, index) in props.data!.state_flags.flags"
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
        </div>
      </BaseCard>
      <!-- End card state flags -->
    </div>

    <div>
      <!-- Start card owner-->
      <BaseCard
        card-size="small"
        heading="Owner"
      >
        <table class="w-full">
          <tr class="two-columns-tr">
            <td class="font-bold ml-4">Handle:</td>
            <td>
              <a
                class="text-primary"
                href="#"
                >{{ props.data!.owner.handle }}</a
              >
            </td>
          </tr>
          <tr class="two-columns-tr">
            <td>
              <i
                class="pi text-sm mr-2"
                :class="{
                  'pi-eye text-green-500': props.data!.owner.publish.organization,
                  'pi-eye-slash text-red-500': !props.data!.owner.publish.organization
                }"
              ></i>
              <span class="font-bold">Organization:</span>
            </td>
            <td>{{ props.data!.owner.organization }}</td>
          </tr>
          <tr class="two-columns-tr">
            <td class="font-bold">
              <i
                class="pi text-green-500 text-sm mr-2"
                :class="{
                  'pi-eye': props.data!.owner.publish.organization,
                  'pi-eye-slash': !props.data!.owner.publish.organization
                }"
              ></i>
              Name:
            </td>
            <td>{{ props.data!.owner.name }}</td>
          </tr>
        </table>
      </BaseCard>
      <!-- End card owner -->

      <!-- Start administrative contacts-->
      <div v-if="!props.isVerboseView">
        <BaseCard
          card-size="small"
          heading="Administrative contacts"
        >
          <table class="w-full">
            <tr
              v-for="(contact, index) in props.data!.administrative_contacts"
              :key="`contact-${index}`"
              class="two-columns-tr"
            >
              <td class="font-bold pr-4">{{ contact.handle }}:</td>
              <td>
                <a
                  class="text-primary"
                  href="#"
                >
                  {{ contact.handle }}
                </a>
              </td>
            </tr>
          </table>
        </BaseCard>
      </div>
      <div v-else>
        <div
          v-for="(contact, index) in props.data!.administrative_contacts"
          :key="`administrative-${index}`"
        >
          <BaseCard
            card-size="small"
            heading="Administrative contacts"
          >
            <table class="w-full">
              <tr class="two-columns-tr">
                <td class="font-bold ml-4">Handle:</td>
                <td>
                  <a
                    class="text-primary"
                    href="#"
                  >
                    {{ contact.handle }}
                  </a>
                </td>
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
          </BaseCard>
        </div>
      </div>
      <!-- End card owner-->

      <!-- Start NSSet -->
      <BaseCard
        card-size="small"
        heading="NSSet"
      >
        <table class="w-full">
          <tr class="two-columns-tr">
            <td class="font-bold">Handle:</td>
            <td>
              <a
                class="text-primary"
                href="#"
              >
                {{ props.data!.nsset.handle }}
              </a>
            </td>
          </tr>
          <tr class="two-columns-tr">
            <td class="font-bold">Registrar:</td>
            <td>
              <a
                class="text-primary"
                href="#"
              >
                {{ props.data!.nsset.registrar }}
              </a>
            </td>
          </tr>
          <tr class="two-columns-tr">
            <td class="font-bold">DNS:</td>
            <td>
              <ul class="flex flex-column">
                <li
                  v-for="(dnsItem, index) in props.data!.nsset.dns"
                  :key="`dns-${index}`"
                >
                  {{ dnsItem.name }} ({{ dnsItem.ip_address }})
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </BaseCard>
      <!-- End NSSet -->

      <!-- Start KeySet -->
      <BaseCard
        card-size="small"
        heading="KeySet"
      >
        <table class="w-full word-break">
          <tr class="two-columns-tr">
            <td class="font-bold">Handle:</td>
            <td>
              <a
                class="text-primary"
                href="#"
              >
                {{ props.data!.keyset.handle }}
              </a>
            </td>
          </tr>
          <tr class="two-columns-tr">
            <td class="font-bold">Registrar:</td>
            <td>
              <a
                class="text-primary"
                href="#"
              >
                {{ props.data!.nsset.registrar }}
              </a>
            </td>
          </tr>
          <tr class="two-columns-tr">
            <td class="font-bold">DNS keys:</td>
            <td>
              <ul class="flex flex-column">
                <li
                  v-for="(dnsItem, index) in props.data!.keyset.dns_keys"
                  :key="`dns-keys-${index}`"
                >
                  {{ dnsItem }}
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </BaseCard>
      <!-- End KeySet -->
    </div>
  </div>

  <!--Start modal -->
  <Dialog
    v-model:visible="isAuthInfoModalVisible"
    modal
    header="AuthInfo"
    :style="{ width: '25rem' }"
  >
    <span class="p-text-secondary block mb-1">Secret password is: </span>
    <Message
      :closable="false"
      severity="info"
      >p4dIdn!m&6dj
    </Message>
  </Dialog>
  <!--End modal -->
</template>

<script setup lang="ts">
import { formatTime } from '@/utils/utils'
import BaseCard from '@/components/ui/BaseCard.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import { ref } from 'vue'
import type { DomainDetailsApi } from '@/types/common'
import { useAppStore } from '@/store/appStore'

interface DataTableProps {
  data: DomainDetailsApi | null
  isVerboseView: boolean
}

const appStore = useAppStore()
const isAuthInfoModalVisible = ref(false)
const props = defineProps<DataTableProps>()
</script>

<style scoped>
.card tr {
  max-width: 100%;
  display: grid;
}

.card--small .two-columns-tr,
.card--large .two-columns-tr {
  grid-template-columns: 30% 60%;
  column-gap: 5%;
}

.card--large .four-columns-tr {
  grid-template-columns: 1fr;
  column-gap: 5%;
}

@media (min-width: 560px) and (max-width: 1023px) {
  .card--large .four-columns-tr {
    grid-template-columns: 30% 60%;
    column-gap: 5%;
  }
}

@media (min-width: 767px) {
  .flags-layout {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .card--large .four-columns-tr {
    grid-template-columns: 30% 30% repeat(2, max-content);
    column-gap: 5%;
  }
}

@media (min-width: 1230px) {
  .desktop-table-layout {
    grid-template-columns: 60% 38%;
    column-gap: 2%;
  }

  .card--small .two-columns-tr {
    grid-template-columns: 40% 60%;
    column-gap: 0;
  }

  .card--large .two-columns-tr {
    grid-template-columns: 25% 70%;
    column-gap: 5%;
  }

  .card--large .four-columns-tr {
    grid-template-columns: 25% 30% repeat(2, max-content);
    column-gap: 5%;
  }
}
</style>

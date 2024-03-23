export interface AdministrativeContactInterface {
  handle: string
  organization: string
  name: string
  publish: {
    organization: boolean
    name: boolean
  }
}

export interface EventsInterface {}

export interface StateFlag {
  name: string
  active: boolean
  description: string
}

export interface DomainDetailsApi {
  fqdn: string
  nsset: {
    handle: string
    registrar: string
    dns: {
      name: string
      ip_address: string
    }[]
  }
  keyset: {
    handle: string
    registrar: string
    dns_keys: string[]
  }
  owner: {
    handle: string
    organization: string
    name: string
    publish: {
      organization: boolean
      name: boolean
    }
  }
  sponsoring_registrar: string
  administrative_contacts: {
    handle: string
    organization: string
    name: string
    publish: {
      organization: boolean
      name: boolean
    }
  }[]
  expires_at: string
  events: {
    registered: {
      timestamp: string
      registrar_handle: string
    }
    transferred: {
      timestamp: string
      registrar_handle: string
    }
    updated: {
      timestamp: string
      registrar_handle: string
    }
    unregistered: null
  }
  state_flags: {
    flags: {
      name: string
      active: boolean
      description: string
    }[]
    groups: string[][]
  }
}

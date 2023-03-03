import { getSites } from "@/services/talkee";

export const useTalkeeDataStore = defineStore("talkee-data", () => {
  // states
  const sites = ref<Array<Talkee.Site>>([]);
  const loading = ref(false);

  // getters
  const siteById = computed(() => {
    return (id: number) => {
      return sites.value.find((site) => site.id === id);
    };
  });

  // actions
  function addSites(_sites: Talkee.Site[]) {
    sites.value = _sites;
  }

  function addSite(site: Talkee.Site) {
    sites.value.push(site);
  }

  function updateSite(id: number, name: string, origins: string[]) {
    const index = sites.value.findIndex((s) => s.id === id);
    if (index >= 0) {
      const m = Object.assign({}, sites.value[index]);
      m.name = name;
      m.origins = origins;
      sites.value[index] = m;
    }
  }

  async function loadSites() {
    loading.value = true;
    console.log(loading.value)
    const resp = await getSites();
    addSites(resp);
    loading.value = false;
    console.log(loading.value)
    return resp;
  }

  return {
    // states
    sites,
    loading,

    // getters
    siteById,

    // actions
    addSite,
    addSites,
    updateSite,
    loadSites,
  };
}, { }
);

import { getApps } from "@/services/botastic";

export const useBotasticDataStore = defineStore("botastic-data", () => {
  // states
  const apps = ref<Array<Botastic.App>>([]);
  const loading = ref(false);

  // getters
  const appById = computed(() => {
    return (id: number) => {
      return apps.value.find((app) => app.id === id);
    };
  });
  const appByAppId = computed(() => {
    return (appID: string) => {
      return apps.value.find((app) => app.app_id === appID);
    };
  });

  // actions
  function addApps(_apps: Botastic.App[]) {
    apps.value = _apps;
  }

  function addApp(_app: Botastic.App) {
    apps.value.push(_app);
  }

  function updateApp(id: number, name: string) {
    const index = apps.value.findIndex((s) => s.id === id);
    if (index >= 0) {
      const m = Object.assign({}, apps.value[index]);
      m.name = name;
      apps.value[index] = m;
    }
  }

  async function loadApps() {
    loading.value = true;
    const resp = await getApps();
    addApps(resp);
    loading.value = false;
    return resp;
  }

  return {
    // states
    apps,
    loading,

    // getters
    appById,
    appByAppId,

    // actions
    addApp,
    addApps,
    updateApp,
    loadApps,
  };
}, { }
);

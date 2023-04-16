import { getApps, getBots, getMe, getOrderVariants } from "@/services/botastic";

export const useBotasticDataStore = defineStore("botastic-data", () => {
  // states
  const apps = ref<Array<Botastic.App>>([]);
  const bots = ref<Array<Botastic.Bot>>([]);
  const variants = ref<Array<any>>([]);
  const credits = ref<string>("0.00");
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

  function addBots(_bots: Botastic.Bot[]) {
    bots.value = _bots;
  }

  function addBot(_bot: Botastic.Bot) {
    bots.value.push(_bot);
  }

  function updateApp(id: number, name: string) {
    const index = apps.value.findIndex((s) => s.id === id);
    if (index >= 0) {
      const m = Object.assign({}, apps.value[index]);
      m.name = name;
      apps.value[index] = m;
    }
  }

  function updateBot(id: number, values = {}) {
    const index = apps.value.findIndex((s) => s.id === id);
    if (index >= 0) {
      let m = Object.assign({}, apps.value[index]);
      m = Object.assign(m, values);
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

  async function loadBots() {
    loading.value = true;
    const resp = await getBots();
    addBots(resp);
    loading.value = false;
    return resp;
  }

  async function loadMe() {
    loading.value = true;
    const resp = await getMe();
    credits.value = resp.credits;
    loading.value = false;
    return resp;
  }

  async function loadVariants() {
    loading.value = true;
    const resp = await getOrderVariants();
    variants.value = resp;
    loading.value = false;
    return resp;
  }

  return {
    // states
    apps,
    bots,
    credits,
    variants,
    loading,

    // getters
    appById,
    appByAppId,

    // actions
    addApp,
    addApps,
    addBot,
    addBots,
    updateApp,
    updateBot,
    loadApps,
    loadBots,
    loadMe,
    loadVariants,
  };
}, { }
);

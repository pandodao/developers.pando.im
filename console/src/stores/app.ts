export const useAppStore = defineStore(
  "app",
  () => {
    const settings = ref({
      currency: "USD",
      language: "en",
    });

    const drawer = ref(false);

    // actions
    function setSettings(newSettings: any) {
      settings.value = newSettings;
    }

    function setSetting(key: string, value: any) {
      (settings.value as any)[key] = value;
    }

    function setSidebarExpanded(value: boolean) {
      drawer.value = value;
    }

    return {
      settings,
      drawer,

      setSettings,
      setSetting,

      setSidebarExpanded,
    };
  },
  {
    persist: {
      paths: ["settings"],
    },
  }
);

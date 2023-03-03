import { getUsers } from "@/services/mixin";

export const useUserStore = defineStore(
  "user",
  () => {
    // states
    const users = ref<Record<string, Mixin.User>>({});

    // getters
    const user = computed(() =>
      (userId: string) => {
        return users.value[userId] || null;
      }
    );

    // actions
    function addUsers(newUsers: Mixin.User[]) {
      const um = Object.assign({}, users.value);
      for (let ix = 0; ix < newUsers.length; ix++) {
        um[newUsers[ix].user_id] = newUsers[ix];
      }
      users.value = um;
    }

    async function loadUsers(userIds: string[]) {
      const resp = await getUsers(userIds);
      console.log("loadUsers", resp);
      addUsers(resp);
    }

    function clear() {
      users.value = {};
    }

    return {
      // states
      users,

      // getters
      user,

      // actions
      addUsers,
      loadUsers,
      clear,
    };
  },
  { persist: { paths: ["users"] } }
);

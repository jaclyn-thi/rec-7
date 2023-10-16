import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    let blockedUsers = ref<Array<Record<string, string>>>([]);

    const blockUser = async (username: string) => {
      try {
        await fetchy(`api/block/${username}`, "POST");
      } catch {
        return;
      }
      updateBlockedUsers();
    };

    const unblockUser = async (username: string) => {
      try {
        await fetchy(`api/block/${username}`, "DELETE");
      } catch {
        return;
      }
      updateBlockedUsers();
    };

    const updateBlockedUsers = async () => {
        let blockedUsersResults;
        try {
            blockedUsersResults = await fetchy("api/block", "GET");
            blockedUsers.value = blockedUsersResults;
          } catch (_) {
            blockedUsers.value = [];
          }
        blockedUsers.value = blockedUsersResults;
    }

    return {
      blockedUsers,
      blockUser,
      unblockUser,
      updateBlockedUsers
    };
  },
  { persist: true },
);

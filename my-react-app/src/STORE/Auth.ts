import {create} from "zustand";
import { persist } from "zustand/middleware";
import type { AuthRes } from "../SERVICES/Auth/Model/AuthModel";

type AuthStore = {
    auth:AuthRes|null,
    setAuth:(auth:AuthRes)=>void
    disconnect:()=>void
}

const useAuthStore = create<AuthStore>()(
    persist(
      (set) => ({
        auth: null,
        setAuth: (auth) => set({ auth }),
        disconnect: () => set({ auth: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  );
  
export {useAuthStore};
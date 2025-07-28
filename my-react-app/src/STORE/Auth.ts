import {create} from "zustand";
import type { AuthRes } from "../SERVICES/Auth/Model/AuthModel";

type AuthStore = {
    auth:AuthRes|null,
    setAuth:(auth:AuthRes)=>void
    disconnect:()=>void
}

const useAuthStore = create<AuthStore>((set)=>({
    auth:null,
    setAuth:(auth)=>set({auth}),
    disconnect:()=>set({auth:null})
}))

export {useAuthStore};
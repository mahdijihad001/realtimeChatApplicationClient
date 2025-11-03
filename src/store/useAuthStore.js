import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: false,

    checkingAuth: async () => {
        try {
            const result = await axiosInstance.get("/user/all");
            set({ authUser: result.data });
        } catch (error) {
            console.log("Auth Checking error", error);
            set({ authUser: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    }


}))
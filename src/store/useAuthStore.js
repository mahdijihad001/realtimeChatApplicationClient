import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    checkingAuth: async () => {
        try {
            const result = await axiosInstance.get("/user/check");
            set({ authUser: result.data });
        } catch (error) {
            console.log("Auth Checking error", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post(`user/create`, data);
            set({ authUser: res.data });
            toast.success('Account created successfully');
        } catch (error) {
            toast.error("Account creaation faild");
        } finally {
            set({ isSigningUp: false });
        }
    }


}))
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isLogedIn: false,
  isSigningUp: false,

  checkingAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/user/check");
      set({ authUser: res.data });
    } catch (err) {
      set({ authUser: null });
      console.log("Auth check failed:", err);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/create", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (err) {
      toast.error("SignUp failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async (data) => {
    set({ isLogedIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error("Login failed");
      console.log(err);
    } finally {
      set({ isLogedIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
      console.log(err);
    }
  },
}));

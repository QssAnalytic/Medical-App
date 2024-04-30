import { create } from "zustand";
import { getData, postData } from "../api/requests";
import { authEndpoints } from "../api/endpoints";
import { SignInPayload, SignInResponse, User } from "@/pages/login/models";

type State = {
  user: User | null;
  isAuth: boolean | undefined;
  isUserLoading: boolean | undefined;
  isSignInLoading: boolean | undefined;
};

type Action = {
  currentUser: () => void;
  signIn: (data: SignInPayload) => void;
  signOut: () => void;
  setIsAuth: (isAuth: boolean) => void;
  getNewAccessToken: () => any;
};

type UseAuthStore = Action & State;

const useAuthStore = create<UseAuthStore>((set, get) => ({
  user: null,
  isSignInLoading: false,
  isUserLoading: false,
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
  currentUser: async () => {
    set({ isUserLoading: true });
    try {
      const currentUser = await getData(authEndpoints.currentUser);
      set({ user: currentUser });
      set({ isAuth: true });
    } catch (err) {
      set({ user: null });
      set({ isAuth: false });
    }
    set({ isUserLoading: false });
  },
  signIn: async (data: SignInPayload) => {
    set({ isSignInLoading: true });
    try {
      const { access, refresh } = (await postData(authEndpoints.signIn, { arg: data })) as unknown as SignInResponse;
      localStorage.setItem("accessToken", `Bearer ${access}`);
      localStorage.setItem("refreshToken", `Bearer ${refresh}`);
      get().currentUser();
    } catch (err) {
      console.log("signIn error", err);
    }
    set({ isSignInLoading: false });
  },

  signOut: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ user: null });
    set({ isAuth: false });
  },

  getNewAccessToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const { access } = (await postData(authEndpoints.refresh, {
      arg: { refresh: refreshToken?.replace("Bearer", "") },
    })) as unknown as SignInResponse;
    localStorage.setItem("accessToken", `Bearer ${access}`);
    set({ isAuth: true });

    return access;
  },
}));

export default useAuthStore;

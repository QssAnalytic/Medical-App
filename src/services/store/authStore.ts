import { create } from "zustand";
import { getUser, postData } from "../api/requests";
import { authEndpoints } from "../api/endpoints";
import { SignInPayload, SignInResponse, User } from "@/pages/login/models";

type State = {
  user: User | null;
  isAuth: boolean | undefined;
  isUserLoading: boolean | undefined;
  isSignInLoading: boolean | undefined;
};

type Action = {
  currentUser: (access: string) => void;
  signIn: (data: SignInPayload) => void;
};

type UseAuthStore = Action & State;

const useAuthStore = create<UseAuthStore>((set, get) => ({
  user: null,
  isSignInLoading: false,
  isUserLoading: false,
  isAuth: false,
  currentUser: async (access: string) => {
    set({ isUserLoading: true });
    try {
      const currentUser = await getUser(authEndpoints.currentUser, {
        headers: {
          Authorization: "Bearer " + access,
        },
      });
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
      //   get().currentUser(access);
      console.log("access", access, "refresh", refresh);
    } catch (err) {
      console.log("signIn error", err);
    }
    set({ isSignInLoading: false });
  },
}));

export default useAuthStore;

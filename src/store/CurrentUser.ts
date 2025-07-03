import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const  useCurrentUserStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setCurrentUser: (userData, token) =>
                set({
                    user: userData,
                    token: token,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                }),

            updateUser: (userData) =>
                set((state) => ({
                    ...state,
                    user: { ...state.user, ...userData },
                })),
        }),
        {
            name: 'user-storage',
        }
    )
);

export default useCurrentUserStore;
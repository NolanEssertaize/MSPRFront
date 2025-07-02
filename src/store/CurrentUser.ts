import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCurrentUserStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // Définir l'utilisateur et le token après la connexion
            setCurrentUser: (userData, token) =>
                set({
                    user: userData,
                    token: token,
                    isAuthenticated: true,
                }),

            // Déconnexion
            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                }),

            // Mettre à jour les informations de l'utilisateur
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
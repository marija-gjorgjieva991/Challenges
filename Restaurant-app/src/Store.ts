import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

export interface Review {
  author: string;
  stars: number;
  message: string;
}

export interface Restaurant {
  id: string;
  businessname: string;
  restauranttype: string;
  reviews: number;
  rating: number;
  reviewsList: Review[];
  isFavorite: boolean;
  image: string;
}

export interface RestaurantDetailInterface extends Restaurant {
  phone?: string;
  email?: string;
  address?: string;
  parkinglot?: boolean;
}

interface RestaurantStore {
  restaurants: Restaurant[];
  favorites: string[];
  loading: boolean;
  error: string;
  restaurantDetails: RestaurantDetailInterface | null;
  addReview: (restaurantId: string, newReview: Review) => void;
  toggleFavorite: (restaurantId: string) => void;
  fetchRestaurants: () => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
  fetchRestaurantDetails: (restaurantId: string) => void;
}

export const useStore = create<RestaurantStore>()(
  devtools(
    persist(
      (set, get) => ({
        restaurants: [],
        favorites: [],
        loading: false,
        error: "",
        restaurantDetails: null,

        fetchRestaurants: async () => {
          set({ error: "", loading: true });

          try {
            const response = await fetch("http://localhost:5001/restaurants");
            const data = await response.json();
            const updatedRestaurants = data.map((restaurant: Restaurant) => {
              const isFavorite = get().favorites.includes(restaurant.id);
              return { ...restaurant, isFavorite };
            });

            set({ restaurants: updatedRestaurants, loading: false });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            set({ error: error.message, loading: false });
          }
        },

        setRestaurants: (restaurants) => {
          set({ restaurants });
        },

        addReview: (restaurantId: string, newReview: Review) => {
          set((state) => {
            const updatedRestaurants = state.restaurants.map((restaurant) => {
              if (restaurant.id === restaurantId) {
                const updatedReviewsList = [
                  ...restaurant.reviewsList,
                  newReview,
                ];
                const newRating =
                  updatedReviewsList.reduce(
                    (sum, review) => sum + review.stars,
                    0
                  ) / updatedReviewsList.length;

                return {
                  ...restaurant,
                  reviewsList: updatedReviewsList,
                  rating: newRating,
                };
              }
              return restaurant;
            });

            return { restaurants: updatedRestaurants };
          });
        },

        toggleFavorite: (restaurantId: string) => {
          set((state) => {
            const updatedRestaurants = state.restaurants.map((restaurant) => {
              if (restaurant.id === restaurantId) {
                const newFavoriteState = !restaurant.isFavorite;
                return {
                  ...restaurant,
                  isFavorite: newFavoriteState,
                };
              }
              return restaurant;
            });

            let updatedFavorites = [...state.favorites];
            if (updatedFavorites.includes(restaurantId)) {
              updatedFavorites = updatedFavorites.filter(
                (id) => id !== restaurantId
              );
            } else {
              updatedFavorites.push(restaurantId);
            }

            localStorage.setItem(
              "restaurant-favorites",
              JSON.stringify(updatedFavorites)
            );

            return {
              restaurants: updatedRestaurants,
              favorites: updatedFavorites,
            };
          });
        },

        fetchRestaurantDetails: async (restaurantId: string) => {
          set({ error: "", loading: true });

          try {
            const response = await fetch(
              `http://localhost:5001/restaurants/${restaurantId}`
            );
            const data = await response.json();
            set({ restaurantDetails: data, loading: false });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            set({ error: error.message, loading: false });
          }
        },
      }),
      {
        name: "restaurant-favorites",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

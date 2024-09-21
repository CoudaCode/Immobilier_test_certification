import { create } from "zustand";

type PropertyItem = {
  _id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
};

type PropertyState = {
  properties: PropertyItem[];
  cartItems: PropertyItem[];
  fetchProperties: () => Promise<void>;
  incrementQuantity: (propertyId: number) => void;
  decrementQuantity: (propertyId: number) => void;
  addToCart: (property: PropertyItem) => void;
  incrementCartItem: (propertyId: number) => void;
  decrementCartItem: (propertyId: number) => void;
  removeFromCart: (propertyId: number) => void;
};

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  cartItems: [],
  fetchProperties: async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/property/properties"
      );
      const data = await response.json();

      const propertiesWithQuantity = data.map((property: PropertyItem) => ({
        ...property,
        quantity: 0,
      }));

      set({ properties: propertiesWithQuantity });
    } catch (e) {
      console.error(e);
    }
  },
  incrementQuantity: (propertyId: number) => {
    set((state) => ({
      properties: state.properties.map((property) =>
        property._id === propertyId
          ? { ...property, quantity: property.quantity + 1 }
          : property
      ),
    }));
  },
  decrementQuantity: (propertyId: number) => {
    set((state) => ({
      properties: state.properties.map((property) =>
        property._id === propertyId && property.quantity > 0
          ? { ...property, quantity: property.quantity - 1 }
          : property
      ),
    }));
  },
  addToCart: (property: PropertyItem) => {
    set((state) => {
      const itemInCart = state.cartItems.find(
        (item) => item._id === property._id
      );
      if (itemInCart) {
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === property._id
              ? { ...item, quantity: item.quantity + property.quantity }
              : item
          ),
        };
      } else {
        return {
          cartItems: [
            ...state.cartItems,
            { ...property, quantity: property.quantity },
          ],
        };
      }
    });
  },
  incrementCartItem: (propertyId: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === propertyId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },
  decrementCartItem: (propertyId: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === propertyId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  },
  removeFromCart: (propertyId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== propertyId),
    }));
  },
}));

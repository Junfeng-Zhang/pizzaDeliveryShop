import create from 'zustand';

export const useStore = create(
  (set) => ({
    cart: {
      pizzas: []
    },

    // 添加Pizza进购物车
    addPizza: (data) =>
      // 取之前的pizzas数组，然后展开它并添加pizza的新数据
      set((state) => ({
        cart: {
          pizzas: [...state.cart.pizzas, data]
        }
      })),

    // remove pizza
    removePizza: (index) =>
      set((state) => ({
        cart: {
          pizzas: state.cart.pizzas.filter((_, i) => i != index)
        }
      })),

    // 单处理完后，清空购物车 
    resetCart: () =>
      set(() => ({
        cart: {
          pizzas: []
        }
      }))
  })
)
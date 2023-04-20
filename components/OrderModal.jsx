// https://maintine.dev/core/modal
import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import css from '../styles/OrderModal.module.css';
import { toast, Toaster } from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

export default function OrderModal({ opened, setOpened, paymentMethod }) {

  const theme = useMantineTheme();

  const router = useRouter();

  const total = typeof window !== 'undefined' && localStorage.getItem('total');

  const [formData, setFormData] = useState({});

  const handleInput = (e) => { // 跟踪输入值
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 从 store.js 中提取 resetCart 函数
  const resetCart = useStore((state) => state.resetCart)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...formData, total, paymentMethod });
    toast.success("下单成功");
    resetCart();
    { typeof window !== 'undefined' && localStorage.setItem('order', id) }

    // 跳转到 具体 id，根据从 createOrder() 收到的 id
    router.push(`/order/${id}`)
  }


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* modal content */}
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input onChange={handleInput} type="text" name='name' required placeholder="Name" />
        <input onChange={handleInput} type="text" name='phone' required placeholder="Phone Number" />
        <textarea onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>

        <span>
          You wil pay <span>$ {total}</span> on delivery
        </span>

        <button type="submit" className="btn" >Place Order</button>
      </form>
      <Toaster />
    </Modal>
  )
};

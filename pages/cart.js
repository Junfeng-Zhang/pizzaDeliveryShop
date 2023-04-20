import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useStore } from "../store/store";
import css from '../styles/Cart.module.css';

import { urlFor } from "../lib/client";

import { UilCancel } from "@iconscout/react-unicons";
import { toast, Toaster } from "react-hot-toast";
import { useState } from 'react';
import OrderModal from "../components/OrderModal";

export default function Cart() {

  const CartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza); // 从store里面 获取删除函数
  const handleRemove = (i) => {
    removePizza(i);
    toast.error('Item Removed')
  };

  const [paymentMethod, setPaymentMethod] = useState(null);

  const [order, setOrder] = useState(
    typeof window !== 'undefined' && localStorage.getItem('order')
  )

  /* 取购物车中所有的披萨，然后取第一个参数A。
    对于A的初值，我们让它的值为0;
    B是购物车里的第一个披萨。
    0 + b.quantity表示第一个披萨的数量* b.price表示第一个披萨的价格;
    然后它将遍历CartData中的所有披萨，并返回总价
  */
  const total = () => CartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);

  const router = useRouter();

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    /* 在Next.js中，使用服务器的localstorage而不是客户端浏览器的localstorage。
      因此。它会产生错误，如何修复?
      如果启用了浏览器窗口，则设置localStorage项;这是意味着
      如果我们在服务器上，那么将没有浏览器窗口
      我们将不设置localStorage项。但当它在客户端，那么肯定是存在的
      将是一个浏览器窗口，我们的localStorage项将被设置。
    */
    // localStorage.setItem('totoal', total());
    typeof window !== 'undefined' && localStorage.setItem('total', total());
  };



  const handleCheckout = async () => {
    typeof window !== 'undefined' && localStorage.setItem('total', total());
    setPaymentMethod(1); // online payment
    const response = await fetch('/api/stripe', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      /* 将 CartData 中的所有披萨作为请求正文传递，这些披萨将在 Stripe 方法中接收
      */
      body: JSON.stringify(CartData.pizzas),
    });

    if (response.status === 500) return; // server error

    const data = await response.json();
    toast.loading("Redirecting...");
    router.push(data.url)
  }

  return (
    <Layout>
      <div className={css.container}>
        {/* 详情 */}
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody className={css.tbody}>
              {CartData.pizzas.length > 0 &&
                CartData.pizzas.map((pizza, i) => {

                  const src = urlFor(pizza.image).url();

                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image loader={() => src} src={src} alt="" objectFit="cover" width={85} height={85} />
                      </td>

                      <td>{pizza.name}</td>
                      <td>
                        {
                          pizza.size === 0 ?
                            "Small" :
                            pizza.size === 1 ?
                              "Medium" :
                              "Large"
                        }
                      </td>

                      <td>{pizza.price}</td>

                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      {/* <td style={{color: "var(--themeRed", cursor:'pointer' }} onClick={() =>handleRemove(i)}>X</td> */}
                      <td><UilCancel size={22} style={{ color: "var(--themeRed", cursor: 'pointer' }} onClick={() => handleRemove(i)} /></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>


        {/* summary */}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.CartDetails}>
            <div>
              <span>Items</span>
              <span>{CartData.pizzas.length}</span>
            </div>

            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>

          {!order && CartData.pizzas.length > 0 ? (
            <div className={css.buttons}>
              <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
              <button className="btn" onClick={handleCheckout}>Pay now</button>
            </div>
          ) : null}

        </div>
      </div>

      <Toaster />

      {/* Modal */}
      <OrderModal opened={paymentMethod === 0} setOpened={setPaymentMethod} paymentMethod={paymentMethod} />
    </Layout>
  )
};

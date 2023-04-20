
export const createOrder = async ({ name, phone, address, total, paymentMethod }) => {
  // fetch is the default of Next.js, so we don't have to setup an Express or Axios
  const res = await fetch('/api/order', {
    method: 'POST', // made a POST request in API order.js
    body: JSON.stringify({
      name: name,
      phone: phone,
      address: address,
      total: parseFloat(total),
      method: paymentMethod,
      status: 1
    }),
  });

  const id = await res.json();
  return id; // 我们将在这里收到，并将此 ID 返回给您的订单模型
}

/* 将在订单模型中调用这个创建订单函数。
当它向订单 API 发出成功请求时，
然后它将在 Sanity Studio 中下一个新订单作为回报
它会将新创建的订单的 ID 发送给的处理程序
将在此处收到该 ID 并将此 ID 返回给订单模型
*/ 
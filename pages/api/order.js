//处理来自客户端的请求命令的处理程序--->服务器

import { client } from "../../lib/client";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const newOrder = await JSON.parse(req.body);
      try {
        await client.create({
          _type: 'order',
          name: newOrder.name,
          address: newOrder.address,
          phone: newOrder.phone,
          total: newOrder.total,
          method: newOrder.method,
          status: 1
          // 每当下订单时，状态 1 将显示您的订单正在烹饪
        }).then((data) => {
          res.status(200).json(data._id)
        })
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error, check console" })
      }
      break;

  }
}
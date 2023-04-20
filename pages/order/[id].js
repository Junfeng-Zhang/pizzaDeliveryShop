// this order page is going to be dynamic

import Image from "next/image";
import Cooking from "../../assets/cooking.png";
import Onway from "../../assets/onway.png";
import Spinner from '../../assets/spinner.svg'
import Layout from "../../components/Layout";
import { client } from "../../lib/client";
import css from "../../styles/OrderID.module.css";
import { UilBill, UilBox } from '@iconscout/react-unicons';
import { useEffect } from "react";


export const getServerSideProps = async ({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`;
  const order = await client.fetch(query);

  /* 每当对 Sanity Studio 运行查询时，它都会返回一个文档数组。 
  但我们知道每个订单的 ID 始终是唯一的。 所以它将返回一个数组，其中只包含一个文档。
  */
  return {
    props: {
      order: order[0],
    }
  }
}

export default function Orders({ order }) {

  useEffect(() => {
    if (order.status > 3) { // 下单的状态是3的话，清除现有的清单
      localStorage.clear();
    }
  },[order])

  return (
    <Layout>
      <div className={css.container}>
        <span className={css.heading}>
          Order in Process
        </span>
        <div className={css.details}>
          <div>
            <span>Order ID</span>
            <span>{order._id}</span>
          </div>
          <div>
            <span>Customer Name</span>
            <span>{order.name}</span>
          </div>
          <div>
            <span>Phone</span>
            <span>{order.phone}</span>
          </div>
          <div>
            <span>Method</span>
            <span>
              {order.method === 0 ? "Cash on Delivery" : "Online Payment(paid)"}
            </span>
          </div>
          <div>
            <span>Total</span>
            <span>$ {order.total}</span>
          </div>
        </div>

        <div className={css.statusContainer}>

          <div className={css.status}>
            <UilBill width={50} height={50} />
            <span>Payment</span>
            {order.method === 0 ?
              (<span className={css.pending}>On Delivery</span>) :
              (<span className={css.completed}>Completed</span>)}
          </div>

          <div className={css.status}>
            <Image src={Cooking} alt="" width={50} height={50} />
            <span>Cooking</span>

            {order.status === 1 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 1 && (
              // 当状态 > 1时，提示此状态已经完成
              <span className={css.completed}>Completed</span>
            )}
          </div>

          <div className={css.status}>
            <Image src={Onway} alt="" width={50} height={50} />
            <span>OnWay</span>

            {order.status === 2 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 2 && (
              // 当状态 > 2 时，提示此状态已经完成
              <span className={css.completed}>Completed</span>
            )}
          </div>

          <div className={css.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>

            {order.status === 3 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 3 && (
              // 当状态 > 3时，提示此状态已经完成
              <span className={css.completed}>Completed</span>
            )}
          </div>

        </div>
      </div>
    </Layout>
  )
};

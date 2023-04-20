import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/client";
import Image from 'next/image';

import css from '../../styles/Pizza.module.css';
import LeftArrow from '../../assets/arrowLeft.png';
import RightArrow from '../../assets/arrowRight.png';

import { useState } from "react";
import { useStore } from "../../store/store";

import toast, {Toaster} from 'react-hot-toast'


// 定义 Pizza详情页
export default function Pizza({ pizza }) {
  // console.log(pizza);
  const src = urlFor(pizza.image).url();

  const [size, setSize] = useState(1); // 初始Pizza尺寸

  const [quantity, setQuantity] = useState(1);

  const handleQuan = (type) => {
    // 在上一个数量上加一个
    type === 'inc' ? setQuantity((prev) => prev + 1) : quantity === 1 ? null : setQuantity((prev) => prev - 1)
  }

  // 从 store 中提取 addPizza 函数
  const addPizza = useStore((state) => state.addPizza);
  // 添加到购物车功能——从静态道具接收披萨道具
  const addToCart = () => {
    addPizza({ ...pizza, price: pizza.price[size], quantity: quantity, size: size });
    toast.success("添加成功")
  }

  return (
    <Layout>
      <div className={css.conatiner}>

        <div className={css.imageWrapper}>
          <Image loader={() => src} src={src} alt="" layout="fill" unoptimized objectFit="cover" />
        </div>

        <div className={css.right}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>

          {/* 价格取决于尺寸 */}
          <span><span style={{ color: "var(--themeRed)" }}>$</span>{pizza.price[size]}</span>
          <div className={css.size}>
            <span>Size</span>
            <div className={css.sizeVariants}>
              <div onClick={() => setSize(0)} className={size === 0 ? css.selected : ''}>Small</div>
              <div onClick={() => setSize(1)} className={size === 1 ? css.selected : ''}>Medium</div>
              <div onClick={() => setSize(2)} className={size === 2 ? css.selected : ''}>Large</div>
            </div>
          </div>

          <div className={css.quantity}>
            <span>Quantity</span>
            <div className={css.counter}>
              <Image src={LeftArrow} height={20} width={20} alt="" objectFit="contain" onClick={() => handleQuan("dec")} />
              <span>{quantity}</span>
              <Image src={RightArrow} height={20} width={20} alt="" objectFit="contain" onClick={() => handleQuan("inc")} />
            </div>
          </div>

          {/* button */}
          <div className={`btn ${css.btn}`} onClick={addToCart}>Add to Cart </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  )
};

// 这个东西对于我们在比例括号内的动态路径来说是独一无二的
export async function getStaticPaths() {
  // 从 Sanity Studio 中提取所有路径
  const paths = await client.fetch(
    /* what this query is saying to us ?
    1.说的是提取文件类型所在的所有文件
     是披萨，这意味着它将返回我们健全数据库中的所有披萨
     从所有 Pizza 中过滤一些 pizza */
    // 此查询将返回“披萨”类型文档的所有当前 slug 的数组。
    `*[_type=="pizza" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  }

  /* getStaticsPaths() 函数的唯一目的
   是给所有可能的部分，可以通过单击菜单项生成。在实际点击它们之前，
  */
};
// 如何分别从每个披萨中提取页面详细信息

// 在 getStaticProps 中接收所有这些部分
export async function getStaticProps(context) {
  /* url 将提取 slug 值，如果未定义 slug，则作为预防措施，它将为其提供一个空字符串值*/
  const { slug = '' } = context.params;
  const pizza = await client.fetch(
    `*[_type=="pizza" && slug.current == '${slug}'][0]`
    /* 提取所有类型为披萨的文档，
      并且披萨块等于我们当前从我们的 url 接收到的块，因此我们将从我们的 Sanity Studio 中获取特定披萨的数据。
    */
  );

  return {
    props: {
      pizza,
    },
  }
}
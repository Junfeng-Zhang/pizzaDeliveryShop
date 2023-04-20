import { urlFor } from '../lib/client';
import css from '../styles/Menu.module.css';
import Image from 'next/image';
import Link from 'next/link'; // use link to navigate different pages


// Pizza 菜单展示
export default function Menu({ pizzas }) {
  // console.log(pizzas);
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <span>Our Menu</span>
        <span>Menu That Always</span>
        <span>Make you Fall In Love</span>
      </div>

      <div className={css.menu}>
        {/* pizzas */}
        {pizzas.map((pizza, id) => {
          // 将披萨图像作为道具，然后它将从 Sanity CDN 生成 url
          const src = urlFor(pizza.image).url()

          return (

            <div className={css.pizza} key={id}>

              <Link href={`./pizza/${pizza.slug.current}`} >

                <div className={css.ImageWrapper}>
                  {/* why src = {src} ?
                  当从数据库中获取图像时，不能简单地在 src 中写入图像名称或 pizza.image ，这会产生错误
                 */}
                  <Image loader={() => src} src={src} alt=''
                    objectFit='cover' layout='fill'
                  />
                </div>
              </Link>

              <span>{pizza.name}</span>
              <span><span style={{ color: 'var(--themeRed)' }}>$</span> {pizza.price[1]}</span>
            </div>
          );
        })}
      </div>
    </div>
  )
};

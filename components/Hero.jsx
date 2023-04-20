import Image from 'next/image';
import css from '../styles/Hero.module.css';

import Cherry from '../assets/Cherry.png';
import HeroImage from '../assets/HeroImage.png';
import Pizza1 from '../assets/p1.jpg';

import { UilPhone } from '@iconscout/react-unicons';



export default function Hero() {
  return (
    <div className={css.container}>
      {/* left side */}
      <div className={css.left}>

        <div className={css.cherryDiv}>
          <span>More than Faster</span>
          <Image src={Cherry} alt="" width={40} height={25} />
        </div>

        <div className={css.heroText}>
          <span>Be The Fast</span>
          <span>In Delivering</span>
          <span>
            Your <span style={{ color: "var(--themeRed)" }}>Pizza</span>
          </span>
        </div>

        <span className={css.miniText}>
          Our Mission is to filling your tummy with delicious food and with fast and free delivery
        </span>

        {/* 样式在 global.css 里面更改  使用自己的变量 css.btn*/}
        <button className={`btn ${css.btn}`}>
          Get Started
        </button>

      </div>


      {/* right side */}
      <div className={css.right}>
        <div className={css.imageContainer}>
          {/* intrinsic --- 它只包含与图像容器一样长的空间或宽度。 
          因此，需要一个单独的容器。 这样，它就可以指定其内部图像的宽度
          */}
          <Image src={HeroImage} alt="" layout='intrinsic' />
        </div>

        <div className={css.ContactUs}>
          <span>Contact Us</span>
          <div>
            <UilPhone color='white' />
          </div>
        </div>

        <div className={css.Pizza}>
          <div>
            <Image src={Pizza1}  alt="" objectFit='cover' layout='intrinsic'/>
          </div>

          <div className={css.details}>
            <span>Italian Pizza</span>
            <span>
              <span style={{color: "var(--themeRed)"}}>$</span> 7.49
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};

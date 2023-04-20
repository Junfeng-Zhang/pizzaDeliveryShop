import React from 'react'
import Header from './Header';
import Footer from './Footer';

// children 是动态的，所以它应该是一个属性
const Layout = ({children}) => { // 将此布局函数包裹在索引页周围
  return (
    <>
    <Header />
      {children}
    <Footer />
    </>
  )
}

export default Layout;
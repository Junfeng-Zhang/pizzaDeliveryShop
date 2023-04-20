import "../styles/globals.css"; // 为所有应用程序提供全局 CSS

/*Component & pageProps 将成为将布局组件包装在应用程序中每个页面的原因 */ 


function MyApp({ Component, pageProps }) {
  return (
     <Component {...pageProps} />
  );
}

export default MyApp;

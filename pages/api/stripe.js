import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51MyZ2bCYvMZs35NcDlijLc6vicj99zW5iRqdJfZ16ffKR0s21SULwnNKqg1OTr8m1RsIi3JYxMNOHWc2n3IEX9bc00RkZToIWu"


)

export default async function handler(req, res) {
  if (res.method == 'POST') {
    try {
      // 传递参数以在 Stripe checkout 中传递
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: req.body.map((item) => {
          const img = item.image.asset._ref;
          const newImage = img.replace(
            "image-",
            "https://cdn.sanity.io/images/n9l8tedv/production/"
          )
            .replace('-jpg', '.jpg'); // 应将 Sanity 的 jpg 扩展名转换为普通扩展名 .jpg

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`
      };

      // checkout session
      const session = await stripe.checkout.sessions.create(params);
      console.log(session);
      res.status(200).json(session)


    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.setHeader("ALLOW", "POST");
    res.status(405).end("method not allowed");
  }
}
// this is necessary setup to make as model as we do in Mongodb

export default {
  name: 'pizza',
  title: 'pizza',
  type: "document",
  fields: [  // 声明Pizza Schema中的字段
    {
      name: 'image',
      title: 'image',
      type: 'image',
      options: {
        /* 热点:如果我们必须裁剪或编辑图像直接进入数据库，
           然后我们应该让热点成真 */
        hotspot: true
      }
    },
    {
      name: 'name',
      title: 'name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      /* Slug就像我们在mongodb或SQL中拥有的特定或唯一的id
      或postgresql的任何类型的数据库，他们包含一个特定的id;
      但sanity工作室的好处是，他的id很容易被识别出来
      类型蛞蝓。
      当我们在工作室里制作的时候，你就可以很容易地观察到
      子弹是如何匹配的并与我们线人的名字配对。
      意思是披萨的名字这个唯一id不是这样的
      你可以很容易地记住它。它来自于你的产品名称。
      我们可以在这个段符的帮助下使唯一的url成为唯一的页面名*/
      options: {
        source: 'name',
        maxLength: 90
      }
    },
    {
      name: 'price',
      title: 'price',
      type: 'array', // 为什么是数组?因为披萨有三种不同的大小和价格
      of: [{ type: 'number' }]
    },
    {
      name: 'details',
      title: 'details',
      type: 'string'
    }
  ]


}
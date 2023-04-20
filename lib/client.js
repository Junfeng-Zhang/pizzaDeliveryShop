/* client.js 基本上作为我们 Sanity 内容之间的连接
管理系统和我们的 Next.js 应用程序。

它就像我们最常用的 php html 安装程序中的 connection.php 文件。

所以在那个设置中我们通常会创建一个 connection.php，我们在其中指定数据库的名称
和密码客户端的一切。

在理智上，设置就像一样，但在这里我们正在制作一个 lient.js
其中将包含有关连接的所有信息；
但是要构建它，我必须安装一个依赖项
yarn add @sanity/client
*/

// import sanityClient from "@sanity/client";
import { createClient } from "@sanity/client";
// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "n9l8tedv",
  dataset: 'production',
  apiVersion: "2023-04-17",
  useCdn: true, // 必须使用 CDN 来获取图像和更多数据
  token:
    "sklmI1qYRz5V6souP2gCggwLIImOfkmjPAKJKoZVipBGiQ7DpXhOljGSxuJn3zFAOpFwkeVy0wmKqsRzBso1yH7ku1SSkShH9gjhMps31cE3QYQOlAI694WZDiRqAjMp7miKBjkVNT1UTkXnbIrpb0hCOe4Qaym4E6pFDmwAcWU0eRkoQe0V"
});

// 为图像制作一个构建器
const builder = ImageUrlBuilder(client);

// 此函数会将图像从数据库加载到客户端
export const urlFor = (source) => builder.image(source);
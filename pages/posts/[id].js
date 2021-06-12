// 動的ルーティングのファイル名に注意
// URLに対応したディレクトリ、ファイル名になる
import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ post }) {
  if (!post) {
    return <div>Loading...</div>;
  }

  // アイコンはhttps://heroicons.com/からコピー
  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID: "}
        {post.id}
      </p>
      <p className="mb-8 text-xl font-bold">{post.title}</p>
      <p className="px-10">{post.body}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-3"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();

  // 存在しないidを指定した場合の挙動はfllbackで指定する
  // false : 404になる
  return {
    paths,
    fallback: false,
  };
}

// ビルド時に自動的に呼ばれる
export async function getStaticProps({ params }) {
  const { post: post } = await getPostData(params.id);

  return {
    props: {
      post,
    },
  };
}

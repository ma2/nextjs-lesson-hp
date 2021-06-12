// {JSON} Placeholderからダミーデータを取得する
// https://jsonplaceholder.typicode.com/

import fetch from "node-fetch";
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// postの一覧
export async function getAllPostsData() {
  const res = await fetch(new URL(apiUrl));
  const posts = await res.json();
  return posts;
}

// postの詳細オブジェクトを返す関数の一覧を返す
export async function getAllPostIds() {
  const res = await fetch(new URL(apiUrl));
  const posts = await res.json();

  return posts.map((post) => {
    return {
      // オブジェクトのキー名はparams必須
      // 何の制限？
      params: {
        id: String(post.id),
      },
    };
  });
}

export async function getPostData(id) {
  const res = await fetch(new URL(`${apiUrl}/${id}`));
  const post = await res.json();

  return { post };
}

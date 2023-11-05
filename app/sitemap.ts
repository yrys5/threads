import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUsers } from "@/lib/actions/user.actions";

const URL = "https://www.thrinks.com";

export default async function sitemap() {
  const postsResult = await fetchPosts(1, 30);
  const usersResult = await fetchUsers({
    userId: "user_2XXJReqvTcvaTtoEm0CK3bPLrgM",
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  const posts = postsResult.posts.map(({ id, createdAt }) => ({
    url: `${URL}/thread/${id}`,
    lastModified: createdAt,
    priority: 0.48,
  }));

  const users = usersResult.users.map(({ id }) => ({
    url: `${URL}/user/${id}`,
    lastModified: new Date().toISOString(),
    priority: 0.64,
  }));

  const routes = ["/sign-in", "/sign-up" , "/search"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    priority: 0.8,
  }));

  const main = {
    url: `${URL}/`,
    lastModified: new Date().toISOString(),
    priority: 1,
  };

  return [main, ...routes, ...users, ...posts];
}

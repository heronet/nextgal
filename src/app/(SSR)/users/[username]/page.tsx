import { Alert } from "@/components/bootstrap";
import { User } from "@/models/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};
export async function getUser(username: string) {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  if (response.status === 404) notFound();
  return await response.json();
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user: User = await getUser(username);
  return {
    title: user.username,
  };
}

const UserName = async ({ params: { username } }: Props) => {
  const user: User = await getUser(username);
  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the{" "}
        <strong>page title</strong> dynamically from the API response.
      </Alert>
      <h1>{user.username}</h1>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <a href={`https://unsplash.com/${user.username}`}>Unsplash profile</a>
    </div>
  );
};

export default UserName;

import { Alert } from "@/components/bootstrap";
import { ImageType } from "@/models/imagetype";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export const metadata: Metadata = {
  title: "ISR fetching",
};

export const revalidate = 15;

const ISRPage = async (props: Props) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const image: ImageType = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page uses <strong>incremental static regeneration</strong>. A new
        image is fetched every 15 seconds (after refreshing the page) and then
        served from the cache for that duration.
      </Alert>
      <Image
        src={image.urls.raw}
        alt={image.description}
        width={width}
        height={height}
        className="rounded shadow mw-100 h-100"
      />
      by
      <Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
    </div>
  );
};

export default ISRPage;

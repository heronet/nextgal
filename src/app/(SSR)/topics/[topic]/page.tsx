import { ImageType } from "@/models/imagetype";
import Image from "next/image";
import styles from "./topic.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

type Props = {
  params: {
    topic: string;
    // searchParams: string;
  };
};

export const generateStaticParams = () => {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
};

export function generateMetadata({ params: { topic } }: Props): Metadata {
  return {
    title: `${topic} - NextJS Image Gallery`,
  };
}

const TopicPage = async ({ params: { topic } }: Props) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: ImageType[] = await response.json();
  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched &
        rendered on first access and then{" "}
        <strong>cached for subsequent requests</strong> (this can be disabled).
      </Alert>
      <h1>{topic}</h1>
      <div>
        {images.map((image) => (
          <Image
            key={image.urls.raw}
            src={image.urls.raw}
            width={250}
            height={250}
            alt={image.description}
            className={styles.image}
          />
        ))}
      </div>
    </div>
  );
};

export default TopicPage;

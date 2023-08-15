"use client";

import { ImageType } from "@/models/imagetype";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./search.module.css";

type Props = {};

const Search = (props: Props) => {
  const [searchResults, setSearchResults] = useState<ImageType[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    if (!query) return;

    try {
      setSearchResults([]);
      setLoadError(false);
      setResultsLoading(true);

      const response = await fetch(`/api/search?query=${query}`);
      const images: ImageType[] = await response.json();

      setSearchResults(images);
      setResultsLoading(false);
    } catch (error) {
      console.log(error);
      setLoadError(true);
    } finally {
      setResultsLoading(false);
    }
  };
  const fizzbuzz = () => {
    for (let i = 1; i <= 100; ++i) {
      if (i % 3 === 0 && i % 5 === 0) console.log("FizzBuzz");
      else if (i % 3 === 0) console.log("Fizz");
      else if (i % 5 === 0) console.log("Buzz");
      else console.log(i);
    }
  };
  fizzbuzz();
  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not
        leak API credentials, the request is sent to a NextJS{" "}
        <strong>route handler</strong> that runs on the server. This route
        handler then fetches the data from the Unsplash API and returns it to
        the client.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control name="query" placeholder="e.g. cats, hotdogs, ..." />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={resultsLoading}>
          Search
        </Button>
      </Form>

      <div className="d-flex flex-column align-items-center">
        {resultsLoading && <Spinner animation="border" />}
        {loadError && <p>Something went wrong.</p>}
        {searchResults.length === 0 && <p>No results</p>}
      </div>
      {searchResults.map((image) => (
        <Image
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
          key={image.urls.raw}
          className={styles.image}
        />
      ))}
    </div>
  );
};

export default Search;

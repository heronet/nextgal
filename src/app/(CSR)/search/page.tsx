import Search from "@/components/Search";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Search",
};

const SearchPage = (props: Props) => {
  return <Search />;
};

export default SearchPage;

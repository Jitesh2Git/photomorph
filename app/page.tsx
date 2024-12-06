import { Collection } from "@/components/Collection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { getAllImages } from "@/lib/actions/image.actions";
import React from "react";

const Home = async ({ searchParams }: SearchParamProps) => {
  const currSearchParams = await searchParams;
  const page = Number(currSearchParams?.page) || 1;
  const searchQuery = (currSearchParams?.query as string) || "";
  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <Hero />
      <Collection
        hasSearch={true}
        images={images?.data}
        totalPages={images?.totalPage}
        page={page}
      />
      <Features />
      <Footer />
    </>
  );
};

export default Home;

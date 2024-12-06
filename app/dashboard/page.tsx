import { Collection } from "@/components/Collection";
import TransformationHeader from "@/components/TransformationHeader";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const DashboardPage = async ({ searchParams }: SearchParamProps) => {
  const currSearchParams = await searchParams;
  const page = Number(currSearchParams?.page) || 1;
  const clerkUser = await currentUser();
  const userId = clerkUser!.id;
  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <TransformationHeader title="Profile" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </section>
  );
};

export default DashboardPage;

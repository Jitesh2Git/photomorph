import TransformationForm from "@/components/TransformationForm";
import TransformationHeader from "@/components/TransformationHeader";
import { transformationTypes } from "@/constants";
import { getImageById } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const UpdatePage = async ({ params }: SearchParamProps) => {
  const { id } = await params;
  const clerkUser = await currentUser();
  const userId = clerkUser!.id;
  const user = await getUserById(userId);
  const image = await getImageById(id);
  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <section className="max-w-6xl mx-auto px-6 my-10">
      <TransformationHeader
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </section>
  );
};

export default UpdatePage;

import TransformationForm from "@/components/TransformationForm";
import TransformationHeader from "@/components/TransformationHeader";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const AddTypePage = async ({ params }: SearchParamProps) => {
  const { type } = await params;
  const tranformation = transformationTypes[type];
  const clerkUser = await currentUser();
  const userId = clerkUser!.id;
  const user = await getUserById(userId);

  return (
    <section className="max-w-3xl mx-auto py-10">
      <TransformationHeader
        title={tranformation.title}
        subtitle={tranformation.subTitle}
      />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={tranformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </section>
  );
};

export default AddTypePage;

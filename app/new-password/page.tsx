import { NextPage } from "next";

import { NewPasswordForm } from "@/forgotpassword/NewPasswordForm";
import { Suspense } from "react";

type NewPasswordPageProps = {};

const NewPasswordPage: NextPage = async ({}: NewPasswordPageProps) => {
  return (
    <Suspense>
    <div className="w-full flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-5 rounded border bg-white shadow">
      <NewPasswordForm />
      </div>
     
    </div>
    </Suspense>
  );
};

export default NewPasswordPage;

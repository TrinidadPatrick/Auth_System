import { NextPage } from "next";

import { NewPasswordForm } from "@/forgotpassword/NewPasswordForm";

type NewPasswordPageProps = {};

const NewPasswordPage: NextPage = async ({}: NewPasswordPageProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-5 rounded border bg-white shadow">
      <NewPasswordForm />
      </div>
     
    </div>
  );
};

export default NewPasswordPage;

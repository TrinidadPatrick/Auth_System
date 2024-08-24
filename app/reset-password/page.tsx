import { NextPage } from "next";

import { PasswordResetForm } from "@/forgotpassword/PasswordResetForm";

type ResetPasswordPageProps = {};

const ResetPasswordPage: NextPage = async ({}: ResetPasswordPageProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-5 rounded border bg-white shadow">
      <PasswordResetForm />
      </div>
     
    </div>
  );
};

export default ResetPasswordPage;

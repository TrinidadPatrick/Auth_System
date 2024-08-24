import { db } from "@/db";
import { getPasswordResetTokenByEmail } from "./password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
  const Str_Random = (length : number) => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        
        // Loop to generate characters for the specified length
        for (let i = 0; i < length; i++) {
            const randomInd = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomInd);
        }
        return result;
  }

  const token = Str_Random(32);
  const expires = new Date(new Date().getTime() + 3600000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if(existingToken){
    await db.passwordResetToken.delete({
        where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return passwordResetToken;
};
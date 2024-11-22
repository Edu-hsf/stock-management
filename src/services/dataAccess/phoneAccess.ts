import { ConfirmationResult, RecaptchaVerifier, linkWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig";

let confirmationResult: ConfirmationResult | null = null;

export const authPhoneNumberAccess = async (phoneNumber: string) => {
    try {
        // Configurar o Recaptcha
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth, // Primeiro argumento: a instância do Firebase Auth
                "recaptcha-container", // Segundo argumento: ID do container ou elemento
                {
                    size: "invisible",
                    callback: () => {
                        console.log("Recaptcha verificado com sucesso");
                    },
                }// Certifique-se de passar a instância correta aqui
            );
        }

        const appVerifier = window.recaptchaVerifier;

        // Verifique se há um usuário autenticado
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("Usuário não autenticado.");
        }

        // Vincular o número de telefone ao usuário atual
        confirmationResult = await linkWithPhoneNumber(currentUser, phoneNumber, appVerifier);

        console.log("Código enviado com sucesso:", confirmationResult);
        return confirmationResult;
    } catch (error: any) {
        console.error("Erro ao autenticar com número de telefone:", error.message);
        throw error;
    }
};

export const confirmVerificationCodeAccess = async (verificationCode: string) => {
    try {
      if (!confirmationResult) {
        throw new Error("Nenhum código de verificação enviado. Tente novamente.");
      }
  
      // Confirma o código enviado para o telefone
      const userCredential = await confirmationResult.confirm(verificationCode);
      console.log("Número de telefone vinculado com sucesso:", userCredential.user);
  
      return userCredential;
    } catch (error: any) {
      console.error("Erro ao confirmar o código:", error.message);
      throw error;
    }
  };

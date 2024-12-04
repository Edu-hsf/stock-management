import {
    sendEmailVerification,
    User,
    verifyBeforeUpdateEmail
} from "firebase/auth";
import axios from 'axios';


export const emailIsValidAccess = async (email: string) => {
    const apiKey = "2893c3642634970fae06f295806a73cdab412171";
    const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data.data.status === "valid";
    } catch (error) {
        console.error("Erro ao verificar o e-mail:", error);
        return false;
    }
}

export const authEmailAccess = async (user: User) => {
    try {
        await sendEmailVerification(user, {
            url: "http://localhost:5173/",
            handleCodeInApp: true,
        });
        console.log("E-mail de verificação enviado!");
    } catch (error) {
        console.error("Erro ao enviar o e-mail de verificação:", error);
    }
};



export const changeUserEmailAccess = async (user: User, newEmail: string) => {
    await verifyBeforeUpdateEmail(user, newEmail, {
        url: "http://localhost:5173/", // URL de redirecionamento após a verificação
        handleCodeInApp: true, // Garantir que o link será tratado no app, se aplicável
    })
}


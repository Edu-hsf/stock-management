import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/services/firebaseConfig"; // Importa a configuração do Firebase

export async function uploadImageAccess(path: string, userUID: string | undefined, file: File, fileName: string): Promise<string> {
    if (!file || !path) {
        throw Error('File or path is not valid')
    }

    const fileRef = ref(storage, `${path}/${userUID}/${fileName}`);
    await uploadBytes(fileRef, file); // Envia o arquivo
    const downloadURL = await getDownloadURL(fileRef); // Obtém a URL de download
    return downloadURL; // Retorna a URL da imagem
}

export async function deleteImageAccess(path: string, userUID: string | undefined, fileName: string) {

    const fileRef = ref(storage, `${path}/${userUID}/${fileName}`)

    try {
        await deleteObject(fileRef);
        console.log("Arquivo excluído com sucesso!");
    } catch (error: any) {
        if (error.code === "storage/object-not-found") {
            console.error("Erro: Arquivo não encontrado!");
        } else if (error.code === "storage/unauthorized") {
            console.error("Erro: Permissão negada para excluir o arquivo!");
        } else {
            console.error("Erro ao excluir o arquivo:", error.message);
        }
    }
}
import { deleteImageAccess, uploadImageAccess } from "@/services/dataAccess/imagesAccess"

export const uploadImageAction = async (path: string, userUID: string | undefined, file: File, fileName: string) => {
    const response = await uploadImageAccess(path, userUID, file, fileName)
    return response
}

export const deleteImageAction = async (path: string, userUID: string | undefined, file: File, fileName: string,) => {
    const response = await deleteImageAccess(path, userUID, file, fileName)
    return response
}
import ILive from "@/interface/live";
import axiosInstance from "@/lib/axios"
import handleAxiosError from "@/lib/axios_error";


export const createLive = async (data: ILive, userId: string | undefined) => {
    try {
        const response = await axiosInstance.post(`/live/user/${userId}`, data)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export const getAll = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/live/user/${userId}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export const getById = async (Id: string) => {
    try {
        const response = await axiosInstance.get(`/live/${Id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}


export const editLive = async (data: ILive, Id: string) => {
    try {
        const response = await axiosInstance.put(`/live/${Id}`, data)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}
export const deleteLive = async (Id: string) => {
    try {
        const response = await axiosInstance.delete(`/live/${Id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export const uploadImage = async (data: FormData) => {
    try {
        const response = await axiosInstance.post(`/live/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

import { toast, ToastOptions } from "react-toastify";

export default function useNotify() {
    type notifyPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
    
    function notifySucess(message, position: notifyPosition = 'top-right', autoClose = 3000, hideProgressBar = false){
        const notifyOptions: ToastOptions = {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
        toast.success(message, notifyOptions);
    }

    function notifyWarn(message, position: notifyPosition = 'top-right', autoClose = 3000, hideProgressBar = false){
        const notifyOptions: ToastOptions = {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
        toast.warn(message, notifyOptions);
    }

    function notifyError(message, position: notifyPosition = 'top-right', autoClose = 3000, hideProgressBar = false){
        const notifyOptions: ToastOptions = {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
        toast.error(message, notifyOptions);
    }
    
    function notifyInfo(message, position: notifyPosition = 'top-right', autoClose = 3000, hideProgressBar = false){
        const notifyOptions: ToastOptions = {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
        toast.info(message, notifyOptions);
    }

    function notifyLoading(message, position: notifyPosition = 'top-right', hideProgressBar = false){
        const notifyOptions: ToastOptions = {
            position,
            hideProgressBar,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
        return toast.loading(message, notifyOptions);
    }

    function notifyLoadingUpdate(id, render, type, autoClose = 3000, isLoading = false) {
        toast.update(id, { render, type, isLoading, autoClose});
    }

    return {
        notifySucess,
        notifyWarn,
        notifyError,
        notifyInfo,
        notifyLoading,
        notifyLoadingUpdate,
    }
}
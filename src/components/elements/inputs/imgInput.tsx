import { api } from "@data/services/api";
import { useState } from "react";

interface ImgInputProps {
    label: string
    id: string
    register: any
    imageUrl?: string
    alt?: string
    icon: any
}

export default function ImgInput(props: ImgInputProps) {
    const [url, setUrl] = useState<string>(null);
    const register = props.register

    function onChange(e: any) {
        const [file] = e.files
        if (file) {
            setUrl(URL.createObjectURL(file))
        }
    }

    function renderImg() {
        if (url) {
            return (
                <img className="relative rounded-md w-40 h-40" src={url} alt="" />
            )
        }
        else if (props.imageUrl) {
            return (
                <img className="relative rounded-md w-40 h-40" src={`${api.defaults.baseURL}/images/${props.imageUrl}`} alt={props?.alt} />
            )
        } else {
            return (
                <span className="relative inline-block rounded-md overflow-hidden bg-th-accent-medium">
                    <props.icon className=" h-full w-full p-10" />
                </span>
            )
        }
    }

    return (
        <>
            <div className="mt-6 flex-grow lg:mt-0 lg:mr-6 lg:flex-grow-0 lg:flex-shrink-0 ">
                <p className="mb-1 text-sm" aria-hidden="true">
                    {props.label}
                </p>
                <div className="relative rounded-md overflow-hidden lg:block w-40 h-40">
                    {renderImg()}
                    <label
                        htmlFor="user-photo"
                        className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                    >
                        <span>Mudar</span>
                        <span className="sr-only"> user photo</span>
                        <input
                            {...register(props.id)}
                            onChange={e => onChange(e.target)}
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                            tabIndex={-1}
                        />
                    </label>
                </div>
            </div>
        </>
    )
}
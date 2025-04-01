import { useEffect, useState } from "react"
import { request } from "../utils/requester";
import { toast } from "react-toastify";
import convertDate from "../utils/convertDate";
import useAuth from "../hooks/useAuth";


const baseUrl = 'http://localhost:3030/data/comments'

export const useAllComments = (recipeId) => {
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {

        const serchParams = new URLSearchParams({
            where: `recipeId="${recipeId}"`,
            load: 'author=_ownerId:users'
        })

        request('GET', `${baseUrl}?${serchParams.toString()}`)
            .then(data => {
                if (data.length > 0) {
                    const newData = data.map(item => item = {
                        ...item,
                        _createdOn: convertDate(item._createdOn)
                    })
                    return setComments(newData)
                }
                setComments(data)
            })
            .catch(err => toast.error(err.message || 'Something went wrong!'))
    }, [recipeId, refresh])

    const reloadComments = () => {
        setRefresh((state) => !state);
    };

    return { comments, reloadComments };
}

export const useCreateComment = () => {
    const { options } = useAuth();

    const create = (recipeId, content) => {

        return request('POST', baseUrl, { recipeId, content }, options);
    }

    return {
        create
    }
}


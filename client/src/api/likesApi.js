import { useEffect, useState } from "react";
import { request } from "../utils/requester";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/likes`;


// use hook on mount
export const useLikes = (recipeId) => {
    const { authData } = useAuth();
    const [isLiked, setIsLiked] = useState(null);
    const [likes, setLikes] = useState([]);
    const [likeId, setLikeId] = useState(null);

    useEffect(() => {

        const serchParams = new URLSearchParams({
            where: `recipeId="${recipeId}"`,
        })

        request('GET', `${baseUrl}?${serchParams.toString()}`)
            .then(data => {
                setLikes(data)

                const result = data.filter(recipe => recipe._ownerId === authData._id);

                if (result.length > 0) {
                    setIsLiked(true);
                    setLikeId(result[0]._id)
                } else {
                    setIsLiked(false);
                }

            })

    }, [recipeId])

    return {
        likeId,
        setLikeId,
        likes,
        setLikes,
        isLiked,
        setIsLiked
    }

}

export const useLikeRecipe = () => {
    const { options } = useAuth()

    const likeRecipe = (recipeId) => {

        return request('POST', baseUrl, { recipeId }, options);
    }

    return { likeRecipe };
}

export const useDislikeRecipe = () => {
    const { options } = useAuth();


    const dislikeRecipe = (likeId) => {

        return request('DELETE', `${baseUrl}/${likeId}`, null, options)
    }

    return {
        dislikeRecipe
    }
}


export const useLikesByOwner = () => {
    const { authData } = useAuth();
    const userId = authData._id;

    const [likedRecipesIds, setLikedRecipesIds] = useState([]);

    useEffect(() => {

        const serchParams = new URLSearchParams({
            where: `_ownerId="${userId}"`,
            select: 'recipeId'
        })

        request('GET', `${baseUrl}?${serchParams.toString()}`)
            .then(result => result.length > 0 ? setLikedRecipesIds(result.map(item => item.recipeId)) : [])

    }, [])


    return {
        likedRecipesIds
    }
}


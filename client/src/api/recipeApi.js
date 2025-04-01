import { useEffect, useState } from "react";
import { toast } from 'react-toastify'

import { request } from "../utils/requester";
import formatData from "../utils/formatData"
import useAuth from "../hooks/useAuth";


const baseUrl = 'http://localhost:3030/data/recipes';

//use hook on event
export const useCreateRecipe = () => {
    const { options } = useAuth();

    const create = (data) => {
        const recipeData = formatData(data);

        return request('POST', baseUrl, recipeData, options);
    }

    return {
        create
    }
}

//use hook on mount
export const useAllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {

        const serchParams = new URLSearchParams({
            select: '_id,title,description,prepTime,cookTime,imageUrl'
        })

        request('GET', `${baseUrl}?${serchParams}`)
            .then((data) => setRecipes(data))
            .catch((err) => {
                setError(err)
                toast.error(err.message)
            })
            .then(() => setPending(false))

    }, []);

    return {
        isPending,
        recipes,
        error
    }
}

//use on mount
export const useLatestRecipes = () => {
    const [latestRecipes, setLatestRecipes] = useState([]);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null);

    const PAGE_SIZE = 3;

    useEffect(() => {
        const serchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: PAGE_SIZE,
            select: '_id,title,description,prepTime,cookTime,imageUrl'
        })

        request('GET', `${baseUrl}?${serchParams.toString()}`)
            .then((data) => setLatestRecipes(data))
            .catch(err => {
                toast.error(err.message)
                setError(err)
            })
            .then(() => setPending(false))
    }, [])

    return {
        latestRecipes,
        isPending,
        error

    };
}

//use hook on mount
export const useRecipesByOwner = (ownerId) => {
    const [recipes, setRecipes] = useState([]);
    const [isPending, setPending] = useState(true);
    const [ownRecipeError, setOwnRecipeError] = useState(null);

    useEffect(() => {
        const serchParams = new URLSearchParams({
            where: `_ownerId="${ownerId}"`,
            select: '_id,title,description,imageUrl'
        })

        request('GET', `${baseUrl}?${serchParams.toString()}`)
            .then(data => setRecipes(data))
            .catch(err => {
                toast.error(err.message)
                setOwnRecipeError(err);
            })
            .then(() => setPending(false));

    }, [ownerId])

    return {
        recipes,
        isPending,
        ownRecipeError
    }
}

export const useLikedRecipes = (likedRecipesIds) => {

    const [likedRecipes, setLikedRecipes] = useState([]);
    const [likedRecipeError, setLikedRecipeError] = useState(null);
    const [isLikedPending, setPending] = useState(true)


    useEffect(() => {

        const searchRecipeInfoParams = new URLSearchParams({
            select: '_id,title,description,imageUrl'
        })

        if (likedRecipesIds.length > 0) {
            Promise.all(likedRecipesIds.map(id =>
                request('GET', `${baseUrl}/${id}?${searchRecipeInfoParams.toString()}`)))
                .then(result => setLikedRecipes(result))
                .catch(err => {
                    toast.error(err.message)
                    setLikedRecipeError(err)
                })
                .then(setPending(false))

        }

    }, [likedRecipesIds])

    return {
        likedRecipes,
        isLikedPending,
        likedRecipeError

    }
}

//use hook on mount
export const useOneRecipe = (recipeId) => {
    const [recipe, setRecipe] = useState({});
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        request('GET', `${baseUrl}/${recipeId}`)
            .then((data) => setRecipe(data))
            .catch(err => {
                setError(err)
                toast.error(err.message)
            })
            .then(() => setPending(false));
    }, [])

    return {
        recipe,
        isPending,
        error
    }
}

// use hook on event
export const useEditRecipe = () => {
    const { options } = useAuth();

    const edit = (recipeId, data) => {

        const recipeData = formatData(data)

        return request('PUT', `${baseUrl}/${recipeId}`, { ...recipeData, _id: recipeId }, options);
    }

    return {
        edit
    }
}

export const useDeleteRecipe = () => {
    const { options } = useAuth();

    const deleteRecipe = (recipeId) => {
        return request('DELETE', `${baseUrl}/${recipeId}`, null, options)
    }

    return {
        deleteRecipe
    }
}
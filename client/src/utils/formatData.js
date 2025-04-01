export default function formatData(formData) {

    const isValidIngredients = typeof formData.ingredients !== 'string';
    const isValidSteps = typeof formData.steps !== 'string';

    const recipeData = {
        ...formData,
        prepTime: Number(formData.prepTime),
        cookTime: Number(formData.cookTime),
        ingredients: isValidIngredients ? formData.ingredients : formData.ingredients?.split(/,(?=[0-9])/),
        steps: isValidSteps ? formData.steps : formData.steps?.split(/,(?=[A-Z])/),
    }

    return recipeData;
}
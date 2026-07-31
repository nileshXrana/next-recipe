import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getMyIngredientsThunk, getRecipesByIngredientsThunk } from '@/thunks/recipe.thunk';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface Ingredient {
    id: number;
    name: string;
    recipeId: number;
    userId: number;


}

export default function MultipleSelect() {
    const dispatch = useDispatch() as any;
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [ingredient, setIngredient] = React.useState<Ingredient[]>([]);

    const handleChange = async (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        // call the API to fetch recipes based on selected ingredients
        const res = await dispatch(getRecipesByIngredientsThunk(personName));
        
        
    };

    useEffect(() => {
        const res = dispatch(getMyIngredientsThunk());
        res.then((ingredients: any) => {
            console.log("Ingredients fetched:", ingredients.payload);
            setIngredient(ingredients.payload);
        });
    }, [dispatch])


    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Filter Ingredients</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {ingredient.map((ing) => (
                        <MenuItem
                            key={ing.id}
                            value={ing.name}
                            style={getStyles(ing.name, personName, theme)}
                        >
                            {ing.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<ingredientType>();

export default function Ingredients({ selectedIngredients, setSelectedIngredients }: { selectedIngredients: string[]; setSelectedIngredients: any }) {
    const [value, setValue] = React.useState<ingredientType | null>(null);

    const addIngredient = (ingredient: string) => () => {
        if (!selectedIngredients.includes(ingredient)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);

        }
        setValue(null);
    };

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `${inputValue}`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={ingredients}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps} onClick={addIngredient(option.title)}>
                        {option.title}
                    </li>
                );
            }}
            sx={{ width: 545 }}
            freeSolo
            resetHighlightOnMouseLeave
            renderInput={(params) => (
                <TextField {...params} label="Ingredients" />
            )}
        />
    );
}

interface ingredientType {
    inputValue?: string;
    title: string;
}

// ingredients list
const ingredients: readonly ingredientType[] = [
    { title: 'Salt' },
    { title: 'Sugar' },
    { title: 'Flour' },
    { title: 'Eggs' },
    { title: 'Butter' },
    { title: 'Milk' },
    { title: 'Baking Powder' },
    { title: 'Vanilla Extract' },
    { title: 'Cocoa Powder' },
    { title: 'Yeast' },
];

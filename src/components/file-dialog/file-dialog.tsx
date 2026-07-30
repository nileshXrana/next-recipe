"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from "./file-dialog.module.css";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { Label } from '@radix-ui/react-dropdown-menu';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Ingredients from '@/components/ingredients/ingredients';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';
import { recipeThunk } from '@/thunks/recipe.thunk';

export interface recipeData {
    name: string;
    description: string;
    cookingTime: string;
    ingredients: string[];
    images: File;
}


export default function FileDialog() {
    const [open, setOpen] = React.useState(false);
    const [selectedIngredients, setSelectedIngredients] = React.useState<string[]>([]);
    const [cookingTime, setCookingTime] = React.useState<any>(dayjs().hour(0).minute(0).second(0));
    const [description, setDescription] = React.useState<string>('');

    const dispatch = useDispatch() as any

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const formattedTime = cookingTime && typeof cookingTime.format === 'function' && cookingTime.isValid()
            ? cookingTime.format('HH:mm:ss')
            : '00:00:00';

        const recipeData: recipeData = {
            name: formData.get('name') as string,
            description: description,
            cookingTime: formattedTime,
            ingredients: selectedIngredients,
            images: formData.get('file-upload') as File,
        };

        const res = await dispatch(recipeThunk(recipeData));
        console.log(res);

        handleClose();
    };

    const removeIngredient = (ingredient: string) => {
        setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
    };
    cookingTime
    return (
        <React.Fragment >
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Recipe
            </Button>
            <Dialog open={open} onClose={handleClose} className={styles.dialog} maxWidth="md">
                <DialogTitle>Add Recipe   </DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <DialogContentText>
                        Store all of your favourite recipes in one place.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Recipe Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />

                        <InputLabel className={styles.inputLabel} id="task-status-select-label">Add Description</InputLabel>
                        <SimpleEditor setDescription={setDescription} />


                        <Box className={styles.timeAndIngredientsContainer}>
                            <Box>
                                <InputLabel className={styles.inputLabel} id="task-status-select-label">Recipe Cooking Time</InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker onChange={(value) => setCookingTime(value)} value={cookingTime} views={['hours', 'minutes', 'seconds']} format="hh : mm : ss" />
                                </LocalizationProvider>
                            </Box>
                            <Box>
                                <InputLabel className={styles.inputLabel} id="task-status-select-label">Add Ingredients </InputLabel>
                                <Ingredients selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} />
                            </Box>
                        </Box>

                        <Box className={styles.selectedIngredients}>
                            {selectedIngredients.map((ingredient, index) => (
                                <Box key={index} className={styles.ingredientChip}>
                                    {ingredient}
                                    <Box className={styles.removeIngredient} onClick={() => { removeIngredient(ingredient) }} >
                                        <ClearIcon sx={{ scale: 0.7 }} />
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        <InputLabel className={styles.inputLabel} id="task-status-select-label">Add Recipe Images</InputLabel>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            required

                        />



                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

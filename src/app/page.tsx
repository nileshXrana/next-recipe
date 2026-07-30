"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Container, Card, CardContent, CardMedia, Chip, TextField, CircularProgress, Pagination, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { getAllRecipesThunk } from "@/thunks/recipe.thunk";
import { useDebounce } from "use-debounce";
import styles from "./page.module.css";

export default function Home() {
  const dispatch = useDispatch() as any;
  const { recipes, total, loading } = useSelector((state: any) => state.recipes);
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearch] = useDebounce(searchVal, 500);
  const [page, setPage] = useState(1);

  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(getAllRecipesThunk({ search: debouncedSearch, page, limit: 6 }));
  }, [dispatch, debouncedSearch, page]);

  const recipeList = Array.isArray(recipes) ? recipes : [];
  const pageCount = Math.ceil((total || 0) / 6);

  const handleOpenDialog = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedRecipe(null);
    setIsDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.header}>
        <Box className={styles.headerTitleSection}>
          <Typography variant="h4" className={styles.recipeName}>
            Recipes
          </Typography>
          <TextField
            placeholder="Search recipes or ingredients..."
            variant="outlined"
            size="small"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className={styles.searchField}
          />
        </Box>
        <Box className={styles.navActions}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Button variant="contained">Dashboard</Button>
          </Link>
        </Box>
      </Box>

      {loading ? (
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      ) : recipeList.length === 0 ? (
        <Typography color="textSecondary" align="center" sx={{ my: 4 }}>
          No recipes found
        </Typography>
      ) : (
        <>
          <Box className={styles.recipesGrid}>
            {recipeList.map((recipe: any) => (
              <Card
                key={recipe.id}
                variant="outlined"
                className={styles.recipeCard}
                onClick={() => handleOpenDialog(recipe)}
                style={{ cursor: "pointer" }}
              >
                {recipe.images && recipe.images.length > 0 && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={recipe.images[0]}
                    alt={recipe.name}
                  />
                )}
                <CardContent className={styles.cardContent}>
                  <Typography variant="h6" className={styles.recipeName} noWrap>
                    {recipe.name}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    Cooking Time: {recipe.cookingTime}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    By: {recipe.user?.name || "Anonymous"}
                  </Typography>

                  {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <Box className={styles.ingredientsRow}>
                      {recipe.ingredients.slice(0, 5).map((ing: string, i: number) => (
                        <Chip key={i} label={ing} size="small" />
                      ))}
                      {recipe.ingredients.length > 5 && (
                        <Chip label={`+${recipe.ingredients.length - 5}`} size="small" variant="outlined" />
                      )}
                    </Box>
                  )}

                  {recipe.description && (
                    <Typography variant="body2" color="textSecondary" className={styles.recipeDescription}>
                      {recipe.description.replace(/<[^>]*>/g, '')}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box className={styles.paginationContainer}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        {selectedRecipe && (
          <>
            <DialogTitle sx={{ pr: 6 }}>
              {selectedRecipe.name}
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers className={styles.dialogContent}>
              {selectedRecipe.images && selectedRecipe.images.length > 0 && (
                <img
                  src={selectedRecipe.images[0]}
                  alt={selectedRecipe.name}
                  className={styles.dialogImage}
                />
              )}

              <Typography variant="body2" color="textSecondary" className={styles.dialogMeta}>
                Cooking Time: {selectedRecipe.cookingTime}
              </Typography>

              {selectedRecipe.user?.name && (
                <Typography variant="body2" color="textSecondary" className={styles.dialogMeta}>
                  By: {selectedRecipe.user.name}
                </Typography>
              )}

              {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
                <Box className={styles.dialogIngredients}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Ingredients:
                  </Typography>
                  <Box className={styles.ingredientsRow}>
                    {selectedRecipe.ingredients.map((ing: string, i: number) => (
                      <Chip key={i} label={ing} size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              {selectedRecipe.description && (
                <Box className={styles.dialogDescription}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    Description:
                  </Typography>
                  <div dangerouslySetInnerHTML={{ __html: selectedRecipe.description }} />
                </Box>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
}

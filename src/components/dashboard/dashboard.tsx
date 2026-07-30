"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import styles from "./dashboard.module.css";
import FileDialog from "@/components/file-dialog/file-dialog";

const filterTags = ["All"];

export default function Dashboard() {
  const dispatch = useDispatch() as any;
  // const { files } = useSelector((state: any) => state.files);
  const [selectedTag, setSelectedTag] = useState("All");


  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    // dispatch(getFilesThunk(tag));
  };

  // const fileList = Array.isArray(files) ? files : [];
  const fileList: any[] = []

  return (
    <Box className={styles.dashboardRoot}>
      <Box className={styles.dashboardHeader}>
        <Typography variant="h5">Recipes</Typography>
        <Box className={styles.headerActions}>
          <FileDialog />

        </Box>
      </Box>

      <Box className={styles.filterBar}>
        {filterTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "contained" : "outlined"}
            onClick={() => handleTagChange(tag)}
            className={styles.filterButton}
            size="small"
          >
            {tag}
          </Button>
        ))}
      </Box>

      <Box className={styles.dashboardContainer}>
        {fileList.length === 0 ? (
          <Typography className={styles.emptyText}>No recipes found</Typography>
        ) : (
          <Box className={styles.filesGrid}>
            {fileList.map((file: any) => (
              <Box key={file.id} className={styles.fileCard}>
                <Typography className={styles.fileName}>{file.name}</Typography>
                <Typography className={styles.fileTag}>{file.tags}</Typography>
                <Link
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fileLink}
                >
                  View File
                </Link>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
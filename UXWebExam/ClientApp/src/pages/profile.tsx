import React from "react";
import {
    Card,
    Stack,
    CircularProgress,
    Typography,
    Box,
    Avatar,
} from "@mui/material";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const ProfilePicture: React.FC = () => {
    const [chosenFile, setChosenFile] = React.useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files[0].size < 600) return;

        const imageObj = event.target.files[0];
        if (imageObj.size > 3.1 * 10e5) {
            alert("The image provided is too large");
            return;
        }

        const imageAsStr = URL.createObjectURL(imageObj);
        setChosenFile(imageAsStr.toString());
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none", width: "inherit" }}
                id="choosePhoto"
            />
            <label
                htmlFor="choosePhoto"
                style={{
                    cursor: "pointer",
                    margin: "auto",
                }}
            >
                <Card
                    sx={{
                        alignItems: "center",
                        p: 6,
                        maxWidth: 400,
                        height: "100%",
                        maxHeight: 500,
                    }}
                >
                    <Box
                        sx={{
                            p: 4,
                            w: "inherit",
                            h: "inherit",
                            alignItems: "center",
                        }}
                    >
                        <Stack alignItems="center" spacing={3}>
                            <Avatar
                                sx={{
                                    height: 200,
                                    width: 200,
                                    borderWidth: 2,
                                    borderStyle: "dashed",
                                    borderColor: "lightgrey",
                                    backgroundColor: "background.paper",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        height: "inherit",
                                        width: "inherit",
                                        borderWidth: 15,
                                        borderStyle: "solid",
                                        borderColor: "background.paper",
                                        backgroundColor: chosenFile
                                            ? "black"
                                            : "rgb(244, 246, 248)",
                                    }}
                                >
                                    {chosenFile ? (
                                        <Avatar
                                            src={chosenFile}
                                            sx={{
                                                position: "absolute",
                                                borderWidth: "inherit",
                                                borderStyle: "solid",
                                                height: "inherit",
                                                width: "inherit",
                                                opacity: 0.4,
                                            }}
                                        />
                                    ) : null}
                                    <Stack alignItems="center">
                                        <AddAPhotoIcon
                                            sx={{
                                                height: 50,
                                                width: 50,
                                            }}
                                            color={
                                                chosenFile
                                                    ? undefined
                                                    : "disabled"
                                            }
                                        />

                                        <Typography
                                            variant="body2"
                                            color={
                                                chosenFile
                                                    ? "background.paper"
                                                    : "text.secondary"
                                            }
                                        >
                                            {chosenFile
                                                ? "Update Photo"
                                                : "Upload Photo"}
                                        </Typography>
                                    </Stack>
                                </Avatar>
                            </Avatar>
                            <Stack alignItems="center">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Max size of 3.1 MB
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Card>
            </label>
        </>
    );
};
export default ProfilePicture;

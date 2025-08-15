import Button from "@mui/material/Button";

export default function () {
  const handleDelete = () => {};
  return (
    <>
      <Button onClick={handleDelete} variant="contained"
         sx={{ ml: 107, mt: 2, mb: -8.5 }}>
        Delete User Account
      </Button>
    </>
  );
}

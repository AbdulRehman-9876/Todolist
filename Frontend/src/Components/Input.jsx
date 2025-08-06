import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Input() {
    return (
        <>  
            <TextField id="standard-basic" label="Enter Notes" variant="standard" fullWidth />
            <Button variant="contained" color="success" sx={{ml:130, mt:2, mb:3, width:120}}>
                Add Notes
            </Button>
        </>
    );
}

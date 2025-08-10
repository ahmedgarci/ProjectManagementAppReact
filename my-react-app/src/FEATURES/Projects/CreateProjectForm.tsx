// import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
// import type { StateProps } from "../TASKS/TaskForm/Shared/StateProps";

// export default function CreateNewProjectForm({}:StateProps) {

//     return(
//         <Dialog open={openNew} onClose={() => setOpenNew(false)} maxWidth="sm" fullWidth>
//         <DialogContent sx={{ fontWeight: 500 }}>Create Project</DialogTitle>
//         <DialogContent sx={{ py: 2 }}>
//           <TextField label="Project Name" fullWidth variant="outlined" sx={{ my: 2 }} />
//           <TextField
//             label="Deadline"
//             type="date"
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//             variant="outlined"
//           />
//         </DialogContent>
//         <DialogActions sx={{ pr: 3, pb: 2 }}>
//           <Button onClick={() => setOpenNew(false)} color="inherit">Cancel</Button>
//           <Button variant="contained">Create</Button>
//         </DialogActions>
//       </Dialog>
//     )
// }
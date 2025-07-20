import { Stack, CircularProgress, Typography } from "@mui/material"

function loader({message}: {message:string}) {
  return (
   <Stack p={4} alignItems="center">
        <CircularProgress size={80} thickness={8} />
        <Typography variant="h6">{message}</Typography>
    </Stack>
  )
}

export default loader
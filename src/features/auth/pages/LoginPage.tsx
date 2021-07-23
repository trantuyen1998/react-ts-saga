import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { useAppDispatch } from "app/hooks";
import * as React from "react";
import { authActions } from "../authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: '100vh'
  },
  box: {
    padding: theme.spacing(3)
  }
}));

export function LoginPage() {
  const classes = useStyles();

  const dispatch = useAppDispatch()
  const handleLoginClick = () => {
    dispatch(authActions.login({
      username:'',
      password:''
    }))
  }
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" onClick={handleLoginClick} color="primary">
            Fake login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

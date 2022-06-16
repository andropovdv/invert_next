import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { login } from "store/thunks/authThunk";
import { selectAuthData } from "store/selectors";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

interface IFormInput {
  email: string;
  password: string;
}

export const Login = ({ open, setOpen }: Props) => {
  const { control, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectAuthData);

  const onSubmit = (data: IFormInput) => {
    dispatch(login(data.email, data.password));
    if (!isLoading) {
      setOpen(false);
      navigate("/start");
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Login</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              )}
              name="email"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              )}
              name="password"
              control={control}
              defaultValue=""
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Отмена</Button>
            <LoadingButton loading={isLoading} type="submit">
              Войти
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

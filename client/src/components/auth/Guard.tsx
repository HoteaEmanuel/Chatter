import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { LinkError } from "@apollo/client/errors";
import { usePath } from "../../hooks/usePath";
interface GuardProps {
  children: React.ReactElement;
}
const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);
  useEffect(() => {
    if (error && LinkError.is(error)) snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
  }, [error]);
  const { path } = usePath();
  return (
    <>
      {excludedRoutes.includes(path) ? children : user ? children : undefined}
    </>
  );
};
export default Guard;

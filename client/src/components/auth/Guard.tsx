import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
interface GuardProps {
  children: React.ReactElement;
}
const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe();
  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user
          ? children
          : undefined}
    </>
  );
};
export default Guard;

import { useSelector } from "react-redux";
import { useGetUser } from "../hook";
import { AppDispatch } from "../store/configStore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser, setUser } from "../store/reducer/userSlice";
import AvatarUser from "../component/componentReuse/AvatarUser";
import { Outlet } from "react-router-dom";

const LayoutUser = () => {
  const user = useGetUser();
  const userSelector = useSelector(getUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  return (
    <div className="mx-auto my-0 max-w-[1024px] w-full min-h-[60vh] ">
      <div className="relative my-3 h-full">
        <div className="bg-slate-100 flex gap-3 p-3 h-full">
          <div className=" bg-white w-1/4 px-3 py-2  ">
            <div className="mx-auto my-0 pt-5">
              <div className=" w-[50px] h-[50px] flex items-center justify-center rounded-full  overflow-hidden mx-auto ">
                <AvatarUser user={userSelector} size={50} />
              </div>
              <p className=" text-center font-semibold text-xl mt-5 opacity-70">
                {userSelector?.firstName} {userSelector?.lastName}
              </p>
            </div>
          </div>
          <div className="w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutUser;

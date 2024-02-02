import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  DefaultLayout,
  LayoutAdmin,
  LayoutBookingUser,
  LayoutCity,
  LayoutMember,
} from "./layout";
import { publicPage } from "./router/layoutArray";
import { PrivateAdmin, PrivateHost } from "./router";
import LayoutHost from "./layout/host/LayoutHost";
import { Role } from "./type";
import LayoutUser from "./layout/LayoutUser";
import { Detail, NotFound, User } from "./page/user";
import { BookingConfirm, HostStatistics } from "./page/host";
import { RoomManager } from "./page/admin";
import UserLayout from "./page/admin/UserLayout";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* layout user public */}

          {publicPage.map((router) => {
            const Layout = router.layout ? DefaultLayout : LayoutMember;
            const LayoutRoleAmin = LayoutAdmin;
            const LayoutRoleHost = LayoutHost;
            const LayoutRoleGuige = LayoutUser;
            const Page = router.component;
            return router.role === Role.admin ? (
              <Route key={router.id} element={<PrivateAdmin />}>
                <Route key={router.id} path="/" element={<LayoutRoleAmin />}>
                  {router.layout && (
                    <Route path={router.path} element={<Page />} />
                  )}
                  <Route
                    key={router.id}
                    path="admin/room"
                    element={<RoomManager />}
                  >
                    {router.children && router.childrenRole === "room" && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                  <Route
                    key={router.id}
                    path="admin/user/:id"
                    element={<UserLayout />}
                  >
                    {router.children && router.childrenRole === "user" && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                </Route>
              </Route>
            ) : router.role === Role.host ? (
              <Route key={router.id} element={<PrivateHost />}>
                <Route key={router.id} path="/" element={<LayoutRoleHost />}>
                  <Route path="host/:id" element={<HostStatistics />}>
                    {router.childrenRole === "room" && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                  {router.layout && (
                    <Route path={router.path} element={<Page />} />
                  )}
                  <Route
                    key={router.id}
                    path="host/user/:id"
                    element={<LayoutBookingUser />}
                  >
                    {router.childrenRole === "user" && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                  <Route
                    key={router.id}
                    path="host/booking"
                    element={<BookingConfirm />}
                  >
                    {router.childrenRole === "booking" && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                </Route>
              </Route>
            ) : (
              <Route key={router.id} path="/" element={<Layout />}>
                <Route path={router.path} element={<Page />} />
                <>
                  <Route key={router.id} path="/detail" element={<Detail />}>
                    {router.childrenRole === "detail" && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                  <Route key={router.id} path="/city" element={<LayoutCity />}>
                    {router.childrenRole === "city" && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                  {router.role === Role.guide && (
                    <Route
                      key={router.id}
                      path="/user"
                      element={<LayoutRoleGuige />}
                    >
                      {router.childrenRole === "user" && (
                        <Route path="" element={<User />}>
                          <Route path={router.path} element={<Page />}></Route>
                        </Route>
                      )}
                      <Route path={router.path} element={<Page />} />
                    </Route>
                  )}
                </>
              </Route>
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

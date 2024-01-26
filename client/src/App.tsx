import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DefaultLayout, LayoutAdmin, LayoutMember } from "./layout";
import { publicPage } from "./router/layoutArray";
import { PrivateAdmin, PrivateHost, PrivateUser } from "./router";
import LayoutHost from "./layout/host/LayoutHost";
import { Role } from "./type";
import LayoutUser from "./layout/LayoutUser";
import { User } from "./page/user";
import { BookingConfirm } from "./page/host";
import { RoomManager } from "./page/admin";
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
                    {router.children && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                </Route>
              </Route>
            ) : router.role === Role.host ? (
              <Route key={router.id} element={<PrivateHost />}>
                <Route key={router.id} path="/" element={<LayoutRoleHost />}>
                  {router.layout && (
                    <Route path={router.path} element={<Page />} />
                  )}
                  <Route
                    key={router.id}
                    path="host/booking"
                    element={<BookingConfirm />}
                  >
                    {router.children && (
                      <Route path={router.path} element={<Page />} />
                    )}
                  </Route>
                </Route>
              </Route>
            ) : (
              <Route key={router.id} path="/" element={<Layout />}>
                <Route path={router.path} element={<Page />} />
                {router.role === Role.guide && (
                  <Route key={router.id} element={<PrivateUser />}>
                    <Route
                      key={router.id}
                      path="/user"
                      element={<LayoutRoleGuige />}
                    >
                      <Route path="" element={<User />}>
                        <Route
                          path={""}
                          element={router.children && <Page />}
                        ></Route>
                      </Route>
                      <Route path={router.path} element={<Page />} />
                    </Route>
                  </Route>
                )}
              </Route>
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;

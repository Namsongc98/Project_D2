import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DefaultLayout, LayoutAdmin, LayoutMember } from "./layout";
import { publicPage } from "./router/layoutArray";
import { PrivateAdmin, PrivateHost, PrivateUser } from "./router";
import LayoutHost from "./layout/host/LayoutHost";
import { Role } from "./type";
import LayoutUser from "./layout/LayoutUser";
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
                  <Route path={router.path} element={<Page />} />
                </Route>
              </Route>
            ) : router.role === Role.host ? (
              <Route key={router.id} element={<PrivateHost />}>
                <Route key={router.id} path="/" element={<LayoutRoleHost />}>
                  <Route path={router.path} element={<Page />} />
                </Route>
              </Route>
            ) : (
              <Route key={router.id} path="/" element={<Layout />}>
                <Route path={router.path} element={<Page />} />
                {router.role === Role.guide && (
                  <Route key={router.id} element={<PrivateUser />}>
                    <Route
                      key={router.id}
                      path="user"
                      element={<LayoutRoleGuige />}
                    >
                      <Route key={router.id} path={router.path} element={<Page />} />
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

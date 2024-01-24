import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DefaultLayout, LayoutAdmin, LayoutMember } from "./layout";
import { member, publicPage } from "./router/layoutArray";
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
          {publicPage.map((router, index) => {
            const Layout = DefaultLayout;
            const LayoutRoleAmin = LayoutAdmin;
            const LayoutRoleHost = LayoutHost;
            const LayoutRoleGuige = LayoutUser;
            const Page = router.component;
            return router.role === Role.admin ? (
              <Route element={<PrivateAdmin />}>
                <Route key={index} path="/" element={<LayoutRoleAmin />}>
                  <Route path={router.path} element={<Page />} />
                </Route>
              </Route>
            ) : router.role === Role.host ? (
              <Route element={<PrivateHost />}>
                <Route key={index} path="/" element={<LayoutRoleHost />}>
                  <Route path={router.path} element={<Page />} />
                </Route>
              </Route>
            ) : (
              <Route key={index} path="/" element={<Layout />}>
                <Route path={router.path} element={<Page />} />
                {router.role === Role.guide && (
                  <Route element={<PrivateUser />}>
                    <Route
                      key={index}
                      path="/user"
                      element={<LayoutRoleGuige />}
                    >
                      <Route path={router.path} element={<Page />} />
                    </Route>
                  </Route>
                )}
              </Route>
            );
          })}
          {/* layout login */}
          <Route path="/" element={<LayoutMember />}>
            {member.map((router, index) => {
              const Page = router.component;
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={<Page />}
                ></Route>
              );
            })}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

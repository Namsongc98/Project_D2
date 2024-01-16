import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DefaultLayout, LayoutAdmin, LayoutMember } from "./layout";
import {
  layoutHost,
  member,
  privateAmin,
  publicPage,
} from "./router/layoutArray";
import { PrivateAdmin, PrivateHost } from "./router";
import LayoutHost from "./layout/host/LayoutHost";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* layout user public */}
          {publicPage.map((router, index) => {
            const Layout = DefaultLayout;
            const Page = router.component;
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {/* layout Admin private */}
          <Route element={<PrivateAdmin />}>
            {privateAmin.map((router, index) => {
              const Layout = LayoutAdmin;
              const Page = router.component;
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route>

          {/* layout host */}
          <Route element={<PrivateHost />}>
            {layoutHost.map((router, index) => {
              const Layout = LayoutHost;
              const Page = router.component;
              return (
                <Route key={index} path="/" element={<Layout />}>
                  <Route path={router.path} element={<Page />} />
                </Route>
              );
            })}
          </Route>

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

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateAdmin, privateAmin, publicPage, member } from "./router";
import { DefaultLayout } from "./layout";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import LayoutMember from "./layout/LayoutMember";
function App() {
  return (
    <>
      <Router>
        <Routes>
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

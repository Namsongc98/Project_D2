import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DefaultLayout, LayoutAdmin,LayoutMember } from "./layout";
import { member, privateAmin, publicPage } from "./router/layoutArray";
import { PrivateAdmin } from "./router";


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

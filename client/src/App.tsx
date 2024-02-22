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
import {
  Detail,
  DetailRoom,
  HistoryBooking,
  NotFound,
  User,
} from "./page/user";
import {
  BookingConfirm,
  BookingHostStatus,
  BookingUser,
  CalendarHost,
  CalendarHostParam,
  HostStatistics,
  RoomHost,
} from "./page/host";
import { RoomManager, RoomType, UserBooking } from "./page/admin";
import UserLayout from "./page/admin/UserLayout";
import LayoutAdminHost from "./layout/admin/LayoutAdminHost";
import CalendarAdmin from "./page/admin/CalendarAdmin";
import CalendarAdminParam from "./page/admin/CalendarAdminParam";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicPage.map((router) => {
            const Layout = router.layout ? DefaultLayout : LayoutMember;
            const Page = router.component;
            return router.role === Role.admin ? (
              <Route key={router.id} element={<PrivateAdmin />}>
                <Route key={router.id} path="/admin" element={<LayoutAdmin />}>
                  <Route path={router.path} element={<Page />} />
                  <Route
                    key={router.id}
                    path="host/"
                    element={<LayoutAdminHost />}
                  >
                    <Route path=":id" element={<RoomType />} />
                  </Route>
                  <Route key={router.id} path="room" element={<RoomManager />}>
                    <Route path="" element={<RoomType />} />
                  </Route>
                  <Route
                    key={router.id}
                    path="user/:id"
                    element={<UserLayout />}
                  >
                    <Route path="" element={<UserBooking />} />
                  </Route>
                  <Route
                    key={router.id}
                    path="/admin/calendar"
                    element={<CalendarAdmin />}
                  >
                    <Route path="" element={<CalendarAdminParam />} />
                  </Route>
                </Route>
              </Route>
            ) : router.role === Role.host ? (
              <Route key={router.id} element={<PrivateHost />}>
                <Route key={router.id} path="/" element={<LayoutHost />}>
                  <Route path={router.path} element={<Page />} />
                  <Route path="host" element={<HostStatistics />}>
                    <Route path={""} element={<RoomHost />} />
                  </Route>
                  <Route
                    key={router.id}
                    path="host/user/:id"
                    element={<LayoutBookingUser />}
                  >
                    <Route path={""} element={<BookingUser />} />
                  </Route>
                  <Route
                    key={router.id}
                    path="host/booking"
                    element={<BookingConfirm />}
                  >
                    <Route path="" element={<BookingHostStatus />} />
                  </Route>
                </Route>
              </Route>
            ) : (
              <Route key={router.id} path="/" element={<Layout />}>
                <Route path={router.path} element={<Page />} />
                <>
                  <Route key={router.id} path="/detail" element={<Detail />}>
                    <Route path={":id"} element={<DetailRoom />} />
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
                      element={<LayoutUser />}
                    >
                      <Route path="" element={<User />}>
                        <Route path="" element={<HistoryBooking />} />
                      </Route>
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

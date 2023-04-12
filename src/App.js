import React, {useEffect, useRef, useState} from "react";

import "./App.css";
import "./login/login.css";
import "primereact/resources/themes/rhea/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import UploadDocument from "./profile/components/UploadDocument";
import Logo from "./Logo.png";


import {Sidebar} from "primereact/sidebar";
import {Menu} from "primereact/menu";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Toast} from "primereact/toast";

import SupportITForm from "./support/components/SupportITForm";
import SupportHRForm from "./support/components/SupportHRForm";
import CurrentTickets from "./support/components/CurrentTickets";
import TicketArchive from "./support/components/TicketArchive";
import Home from "./home/components/Home";
import Profile from "./profile/components/Profile";
import HolidayRequest from "./leave/HolidayRequest";
import Login from "./login/Login";
import Support from "./support/components/Support";
import {Button} from "primereact/button";
import AdminDash from "./home/components/AdminDash";
import useToken from "./login/useToken";
import {Image} from "react-bootstrap";
import Notifications from "./home/components/Notifications";
import {LogOutOp} from "./LogOut";


export function App() {

  const [visibleCustomToolbar, setVisibleCustomToolbar] = useState(true);

  //login states
  const [loggedIn, setLoggedIn] = useState(null);
  const [setNotifications] = useState([]);

  const { token, setToken } = useToken();

  const toast = useRef(null);

  const getAccType = async () => {
    const response = await fetch("http://localhost:5000/api/account-type", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    });
    return await response.json();
  };

  const getNotifications = async () => {
    const response = await fetch("http://localhost:5000/api/notifications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    });
    const data = await response.json();
    return data.notifications;
  };

  const updateMenuNotify = () => {
    if (token) {
      getAccType().then(acc => {
        if (acc.status === "error") {
          return;
        }
        getNotifications().then(data => {
          if (data !== null) {
            setNotifications(data);
            if (acc.accountType === "admin") {
              setItems(adminMenuNotify);
            } else {
              setItems(defaultMenuNotify);
            }
          } else {
            if (acc.accountType === "admin") {
              setItems(adminMenu);
            } else {
              setItems(defaultMenu);
            }
          }
        });
      });
    }
  };

  useEffect(() => {
    //get notifications from database

    if (token) {
      updateMenuNotify();
    }
  }, [token])// eslint-disable-line react-hooks/exhaustive-deps


  const handleNotification = () => {
    updateMenuNotify();
    window.location = "#/notifications";
  };

  //sidebar states

  const adminMenu = [
    {
      label: <Image src={Logo} className="e-logo" alt="Logo" />
    },
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        window.location = "#/";
      }
    },
    {
      label: "Notifications ~ No",
      icon: "pi pi-bell",
      className: "p-menuitem-active",
      command: () => {
        handleNotification();
      }
    },
    {
      label: "Annual Leave",
      icon: "pi pi-calendar",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/annual-leave";
      }
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/profile";
      }
    },
    {
      label: "Admin",
      icon: "pi pi-cog",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/admin";
      }
    },
    {
      label: "Support",
      icon: "pi pi-question-circle",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/support";
      }
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: async () => {
        await LogOutOp(toast)
      }
    }
  ];

  const adminMenuNotify = [
    {
      label: <Image src={Logo} className="e-logo" alt="Logo" />
    },
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        window.location = "#/";
      }
    },
    {
      label: "Notifications ~ Yes",
      icon: "pi pi-bell",
      className: "p-menuitem-active",
      command: () => {
        handleNotification();
      }
    },
    {
      label: "Annual Leave",
      icon: "pi pi-calendar",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/annual-leave";
      }
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/profile";
      }
    },
    {
      label: "Admin",
      icon: "pi pi-cog",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/admin";
      }
    },
    {
      label: "Support",
      icon: "pi pi-question-circle",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/support";
      }
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: async () => {
        await LogOutOp(toast)
      }
    }
  ];

  const defaultMenu = [
    {
      label: <Image src={Logo} className="e-logo" alt="Logo" />
    },
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        window.location = "#/";
      }
    },
    {
      label: "Notifications ~ No",
      icon: "pi pi-bell",
      className: "p-menuitem-active",
      command: () => {
        handleNotification();
      }
    },
    {
      label: "Annual Leave",
      icon: "pi pi-calendar",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/annual-leave";
      }
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/profile";
      }
    },
    {
      label: "Support",
      icon: "pi pi-question-circle",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/support";
      }
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: async () => {
        await LogOutOp(toast)
      }
    }
  ];

  const defaultMenuNotify = [
    {
      label: <Image src={Logo} className="e-logo" alt="Logo" />
    },
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        window.location = "#/";
      }
    },
    {
      label: "Notifications ~ Yes",
      icon: "pi pi-bell",
      className: "p-menuitem-active",
      command: () => {
        handleNotification();
      }
    },
    {
      label: "Annual Leave",
      icon: "pi pi-calendar",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/annual-leave";
      }
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/profile";
      }
    },
    {
      label: "Support",
      icon: "pi pi-question-circle",
      className: "p-menuitem-active",
      command: () => {
        window.location = "#/support";
      }
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: async () => {
        await LogOutOp(toast)
      }
    }
  ];

  const [items, setItems] = useState(defaultMenu);

  if (loggedIn === null && token) {
    getAccType().then(res => {
      if (res.status === "error") {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    });
    return <div>
      loading...
    </div>;
  } else if (loggedIn === false || !token) {
    return (
      <Login setLoggedIn={setLoggedIn} setToken={setToken} />
    );
  } else {
    return (
      <Router>
        <div className="App">
          <Button icon="pi pi-arrow-circle-right" onClick={() => setVisibleCustomToolbar(true)} className="mr-4"
                  label="Menu" />
          <Sidebar visible={visibleCustomToolbar} onHide={() => setVisibleCustomToolbar(false)}
                   style={{ padding: 0, width: "265px" }}>
            <Menu model={items}
                  style={{ width: "100%", height: "100%" }} />
          </Sidebar>
          <Toast ref={toast} />
          <div style={{ margin: "15px", padding: "15px" }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Profile" component={Profile} />
              <Route path="/annual-leave" component={HolidayRequest} />
              <Route path="/UploadDocument" component={UploadDocument} />
              <Route path="/support" component={Support} />
              <Route path="/SupportITForm" component={SupportITForm} />
              <Route path="/SupportHRForm" component={SupportHRForm} />
              <Route path="/CurrentTickets" component={CurrentTickets} />
              <Route path="/TicketArchive" component={TicketArchive} />
              <Route path="/Notifications">
                <Notifications update={updateMenuNotify} />
              </Route>
              <Route path="/admin" component={AdminDash} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
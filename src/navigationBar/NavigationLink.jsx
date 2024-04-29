import React from "react";
import Design from "./NavigationBar.module.css";
import DashboardIcon from "../customIcons/DashboardIcon";
import AppointmentsIcon from "../customIcons/AppoinmentsIcon";
import BlogsIcon from "../customIcons/BlogsIcon";
import BlogIcon from "../customIcons/BlogIcon";
import LeafletsIcon from "../customIcons/LeafletsIcon";
import FeedbacksIcon from "../customIcons/FeedbacksIcon";
import NotificationsIcon from "../customIcons/NotificationsIcon";
import ClinicIcon from "../customIcons/ClinicIcon";
import AppointmentRequestIcon from "../customIcons/AppointmentRequestIcon";
import ContactsIcon from "../customIcons/ContactsIcon";
import LogoutIcon from "../customIcons/LogoutIcon";
import ProductAdd from "../customIcons/ProductAdd";
import CategoryIcon from "../customIcons/CategoryIcon";
// import {UserOutlined} from "../customIcons/LogoutIcon";
import UsersIcon from "../customIcons/Users";
export default function NavigationLink(props) {
    const { title, color } = props;
    let iconComponent;
    if (title === "Dashboard") {
      iconComponent = <DashboardIcon color={"#ffffff"} />;
    } else if (title === "Appointments") {
      iconComponent = <AppointmentsIcon color={"#ffffff"} />;
    }  else if (title === "Requests") {
      iconComponent = <AppointmentRequestIcon color={"#ffffff"} />;
    } else if (title === "Resources") {
      iconComponent = <BlogsIcon color={"#ffffff"} />;
    } else if (title === "Patient leaflets") {
      iconComponent = <LeafletsIcon color={"#ffffff"} />;
    } else if (title === "Notifications") {
      iconComponent = <NotificationsIcon color={"#ffffff"} />;
    }else if (title === "Feedbacks") {
      iconComponent = <FeedbacksIcon color={"#ffffff"}/>;
    }else if (title === "Clinics") {
      iconComponent = <ClinicIcon color={"#ffffff"} />;
    }else if (title === "Enquiries") {
      iconComponent = <ContactsIcon color={"#ffffff"} />;
    }else if (title === "Users") {
      iconComponent = <UsersIcon  color={"#ffffff"} />;
    }else if (title === "Products") {
      iconComponent = <ProductAdd  color={"#ffffff"} />;
    }else if (title === "Category") {
      iconComponent = <CategoryIcon  color={"#ffffff"} />;
    }else if (title === "Blogs") {
      iconComponent = <BlogIcon  color={"#ffffff"} />;
    }
    else if (title === "Logout") {
      iconComponent = <LogoutIcon color={"#ffffff"} />;
    }
  
    return (
      <div className={Design.navlink} style={{"backgroundColor": color}}>
        <div className={Design.navLinkContent}>
          {iconComponent}
          <p className={Design.navlinkName}>{title}</p>
        </div>
      </div>
    );
}
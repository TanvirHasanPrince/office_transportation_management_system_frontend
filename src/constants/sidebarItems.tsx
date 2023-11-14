import type { MenuProps } from "antd";

import {
  TeamOutlined,
  ScheduleOutlined,
  SketchOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>My Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Employee Management",
      key: "employee",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Employee</Link>,
          key: `/${role}/employee`,
        },
      ],
    },
    {
      label: "Driver Management",
      key: "driver",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Driver</Link>,
          key: `/${role}/driver`,
        },
      ],
    },
    {
      label: "Schedule",
      key: "schedule",
      icon: <ScheduleOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Schedule</Link>,
          key: `/${role}/schedule`,
        },
      ],
    },
    {
      label: "Location",
      key: "location",
      icon: <SketchOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Location</Link>,
          key: `/${role}/location`,
        },
      ],
    },
  ];


    const employeeSidebarItems: MenuProps["items"] = [
      ...defaultSidebarItems,
      {
        label: "Drop off schedule",
        key: "schedule",
        icon: <ScheduleOutlined />,
        children: [
          {
            label: <Link href={`/${role}`}>Drop off schedule</Link>,
            key: `/${role}/schedule`,
          },
        ],
      },
     
      
    ];

        const driverSidebarItems: MenuProps["items"] = [
          ...defaultSidebarItems,
          {
            label: "Drop off schedule",
            key: "schedule",
            icon: <ScheduleOutlined />,
            children: [
              {
                label: <Link href={`/${role}`}>Drop off schedule</Link>,
                key: `/${role}/schedule`,
              },
            ],
          },
        ];


  if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.EMPLOYEE) return employeeSidebarItems;
  else if (role === USER_ROLE.DRIVER) return driverSidebarItems;
  else {
    return defaultSidebarItems;
  }
};

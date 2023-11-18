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
      label: "Admin Management",
      key: "admin",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}/admins`}>Admins</Link>,
          key: `/${role}/admins`,
        },
        {
          label: <Link href={`/${role}/createAdmin`}>Create Admin</Link>,
          key: `/${role}/createAdmin`,
        },
      ],
    },
    {
      label: "Employee Management",
      key: "employee",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}/employees`}>Employees</Link>,
          key: `/${role}/employees`,
        },
        {
          label: <Link href={`/${role}/createEmployees`}>Create Employee</Link>,
          key: `/${role}/createEmployees`,
        },
      ],
    },
    {
      label: "Driver Management",
      key: "driver",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}/drivers`}>Drivers</Link>,
          key: `/${role}/drivers`,
        },
        {
          label: <Link href={`/${role}/createDriver`}>Create Driver</Link>,
          key: `/${role}/createDriver`,
        },
      ],
    },
    {
      label: "Schedule",
      key: "schedule",
      icon: <ScheduleOutlined />,
      children: [
        {
          label: <Link href={`/${role}/schedules`}>Schedules</Link>,
          key: `/${role}/schedules`,
        },
        {
          label: <Link href={`/${role}/createSchedule`}>Create scheule</Link>,
          key: `/${role}/createSchedules`,
        },
      ],
    },
    {
      label: "Location",
      key: "location",
      icon: <SketchOutlined />,
      children: [
        {
          label: <Link href={`/${role}/locations`}>Locations</Link>,
          key: `/${role}/locations`,
        },
        {
          label: (
            <Link href={`/${role}/createLocations`}>Create Locations</Link>
          ),
          key: `/${role}/createLocations`,
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

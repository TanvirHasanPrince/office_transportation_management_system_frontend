"use client";
import { useProfileQuery } from "@/redux/api/profileApi";
import { Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export type IDProps = {
  params: any;
};

const ProfilePage = ({ params }: IDProps) => {
  const { id } = params;

  const { data } = useProfileQuery(id);

  interface NameType {
    firstName: string;
    middleName: string;
    lastName: string;
  }

  interface DataType {
    name: NameType;
    address: string;
    phoneNumber: string;
  }

  // Assuming data is an object with the structure you provided
  const dataSource: DataType[] = data
    ? [
        {
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
        },
      ]
    : [];

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name: NameType) =>
        `${name.firstName} ${name.middleName} ${name.lastName}`,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        {" "}
        Profile Information
      </h1>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default ProfilePage;

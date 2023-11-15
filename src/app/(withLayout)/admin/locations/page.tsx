'use client'
import TMSTable from "@/components/ui/TMSTable";
import { Button } from "antd";
import React from "react";



const LocationsPage = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <Button onClick={() => console.log(data)} type="primary" danger>
            X
          </Button>
        );
      },
    },
  ];

  const tableData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
  ];
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    console.log(order, field);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("page", page, "pageSize", pageSize);
  };
  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>List of all athe locations</h1>
      <TMSTable
        columns={columns}
        dataSource={tableData}
        pageSize={5}
        totalPage={10}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination= {true}
      ></TMSTable>
    </div>
  );
};

export default LocationsPage;


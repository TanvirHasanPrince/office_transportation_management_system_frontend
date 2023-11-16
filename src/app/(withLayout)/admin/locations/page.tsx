"use client";
import LoadingAnimation from "@/components/LoadingAnimation";
import TMSTable from "@/components/ui/TMSTable";
import { useLocationsQuery } from "@/redux/api/locationApi";
import { Button } from "antd";
import React, { useState } from "react";

const LocationsPage = () => {
 const query:Record<string, any> = {
 }

 const [size, setSize] = useState<number>(10)
 const [page, setPage] = useState<number>(1);
 const [sortBy, setSortBy] = useState<string>("");
 const [sortOrder, setSortOrder] = useState<string>('')
 query['limit'] = size;
 query['page'] = page;
 query["sortBy"] = sortBy;
 query["sortOrder"] = sortOrder;

 const {data, isLoading} = useLocationsQuery({...query});
 const locations = data?.locations;
 const meta = data?.meta

if (isLoading) {
  <LoadingAnimation></LoadingAnimation>
}

  const columns = [
    {
      title: "Location",
      dataIndex: "locationName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
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

  // const tableData = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //     tags: ["nice", "developer"],
  //   },
  //   {
  //     key: "2",
  //     name: "Prince Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //     tags: ["loser"],
  //   },
  // ];
   const onPaginationChange = (page: number, pageSize: number) => {
     console.log("Page:", page, "PageSize:", pageSize);
     setPage(page);
     setSize(pageSize);
   };
   const onTableChange = (pagination: any, filter: any, sorter: any) => {
     const { order, field } = sorter;
     // console.log(order, field);
     setSortBy(field as string);
     setSortOrder(order === "ascend" ? "asc" : "desc");
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
        dataSource={locations}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      ></TMSTable>
    </div>
  );
};

export default LocationsPage;

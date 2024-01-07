"use client";
import { Breadcrumb } from "antd";
import React from "react";

const breadcrumbs = ["Home", "Groups"];

function Breadcrumbs() {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbs.map((item, index) => (
        <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default Breadcrumbs;

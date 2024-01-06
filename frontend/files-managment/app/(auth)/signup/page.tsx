"use client";
import { useState } from "react";
import { Button, Form, Input, Typography, Checkbox } from "antd";
import { RegisterUserDto } from "@/core/services/auth.service";
import { signup } from "@/core/actions/signup.actions";
import Link from "next/link";

const { Title } = Typography;

export default function SignUpPage() {
  const [form] = Form.useForm();
  const [pending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values: RegisterUserDto) => {
    setIsPending(true);
    setError("");
    try {
      await signup(values); // Make sure to handle the signup logic here
    } catch (err) {
      const errorMsg = (err as Error).message || "An unexpected error occurred";
      setError(errorMsg);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      style={{
        paddingBottom: "28px",
        paddingRight: "28px",
        paddingLeft: "28px",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Title level={2} style={{ marginBottom: 30, textAlign: "center" }}>
        Sign Up
      </Title>
      <Form
        form={form}
        name="signup"
        onFinish={onFinish}
        style={{ minWidth: "300px", width: "100%" }}
      >
        {error && (
          <Form.Item style={{ marginBottom: 16 }}>
            <Typography.Text type="danger">{error}</Typography.Text>
          </Form.Item>
        )}
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          style={{ marginBottom: 16 }}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          style={{ marginBottom: 16 }}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          style={{ marginBottom: 24 }}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 8 }}>
          <Button type="primary" htmlType="submit" loading={pending} block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Link href="/login">Already have an account? Log in</Link>
      </div>
    </div>
  );
}

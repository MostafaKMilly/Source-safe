"use client";
import { useState } from "react";
import { Button, Form, Input, Typography, Checkbox } from "antd";
import { SignInDto } from "@/core/services/auth.service";
import { login } from "@/core/actions/login.actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const { Title } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const [pending, setIsPending] = useState(false);
  const params = useSearchParams();
  const [error, setError] = useState(params.get("message"));

  const onFinish = async (values: SignInDto) => {
    setIsPending(true);
    setError("");
    try {
      await login(values);
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
        Login
      </Title>
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
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
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          style={{ marginBottom: 16 }}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ marginBottom: 24 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 8 }}>
          <Button type="primary" htmlType="submit" loading={pending} block>
            Log in
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Link href="/signup">Don&apos;t have an account? Sign up</Link>
      </div>
    </div>
  );
}

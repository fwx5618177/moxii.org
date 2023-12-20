"use client";

import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { FaGithub, FaGoogle, FaUser, FaLock } from "react-icons/fa";
import styles from "@/styles/loginView.module.scss";
import { useLoginBgImage } from "@/services/Login/hooks";
import { LoginResponse } from "Response";

const LoginView = () => {
  const { data, isError } = useLoginBgImage<LoginResponse>();
  const backgroundImage =
    data?.backgroundImage ||
    "/login_bg_default.jpg" ||
    "https://picsum.photos/2560/1600";

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className={styles.loginBackground}
      style={{
        backgroundImage: isError
          ? `url("/login_bg_default.jpg")`
          : `url(${backgroundImage})`,
      }}
    >
      <div className={styles.loginContainer}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "请输入您的邮箱!" }]}
          >
            <Input
              className={styles.inputField}
              size="large"
              prefix={<FaUser />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入您的密码!" }]}
          >
            <Input.Password
              className={styles.inputField}
              size="large"
              prefix={<FaLock />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className={styles["login-checkbox"]}>记住我</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              size="large"
              className={styles.loginButton}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        {/* <div className={styles.options}>
          <a href="#">忘记密码?</a>
          <a href="#">没有账号? 注册</a>
        </div> */}

        <div className={styles.ssoLogin}>
          <Button icon={<FaGithub color="#fff" />} />
          <Button icon={<FaGoogle color="#fff" />} />
        </div>
      </div>
    </div>
  );
};

export default LoginView;

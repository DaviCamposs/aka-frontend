"use client";
import {
  Button,
  Container,
  TextInput,
  Title,
  Center,
  Flex,
} from "@mantine/core";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/authContext";
import { BadRequestError } from "../providers/errors/bad-request.error";
import { notifications } from "@mantine/notifications";
import { UnauthorizedError } from "../providers/errors/unauthorized.error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.log('error section')
      console.log(error)
      let title = "Ops";
      let message = "Some Server Error, Try Again!";

      if (error instanceof UnauthorizedError ) {
        title = error.message;
        message = 'Verify email email or/and password typed'
      } else if (error instanceof BadRequestError) {
        message = 'Type all required fields'
        title = error.message;
      }

      notifications.show({
        title,
        message: message,
        color: "red",
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Flex
      style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}
      align="center"
      justify="center"
    >
      <Container size="sm" style={{ width: "100%", maxWidth: 800 }}>
        <Center>
          <Title order={1}>Login</Title>
        </Center>
        <form onSubmit={handleLogin}>
          <TextInput
          name="email"
            type="email"
            label="Email"
            placeholder="user@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 15 }}
            required
          />
          <TextInput
          name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 15 }}
            required
          />
          <Button
            type="submit"
            fullWidth
            size="lg"
            style={{ marginBottom: 15 }}
          >
            Sign in
          </Button>
        </form>
        <Center>
          <div style={{ fontSize: "16px" }}>
            Not registered? <Link href="/register">Sign up</Link>
          </div>
        </Center>
      </Container>
    </Flex>
  );
}

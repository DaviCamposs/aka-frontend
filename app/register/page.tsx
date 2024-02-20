"use client";
import {
  Button,
  Container,
  TextInput,
  Title,
  Center,
  Flex,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authContext";
import { BadRequestError } from "../providers/errors/bad-request.error";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        notifications.show({
          title: "Passwords do not match",
          message: "Try again",
          color: "red",
          position: "top-right",
          autoClose: 3000,
        });

        return;
      }

      await register(name, email, password);


      notifications.show({
        title: 'Success',
        message: 'User registered with success',
        color: "green",
        position: "top-right",
        autoClose: 3000,
      });

      router.push('/login')


    } catch (error) {
      console.log("error section");
      console.log(error);
      let title = "Ops";
      let message = "Some Server Error, Try Again!";

      if (error instanceof BadRequestError) {
        title = error.message;
        message = "Verify your info";
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
          <Title order={1}>Create an Account</Title>
        </Center>
        <form onSubmit={handleLogin}>
          <TextInput
          name="name"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: 15 }}
            required
          />
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
          <TextInput
          name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginBottom: 15 }}
            required
          />
          <Button
            type="submit"
            fullWidth
            size="lg"
            style={{ marginBottom: 15 }}
          >
            Register
          </Button>
        </form>
        <Center>
          <div style={{ fontSize: "16px" }}>
            Already registered? <Link href="/login">Sign in</Link>
          </div>
        </Center>
      </Container>
    </Flex>
  );
}

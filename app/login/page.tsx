'use client'
import { Button, Container, TextInput, Title, Center, Flex } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e:any) => {
    e.preventDefault();
  };

  return (
    <Flex style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }} align="center" justify="center">
      <Container size="sm" style={{ width: '100%', maxWidth: 800 }}>
        <Center>
          <Title order={1}>Login</Title>
        </Center>
        <form onSubmit={handleLogin}>
          <TextInput
            type="email"
            label="Email"
            placeholder="user@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 15 }}
            required
          />
          <TextInput
            type="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 15 }}
            required
          />
          <Button type="submit" fullWidth size="lg" style={{ marginBottom: 15 }}>
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

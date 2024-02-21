"use client";

import { ActionIcon, Container, Flex } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../providers/authContext";
import { useRouter } from "next/navigation";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <>
      <Container
        size="lg"
        style={{ borderBottom: "1px solid #eee", marginBottom: 20 }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{ padding: "20px 0" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              style={{ marginRight: 20, cursor: "pointer" }}
            />

            <Link href="/home" style={{ textDecoration: "none" }}>
              <span
                style={{ marginRight: 20, color: "#333", cursor: "pointer" }}
              >
                Home
              </span>
            </Link>

            <Link href="/home/daily" style={{ textDecoration: "none" }}>
              <span
                style={{ marginRight: 20, color: "#333", cursor: "pointer" }}
              >
                Daily
              </span>
            </Link>

            <Link href="/home/history" style={{ textDecoration: "none" }}>
              <span
                style={{ marginRight: 20, color: "#333", cursor: "pointer" }}
              >
                History
              </span>
            </Link>
          </div>
          <div>
            <ActionIcon onClick={handleLogout} variant="transparent">
              <IconLogout
                color="black"
                style={{ width: "100%", height: "90%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </div>
        </Flex>
      </Container>

      <Container size="lg" style={{ paddingTop: 20 }}>
        {children}
      </Container>
    </>
  );
}

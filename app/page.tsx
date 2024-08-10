"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, TextInput, Text } from "@mantine/core";
import { PrimaryButton } from "./components/Buttons";
import TogglePass from "./components/TogglePass";
import { useAuth } from "../services/user";

export default function Home() {
  const { handleLogin } = useAuth();
  const [showPass, setShowPass] = useState<boolean>(false);
  const { push } = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <Box className="p-10 h-[100vh] w-[100%]">
      <Box className="flex flex-col items-center justify-center">
        <Box className="flex flex-col items-center justify-center rounded-md gap-5 bg-[#857880] w-fit p-10">
          <Text className="font-[500] text-[20px]">
            Welcome to Plan-B electric supply
          </Text>
          <Box className="flex flex-col gap-2 items-center">
            <Text>Log In</Text>
            <TextInput
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              placeholder="kasubasich@gmail.com"
              w={206}
              styles={{
                input: {
                  borderRadius: "10px",
                  paddingInline: "8px",
                },
              }}
            />
          </Box>

          <Box className="relative flex flex-col gap-2 items-center">
            <Text>Password</Text>
            <TextInput
              styles={{
                wrapper: {
                  position: "relative",
                },
                input: {
                  borderRadius: "10px",
                  paddingInline: "8px",
                },
              }}
              rightSection={
                <TogglePass
                  className="absolute right-2"
                  showPass={showPass}
                  setShowPass={setShowPass}
                />
              }
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </Box>

          <Box className="flex justify-center my-5">
            <PrimaryButton
              label="Sign In"
              type="button"
              className="border hover:shadow-sm  hover:shadow-gray-100 w-40 rounded-md py-2"
              onClick={handleLogin}
            />
          </Box>
          <Box className="flex justify-center">
            <Text className="text-[12px]">{"Don't have an account?"} </Text>
            <Text
              className="text-[12px] pl-1 text-[#35607e] cursor-pointer"
              onClick={() => push("/signup")}
            >
              Sign up
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

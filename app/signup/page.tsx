"use client";
import React, { useState } from "react";
import { Box, TextInput, Text, Switch } from "@mantine/core";
import { PrimaryButton } from "../components/Buttons";
import TogglePass from "../components/TogglePass";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { useAuth } from "../../services/user";

export interface FormValues {
  confirmPass: string;
  email: string;
  password: string;
  username: string;
  department: string;
  role: string;
}

export default function Page() {
  const { handleSignUp } = useAuth();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPass: "",
      department: "",
      role: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => value.length == 0 && "Invalid password",
      confirmPass: (value, { password }) =>
        password == value ? null : "Password mismatch",
    },

    clearInputErrorOnChange: true,
  });

  const { push } = useRouter();

  return (
    <Box className="w-[100%]">
      <Box className="flex flex-col items-center justify-center">
        <Box className="flex flex-col items-center justify-center rounded-md gap-5 bg-[#857880] w-fit p-5">
          <Box className="flex flex-col items-center justify-center">
            <Text className="font-[500] text-[20px]">
              Welcome to Plan-B electric supply
            </Text>

            <Text className="font-[500] text-[11px] text-[#6c584c]">
              Fill in the form to signup
            </Text>
          </Box>

          <form onSubmit={form.onSubmit(handleSignUp)} className="space-y-5">
            <Box className="flex flex-col gap-2 items-center">
              <Text>Username</Text>
              <TextInput
                placeholder="kasuba97"
                {...form.getInputProps("username")}
                styles={{
                  input: {
                    borderRadius: "10px",
                    paddingInline: "8px",
                    alignItems: "center",
                  },
                }}
              />
            </Box>
            <Box className="flex flex-col gap-2 items-center">
              <Text>Email *</Text>
              <TextInput
                placeholder="kasubasich@email.com"
                {...form.getInputProps("email")}
                styles={{
                  input: {
                    borderRadius: "10px",
                    paddingInline: "8px",
                  },
                }}
              />
              <Text
                className={`text-[13px] text-red-600 mt-[-10px] ${
                  userExists ? "visible" : "invisible"
                }`}
              >
                User Already Exist
              </Text>
            </Box>

            <Box className="gap-2">
              <Box className="flex gap-2 justify-center">
                <Switch
                  checked={isMember}
                  onChange={(event) => setIsMember(event.currentTarget.checked)}
                />
                <Text>Are you Plan-B employee?</Text>
              </Box>
              {isMember && (
                <Box className="flex flex-col gap-2 items-center">
                  <Text>Department ID</Text>
                  <TextInput
                    styles={{
                      input: {
                        borderRadius: "10px",
                        paddingInline: "8px",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box className="relative flex flex-col gap-2 items-center">
              <Text>Password *</Text>
              <TextInput
                {...form.getInputProps("password")}
                styles={{
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
              />
            </Box>

            <Box className="relative flex flex-col gap-2 items-center">
              <Text>Confirm Password *</Text>
              <TextInput
                {...form.getInputProps("confirmPass")}
                styles={{
                  input: {
                    borderRadius: "10px",
                    paddingInline: "8px",
                  },
                }}
                type={"password"}
              />
            </Box>

            <Box className="flex justify-center my-5">
              <PrimaryButton
                label="Sign Up"
                className="border hover:shadow-sm  hover:shadow-gray-100 w-40 rounded-md py-2"
                type="submit"
              />
            </Box>
            <Box className="flex justify-center">
              <Text className="text-[12px]">Already have an account? </Text>
              <Text
                className="text-[12px] pl-1 text-[#35607e] cursor-pointer"
                onClick={() => push("/signup")}
              >
                Login
              </Text>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

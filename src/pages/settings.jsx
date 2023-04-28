import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Sidebar from "../components/side-bar";
import { FaGraduationCap, FaHome, FaDiscord } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BsFillFlagFill } from "react-icons/bs";
import { FaSearch, FaUser, FaSave } from "react-icons/fa";
import Header from "../components/header";
import WithAuth from "../components/withAuth";
import Footer from "@/components/footer";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [courses, setCourses] = useState([]);

  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit form data to server
    toast({
      title: "User settings saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <>
      <Header />
      <Flex>
        <Sidebar
          links={[
            { href: "/", label: "Home", icon: FaHome },
            { href: "/courses", label: "Courses", icon: FaGraduationCap },
            {
              href: "/internships",
              label: "Internship Finder",
              icon: BsFillFlagFill,
            },
            {
              href: "/settings",
              label: "Settings",
              icon: AiFillSetting,
              isActive: true,
            },
            {
              href: "https://techoptimum.org/discord",
              label: "Discord Server",
              icon: FaDiscord,
            },
          ]}
        />
        <Box px="2rem" py="3rem">
          <Heading color="primary" fontWeight="light">
            User Settings
          </Heading>
          <form
            mt="1rem"
            py="1.5rem"
            borderRadius={"8px"}
            px="2rem"
            backgroundColor={"#0A0F24"}
            onSubmit={handleSubmit}
          >
            <Stack spacing="6">
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  _focus={{
                    borderColor: "#A7B3FE",
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  _focus={{
                    borderColor: "#A7B3FE",
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
                <Input
                  type="password"
                  placeholder="New password"
                  _focus={{
                    borderColor: "#A7B3FE",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  mt={3}
                />
              </FormControl>

              <Button
                fontWeight={"100"}
                leftIcon={<FaSave />}
                type="submit"
                bgColor="#A7B3FE"
                color="#1e1e1e"
                w="200px"
                transition="all 0.2s"
                _hover={{
                  bg: "#868fcb",
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
      <Footer/>
    </>
  );
};

export default WithAuth(Settings);

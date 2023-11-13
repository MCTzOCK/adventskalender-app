/**
 * src/components/Footer.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 02.12.2023
 *
 */

import * as React from "react";
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  LinkProps,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Box w={"100%"} backgroundColor={"black"}>
        <Box p={{ base: 5, md: 8 }} maxW="7xl" marginInline="auto">
          <Stack
            spacing={{ base: 8, md: 0 }}
            justifyContent="space-between"
            direction={{ base: "column", md: "row" }}
            gap={24}
          >
            <Box maxW="300px">
              <Heading
                as="h1"
                fontSize={"3xl"}
                fontWeight={1000}
                color={"primary.500"}
              >
                Adventskalender
              </Heading>
              <Text mt={2} color="white" fontSize="md">
                Developed by Ben Siebert. <br />
                Made with ❤ and ☕ in Hattingen.
              </Text>
            </Box>
            <HStack
              spacing={8}
              display={"flex"}
              justifyContent={{ sm: "space-between", md: "normal" }}
              direction={{ base: "column", md: "row" }}
            >
              <VStack spacing={4} alignItems="flex-start">
                <Text fontSize="md" fontWeight="bold">
                  Über
                </Text>
                <VStack spacing={2} alignItems="flex-start" color="white">
                  <CustomLink href={"/"}>Home</CustomLink>
                  <CustomLink href={"https://ben-siebert.com/contact"}>
                    Kontakt
                  </CustomLink>
                  <CustomLink href={"https://ben-siebert.com"}>
                    Website
                  </CustomLink>
                  <CustomLink href={"https://codeup.space/legal/imprint"}>
                    Impressum
                  </CustomLink>
                  <CustomLink href={"https://codeup.space/legal/privacy"}>
                    Datenschutz
                  </CustomLink>
                </VStack>
              </VStack>
            </HStack>
          </Stack>

          <Divider my={4} />

          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={3}
            justifyContent="space-between"
          >
            <Text fontSize="md">
              Copyright &copy;&nbsp;{new Date().getFullYear()}&nbsp;
              <Link
                href="https://ben-siebert.de"
                _hover={{ textDecoration: "underline" }}
                isExternal
              >
                Ben Siebert
              </Link>
            </Text>
            <Stack spacing={2} direction={{ base: "column", md: "row" }}>
              <IconButton
                aria-label={"Instagram"}
                as={Link}
                target={"_blank"}
                href={"https://instagram.com/ben.sbrt"}
                icon={<FaInstagram />}
              />
              <IconButton
                aria-label={"GitHub"}
                as={Link}
                target={"_blank"}
                href={"https://github.com/MCTzOCK/adventskalender-app"}
                icon={<FaGithub />}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link
      href="#"
      fontSize="sm"
      _hover={{ textDecoration: "underline" }}
      {...props}
    >
      {children}
    </Link>
  );
};

import { useRouter } from "next/router";
import {
  Spacer,
  Flex,
  Heading,
  Box,
  chakra,
  Button,
  Drawer,
  DrawerBody,
  Circle,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
  Text,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import Sidebar from "@/components/side-bar";
import Header from "@/components/header";
import ReactMarkdown from "react-markdown";
import {
  FaChevronLeft,
  FaGraduationCap,
  FaHome,
  FaDiscord,
} from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BsFillFlagFill } from "react-icons/bs";
import { parse } from "cookie";
import { motion } from "framer-motion";
import useAuthStore from "@/store/authStore";
import { useRef } from "react";
import Footer from "@/components/footer";

export default function Chapter({
  chapter,
  isAuthenticated,
  previousChapter,
  nextChapter,
  courseTitle,
  courseSlug,
  courseChapters,
  index,
}) {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (isAuthenticated === false) {
      logout();
      router.push("/login");
    }

    if (router.isFallback) {
      return <div>Loading...</div>;
    }

    if (chapter === null) return <div>Chapter not found</div>;
  }

  const saveProgress = async (same) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/courses/${router.query.course}/${chapter.slug}/save-progress`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      console.log("ok");

      if (same) {
        router.push("/courses");
      }

      console.log(data.message);

      if (data.message === "Chapter already completed") {
        if (same) {
          router.push(`/courses`);
        }
        router.push(`/courses/${router.query.course}/${nextChapter}`);
      }
      router.push(`/courses/${router.query.course}/${nextChapter}`);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const MotionText = motion(Text);
  const MotionBox = motion(Box);

  return (
    <>
      <Box bg="#060E17 !important">
        <Header />
        <Flex>
          <Sidebar
            links={[
              { href: "/", label: "Home", icon: FaHome },
              {
                href: "/courses",
                label: "Courses",
                icon: FaGraduationCap,
                isActive: true,
              },
              {
                href: "/internships",
                label: "Internship Finder",
                icon: BsFillFlagFill,
              },
              { href: "/settings", label: "Settings", icon: AiFillSetting },
              {
                href: "https://techoptimum.org/discord",
                label: "Discord Server",
                icon: FaDiscord,
              },
            ]}
          />

          <Box width="100%" px="3rem" py="1.7rem">
            <Box position="sticky" top="87px" zIndex="2" bg="#060E17" py="1rem">
              <Flex alignItems="center">
                <Heading
                  mr="1rem"
                  fontSize="3xl"
                  color="primary"
                  fontWeight="bold"
                >
                  {courseTitle}
                </Heading>
                <Spacer />
                <Button colorScheme="blue" fontWeight="light" onClick={onOpen}>
                  View Full Curriculum
                </Button>
              </Flex>
            </Box>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent textAlign={"center"} backgroundColor="secondary">
                <DrawerCloseButton mt="8px" color="primary" />
                <DrawerHeader fontSize="3xl" color="primary">
                  {courseTitle}
                </DrawerHeader>

                <DrawerBody>
                  <Box>
                    {courseChapters.map((chapterItem, index) => (
                      <Link
                        key={index}
                        href={`/courses/${courseSlug}/${chapterItem.slug}`}
                        textDecoration="none !important"
                      >
                        <MotionText
                        textAlign="center"
                          py="5px"
                          pl="25x"
                          fontWeight={
                            chapter.slug === chapterItem.slug
                              ? "bold"
                              : "normal"
                          }
                          color={
                            chapter.slug === chapterItem.slug
                              ? "blue.500"
                              : "primary"
                          }
                          className={
                            chapter.slug=== chapterItem.slug
                            ? "sparkle"
                            : 'none'
                          }
                          borderRadius="5px"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Box  alignItems="center">
                         
                            Lesson {index + 1}: {chapterItem.title}
                          </Box>
                        </MotionText>
                      </Link>
                    ))}
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>

            <Heading
              mb="10px"
              fontSize="3xl"
              color="primary"
              fontWeight="100"
              mt="10px"
            >
              Lesson {index}: {chapter.title}
            </Heading>
            <Box className="chapter-content">
              <ReactMarkdown children={chapter.markdown} skipHtml />
            </Box>

            <Flex justifyContent="space-between" my="2rem">
              {previousChapter && (
                <chakra.a
                  transition="all 0.2s"
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "blue.800",
                  }}
                  py="10px"
                  textAlign={"center"}
                  borderRadius={"10px"}
                  width="100%"
                  backgroundColor="blue.900"
                  href={`/courses/${router.query.course}/${previousChapter}`}
                >
                  Previous Chapter
                </chakra.a>
              )}
              <Spacer />

              <chakra.a
                ml="1rem"
                textAlign="center"
                transition="all 0.2s"
                _hover={{ cursor: "pointer", backgroundColor: "blue.800" }}
                py="10px"
                borderRadius="10px"
                width="100%"
                backgroundColor="blue.900"
                onClick={() =>
                  saveProgress(
                    nextChapter
                      ? nextChapter === router.query.chapter
                        ? "same"
                        : undefined
                      : "same"
                  )
                }
              >
                {nextChapter
                  ? nextChapter === router.query.chapter
                    ? "Complete Course"
                    : "Next Chapter"
                  : "Complete Course"}
              </chakra.a>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Footer/>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params, req } = context;
  const { course, chapter } = params;

  const cookies = parse(req.headers.cookie || "");

  if (!cookies.auth) {
    return {
      props: {
        isAuthenticated: false,
        chapter: {},
      },
    };
  }

  try {
    const [chapterRes, courseRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/courses/${course}/${chapter}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.auth}`,
          },
        }
      ),
      fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/courses/${course}`, {
        headers: {
          Authorization: `Bearer ${cookies.auth}`,
        },
      }),
    ]);

    const [chapterData, courseData] = await Promise.all([
      chapterRes.json(),
      courseRes.json(),
    ]);

    if (!chapterRes.ok || !chapterData || !courseRes.ok || !courseData) {
      return {
        props: {
          chapter: null,
          previousChapter: {},
          nextChapter: {},
          courseTitle: "",
          courseChapters: [],
          isAuthenticated: true,
        },
      };
    }

    const { chapter: chapterInfo, previousChapter, nextChapter } = chapterData;
    const {
      title: courseTitle,
      chapters: courseChapters,
      slug: courseSlug,
    } = courseData;

    return {
      props: {
        chapter: chapterInfo || null,
        previousChapter: previousChapter ?? null,
        nextChapter: nextChapter ?? null,
        courseTitle,
        courseChapters,
        courseSlug,
        isAuthenticated: true,
        index:
          courseChapters.findIndex((chap) => chap.slug === chapterInfo.slug) +
          1,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        chapter: {},
        previousChapter: {},
        nextChapter: {},
        courseTitle: "",
        courseChapters: [],
        isAuthenticated: true,
      },
    };
  }
}

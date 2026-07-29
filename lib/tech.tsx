import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import {
  IconBrandCpp,
  IconBrandDocker,
  IconBrandFirebase,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconLetterE,
} from "@tabler/icons-react";
import { Java } from "developer-icons";
import {
  SiArchlinux,
  SiBun,
  SiClaude,
  SiCloudflare,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGoland,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiTensorflow,
} from "react-icons/si";

export interface Tech {
  name: string;
  logo: React.ReactNode;
}

export const techlist: Tech[] = [
  { name: "Next", logo: <IconBrandNextjs /> },
  {
    name: "Express",
    logo: <IconLetterE />,
  },
  { name: "Docker", logo: <IconBrandDocker /> },
  {
    name: "Typescript",
    logo: <IconBrandTypescript />,
  },
  {
    name: "C++",
    logo: <IconBrandCpp />,
  },
  {
    name: "Node",
    logo: <IconBrandNodejs />,
  },
  {
    name: "Arch linux",
    logo: <SiArchlinux />,
  },
  {
    name: "Tailwindcss",
    logo: <IconBrandTailwind />,
  },
  {
    name: "React",
    logo: <IconBrandReact />,
  },
  {
    name: "Firebase",
    logo: <IconBrandFirebase />,
  },
  {
    name: "Flask",
    logo: <SiFlask />,
  },
  {
    name: "Tensorflow",
    logo: <SiTensorflow />,
  },
  {
    name: "FastAPI",
    logo: <SiFastapi />,
  },
  {
    name: "Postgres",
    logo: <SiPostgresql />,
  },
  {
    name: "Git",
    logo: <SiGit />,
  },
  {
    name: "Go",
    logo: <SiGoland />
  },
  {
    name: "Bun",
    logo: <SiBun />,
  },
  {
    name: "Mongodb",
    logo: <SiMongodb />,
  },
  {
    name: "Redis",
    logo: <SiRedis />,
  },
  {
    name: "Cloudflare",
    logo: <SiCloudflare />,
  },
];

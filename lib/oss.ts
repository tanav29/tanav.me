export interface OSS {
  name: string;
  repo: string;
  link: string;
}

export const oss: OSS[] = [
  {
    name: "Add Ashby recruiting tasks and event triggers",
    repo: "kestra-io/plugin-ashby",
    link: "https://github.com/kestra-io/plugin-ashby/pull/10",
  },
  {
    name: "Make realtime email attachments readable",
    repo: "kestra-io/plugin-email",
    link: "https://github.com/kestra-io/plugin-email/pull/104",
  },
  {
    name: "Fix the pricing table slider",
    repo: "dodopayments/billingsdk",
    link: "https://github.com/dodopayments/billingsdk/pull/273",
  },
  {
    name: "Shut down server resources gracefully",
    repo: "ravixstudio/backend-template",
    link: "https://github.com/ravixstudio/backend-template/pull/14",
  },
];

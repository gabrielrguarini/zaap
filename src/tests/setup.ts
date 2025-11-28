// Mock Auth globally
jest.mock("@/auth", () => ({
  auth: jest.fn().mockResolvedValue({
    user: {
      name: "Test User",
      email: "test@example.com",
    },
  }),
}));

// Mock Next.js cache globally
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Mock S3 Client globally
jest.mock("@/utils/s3Client", () => ({
  s3: {
    send: jest.fn().mockResolvedValue({ $metadata: { httpStatusCode: 204 } }),
  },
}));

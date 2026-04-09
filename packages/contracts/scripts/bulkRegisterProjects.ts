/* eslint-disable no-console, no-plusplus, no-await-in-loop, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { put } from "@vercel/blob";
import dotenv from "dotenv";
import { ethers } from "ethers";
import hre from "hardhat";

import fs from "fs";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface ProjectData {
  name: string;
  shortBio: string;
  bio: string;
  websiteUrl: string;
  payoutAddress: string;
  github?: string;
  twitter?: string;
  contributionDescription: string;
  impactDescription: string;
  contributionLinks?: { description: string; type: string; url: string }[];
  fundingSources?: { description: string; amount: number; currency: string; type: string }[];
}

// Deployed contract addresses (poll-3)
const REGISTRY_MANAGER_ADDRESS = "0xD15047627F0e0f22bD545132cC67A85AD90203B7";
const REGISTRY_ADDRESS = "0xE25b2D9D3952dD1D3ED536b8B13DB51fec7eADdF";

// Minimal ABI for RegistryManager
const REGISTRY_MANAGER_ABI = [
  "function process((uint256 index, address registry, uint8 requestType, uint8 status, (bytes32 id, string metadataUrl, address recipient) recipient) request) external",
  "function approve(uint256 index) external",
  "function requestCount() external view returns (uint256)",
];

async function uploadMetadata(project: ProjectData, creatorAddress: string): Promise<string> {
  const metadata = {
    ...project,
    creator: creatorAddress,
    submittedAt: Date.now(),
    profileImageUrl: "",
    bannerImageUrl: "",
  };

  const slug = project.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const blob = await put(`projects/${slug}-metadata.json`, JSON.stringify(metadata), {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false,
  });

  console.log(`  Uploaded metadata for ${project.name}: ${blob.url}`);
  return blob.url;
}

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Registering projects with account:", signer.address);

  // Load project data
  const projectsPath = path.resolve(__dirname, "./projects-data.json");
  const projects: ProjectData[] = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));
  console.log(`Found ${projects.length} projects to register\n`);

  const registryManager = new ethers.Contract(REGISTRY_MANAGER_ADDRESS, REGISTRY_MANAGER_ABI, signer);

  // Get starting request count
  const startingCount = await registryManager.requestCount();
  console.log(`Current request count: ${startingCount}\n`);

  // Phase 1: Upload metadata and submit Add requests
  console.log("=== Phase 1: Upload metadata & submit requests ===\n");
  const metadataUrls: string[] = [];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    console.log(`[${i + 1}/${projects.length}] ${project.name}`);

    // Upload metadata to Vercel Blob
    const metadataUrl = await uploadMetadata(project, signer.address);
    metadataUrls.push(metadataUrl);

    // Generate random bytes32 ID
    const id = ethers.hexlify(ethers.randomBytes(32));

    // Build request struct
    const request = {
      index: 0, // 0 for Add
      registry: REGISTRY_ADDRESS,
      requestType: 0, // 0 = Add
      status: 0, // 0 = Pending
      recipient: {
        id,
        metadataUrl,
        recipient: project.payoutAddress,
      },
    };

    // Submit request
    const tx = await registryManager.process(request);
    const receipt = await tx.wait();
    console.log(`  Submitted request. TX: ${receipt.hash}`);
    console.log("");
  }

  // Phase 2: Approve all requests
  console.log("=== Phase 2: Approve all requests ===\n");
  const endingCount = await registryManager.requestCount();
  console.log(`Request count now: ${endingCount}`);

  for (let i = Number(startingCount); i < Number(endingCount); i++) {
    console.log(`Approving request index ${i}...`);
    const tx = await registryManager.approve(i);
    const receipt = await tx.wait();
    console.log(`  Approved. TX: ${receipt.hash}`);
  }

  console.log("\n=== Done! ===");
  console.log(`Registered ${projects.length} projects`);
  console.log(`Registry: ${REGISTRY_ADDRESS}`);
  console.log(`Request indices: ${Number(startingCount)} to ${Number(endingCount) - 1}`);
  console.log("\nMetadata URLs:");
  metadataUrls.forEach((url, i) => {
    console.log(`  ${projects[i].name}: ${url}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

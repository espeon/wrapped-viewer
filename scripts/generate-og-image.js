import { createCanvas, GlobalFonts, loadImage } from '@vercel/og';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  title: process.env.VITE_OG_TITLE || "Spotify Wrapped 2024",
  subtitle: process.env.VITE_OG_SUBTITLE || "Natalie's Year in Review",
  stat1: process.env.VITE_OG_STAT_1 || "195,877 minutes listened",
  stat2: process.env.VITE_OG_STAT_2 || "Top 0.01% of Spotify listeners",
  bgColor: process.env.VITE_OG_BG_COLOR || "#111827",
  accentColor: process.env.VITE_OG_ACCENT_COLOR || "rgba(79, 70, 229, 0.2)",
  textColor: process.env.VITE_OG_TEXT_COLOR || "#ffffff",
  subtitleColor: process.env.VITE_OG_SUBTITLE_COLOR || "#818cf8"
};

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Set background
  context.fillStyle = config.bgColor;
  context.fillRect(0, 0, width, height);

  // Add gradient
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, config.accentColor);
  gradient.addColorStop(1, 'rgba(17, 24, 39, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  // Add title
  context.font = 'bold 72px Inter';
  context.fillStyle = config.textColor;
  context.textAlign = 'center';
  context.fillText(config.title, width / 2, height / 2 - 40);

  // Add subtitle
  context.font = '36px Inter';
  context.fillStyle = config.subtitleColor;
  context.fillText(config.subtitle, width / 2, height / 2 + 40);

  // Add stats
  context.font = '24px Inter';
  context.fillStyle = config.textColor;
  context.fillText(config.stat1, width / 2, height / 2 + 120);
  context.fillText(config.stat2, width / 2, height / 2 + 160);

  // Convert canvas to buffer
  const pngBuffer = await canvas.encode('png');

  // Ensure the dist directory exists
  await fs.mkdir('dist', { recursive: true });

  // Save the image using sharp for optimization
  await sharp(pngBuffer)
    .png({ quality: 90 })
    .toFile('dist/og-image.png');

  // Update index.html with meta tags
  const indexPath = path.join('dist', 'index.html');
  let indexHtml = await fs.readFile(indexPath, 'utf-8');

  const metaTags = `
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.subtitle} - ${config.stat1}" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  `;

  indexHtml = indexHtml.replace('</head>', `${metaTags}\n</head>`);
  await fs.writeFile(indexPath, indexHtml);

  console.log('✨ Generated OG image and updated meta tags');
}

generateOGImage().catch(console.error);
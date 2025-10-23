#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const colorize = (text, color) => `${colors[color]}${text}${colors.reset}`;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question, defaultValue = '') => {
  return new Promise((resolve) => {
    const prompt = defaultValue 
      ? `${colorize(question, 'cyan')} ${colorize(`[${defaultValue}]`, 'dim')}: `
      : `${colorize(question, 'cyan')}: `;
    
    rl.question(prompt, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
};

const askYesNo = (question, defaultValue = true) => {
  return new Promise((resolve) => {
    const defaultText = defaultValue ? 'Y/n' : 'y/N';
    const prompt = `${colorize(question, 'cyan')} ${colorize(`[${defaultText}]`, 'dim')}: `;
    
    rl.question(prompt, (answer) => {
      const normalized = answer.trim().toLowerCase();
      if (normalized === '') resolve(defaultValue);
      else resolve(normalized === 'y' || normalized === 'yes');
    });
  });
};

const readConfig = () => {
  try {
    const configPath = join(__dirname, 'app', 'lib', 'config.ts');
    const content = readFileSync(configPath, 'utf8');
    
        const titleMatch = content.match(/title:\s*"([^"]*)"/);
    const blogTitleMatch = content.match(/title:\s*"([^"]*)",\s*$/m);
    const blogSubtitleMatch = content.match(/subtitle:\s*"([^"]*)"/);
    const seoTitleMatch = content.match(/title:\s*"([^"]*)",\s*$/m);
    const seoDescriptionMatch = content.match(/description:\s*"([^"]*)"/);
    const seoKeywordsMatch = content.match(/keywords:\s*"([^"]*)"/);
    const copyrightMatch = content.match(/copyright:\s*"([^"]*)"/);
    
    return {
      title: titleMatch ? titleMatch[1] : 'md-blog',
      blog: {
        title: blogTitleMatch ? blogTitleMatch[1] : 'Blog',
        subtitle: blogSubtitleMatch ? blogSubtitleMatch[1] : 'Discover new insights, tutorials, and stories',
      },
      seo: {
        title: seoTitleMatch ? seoTitleMatch[1] : 'md-blog - Markdown Blog Platform',
        description: seoDescriptionMatch ? seoDescriptionMatch[1] : 'A blog platform built with React Router v7 and Markdown.',
        keywords: seoKeywordsMatch ? seoKeywordsMatch[1] : 'blog, md-blog, markdown, react, content management',
      },
      footer: {
        copyright: copyrightMatch ? copyrightMatch[1] : 'md-blog',
      },
    };
  } catch (error) {
    console.error(colorize('Error reading config file:', 'red'), error.message);
    process.exit(1);
  }
};

const writeConfig = (config) => {
  try {
    const configPath = join(__dirname, 'app', 'lib', 'config.ts');
    const configContent = `export const siteConfig = {
  title: "${config.title}",
  blog: {
    title: "${config.blog.title}",
    subtitle: "${config.blog.subtitle}",
  },
  seo: {
    title: "${config.seo.title}",
    description: "${config.seo.description}",
    keywords: "${config.seo.keywords}",
  },
  footer: {
    copyright: "${config.footer.copyright}",
  },
} as const;
`;
    
    writeFileSync(configPath, configContent, 'utf8');
    console.log(colorize('✅ Configuration updated successfully!', 'green'));
  } catch (error) {
    console.error(colorize('Error writing config file:', 'red'), error.message);
    process.exit(1);
  }
};

const runSetup = async () => {
  console.log(colorize('\n🚀 Welcome to md-blog Setup!', 'bright'));
  console.log(colorize('This script will help you configure your blog platform.\n', 'dim'));
  
    const currentConfig = readConfig();
  
  console.log(colorize('Current Configuration:', 'yellow'));
  console.log(`  Site Title: ${currentConfig.title}`);
  console.log(`  Blog Title: ${currentConfig.blog.title}`);
  console.log(`  Blog Subtitle: ${currentConfig.blog.subtitle}`);
  console.log(`  SEO Title: ${currentConfig.seo.title}`);
  console.log(`  SEO Description: ${currentConfig.seo.description}`);
  console.log(`  SEO Keywords: ${currentConfig.seo.keywords}`);
  console.log(`  Footer Copyright: ${currentConfig.footer.copyright}\n`);
  
  const updateAll = await askYesNo('Do you want to update all configuration values?', true);
  
  if (!updateAll) {
    console.log(colorize('\nSetup cancelled.', 'yellow'));
    rl.close();
    return;
  }
  
  console.log(colorize('\n📝 Let\'s configure your blog platform:\n', 'bright'));
  
    const newConfig = {
    title: await askQuestion('Site Title (appears in header)', currentConfig.title),
    blog: {
      title: await askQuestion('Blog Page Title', currentConfig.blog.title),
      subtitle: await askQuestion('Blog Page Subtitle', currentConfig.blog.subtitle),
    },
    seo: {
      title: await askQuestion('SEO Title (appears in browser tab)', currentConfig.seo.title),
      description: await askQuestion('SEO Description (for search engines)', currentConfig.seo.description),
      keywords: await askQuestion('SEO Keywords (comma-separated)', currentConfig.seo.keywords),
    },
    footer: {
      copyright: await askQuestion('Footer Copyright Text', currentConfig.footer.copyright),
    },
  };
  
  console.log(colorize('\n📋 New Configuration:', 'yellow'));
  console.log(`  Site Title: ${newConfig.title}`);
  console.log(`  Blog Title: ${newConfig.blog.title}`);
  console.log(`  Blog Subtitle: ${newConfig.blog.subtitle}`);
  console.log(`  SEO Title: ${newConfig.seo.title}`);
  console.log(`  SEO Description: ${newConfig.seo.description}`);
  console.log(`  SEO Keywords: ${newConfig.seo.keywords}`);
  console.log(`  Footer Copyright: ${newConfig.footer.copyright}\n`);
  
  const confirm = await askYesNo('Do you want to apply these changes?', true);
  
  if (confirm) {
    writeConfig(newConfig);
    console.log(colorize('\n🎉 Setup complete! Your blog platform has been configured.', 'green'));
    console.log(colorize('You can now run "npm run dev" to start your development server.', 'dim'));
  } else {
    console.log(colorize('\nSetup cancelled. No changes were made.', 'yellow'));
  }
  
  rl.close();
};

process.on('SIGINT', () => {
  console.log(colorize('\n\nSetup cancelled.', 'yellow'));
  rl.close();
  process.exit(0);
});

runSetup().catch((error) => {
  console.error(colorize('Setup failed:', 'red'), error.message);
  rl.close();
  process.exit(1);
});

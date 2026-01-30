# Next.js + Contentful Minimal Starter

A minimal starter for building websites with Next.js and Contentful CMS.

**⚡ View demo:** [nextjs-contentful-starter.netlify.app](https://nextjs-contentful-starter.netlify.app/)

## Prerequisites

Before you begin, please make sure you have the following:

- [Netlify account](https://www.netlify.com/)
- [Contentful account](https://www.contentful.com/)
- GitHub, GitLab or Bitbucket account
- Node v18+ or later
- (optional) [nvm](https://github.com/nvm-sh/nvm) for Node version management.

## Getting Started

### Clone this repository

Fork and clone your repository, then run `npm install` in its root directory.

### Create Contentful Space

After signing into Contentful, create a new space. 

### Generate Management Token

If you don't already have a management token (or _personal access token_), generate one. To do so, go into your new empty space, then:

1. Click _Settings_
1. Choose _API Keys_
1. Select the _Content management tokens_ tab
1. Click the button to generate a new token

![Generate content management token](./docs/generate-mgmt-token.png)

### Generate Preview & Delivery API Keys

From the same place you generated the management token, you can now generate API access keys.

1. Select the *content delivery / preview tokens* tab
1. Choose *Add API key*

### Set Environment Variables

In your project, duplicate `.env.example` to `.env`. 

Fill in the values in the file based on the keys you've created. 

Note: the Contentful space ID can be viewed and copied via *Settings->General Settings* in Contentful.

### Import Content

Import the provided content models & content into Contentful by running the `import.js` script:

    npm run import

If the import fails to run, make sure that you've run `npm install` and that all keys in your `.env` file are set correctly.

### Run the Website

Run the Next.js development server:

    npm run dev

Visit [localhost:3000](http://localhost:3000) and you should see the example content you imported into your new Contentful space.

### Deploy to Netlify

To deploy your site to Netlify:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [app.netlify.com](https://app.netlify.com/)
3. Click "Import from Git" or "Add new site"
4. Select your repository
5. Configure your build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add your environment variables in the Netlify dashboard (Settings > Environment variables):
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_DELIVERY_TOKEN`
   - `CONTENTFUL_PREVIEW_TOKEN`
7. Deploy your site

## Next Steps

Here are a few suggestions on what to do next:

- Explore the [Contentful documentation](https://www.contentful.com/developers/docs/) to learn more about content modeling
- Check out the [Next.js documentation](https://nextjs.org/docs) to understand the framework better
- Learn about [Netlify deployment options](https://docs.netlify.com/)

## Support

If you get stuck along the way, get help in our [support forums](https://answers.netlify.com/).

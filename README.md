# Stackbit Tutorial [Next.js + Contentful]

![Tutorial Screenshot](https://assets.stackbit.com/docs/tutorial-shared-thumb.png)

**ℹ️ This project is used as a starting point for [our getting started tutorial](https://docs.stackbit.com/getting-started) using Contentful as the content source. If you would like to create a new project with Contentful as the content source, please use [the Contentful starter](https://github.com/stackbit-themes/contentful-starter).**

## Prerequisites

Before you begin, please make sure you have the following:

- Contentful account
- Node v14 or later

## Setup Instructions

The following sections take you through the process of getting this project set up and wired up to Contentful so you can begin the tutorial.

### Create New Project

Use the `create-stackbit-app` command to create a new project:

    npx create-stackbit-app@latest --example tutorial-nextjs-contentful

This will create a new instance of this project in a `tutorial-nextjs-contentful` directory.

### Create Contentful Space

After signing into Contentful, create a new community (free) space. Note that if you already have an active Contentful account, you may want to [create an organization](https://app.contentful.com/account/organizations/new) to place your new space.

When you're within an organization, you can create a new community space with the web app package.

![Create new Contentful space](./docs/new-community-space.png)

### Generate Management Token

If you don't already have a management token (or _personal access token_), you can generate one. To do so, go into your new empty space, then:

1. Click Settings
1. Chose API Keys
1. Select the Content management tokens tab
1. Click the button to generate a new token

![Generate content management token](./docs/generate-mgmt-token.png)

**⚠️ Take care to store this token as necessary. You will not be able to view again within Contentful.**

### Import Content

Your new project already contains the content for the tutorial. You can import this into Contentful by running the setup command.

    cd tutorial-nextjs-contentful
    npx cross-env CONTENTFUL_SPACE_ID={...} CONTENTFUL_MANAGEMENT_TOKEN={...} npm run setup

Replace the `{...}` with the appropriate values:

- Space ID can be found in the URL when inside a space.
- Management token is the token you just created (or referenced).

### Generate API Keys

From the same place you generated the management token, you can now generate API access keys.

1. Select the content delivery / preview tokens
1. Choose Add API key

![Generate new API keys](./docs/generate-api-keys.png)

### Set Environment Variables

In your project, duplicate `.env.example` to `.env`. Fill in the values:

```bash
CONTENTFUL_SPACE_ID="..."
CONTENTFUL_DELIVERY_TOKEN="..."
CONTENTFUL_PREVIEW_TOKEN="..."
```

The preview API key can be copied from the API screen you see after creating a new key.

![Copy API key values](./docs/copy-api-keys.png)

Note that the `CONTENTFUL_PREVIEW_SECRET` can be any string.

### Run the Project

Now you should be able to run the Next.js development server and see your content.

    npm run dev

Visit localhost:3000 and you should see the example content you imported into your new Contentful space. **Now you have everything you need to add Stackbit to your new project.** 🎉

## Support

If you get stuck along the way, [drop into our Discord server](https://discord.gg/HUNhjVkznH) and send a message in the `#documentation` or `#help` channels.

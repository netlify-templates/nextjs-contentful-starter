# Stackbit Next.js + Contentful Minimal Starter

![Screenshot](https://assets.stackbit.com/docs/tutorial-shared-thumb.png)

**ℹ️ This reposoitory is based on [our Getting Started tutorial](https://docs.stackbit.com/getting-started) in its completed state.**

There are two ways to start using this project: importing it via the UI, or developing locally.

## Creating a Stackbit Project via the UI

To create a cloud-based Stackbit project based on this repository, [click here](https://app.stackbit.com/import?mode=duplicate&repository=https%3A%2F%2Fgithub.com%2Fstackbit-themes%2Fnextjs-contentful-starter&validate=auto).

You will need to connect your Contentful account (create a free account if needed), and a new Contentful space with sample content will be created for you. 

A new GitHub repository with this codebase will be created for you. You can transfer ownership of the duplicated repository to you through the Project Settings.

Lastly, a live production build of the website on Netlify is automatically provisioned.

## Developing Locally 

### Prerequisites

Before you begin, please make sure you have the following:

- Contentful account
- Node v14 or later

### Clone this repository

Clone this repository, then run `npm install` in its root directory.

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

    node ./contentful/import.js

If the import fails to run, make sure that you've run `npm install` and that all keys in your `.env` file are set correctly.

### Run the Website

Run the Next.js development server:

    npm run dev

Visit [localhost:3000](http://localhost:3000) and you should see the example content you imported into your new Contentful space.

### Run Stackbit in Local Development Mode

Keep the Next.js development server running, and open a new command-line window in the same directory.

Install Stackbit's CLI tools (once):
    
    npm i -g @stackbit/cli@latest

Run the CLI:

    stackbit dev

Click the displayed link to [localhost:8090/_stackbit](http://localhost:8090/_stackbit) and the visual editor will open.

### Create a Cloud-Based Stackbit Project

To deploy a cloud-based Stackbit project connected to your repository:

1. Push your code to a GitHub repository
1. Open the [import page](https://app.stackbit.com/import) and choose *Use my repository*.

## Support

If you get stuck along the way, [drop into our Discord server](https://discord.gg/HUNhjVkznH) and send a message in the `#documentation` or `#help` channels.

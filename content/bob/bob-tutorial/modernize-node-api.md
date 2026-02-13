---
id: modernize-node-api
name: Modernize a Node.js API with Bob
short_name: Modernize Node.js API
products_used:
  - bob
description: >-
  Modernize your Node.js Express API from version 16 to 22 using IBM Bob. Master modes, approvals, code actions, and literate coding through hands-on practice.
---

# Modernize a Node.js API with Bob

IBM Bob is an AI SDLC (Software Development Lifecycle) partner that augments your existing workflows. Bob helps you understand, plan, improve, and work confidently with real codebases, while offering proactive insights that keep you in control every step.

In this tutorial, you learn Bob's core features by modernizing a TypeScript Express API from Node.js 16 to Node.js 22. You learn how Bob analyzes dependencies, updates module systems, and modernizes code patterns. While the example uses TypeScript and Express, the Bob features you learn apply to any programming language or framework.

Bob provides the following five key capabilities that you learn modernizing a working API:

1. **Modes** - Bob has five built-in modes which difference permission and workflows. The modes are Plan, Code, Ask, and Advanced.
1. **Context mentions** let you reference specific elements of your project directly in your conversations with Bob, such as specific file, folder, or Git commits.
1. **Approval workflow** lets you review every file edit and command before Bob executes it.
1. **Code actions** provide quick fixes, refactorings, and AI-powered suggestions directly in your editor.
1. **Literate coding** lets you write code with AI assistance directly inside your editor. You type instructions in plain language right where the code should go.

Throughout this tutorial, you ask Bob to run commands instead of typing them in a terminal yourself. This approach has several advantages:
- Bob sees all command output and can help you debug if something fails
- Bob shows you the exact command before running it, so you stay in control
- You can ask Bob to analyze errors without leaving the conversation
- Bob can suggest fixes and run follow-up commands automatically

## Prerequisites

This tutorial uses a TypeScript Express REST API as the example project. However, you do not need experience in Node.js or TypeScript.

To complete this tutorial, you need:

- [Docker](https://docs.docker.com/get-docker/) for running containerized builds. You won't need to install Node.js or dependencies locally.
- [Git](https://git-scm.com/downloads) to download the tutorial repository.
- [Bob](https://bob.ibm.com/docs/ide/install) to be your AI-assistant.

## Understanding Bob's modes

Bob has different modes for different tasks. Each mode has a different set of tools and features. The following are Bob's modes and when you should use them:

- **Plan mode** - When you want to analyze requirements, research and design implementation steps
- **Code mode** - When you want Bob to make changes or run commands 
- **Ask mode** - When you want to explore and understand code without making changes
- **Advanced mode** - When you need all of Bob's tools for complex workflows 
- **Orchestrator** - Coordinates complex tasks across multiple modes


To switch modes, click the mode icon in the bottom-right corner of the chat panel.

<Add picture or video>

## Open Bob and clone the repository

1. Launch Bob IDE on your computer

1. Open the Bob chat panel by clicking the Bob icon beside the navigation bar or use the shortcut `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux)

1. Switch Bob to code mode by clicking the mode icon in the bottom-right corner of the chat panel. Code mode lets Bob run the following step to clone the project.

1. In the Bob chat panel, ask Bob to clone the tutorial repository:

   ```text
   Clone the repository to my desktop https://github.com/hashicorp/web-unified-docs.git and navigate to the express-todo-api directory
   ```

   Bob shows you the commands it runs and asks for your approval. Click **Run** to proceed.

1. After Bob clones the repository, open the project folder: Select **File > Open Folder** and navigate to the `bob-tutorial/express-todo-api` directory located on your desktop.

You see the project files in the explorer and the Bob chat panel on the side.

## Create a Dockerfile

You create a `Dockerfile` in the project root to run the application in a containerized environment. With Docker, you don't need to install Node.js or dependencies on your machine.

Ask Bob to create the Dockerfile in the Bob chat panel:

```text
Create a Dockerfile in the project root with the following:
- Use node:16 as the base image
- Set working directory to /app
- Copy package files and run npm install
- Copy source code and run npm run build
- Expose port 3000
- Start with npm start
```

Review, select Save, and then Run Bob's file creation. This Dockerfile uses Node 16 to match the legacy application. Bob updates the Dockerfile during modernization to use Node 22.

## Verify the legacy application builds

Before you have Bob modernize the legacy application, you should make sure the code works. Ask Bob to build and test the legacy application using Docker. 

Run the following in the Bob chat panel:

```text
Build and test the legacy application:
docker build -t todo-api-legacy .
docker run -d --name todo-api -p 3000:3000 todo-api-legacy
curl http://localhost:3000/api/todos
```

Bob shows you the commands and asks for to run the command. Click **Run** to run them.

Bob will give you the following output to confirm the legacy application builds:

```
Successfully built and tested the Docker container for the legacy application:

✅ Docker image built: todo-api-legacy
✅ Container running: todo-api (ID: 0bb1472cd80d)
✅ API responding on port 3000
✅ Test endpoint returned sample todo data:

ID: fd103b9e-2fa1-4162-b671-f8a6dcbea04a
Title: "Learn Node.js modernization"
Status: Not completed
Created: 2026-02-13T18:33:42.254Z
```

Ask Bob to stop and remove the container:

```text
Stop and remove the container:
docker stop todo-api && docker rm todo-api
```

## Explore the codebase with Bob's Ask mode

Before modernizing, switch to Bob's **Ask mode**. Ask mode can only read files, so you can safely explore code without accidentally making changes.

Click the mode selector dropdown to the left of the chat input field and select **Ask** or type `/ask` in Bob chat.

### Use @ context mentions to review the project

Bob supports **@ context mentions** that let you reference specific files, folders, or problems directly in your prompts. Context mentions give Bob precise context about what you want to discuss.

In the Bob chat panel, type the following prompt:

```text
@package.json What Node.js version is this project using? What dependencies would need updating for Node.js 22?
```

The `@` symbol before `package.json` tells Bob to include that file's contents as context.

Bob doesn't start answering immediately. Bob explores your codebase first—reading files, following patterns, and analyzing code. Don't interrupt this phase.

Bob reads the `package.json` file and responds with a detailed list of things that need updating. Bob catagorizes the findings into Critical, Recommended, and Already compatible. 

In summary, it will tell you that the application needs to have the following modernized:
- `@types/node ^16.18.0` to `^22.x.x`
- `typescript ^4.9.5` to `^5.3.0` or later
- `ts-node ^10.9.1` to `^10.9.2 or later`
- Consider upgrading `express` from `^4.18.2` to `14.19.0` or later

### Analyze the module system and dependencies

Ask Bob to analyze the project's module system:

```text
@tsconfig.json What module system is this TypeScript project using? What would need to change to use ESM (ECMAScript modules)?
```
Bob tells you that the project uses CommonJS modules ("module": "commonjs"). To switch to ESM, you need to update the following:
- Add "type": "module" to package.json, 
- Change the module setting to "ES2022", 
- Update moduleResolution to "node16", 
- Convert all require()/module.exports to import/export syntax with explicit .js file extensions.

After Bob learns about `@package.json` and `@tsconfig.json`, you and Bob know the modernization opportunities:
- Node.js 16 → 22 in package.json and Dockerfile
- CommonJS (`require`/`module.exports`) → ESM (`import`/`export`)
- TypeScript compiler target and module settings
- Outdated dependency versions

## Modernize the API with Bob's Code mode

You and Bob now understand what needs updating, switch back to **Code mode** so Bob can make code changes. Click the mode selector and select **Code**, or type `/code` in the chat.

You need Code mode to:
- **Edit files** such as modify package.json, tsconfig.json, and Dockerfile
- **Run terminal commands** such as build and test with Docker

In the Bob chat panel, paste the following modernization prompt. Notice the `@` references that point Bob to specific files:

```text
@package.json @tsconfig.json @Dockerfile Modernize this Express API from Node.js 16 to Node.js 22.

Update:
1. package.json: Node.js engines from 16.x to 22.x, update all dependencies to latest compatible versions
2. tsconfig.json: Keep module as "commonjs" for now (ESM conversion is not part of this tutorial)
3. Dockerfile: FROM node:16 to FROM node:22-alpine for smaller image size
4. Update TypeScript target if needed for Node 22 compatibility

Keep the API functionality identical - this is a modernization, not a feature change.
I don't not need to run NPM locally since I will the application will run in Docker.
```

### Learn Bob's approval workflow

Bob generates a TODO list, which you can approve, decline, or edit:

- Update package.json - Node.js engines and dependencies
- Update tsconfig.json - TypeScript target for Node 22
- Update Dockerfile - Node 22 Alpine base image
- Verify all changes maintain API functionality

During validation, Bob might catch some errors. Bob asks you to approve its request to fix the error and then proceeds with validation.

As Bob works, it shows you each proposed change before applying it. Click **Approve** to allow the change.

Review Bob's proposed changes. You should see updates to:

**`package.json`:**
- Node.js engines: 16.x → 22.x
- Dependencies: Express, TypeScript, and related packages updated to latest versions
- `@types/node`: 16.x → 22.x

**`Dockerfile`:**
- Base image: `FROM node:16` → `FROM node:22-alpine`

**`tsconfig.json`:**
- TypeScript target may be updated for Node 22 compatibility
- Module system remains as commonjs (as instructed)

Click **Approve** to accept the changes.

After Bob completes the modernization, you see the following summary:

```text
Successfully modernized the Express API from Node.js 16 to Node.js 22:

Changes Made:
1. package.json - Updated Node.js engine and dependencies:
   Node.js engine: 16.x → 22.x
   express: ^4.18.2 → ^4.19.2
   uuid: ^9.0.0 → ^10.0.0
   @types/express: ^4.17.17 → ^4.17.21
   @types/node: ^16.18.0 → ^22.5.0
   @types/uuid: ^9.0.0 → ^10.0.0
   ts-node: ^10.9.1 → ^10.9.2
   typescript: ^4.9.5 → ^5.5.4

2. tsconfig.json - Updated TypeScript target for Node.js 22:
   target: ES2020 → ES2022
   lib: ["ES2020"] → ["ES2022"]
   Module system remains commonjs as requested

3. Dockerfile - Modernized base image:
   Base image: node:16 → node:22-alpine
   Alpine variant provides smaller image size (~40% reduction)

The API functionality remains identical - this is purely a modernization update.
```

You and Bob have modernizated the application.

## Verify the modernized application with Docker

Now that Bob has modernized the code, verify everything works by rebuilding and testing the Docker container. The Docker build automatically installs the updated dependencies specified in package.json.

In Code mode, type:

```text
Build and test the modernized application with Docker:
docker build -t todo-api-modern .
docker run -d --name todo-api-modern -p 3001:3000 todo-api-modern
curl http://localhost:3001/api/todos
docker stop todo-api-modern && docker rm todo-api-modern
```

Bob presents the `execute_command` tool with the Docker commands for your approval. This is the same approval workflow you saw for file edits. Bob shows you the exact command before running it, so you stay in control of terminal operations too.

Click **Approve** to run the build and tests. Bob executes the commands and shows the output directly in the chat panel:

Once Bob verifies the application, you should see the following output:

```text
Successfully modernized and verified the Express API from Node.js 16 to Node.js 22:

Changes Made:

package.json - Updated Node.js engine to 22.x and all dependencies to latest versions:

express: 4.18.2 → 4.21.2
uuid: 9.0.0 → 11.0.3
@types/express: 4.17.17 → 5.0.0
@types/node: 16.18.0 → 22.10.2
@types/uuid: 9.0.0 → 10.0.0
typescript: 4.9.5 → 5.7.2
ts-node: 10.9.1 → 10.9.2
tsconfig.json - Updated TypeScript target from ES2020 to ES2022 for Node.js 22 compatibility (kept module as "commonjs")

Dockerfile - Changed base image from node:16 to node:22-alpine for smaller image size

src/routes/todos.ts - Fixed type assertions for req.params.id to handle stricter typing in @types/express v5

Docker Verification:
✅ Docker image built successfully with Node.js 22 Alpine
✅ Container started and API responded correctly on port 3001
✅ API endpoint /api/todos returned expected JSON response with sample todo
✅ Container stopped and cleaned up successfully

The modernized application is fully functional and maintains identical API behavior.

```

The API works correctly, confirming that Bob preserved existing behavior while modernizing the Node.js version and dependencies.


## Next steps

In this tutorial you learned how to modernized an Express API from Node.js 16 to Node.js 22 using Bob. Bob analyzed your dependencies, updated configuration files, and modernized the Docker setup while preserving all functionality.


## Do we want to have these sections the the tutorial:

Use Bob's AI-powered code review to catch issuesshows the user how to use Code actions. We need to decide if we want  keep this or switch to a simple Code action where the user just uses the Explain Code action to look at the single line of code.

Add functionality with literate coding shows the user how to add code to the application using Bob AI. This is useful but it adds a lot of steps

## Use Bob's AI-powered code review to catch issues

After modernization, use Bob's built-in `/review` command to analyze your changes. When programming with Bob, you should use `/review` before committing changes to your code repository.

You can run `/review` from Code mode, but switching to **Advanced mode** has all the capabilities of Code mode plus additional tools like browser access and MCP (Model Context Protocol).

Click the mode selector and select **Advanced**, or type `/advanced` in the chat input.

In the Bob chat panel, type:

```text
/review
```

Bob opens the **Bob Findings** panel and analyzes all uncommitted changes. Results are organized by priority (High, Medium, Low).

<Add picture or video>

Bob finds the following issues:

```text
Summary:

2 medium severity issues (security & performance)
4 low severity issues (maintainability & functionality)
Key Issues:

Dockerfile installs devDependencies in production (security/performance impact)
Missing multi-stage build optimization
No health check configured
Minor improvements needed for .dockerignore
```

You can click on each finding for more details. You can also sort the findings by File, Type, and Severity.

<Add picture or video>

### Fix Bob findings with code actions

You will use **code actions** feature to interact with Bob directly from the editor without using the Bob chat panel. 

The following are Bob code actions:
- **Add to Context** - Adds selected code to your Bob conversation with file path and line numbers
- **Explain Code** - Asks Bob to explain the selected code
- **Improve Code** - Asks Bob to suggest improvements to the selected code

You will use the **Explain code** and **Improve Code** code actions to fix the Bob Findings.

1. In the Bob Findings tab, sort the findings by Severity.
<add picture or video>
2. Click the Medium folder. You see "Missing input validation for UpdateTodoInput:37"
<add picture or video> ?
3. Click on the Missing input validation for UpdateTodoInput:37 to open options for the error.
4. You can either go to the issue location, dismiss the error, or use direct fix to have Bob automatically fix the issue. Click on `Go To Location`. Go to location opens the file in a new tab and places you on line 37.
5. With line 37 selected, click on the light bulb at the start of the line.
6. You see several options. Click 'Explain with IBM Bob' so you can understand what the issue is. Bob Chat automatically opens and explains the issue.
7. Once you review the issue, click on the lightbulb again and select Improve with IBM Bob.
8. Bob chat fixes the issue and shows you the improved code.
9. In the Bob Findings window, you can click on the `Mark as resolved` option.

## Add functionality with literate coding

Bob's **literate coding** feature lets you write code with AI assistance directly in your editor. Instead of using the chat panel, you write instructions in plain language right where the code should go, and Bob generates the implementation.

Literate coding is useful when you want to add small enhancements or utility functions without leaving your code context.

### Add a response formatter using literate coding

You add a helper function to create standardized API responses using literate coding.

1. Open `src/routes/todos.ts` in the editor

2. Toggle literate coding mode by clicking the magic wand icon in the editor toolbar

<Add photo>

3. At the top of the file, after the imports, add the following instruction in plain language:

   ```typescript
   // Create a helper function called formatSuccessResponse that standardizes API success responses
   // It should accept data and an optional message parameter
   // Return an object with success: true, data, message (if provided), and timestamp
   ```

   Your instruction appears highlighted in blue, marking it as literate coding content.

4. Press `Cmd+Enter` to generate the code

   Bob analyzes your instruction and the file context, then generates a proper response formatter function. You see an inline diff showing the generated code.

5. Review the generated code. Bob creates something similar to:

   ```typescript
   function formatSuccessResponse<T>(data: T, message?: string) {
     return {
       success: true,
       data,
       ...(message && { message }),
       timestamp: new Date().toISOString()
     };
   }
   ```

6. Accept the changes by pressing `Cmd+Enter`, or reject them with `Cmd+Shift+Backspace`

### Test the response formatter

Now that you've created the helper function, test it by using it in one of the API endpoints.

1. Exit literate coding mode by pressing `Cmd+M` (Mac) or `Ctrl+M` (Windows/Linux)

2. Make sure you're in **Code mode** so Bob can edit files and run Docker commands. If needed, click the mode selector and choose **Code**, or type `/code` in the chat.

3. In the Bob chat panel, ask Bob to integrate the function:

   ```text
   Update the GET /api/todos endpoint in src/routes/todos.ts to use the formatSuccessResponse helper function
   ```

   Bob modifies the endpoint to wrap the response in your new formatter.

4. Ask Bob to rebuild and test the application:

   ```text
   Rebuild and test the application:
   docker build -t todo-api-modern .
   docker run -d --name todo-api-test -p 3002:3000 todo-api-modern
   curl http://localhost:3002/api/todos
   docker stop todo-api-test && docker rm todo-api-test
   ```

5. Review the output. You should now see a formatted response with the new structure:

   ```json
   {
     "success": true,
     "data": [
       {
         "id": "...",
         "title": "Learn Node.js modernization",
         "completed": false,
         "createdAt": "..."
       }
     ],
     "timestamp": "2026-02-12T23:45:00.000Z"
   }
   ```

The response now includes `success`, `data`, and `timestamp` fields, showing that your literate coding implementation works correctly.

<Tip>

**When to use literate coding vs. chat:**
- **Literate coding**: For focused, single-file changes where you know exactly where code should go
- **Chat mode**: For multi-file changes, exploratory work, or when you need Bob to decide where to make changes

Both approaches work together - use whatever fits your workflow best.

</Tip>

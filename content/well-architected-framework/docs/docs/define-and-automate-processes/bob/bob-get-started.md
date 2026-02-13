---
id: get-started-bob
name: Get started with Bob
short_name: Get started with Bob
products_used:
  - bob
description: >-
  Get started with Bob by modernizing a Java 8 Spring application to Java 17. Learn modes, approval workflows, code review, and code actions hands-on.
---

# Get started with Bob

IBM Bob is an AI SDLC (Software Development Lifecycle) partner that augments your existing workflows. Bob helps you understand, plan, improve, and work confidently with real codebases, while offering proactive insights that keep you in control every step. 

In this tutorial, you learn Bob's core features through a hands-on example: modernizing a Java 8 Spring application to Java 17. While the example uses Java, every Bob feature you learn applies to any programming language—Python, JavaScript, Go, or any codebase Bob supports.

Bob provides five key capabilities that work together:

1. **Modes** - Different tool access levels (Ask for exploration, Code for changes, Advanced for comprehensive workflows)
2. **@ Context mentions** - Precise file and folder references in your prompts
3. **Approval workflow** - Review every file edit and command before execution
4. **Code actions** - Quick access to Bob from your editor (lightbulb icon or right-click menu)
5. **Literate coding** - Write instructions in plain language directly in your code, then generate implementations

This tutorial teaches you all five capabilities through a real code modernization task.

## Prerequisites

This tutorial uses a Java Spring application as the example project. You should be familiar with basic Java development concepts.

To complete this tutorial, you need:

- [Docker](https://docs.docker.com/get-docker/) for running containerized builds. You won't need to install any Java dependencies on your machine.
- [Git](https://git-scm.com/downloads) for version control
- [Bob](https://internal.bob.ibm.com/docs/ide/install) installed
- Basic understanding of Java applications such as reading code and running tests

## Clone the Spring PetClinic repository

The Spring PetClinic is a sample Spring application that demonstrates common patterns and practices. You will modernize an older version that uses Java 8.

Clone the Spring PetClinic repository:

```shell-session
$ git clone https://github.com/spring-petclinic/spring-framework-petclinic.git
```

Change to the repository directory:

```shell-session
$ cd spring-framework-petclinic
```

Check out the Java 8 compatible branch:

```shell-session
$ git checkout 5.3.x
```

The `5.3.x` branch uses Java 8 and older Spring Framework patterns that you modernize in this tutorial.

## Open the project in Bob

Open Bob, then select **File > Open Folder** and navigate to the `spring-framework-petclinic` directory.

You should see the project files in the explorer and the Bob chat panel on the side. If the chat panel is not visible, open it by either clicking the Bob icon beside the navigation bar or use the short cut.


macOS: `Cmd+L`
Windows: `Ctrl+L`

## Create a Dockerfile for containerized builds

Create a `Dockerfile` in the project root to run the application in a containerized environment. With Docker, you don't need to install Java locally.

Create a file named `Dockerfile` in the `spring-framework-petclinic` folder with the following content:

<CodeBlockConfig filename="Dockerfile">

```dockerfile
FROM maven:3.9-eclipse-temurin-8

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

CMD ["mvn", "test"]
```

</CodeBlockConfig>

This Dockerfile uses Java 8 with the Eclipse Temurin JDK distribution. The `maven:3.9-eclipse-temurin-8` image supports both Intel and Apple Silicon processors. Bob updates this file during modernization to use Java 17.

## Verify the legacy application builds

Build and test the legacy application using the Docker container:

```shell-session
$ docker build -t petclinic-legacy .
$ docker run --rm petclinic-legacy
```

The tests pass, confirming the Java 8 application works correctly. You should see output similar to:

```shell-session
[INFO] Tests run: 62, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

You now know that the build is working before you and Bob modernize the code.

## Explore legacy code safely with Bob's Ask mode

Before modernizing, use Bob's **Ask mode** to safely explore the legacy codebase. Ask mode can read files but cannot edit them or run commands.

Click the mode selector dropdown to the left of the chat input field. You'll see five built-in modes:

- **Plan** - For planning and design before implementation
- **Code** - For writing and modifying code
- **Advanced** - Full access to all tools, including browser and MCP (Model Context Protocol)
- **Ask** - For questions and analysis (read-only)
- **Orchestrator** - Coordinates complex tasks across multiple modes

Select **Ask**, or type `/ask` in the chat input. You can also press `Cmd+.` (Mac) or `Ctrl+.` (Windows/Linux) to cycle through modes.

<Note>

**Why modes matter:** Each mode has different tool access. Ask mode can only read files, so you can safely explore code without accidentally making changes. Code mode can edit files and run commands. Advanced mode adds browser and MCP tools for complex workflows. This separation helps you stay in control of what Bob can do at any given time.

</Note>

### Use @ context mentions to review the project

Bob supports **@ context mentions** that let you reference specific files, folders, or problems directly in your prompts. This gives Bob precise context about what you want to discuss.

In the Bob chat panel, type the following prompt. The `@` symbol before `pom.xml` tells Bob to include that file's contents as context:

```
@pom.xml What Java version is this project configured for? What dependencies would need updating for Java 17?
```

Bob reads the `pom.xml` file and responds with details about the Java 1.8 configuration and which dependencies need updates.

<Note>

**@ context mentions** are one of Bob's most useful features. Type `@` in the chat to see available options including file paths, folders, and `@problems` for current errors and warnings. You can reference multiple files in a single prompt, such as `@pom.xml @Dockerfile`.

</Note>

<Tip>

You'll learn two ways to interact with Bob in this tutorial:
1. **Chat-based** - Type prompts in the Bob panel (what you're doing now)
2. **Code actions** - Right-click code in the editor for contextual help (you'll try this later)

Both methods give Bob context automatically, so you don't need to explain what file or line you're asking about.

</Tip>

### Analyze legacy patterns across the codebase

Now ask Bob to look at the entire project, not just one file:

```
What Java 8 patterns in this PetClinic codebase could be modernized to Java 17?
Analyze the code and identify specific examples of legacy patterns.
```

### Watch how Bob explores your codebase

Bob doesn't start answering immediately. Bob explores your codebase first—reading files, following patterns, and analyzing code. This takes 10-15 seconds. Don't interrupt this phase.

Bob identifies modernization opportunities like:
- Explicit type declarations that could use `var`
- String concatenation that could use text blocks
- `Arrays.asList()` that could use `List.of()`
- Outdated build tool versions in pom.xml

You now know what can be modernized while knowing Bob hasn't changed any code. Ask mode is read-only, so you can explore freely without risk.

## Modernize the Java application with Bob's Code mode

You will now have Bob update the Pet clinic code. Switch to **Code mode** to allow Bob to make changes. Click the mode selector and select **Code**, or type `/code` in the chat.

<Note>

**Mode change:** Code mode has different capabilities than Ask mode. Code mode can:
- Read files (like Ask mode)
- **Edit files**
- **Run terminal commands**

</Note>

In the Bob chat panel, paste the following modernization prompt. Notice the `@` references that point Bob to specific files:

```
@pom.xml @Dockerfile Modernize this Spring PetClinic application from Java 8 to Java 17.

Update:
1. pom.xml: java.version from 1.8 to 17, jacoco-maven-plugin to 0.8.11
2. Dockerfile: maven:3.9-eclipse-temurin-8 to maven:3.9-eclipse-temurin-17
3. Java code: Use var, List.of(), and text blocks where appropriate

Do NOT convert JPA entities to records.
```

### Understanding Bob's approval workflow

As Bob works, it shows you each proposed change before applying it. Click **Approve** to allow the change, or **Reject** to skip it. Bob waits for your explicit approval on each action.

Review Bob's proposed changes. You should see updates to:

**`pom.xml`:**
- Java version: 1.8 → 17
- JaCoCo plugin: 0.8.6 → 0.8.11

**`Dockerfile`:**
- Base image: `maven:3.9-eclipse-temurin-8` → `maven:3.9-eclipse-temurin-17`

**Java source files:**
- `var` keyword for obvious type declarations
- `List.of()` instead of `Arrays.asList()`
- Text blocks for multi-line strings

Click **Approve** to accept the changes.

## Verify the modernized application with Docker

After Bob applies the code changes, verify the modernization by asking Bob to build and test using Docker. In Code mode, type:

```
Build and test the modernized application with Docker:
docker build -t petclinic-modern . && docker run --rm petclinic-modern
```

Bob presents the `execute_command` tool with the Docker commands for your approval. This is the same approval workflow you saw for file edits. Bob shows you the exact command before running it, so you stay in control of terminal operations too.

Click **Approve** to run the build and tests. Bob executes the commands and shows the output directly in the chat panel:

```shell-session
[INFO] Tests run: 62, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

All tests pass, confirming that Bob preserved existing behavior while modernizing both the application code and the Dockerfile.

<Tip>

Running commands through Bob has an advantage over running them in a separate terminal: Bob sees the output and can help you debug if something fails. If the build had errors, you could ask Bob to analyze the failure and propose fixes without leaving the conversation.

</Tip>


## Use Bob's AI-powered code review to catch issues

After modernization, use Bob's built-in `/review` command to analyze your changes before committing. The `/review` command requires **Advanced mode**, which has access to all of Bob's tools including browser and MCP capabilities.

Switch to Advanced mode by clicking the mode selector and selecting **Advanced**, or type `/advanced` in the chat input. You can also press `Cmd+.` (Mac) or `Ctrl+.` (Windows/Linux) to cycle through modes until you reach Advanced.

In the Bob chat panel, type:

```
/review
```

Bob opens the **Bob Findings** panel and analyzes all uncommitted changes. Results are organized by priority (High, Medium, Low). Click any finding to jump to the relevant code in the editor.

## Explore code changes with Bob's code actions

Code actions let you interact with Bob directly from the editor. Select code, then click the lightbulb icon or right-click and choose **Bob**.

Available actions:
- **Explain Code** - Understand why Bob made a change
- **Improve Code** - Get refactoring suggestions
- **Document Code** - Generate documentation
- **Fix Code** - Get fix suggestions

**Try it:** Select a `var` declaration Bob added, right-click, and choose **Bob > Explain Code**.

## Next steps

You have successfully modernized a Spring application from Java 8 to Java 17 using Bob. Bob analyzed your codebase, identified modernization opportunities, and applied changes while preserving all functionality.

**Try these quick experiments:**
- Ask Bob to explain specific changes it made: `Why did you use var for this variable?`
- Use Bob's `/review` command in Advanced mode to analyze other projects
- Try **Plan mode** to plan a larger refactoring before implementing it

**Explore more Bob features:**
- [Custom modes](https://internal.bob.ibm.com/docs/ide/features/custom-modes) - Create specialized modes for your team's workflows, such as a Java modernization mode or a security review mode
- [Custom slash commands](https://internal.bob.ibm.com/docs/ide/features/slash-commands) - Automate repetitive tasks by creating reusable commands in `.bob/commands/`
- [Bob Marketplace](https://internal.bob.ibm.com/docs/ide/features/bob-marketplace) - Install community-contributed MCP servers and custom modes
- [Bob Shell](https://internal.bob.ibm.com/docs/shell) - Use Bob from the command line for CI/CD integration and scripting workflows
- [Custom rules](https://internal.bob.ibm.com/docs/ide/features/custom-rules) - Fine-tune Bob's behavior with `.bobrules` files and mode-specific rules

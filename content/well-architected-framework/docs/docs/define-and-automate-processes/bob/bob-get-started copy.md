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

Bob provides four key capabilities that work together:

1. **Modes** - Different tool access levels (Ask for exploration, Code for changes, Advanced for comprehensive workflows)
2. **@ Context mentions** - Precise file and folder references in your prompts
3. **Approval workflow** - Review every file edit and command before execution
4. **Code actions** - Interact with Bob directly from your editor without switching to the chat panel
^ Look into this part more
5. Look into **Literate coding** mode (little wand thing) Give instructions in text editor and then Bob will take instruction and then does the edits (a feature that no one else has)
6. Bob findings (check if that is `/review`)


This tutorial teaches you all four capabilities through a real code modernization task.

<Note>

Bob automatically routes your requests to different language models based on task complexity. Simpler tasks like reading files use smaller, faster models, while complex tasks like multi-file refactoring use more capable models. Bob handles model selection so you can focus on your work.

</Note>

## What you'll learn about Bob

In this tutorial, you learn how to:

- Use **@ context mentions** to give Bob precise file references
- Use **Ask mode** for safe, read-only code analysis
- Switch to **Code mode** to make changes with Bob's approval workflow
- Approve, reject, and iterate on Bob's proposed changes
- Run `/review` in **Advanced mode** to catch issues before committing
- Use **code actions** to explore changes directly in the editor

## Prerequisites

This tutorial uses a Java Spring application as the example project. You should be familiar with basic Java development concepts.

To complete this tutorial, you need:

- [Docker](https://docs.docker.com/get-docker/) for running containerized builds. You won't need to install any Java dependencies on your machine.
- [Git](https://git-scm.com/downloads) for version control
- [Bob](https://bob.ibm.com/docs/ide/install) installed
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

Watch the Bob chat panel as it works. Bob doesn't start answering immediately. Instead, Bob explores your codebase first to build a complete understanding:

1. **Reading files** - Bob examines `pom.xml`, Java source files, and configuration
2. **Following patterns** - Bob reads related code to understand your project's conventions
3. **Analyzing patterns** - Bob identifies legacy code that could be modernized
4. **Presenting findings** - Bob summarizes what it found with specific examples

This exploration takes time, sometimes 10-15 seconds. Don't interrupt this phase. Bob is building a mental model of your codebase so its analysis is thorough and context-aware.

**Why this matters:** Bob's exploration is what makes it different from simple code generation tools. Bob understands your project's context, conventions, and patterns before proposing changes.

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

<Note>

**How Bob decides what to change:** When you send this prompt, Bob:

1. **Analyzes your prompt** - Understands the modernization requirements (Java 17, var usage, List.of(), etc.)
2. **Examines the current code** - Reads pom.xml, Dockerfile, and Java source files
3. **Identifies modernization opportunities** - Finds code matching your guidelines
4. **Plans changes** - Determines which files need updates and in what order
5. **Presents changes for approval** - Shows you each proposed change before applying it

This multi-step process ensures Bob's changes align with your explicit instructions.

</Note>

### Understanding Bob's approval workflow

As Bob works, watch the chat panel carefully. Bob uses a **tool approval workflow** that keeps you in control:

1. **Your review** - You see exactly what Bob wants to do before it happens

2. **Approve or Reject** - Click **Approve** to allow the change, or **Reject** to skip it

3. **Execution** - Only after approval does Bob apply the change

This approval workflow is a key Bob feature. Bob waits for your explicit approval on each action.

<Tip>

**Per-file control:** When Bob proposes changes to multiple files, you can approve some and reject others. This granular control lets you accept the changes you want while skipping others.

</Tip>


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

<Note>

**Why Advanced mode?** The `/review` command uses tools from multiple categories, including file reading, code analysis, and the Bob Findings panel. Advanced mode provides unrestricted access to all tool groups, which is what makes it the right mode for comprehensive code reviews.

</Note>

In the Bob chat panel, type:

```
/review
```

Bob opens the **Bob Findings** panel and analyzes all uncommitted changes in your workspace. Watch as Bob:

1. **Scans your changes** - Bob examines the diff between your working directory and the last commit
2. **Analyzes code quality** - Bob checks for potential issues, anti-patterns, and improvements
3. **Presents findings** - Results appear in the Bob Findings panel with a summary in the chat

Bob provides a review summary organized by priority:

- **High Priority Issues** - Critical problems that impact performance or correctness
- **Medium Priority Issues** - Potential bugs or issues worth addressing
- **Low Priority Issues** - Code quality improvements and style consistency

For this modernization, Bob identifies approximately 6 issues including:
- A pre-existing N+1 query problem that causes performance issues
- Potential issues with null handling in modern Java APIs
- Code consistency improvements (text blocks, variable naming, Javadoc accuracy)

As these errors were pre-existing and not caused the Bob's modernization, you can ignore them.

### Navigate findings in your code

Click any finding in the Bob Findings panel to jump directly to the relevant code in the editor. Bob highlights the problematic line, shows the severity level, and explains the risk. This lets you evaluate each finding in context rather than reading a flat list.

Review the findings and decide which issues to address. Bob surfaces pre-existing issues alongside modernization-related changes, helping you improve overall code quality.

<Tip>

**Pre-commit workflow:** Run `/review` before every commit to catch issues early. This is faster and cheaper than discovering problems in pull request reviews.

</Tip>

## Explore code changes with Bob's code actions

After reviewing findings, learn Bob's **code actions** feature—one of the most useful ways to interact with Bob during daily coding.

**What are code actions?** Code actions let you interact with Bob directly from the editor without switching to the chat panel. Bob receives the file path, line numbers, and surrounding code automatically.

Select a line of modernized code (for example, a `var` declaration that replaced an explicit type). You can interact with Bob in two ways:

1. **Lightbulb icon** - Click the lightbulb icon that appears in the gutter next to the selected code
2. **Right-click menu** - Right-click the selected code and choose **Bob** from the context menu

From the menu, select:
- **Explain Code** - Understand why Bob made a specific change
- **Improve Code** - Get suggestions for further improvements
- **Document Code** - Generate documentation for selected code
- **Fix Code** - Get suggestions to fix potential issues

**Try it now:**
1. Select the `var` declaration Bob added to PetService.java
2. Right-click and choose **Bob > Explain Code**
3. Bob explains the modernization decision with full context

<Tip>

**Use code actions beyond this tutorial.** When you encounter unfamiliar code in any project:
- Select it and use **Explain Code** for instant explanations
- Use **Improve Code** to get refactoring suggestions
- Use **Document Code** to generate JavaDoc or docstrings

Code actions work in any file, any language, without leaving the editor.

</Tip>

## Review what you learned

This tutorial covered Bob's core features through a real code modernization task. Here's the progression you followed and what each phase taught you:

| Learning Phase | Bob Features Used | Key Takeaways |
|----------------|------------------|---------------|
| **Phase 1: Safe Exploration** | Ask mode, @ context mentions | Explore codebases without risk of changes |
| **Phase 2: Controlled Changes** | Code mode, approval workflow, reject/iterate | Review every change before it applies; guide Bob toward the right result |
| **Phase 3: Verification** | execute_command approval, Docker integration | Even terminal commands require approval; Bob sees output to help debug |
| **Phase 4: Quality Checks** | Advanced mode, /review command, Bob Findings panel | Catch issues before committing with AI-powered code review |
| **Phase 5: Editor Integration** | Code actions, Enhance prompt | Get contextual help without leaving your code; improve prompts before sending |

**The pattern:** Bob provides safety (modes + approval) + verification (/review) + flexibility (code actions). This combination keeps you in control while accelerating development.

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

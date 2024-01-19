interface Project
{
    title: string;
    href: {
        app: string | null;
        github: string;
    };
    description: string;
    responsibilities: readonly string[];
}

export const projects: readonly Readonly<Project>[] = Object.freeze([
    {
        title: "The Weather",
        href: {
            app: "https://snappergee.github.io/the-weather",
            github: "https://github.com/SnapperGee/the-weather"

        },
        description:
            "Weather app to look up the weather conditions by city and country.",
        responsibilities: [
            "Utilize features of bootstrap to implement a modern looking responsive design.",
            "Use the Openweathermap API to retrieve the current weather conditions and the 5 day forecast for a city.",
            "Use DayJS to account for timezones so correct times would be displayed.",
            "Configure the webpack development environment to build and bundle the application appropriately for development or distribution.",
            "Validate input to ensure a valid query could be made using the Openweathermap API.",
            "Implement query history feature so queries are stored and can be recalled.",
            "Write application documentation."
        ]
    },
    {
        title: "Bookworm",
        href: {
            app: "https://snappergee.github.io/bookworm",
            github: "https://github.com/SnapperGee/bookworm"

        },
        description:
            "Find book recommendations based on best sellers and genre/topics.",
        responsibilities: [
            "Use the OpenLibrary API to retrieve book information based on genre.",
            "Use tailwind to create a responsive interface for getting book genre input from a user.",
            "Use the user input to query the OpenLibrary API for books of that genre.",
            "Manage the webpack configuration.",
            "Manage and coordinate pull requests from project contributors.",
        ]
    },
    {
        title: "Day Planner",
        href: {
            app: "https://snappergee.github.io/day-planner",
            github: "https://github.com/SnapperGee/day-planner"
        },
        description:
            "Daily event/reminder schedule manager.",
        responsibilities: [

        ]
    },
    {
        title: "Password Generator",
        href: {
            app: "https://snappergee.github.io/password-generator",
            github: "https://github.com/SnapperGee/password-generator"
        },
        description:
            "Generate a string of text with constraints.",
        responsibilities: [

        ]
    },
    {
        title: "Compare",
        href: {
            app: null,
            github: "https://github.com/SnapLib/typescript-compare"
        },
        description:
            "Compare 2 JavaScript objects to each other.",
        responsibilities: [

        ]
    },
    {
        title: "Hermes",
        href: {
            app: null,
            github: "https://github.com/SnapperGee/node-hermes-hrms"
        },
        description:
            "An employee management application with a CLI.",
        responsibilities: [

        ]
    },
    {
        title: "Javascript Quiz",
        href: {
            app: "https://snappergee.github.io/js-quiz",
            github: "https://github.com/SnapperGee/js-quiz"
        },
        description:
            "Web app that presents a timed quiz on JavaScript fundamentals to the user.",
        responsibilities: [

        ]
    },
    {
        title: "Readme Generator",
        href: {
            app: null,
            github: "https://github.com/SnapperGee/cli-readme-generator"
        },
        description:
            "Generate a README markdown file via an interactive CLI.",
        responsibilities: [

        ]
    }
]);

export default projects;

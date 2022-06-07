module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    esModuleInterop: true,
    coverageReporters: ["text-summary", "html"],
    coverageDirectory: "./tests/reports/coverage-report",
    reporters: [
        "default",
        ["jest-html-reporters", {
            "publicPath": "./tests/reports/suites-report",
            "filename": "report.html"
        },
        ]
    ]
};

"use strict";

const myLibrary = require("../utils/my-cli");
const manifest = require("../../package.json");
const { expect } = require("chai");

describe("my-cli", () => {

  it("should run without any arguments", () => {
    // Run the CLI without any arguments.
    let cli = myLibrary("");

    // It should have printed the default greeting
    expect(cli).to.have.stdout("Hello, world.\n");
  });

  it("should error if an invalid argument is used", () => {
    let cli = myLibrary("--fizzbuzz");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^Unknown option: --fizzbuzz\n\nUsage: my-cli \[options\] \[files...\]\n/);
  });

  it("should error if an invalid shorthand argument is used", () => {
    let cli = myLibrary("-qhzt");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^Unknown option: -z\n\nUsage: my-cli \[options\] \[files...\]\n/);
  });

  it("should error if an argument is missing its value", () => {
    let cli = myLibrary("--subject");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^The --subject option requires a value\.\n\nUsage: my-cli \[options\] \[files...\]\n/);
  });

  it("should print a more detailed error if DEBUG is set", () => {
    let cli = myLibrary("--greeting Goodbye", { env: { DEBUG: "true" }});

    expect(cli).to.have.stdout("");
    expect(cli).to.have.exitCode(1);
    expect(cli).to.have.stderr.that.matches(/^Error: Cannot say goodbye\n\s+at \w+/);
  });

});

describe("my-cli --help", () => {

  it("should show usage text", () => {
    let cli = myLibrary("--help");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.matches(/\nUsage: my-cli \[options\] \[files...\]\n/);
  });

  it("should support -h shorthand", () => {
    let cli = myLibrary("-h");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.matches(/\nUsage: my-cli \[options\] \[files...\]\n/);
  });

  it("should ignore other arguments", () => {
    let cli = myLibrary("--quiet --help --version");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.matches(/\nUsage: my-cli \[options\] \[files...\]\n/);
  });

  it("should ignore other shorthand arguments", () => {
    let cli = myLibrary("-qhv");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.matches(/\nUsage: my-cli \[options\] \[files...\]\n/);
  });

});

describe("my-cli --version", () => {

  it("should show the version number", () => {
    let cli = myLibrary("--version");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout(manifest.version + "\n");
  });

  it("should support -v shorthand", () => {
    let cli = myLibrary("-v");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout(manifest.version + "\n");
  });

  it("should ignore other arguments", () => {
    let cli = myLibrary("--quiet --version");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout(manifest.version + "\n");
  });

  it("should ignore other shorthand arguments", () => {
    let cli = myLibrary("-qv");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout(manifest.version + "\n");
  });

});

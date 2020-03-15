"use strict";

const myLibrary = require("../../");
const { expect } = require("chai");

describe("myLibrary() API", () => {

  it("should work without any arguments", () => {
    let result = myLibrary();
    expect(result).to.equal("Hello, world.");
  });

  it("should accept a custom greeting", () => {
    let result = myLibrary({ greeting: "Hi there" });
    expect(result).to.equal("Hi there, world.");
  });

  it("should accept a custom subject", () => {
    let result = myLibrary({ subject: "Michael" });
    expect(result).to.equal("Hello, Michael.");
  });

  it("should accept a custom greeting and subject", () => {
    let result = myLibrary({ greeting: "Yo", subject: "man" });
    expect(result).to.equal("Yo, man.");
  });

  it('should not allow a greeting of "goodbye"', () => {
    function sayGoodbye () {
      myLibrary({ greeting: "Goodbye" });
    }

    expect(sayGoodbye).to.throw("Cannot say goodbye");
  });

});

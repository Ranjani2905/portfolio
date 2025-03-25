import Sidebar from "../shared/sidebar";

function Html() {
  const htmlTopics = [
    { id: "html-structure", title: "HTML Structure & Document Setup" },
    { id: "html-elements", title: "Basic HTML Elements" },
    { id: "lists", title: "Lists" },
    { id: "links", title: "Links and Navigation" },
    { id: "images", title: "Images and Media" },
    { id: "tables", title: "Tables" },
    { id: "forms", title: "Forms" },
    { id: "semantic-html", title: "Semantic HTML" },
    { id: "accessibility", title: "Accessibility" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 h-screen sticky top-0 bg-gray-100 p-4 border-r border-gray-300">
        <Sidebar title="HTML" subtopics={htmlTopics} />
      </div>

      {/* Main Content */}
      <div className="w-3/4 h-screen overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-4">HTML Study Materials</h1>

        {/* HTML Structure */}
        <div id="html-structure" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">Template</h2>
          <p>This is the basic structrure of Html5</p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>
              {`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <meta charset="UTF-8">
  <link> <!-- Linking external resources -->
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
</body>
</html>`}
            </code>
          </pre>
        </div>
        <div id="html-elements" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            HTML Structure & Document Setup
          </h2>
          <p>Headings</p>
          <div className="bg-purple-100 p-4 rounded-md  mb-4">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <h3 className="text-2xl font-medium">Heading 3</h3>
            <h4 className="text-xl font-normal">Heading 4</h4>
            <h5 className="text-lg font-light">Heading 5</h5>
            <h6 className="text-base font-thin">Heading 6</h6>
          </div>
          <p>Code Snippet:</p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`<h1>Heading</h1>
<h2>Heading</h2>
<h3>Heading</h3>
<h4>Heading</h4>
<h5>Heading</h5>
<h6>Heading</h6>`}</code>
          </pre>
          {/* Text Elements */}
          <div id="text-elements" className="mb-6">
            <h2 className="text-2xl text-purple-800 font-semibold">
              Text Elements
            </h2>

            {/* Paragraphs */}
            <p className="mt-2 font-medium">Paragraphs</p>
            <pre className="bg-purple-100 p-4 rounded-md">
              <code>{`<p>This is a new paragraph</p>`}</code>
            </pre>
            <p className="bg-purple-50 p-4 rounded-md">
              This is a new paragraph
            </p>

            {/* Line Breaks */}
            <p className="mt-4 font-medium">Line Breaks</p>
            <pre className="bg-purple-100 p-4 rounded-md">
              <code>{`<br/>`}</code>
            </pre>
            <p className="bg-purple-50 p-4 rounded-md">
              This is a line break:
              <br />
              See the effect?
            </p>

            {/* Horizontal Rules */}
            <p className="mt-4 font-medium">Horizontal Rules</p>
            <pre className="bg-purple-100 p-4 rounded-md">
              <code>{`<hr>`}</code>
            </pre>
            <div className="bg-purple-50 p-4 rounded-md">
              <hr />
            </div>

            {/* Font Formatting */}
            <p className="mt-4 font-medium">Font Formatting</p>
            <pre className="bg-purple-100 p-4 rounded-md">
              <code>{`<b>Bold Text</b>
<i>Italic Text</i>
<u>Underlined Text</u>
<strike>Strikethrough Text</strike>`}</code>
            </pre>
            <div className="bg-purple-50 p-4 rounded-md">
              <b>Bold Text</b>
              <br />
              <i>Italic Text</i>
              <br />
              <u>Underlined Text</u>
              <br />
            </div>

            {/* Generic Containers */}
            <p className="mt-4 font-medium">Generic Containers</p>

            {/* Code Preview */}
            <pre className="bg-purple-100 p-4 rounded-md">
              <code>{`<div>This is a div container</div>
<span>This is a span container</span>`}</code>
            </pre>

            {/* Real Output */}
            <div className="bg-purple-50 p-4 rounded-md">
              <p className="font-semibold">Real Output:</p>
              <div className="p-2 bg-purple-200 rounded-md mb-2">
                This is a div container
              </div>
              <span className="p-2 bg-purple-300 rounded-md">
                This is a span container
              </span>
            </div>

            {/* Explanation */}
            <p className="mt-2 text-gray-700">
              <strong>Difference:</strong> The <code>&lt;div&gt;</code> is a
              block-level element, meaning it takes up the full width available,
              whereas the <code>&lt;span&gt;</code> is an inline element,
              allowing content to appear inline with other elements.
            </p>

            {/* Comments */}
            <p className="mt-4 font-medium">Comments</p>
            <pre className="bg-purple-100 p-4 rounded-md">
              <code>{`<!-- This is an HTML comment -->`}</code>
            </pre>
            <p className="bg-purple-50 p-4 rounded-md italic">
              (Comments are not visible in the output)
            </p>
          </div>

          {/* Lists */}
          <div id="lists" className="mb-6">
            <h2 className="text-2xl  text-purple-800 font-semibold">Lists</h2>
            <p>
              List is used to group number of items together. They are
              classified into the following types:
            </p>
            <h3 className="text-xl font-semibold">Unordered List</h3>
            <ul className="list-disc list-inside bg-purple-100 p-4 rounded-md">
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4">Ordered List</h3>
            <ol className="list-decimal list-inside bg-purple-100 p-4 rounded-md">
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </ol>
          </div>

          {/* Links */}
          <div id="links" className="mb-6">
            <h2 className="text-2xl text-purple-800 font-semibold">
              Links and Navigation
            </h2>
            <p>
              Links are found in nearly all web pages. Links allow users to
              click their way from page to page.
            </p>

            {/* Code Preview for Basic Anchor Tag */}
            <pre className="bg-purple-100 p-4 rounded-md">
              <p>Using Anchor tag and Href Attribute</p>
              <p>Href attribute indicates the link's destination</p>
              <code>{`<a href="https://www.google.com">Visit Google</a>`}</code>
            </pre>
            <a
              href="https://www.google.com"
              className="text-purple-600 underline"
            >
              Visit Google
            </a>

            {/* Code Preview for Opening Link in New Tab */}
            <pre className="bg-purple-100 p-4 rounded-md mt-4">
              <p>Opening link in a new tab</p>
              <code>{`<a href="https://www.google.com" target="_blank">Open Google in new tab</a>`}</code>
            </pre>
            <a
              href="https://www.google.com"
              target="_blank"
              className="text-purple-600 underline"
            >
              Open Google in new tab
            </a>

            {/* Code Preview for Email Link */}
            <pre className="bg-purple-100 p-4 rounded-md mt-4">
              <p>Creating an Email link</p>
              <code>{`<a href="mailto:someone@example.com">Send Email</a>`}</code>
            </pre>
            <a
              href="mailto:someone@example.com"
              className="text-purple-600 underline"
            >
              Send Email
            </a>

            {/* Code Preview for Telephone Link */}
            <pre className="bg-purple-100 p-4 rounded-md mt-4">
              <p>Creating a Phone Call link</p>
              <code>{`<a href="tel:+1234567890">Call Us</a>`}</code>
            </pre>
            <a href="tel:+1234567890" className="text-purple-600 underline">
              Call Us
            </a>

            {/* Code Preview for Download Link */}
            <pre className="bg-purple-100 p-4 rounded-md mt-4">
              <p>Creating a File Download link</p>
              <code>{`<a href="file.pdf" download>Download PDF</a>`}</code>
            </pre>
            <a href="file.pdf" download className="text-purple-600 underline">
              Download PDF
            </a>
          </div>

          {/* Images */}
          <div id="images" className="mb-6">
            <h2 className="text-2xl  text-purple-800 font-semibold">
              Images and Media
            </h2>
            <pre className="bg-purple-100 p-4 rounded-md">
              <code>{`<img src="image.jpg" alt="Description">`}</code>
            </pre>
          </div>
        </div>

        {/* Tables */}
        <div id="tables" className="mb-6">
          <h2 className="text-2xl text-purple-800 font-semibold">Tables</h2>
          <table className="border-4 border-purple-500 shadow-lg text-left mt-4 w-full">
            <thead className="bg-purple-300 border-b-4 border-purple-500 text-white">
              <tr>
                <th className="px-4 py-2 border-r-4 border-purple-500">Tag</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-purple-100 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<table>`}</code>
                </td>
                <td className="px-4 py-2">Creates a table</td>
              </tr>
              <tr className="bg-purple-200 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<thead>`}</code>
                </td>
                <td className="px-4 py-2">
                  Defines the header section of a table
                </td>
              </tr>
              <tr className="bg-purple-100 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<tbody>`}</code>
                </td>
                <td className="px-4 py-2">
                  Defines the body section of a table
                </td>
              </tr>
              <tr className="bg-purple-200 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<tr>`}</code>
                </td>
                <td className="px-4 py-2">Defines a row in a table</td>
              </tr>
              <tr className="bg-purple-100 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<th>`}</code>
                </td>
                <td className="px-4 py-2">Defines a header cell in a table</td>
              </tr>
              <tr className="bg-purple-200 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<td>`}</code>
                </td>
                <td className="px-4 py-2">Defines a data cell in a table</td>
              </tr>
              <tr className="bg-purple-100 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<tfoot>`}</code>
                </td>
                <td className="px-4 py-2">
                  Defines the footer section of a table
                </td>
              </tr>
              <tr className="bg-purple-200 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<caption>`}</code>
                </td>
                <td className="px-4 py-2">Defines a title for a table</td>
              </tr>
              <tr className="bg-purple-100 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<colgroup>`}</code>
                </td>
                <td className="px-4 py-2">
                  Specifies a group of columns in a table for styling
                </td>
              </tr>
              <tr className="bg-purple-200 border-b-4 border-purple-500">
                <td className="px-4 py-2 border-r-4 border-purple-500">
                  <code>{`<col>`}</code>
                </td>
                <td className="px-4 py-2">
                  Specifies column properties for each column in a table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Forms */}
        <div id="forms" className="mb-6 bg-purple-100 p-6 rounded-lg">
          <h2 className="text-2xl text-purple-800 font-semibold">Forms</h2>
          <p className="mb-4 text-purple-700">
            Forms are used to collect user input. Below are different types of
            form elements:
          </p>

          {/* Text Input */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="text" placeholder="Enter your name">`}</code>
          </pre>
          <input
            type="text"
            placeholder="Enter your name"
            className="border p-2 rounded-md w-full mb-4"
          />

          {/* Email Input */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="email" placeholder="Enter your email">`}</code>
          </pre>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded-md w-full mb-4"
          />

          {/* Password Input */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="password" placeholder="Enter password">`}</code>
          </pre>
          <input
            type="password"
            placeholder="Enter password"
            className="border p-2 rounded-md w-full mb-4"
          />

          {/* File Upload */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="file" accept="image/*">`}</code>
          </pre>
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded-md w-full mb-4"
          />

          {/* Date Input */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="date">`}</code>
          </pre>
          <input type="date" className="border p-2 rounded-md w-full mb-4" />

          {/* Range Input */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="range" min="0" max="100">`}</code>
          </pre>
          <input
            type="range"
            min="0"
            max="100"
            className="border p-2 rounded-md w-full mb-4"
          />

          {/* Number Input */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="number" min="1" max="100">`}</code>
          </pre>
          <input
            type="number"
            min="1"
            max="100"
            className="border p-2 rounded-md w-full mb-4"
          />

          {/* Color Picker */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="color">`}</code>
          </pre>
          <input type="color" className="border p-2 rounded-md w-full mb-4" />

          {/* Checkbox */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="checkbox"> I agree`}</code>
          </pre>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="border p-2 rounded-md" />
            <span className="text-purple-700">I agree</span>
          </label>

          {/* Radio Buttons */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female`}</code>
          </pre>
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="male"
                className="border p-2 rounded-md"
              />
              <span className="text-purple-700">Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="female"
                className="border p-2 rounded-md"
              />
              <span className="text-purple-700">Female</span>
            </label>
          </div>

          {/* Textarea */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<textarea placeholder="Enter your message"></textarea>`}</code>
          </pre>
          <textarea
            placeholder="Enter your message"
            className="border p-2 rounded-md w-full mb-4"
          ></textarea>

          {/* Submit Button */}
          <pre className="bg-purple-200 p-4 rounded-md">
            <code>{`<button type="submit">Submit</button>`}</code>
          </pre>
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-md w-full hover:bg-purple-700"
          >
            Submit
          </button>
        </div>

        {/* Semantic HTML */}
        <div id="semantic-html" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            Semantic HTML
          </h2>
          <p>
            Semantic HTML refers to using HTML elements that have meaningful
            tags.
          </p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`<header>Header</header>
<nav>Navigation</nav>
<main>Main Content</main>
<footer>Footer</footer>`}</code>
          </pre>
        </div>

        {/* Accessibility */}
        <div id="accessibility" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            Accessibility
          </h2>
          <p>Ensuring web pages are accessible to all users.</p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`<button aria-label="Close">X</button>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Html;

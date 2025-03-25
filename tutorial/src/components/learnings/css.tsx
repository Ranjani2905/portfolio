import Sidebar from "../shared/sidebar";
function Css() {
  const cssTopics = [
    { id: "fundamantals", title: "CSS Fundamentals" },
    { id: "selectors", title: "Selectors" },
    { id: "properties", title: "Properties" },
    { id: "box-model", title: "Box Model" },
    { id: "flex-layout", title: "Flex-Layout" },
    { id: "grid-layout", title: "Grid Layout" },
    { id: "positioning", title: "Positioning" },
    { id: "responsive", title: "Responsive Web Design" },
    { id: "specificity", title: "Specificity" },
    { id: "animation", title: "Transitions and Animations" },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 h-screen sticky top-0 bg-gray-100 p-4 border-r border-gray-300">
        <Sidebar title="CSS" subtopics={cssTopics} />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto p-6">
        {/* fundamentals */}
        <div id="fundamantals" className="mb-6">
  <h2 className="text-2xl text-purple-800 font-semibold">Fundamentals</h2>
  
  <p className="text-xl font-semibold mt-6">What is CSS and its purpose</p>
  <p className="bg-purple-100 p-4 rounded-md">
    CSS (Cascading Style Sheets) is used to control the presentation and layout of HTML documents. It enables the separation of content and design, allowing for improved flexibility and maintainability.
  </p>
  
  <p className="text-xl font-semibold mt-6">Ways to include CSS</p>
  <p className="bg-purple-100 p-4 rounded-md">
    There are three main ways to include CSS in a webpage:
    <ul className="list-disc pl-6">
      <li><strong>Inline CSS:</strong> Applied directly to an HTML element using the <code>style</code> attribute.</li>
      <li><strong>Internal CSS:</strong> Defined within a <code>&lt;style&gt;</code> tag inside the HTML document's <code>&lt;head&gt;</code>.</li>
      <li><strong>External CSS:</strong> Stored in a separate file with a <code>.css</code> extension and linked using a <code>&lt;link&gt;</code> tag.</li>
    </ul>
  </p>
  
  <p className="text-xl font-semibold mt-6">Comments</p>
  <p className="bg-purple-100 p-4 rounded-md">
    CSS supports comments to improve code readability and documentation:
    <ul className="list-disc pl-6">
      <li>Single-line comment: <code>/* This is a CSS comment */</code></li>
      <li>Multi-line comments use the same syntax and can span multiple lines.</li>
    </ul>
  </p>
</div>

        {/* CSS Selectors */}
        <div id="selectors" className="mb-6">
          <h2 className="text-2xl text-purple-800 font-semibold">
            CSS Selectors
          </h2>

          {/* <!-- Element Selector --> */}
          <p className="text-xl font-semibold mt-6">Element Selector</p>
          <p className="text-gray-600">
            Selects all elements of a specific type.
          </p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`p {
  color: blue;
}`}</code>
          </pre>
          <div className="bg-purple-50 p-4 rounded-md">
            <p className="text-blue-600">
              This is an element selector example.
            </p>
          </div>

          {/* <!-- Class Selector --> */}
          <p className="text-xl font-semibold mt-6">Class Selector</p>
          <p className="text-gray-600">
            Selects elements with a specific class.
          </p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`.example {
  color: green;
}`}</code>
          </pre>
          <div className="bg-purple-50 p-4 rounded-md">
            <p className="example text-green-600">
              This is a class selector example.
            </p>
          </div>

          {/* <!-- ID Selector --> */}
          <p className="text-xl font-semibold mt-6">ID Selector</p>
          <p className="text-gray-600">Selects an element with a unique ID.</p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`#unique {
  color: red;
}`}</code>
          </pre>
          <div className="bg-purple-50 p-4 rounded-md">
            <p id="unique" className="text-red-600">
              This is an ID selector example.
            </p>
          </div>

          {/* <!-- Attribute Selector --> */}
          <p className="text-xl font-semibold mt-6">Attribute Selector</p>
          <p className="text-gray-600">
            Selects elements with a specific attribute.
          </p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`[type="text"] {
  background-color: yellow;
}`}</code>
          </pre>
          <div className="bg-purple-50 p-4 rounded-md">
            <input
              type="text"
              placeholder="Attribute Selector Example"
              className="bg-yellow-200 p-2"
            />
          </div>

          {/* <!-- Descendant Selector --> */}
          <p className="text-xl font-semibold mt-6">Descendant Selector</p>
          <p className="text-gray-600">
            Selects elements inside another element.
          </p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`div p {
  color: purple;
}`}</code>
          </pre>
          <div className="bg-purple-50 p-4 rounded-md">
            <div>
              <p className="text-purple-600">
                This is a descendant selector example.
              </p>
            </div>
          </div>

          {/* <!-- Child Selector --> */}
          <p className="text-xl font-semibold mt-6">Child Selector</p>
          <p className="text-gray-600">
            Selects direct children of an element.
          </p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`div > p {
  color: orange;
}`}</code>
          </pre>
          <div className="bg-purple-50 p-4 rounded-md">
            <p className="text-orange-600">This is a child selector example.</p>
          </div>

          {/* <!-- Pseudo-class Selector --> */}
          <p className="text-xl font-semibold mt-6">Pseudo-classes</p>
          <p className="text-gray-600">
            Apply styles based on the element state.
          </p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`a:hover {
  color: pink;
}`}</code>
          </pre>
          <div className="bg-purple-50 p-4 rounded-md">
            <a href="#" className="text-pink-600 hover:text-pink-400">
              Hover over this link
            </a>
          </div>

          {/* <!-- Pseudo-element Selector --> */}
          <p className="text-xl font-semibold mt-6">Pseudo-elements</p>
          <p className="text-gray-600">Style specific parts of elements.</p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>{`p::first-letter {
  font-size: 2em;
}`}</code>
          </pre>
          <div className="bg-purple-50 p-4 rounded-md">
            <p className="text-lg">
              <span className="text-2xl">T</span>his is a pseudo-element
              example.
            </p>
          </div>
        </div>

        {/* properties */}
       

<div id="properties" className="mb-6">
  <h2 className="text-2xl text-purple-800 font-semibold">Properties</h2>
  <p className="bg-purple-100 p-4 rounded-md">
    CSS properties define the appearance and behavior of HTML elements. They are used to style text, backgrounds, spacing, layouts, and more.
  </p>

  <p className="text-xl font-semibold mt-6">Text Properties</p>
  <p className="bg-purple-100 p-4 rounded-md">
    Text properties control the appearance of text elements.
    <ul className="list-disc pl-6">
      <li><strong>color:</strong> Sets the color of the text. Example: <code>color: blue;</code></li>
      <li><strong>font-size:</strong> Defines the size of the text. Example: <code>font-size: 16px;</code></li>
      <li><strong>text-align:</strong> Aligns text left, right, center, or justify. Example: <code>text-align: center;</code></li>
    </ul>
  </p>

  <p className="text-xl font-semibold mt-6">Background Properties</p>
  <p className="bg-purple-100 p-4 rounded-md">
    Background properties define the appearance of the background of elements.
    <ul className="list-disc pl-6">
      <li><strong>background-color:</strong> Sets the background color. Example: <code>background-color: lightgray;</code></li>
      <li><strong>background-image:</strong> Sets an image as the background. Example: <code>background-image: url('image.jpg');</code></li>
      <li><strong>background-size:</strong> Defines the size of the background image. Example: <code>background-size: cover;</code></li>
    </ul>
  </p>

  <p className="text-xl font-semibold mt-6">Box Model Properties</p>
  <p className="bg-purple-100 p-4 rounded-md">
    The Box Model defines the structure of elements including margins, borders, padding, and content.
    <ul className="list-disc pl-6">
      <li><strong>margin:</strong> Controls space outside an element. Example: <code>margin: 10px;</code></li>
      <li><strong>padding:</strong> Controls space inside an element. Example: <code>padding: 15px;</code></li>
      <li><strong>border:</strong> Defines a border around an element. Example: <code>border: 2px solid black;</code></li>
    </ul>
  </p>

  <p className="text-xl font-semibold mt-6">Layout Properties</p>
  <p className="bg-purple-100 p-4 rounded-md">
    Layout properties determine the positioning and structure of elements on a page.
    <ul className="list-disc pl-6">
      <li><strong>display:</strong> Specifies how an element is displayed. Example: <code>display: flex;</code></li>
      <li><strong>position:</strong> Defines positioning (static, relative, absolute, fixed). Example: <code>position: absolute;</code></li>
      <li><strong>flexbox/grid:</strong> Used for responsive layouts. Example: <code>display: grid;</code></li>
    </ul>
  </p>
</div>
        {/* Box-model */}
        <div id="box-model" className="mb-6">
          <h2 className="text-2xl   text-purple-800 font-semibold">
            Box Model
          </h2>
          <p className="text-xl font-semibold mt-6">Padding</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Border</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Margin</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Understanding how the box Model impact size and spacing
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">box Sizing property</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* flex */}
        <div id="flex-layout" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            Flex Layout
          </h2>
          <p className="text-xl font-semibold mt-6">
            Flex Container and Flex Items
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Display:Flex</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Flex Direction</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Justify-content</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Align-items</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Flex-wrap</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Flex-grow, Flex-Shrink and Fles-basis
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Align-self</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Creating common layout with flexbox
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* grid */}
        <div id="grid-layout" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            Grid Layout
          </h2>
          <p className="text-xl font-semibold mt-6">
            Grid container and grid items
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">display: grid</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            grid-template-rows, grid-template-columns
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">grid-gap</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">grid-column, grid-row</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">grid-area</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Creating common layouts with CSS Grid
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* Position */}
        <div id="positioning" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            Positioning
          </h2>
          <p className="text-xl font-semibold mt-6">
            position: static (default)
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">position: relative</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">position: absolute</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">position: fixed</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">position: sticky</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Using top, right, bottom, left properties
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* responsive */}
        <div id="responsive" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            Responsive Web Design
          </h2>
          <p className="text-xl font-semibold mt-6">
            Viewports and the &lt;meta name="viewport"&gt; tag
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Media queries (@media)</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Breakpoints</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Flexible grids</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Responsive images (using max-width: 100%)
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* specificity */}
        <div id="specificity" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            CSS Specificity
          </h2>
          <p className="text-xl font-semibold mt-6">
            Understanding CSS specificity rules
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Inline styles, ID selectors, class selectors, element selectors,
            attribute selectors
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            How to handle specificity conflicts
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* animations */}
        <div id="animation" className="mb-6">
          <h2 className="text-2xl text-purple-800 font-semibold">
            Transitions and Animations
          </h2>
          <p className="text-xl font-semibold mt-6">
            Basic transitions with the transition property
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Basic animations using the @keyframes rule
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
      </div>
    </div>
  );
}
export default Css;

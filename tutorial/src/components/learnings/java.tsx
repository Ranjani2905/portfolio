import Sidebar from "../shared/sidebar";
function Java() {
  const JavaTopics = [
    { id: "Intro", title: "Introduction to Javascript" },
    { id: "control-flow", title: "Control Flow" },
    { id: "functions", title: "Functions" },
    { id: "string-methods", title: "String Methods" },
    { id: "array-methods", title: "Array Methods" },
    { id: "objects", title: "Objects" },
    { id: "date-object", title: "Date Object" },
    { id: "dom", title: "DOM Manipulation" },
    { id: "advanced", title: "Advanced JavaScript" },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 h-screen sticky top-0 bg-gray-100 p-4 border-r border-gray-300">
        <Sidebar title="JavaScript " subtopics={JavaTopics} />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-4">JavaScript Study Materials</h1>
        {/* Intro */}
        <div id="Intro" className="mb-6">
          <h2 className="text-2xl text-purple-800 font-semibold">
            Introduction to JavaScript
          </h2>
          <p className="text-xl font-semibold mt-6">What is JavaScript</p>
          <p className="bg-gray-100 p-4 rounded-md">
            JavaScript (JS) is a high-level, interpreted programming language
            primarily used to create interactive and dynamic web applications.
            It is a core technology of the web, along with HTML and CSS.
          </p>
          <p className="text-xl font-semibold mt-6">Where is JS used ?</p>
          <pre className="bg-purple-100 p-4 rounded-md">
            <code>
              {` 🖥️ Frontend (Client-Side) 
JavaScript is mainly used to create interactive and dynamic websites.
It controls how users interact with web pages.
✅ Form validation
✅ Animations & transitions 
✅ Fetching data from APIs 
✅ Single Page Applications (SPA)  
 🌐Backend (Server-Side) JavaScript is not just for browsers! With
Node.js, you can build backend servers, APIs, and databases.
✅Handle requests (REST API, GraphQL) 
✅ Work with databases (MongoDB, MySQL) 
✅ Real-time applications (Chat, Notifications)`}
            </code>
          </pre>
          <h2 className="text-2xl font-semibold">Basic Syntax</h2>
          <p className="text-xl font-semibold mt-6">Variables</p>

          <h1 className="text-2xl  text-center mb-4">
            Difference Between <code>var</code>, <code>let</code>, and{" "}
            <code>const</code>
          </h1>

          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Keyword</th>
                <th className="border border-gray-300 p-2">Scope</th>
                <th className="border border-gray-300 p-2">Reassignable?</th>
                <th className="border border-gray-300 p-2">Hoisted?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  var
                </td>
                <td className="border border-gray-300 p-2">Function-scoped</td>
                <td className="border border-gray-300 p-2">Yes</td>
                <td className="border border-gray-300 p-2">
                  Yes (initialized as undefined)
                </td>
              </tr>
              <tr className="bg-green-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  let
                </td>
                <td className="border border-gray-300 p-2">Block-scoped</td>
                <td className="border border-gray-300 p-2">Yes</td>
                <td className="border border-gray-300 p-2">
                  Yes (not initialized)
                </td>
              </tr>
              <tr className="bg-red-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  const
                </td>
                <td className="border border-gray-300 p-2">Block-scoped</td>
                <td className="border border-gray-300 p-2">No</td>
                <td className="border border-gray-300 p-2">
                  Yes (not initialized)
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mt-6">Examples</h2>
          <pre className="bg-gray-100 text-black p-4 rounded-md mt-2">
            <code>{`Using var
var x = 10;
var x = 20; // Re-declaration allowed
console.log(x); // Output: 20

Using let
let y = 15;
y = 25; // Allowed, but re-declaration not allowed
console.log(y); // Output: 25

Using const
const z = 30;
z = 40; // Error: Assignment to constant variable
console.log(z);
        `}</code>
          </pre>
          <p className="text-xl font-semibold mt-6">Data types</p>
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Data Type</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  String
                </td>
                <td className="border border-gray-300 p-2">
                  Represents text values.
                </td>
                <td className="border border-gray-300 p-2">"Hello, World!"</td>
              </tr>
              <tr className="bg-green-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Number
                </td>
                <td className="border border-gray-300 p-2">
                  Represents numeric values.
                </td>
                <td className="border border-gray-300 p-2">42, 3.14</td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Boolean
                </td>
                <td className="border border-gray-300 p-2">
                  Represents true or false values.
                </td>
                <td className="border border-gray-300 p-2">true, false</td>
              </tr>
              <tr className="bg-red-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Undefined
                </td>
                <td className="border border-gray-300 p-2">
                  A variable that has not been assigned a value.
                </td>
                <td className="border border-gray-300 p-2">undefined</td>
              </tr>
              <tr className="bg-purple-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Null
                </td>
                <td className="border border-gray-300 p-2">
                  Represents an empty or unknown value.
                </td>
                <td className="border border-gray-300 p-2">null</td>
              </tr>
              <tr className="bg-indigo-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Object
                </td>
                <td className="border border-gray-300 p-2">
                  A collection of key-value pairs.
                </td>
                <td className="border border-gray-300 p-2">
                  <code>{`{ name: "John", age: 30 }`}</code>
                </td>
              </tr>
              <tr className="bg-pink-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Array
                </td>
                <td className="border border-gray-300 p-2">
                  A collection of ordered values.
                </td>
                <td className="border border-gray-300 p-2">[1, 2, 3, 4, 5]</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mt-6">Examples</h2>
          <pre className="bg-gray-100 text-black p-4 rounded-md mt-2">
            <code>{`----String---- 
let str = "Hello, JavaScript!";
console.log(str);  
Output: Hello, JavaScript!

----Number----
let num = 42;
console.log(num);
Output: 42

----Boolean----
let isCodingFun = true;
console.log(isCodingFun);
Output: true

----Undefined----
let notAssigned;
console.log(notAssigned);
Output: undefined

----Null----
let emptyValue = null;
console.log(emptyValue);
Output: null

----Object----
let person = { name: "Alice", age: 25 };
console.log(person.name);
Output: Alice

----Array----
let numbers = [10, 20, 30, 40];
console.log(numbers[2]);
Output: 30
       `}</code>
          </pre>
          <p className="text-xl font-semibold mt-6">Operators</p>
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Operator Type</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Arithmetic
                </td>
                <td className="border border-gray-300 p-2">
                  Performs basic mathematical operations.
                </td>
                <td className="border border-gray-300 p-2">+, -, *, /, %</td>
              </tr>
              <tr className="bg-green-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Assignment
                </td>
                <td className="border border-gray-300 p-2">
                  Assigns values to variables.
                </td>
                <td className="border border-gray-300 p-2">
                  =, +=, -=, *=, /=
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Comparison
                </td>
                <td className="border border-gray-300 p-2">
                  Compares values and returns a Boolean.
                </td>
                <td className="border border-gray-300 p-2">
                  <code>{`==, ===, !=, >, <, >=, <=`}</code>
                </td>
              </tr>
              <tr className="bg-red-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Logical
                </td>
                <td className="border border-gray-300 p-2">
                  Used for logical operations.
                </td>
                <td className="border border-gray-300 p-2">&&, ||, !</td>
              </tr>
              <tr className="bg-purple-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Bitwise
                </td>
                <td className="border border-gray-300 p-2">
                  Performs operations on binary numbers.
                </td>
                <td className="border border-gray-300 p-2">
                  <code>{`&, |, ^, ~, <<, >>`}</code>
                </td>
              </tr>
              <tr className="bg-indigo-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Ternary
                </td>
                <td className="border border-gray-300 p-2">
                  Shorthand for if-else statements.
                </td>
                <td className="border border-gray-300 p-2">
                  condition ? trueValue : falseValue
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mt-6">Examples</h2>
          <pre className="bg-gray-100 text-black p-4 rounded-md mt-2">
            <code>{`----Arithmetic Operators----
let sum = 5 + 3;
console.log(sum);
Output: 8

----Assignment Operators----
let x = 10;
x += 5;
console.log(x);
Output: 15

----Comparison Operators----
console.log(10 > 5);
Output: true

----Logical Operators----
console.log(true && false);
Output: false

----Bitwise Operators----
console.log(5 & 1);
Output: 1

----Ternary Operator----
let age = 20;
let message = age >= 18 ? "Adult" : "Minor";
console.log(message);
Output: Adult`}</code>
          </pre>
        </div>
        {/* control flow */}
        <div id="control-flow" className="mb-6">
          <h2 className="text-2xl text-purple-800 font-semibold">
            Control Flow
          </h2>
          <p className="text-xl font-semibold mt-6">Loops</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* functions  */}
        <div id="functions" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">Functions</h2>
          <p className="text-xl font-semibold mt-6">Function Declaration</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Function Expressions</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Arrow Functions</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Scope (Global, Local)</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Closures</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* string methods */}
        <div id="string-methods" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            String Methods
          </h2>
          <p className="text-xl font-semibold mt-6">
            o charAt() charCodeAt() concat() o indexOf() lastIndexOf() slice() o
            substring() substr() replace() o toUpperCase() toLowerCase() trim()
            o trimStart() trimEnd() padStart() o padEnd() split() includes() o
            match() matchAll() Find() o startsWith() endsWith() o repeat()
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* array-methods */}
        <div id="array-methods" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            Array Methods
          </h2>
          <p className="text-xl font-semibold mt-6">
            o Push() Pop() Shift() o Unshift() Splice() Sort() o Reverse()
            Fill() Concat() o Slice() Join() indexOf() o lastIndexOf()
            Includes() forEach() o Map() Filter() Reduce() o Every() Some()
            Find() o findIndex()
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* objects */}
        <div id="objects" className="mb-6">
          <h2 className="text-2xl   text-purple-800 font-semibold">Objects</h2>
          <p className="text-xl font-semibold mt-6">Object Literals</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Object Methods</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Object oriented Programming
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* date objects */}
        <div id="date-object" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            Date Object
          </h2>
          <p className="text-xl font-semibold mt-6">Creating a date Object</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Setting the Date & Time by a single string
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Seperating Variables with Commas
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Displaying the Date & Time
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Time Zones</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Extracting the Date</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Set Date Method</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Set Time</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Non-Data Object Functions
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Form Objects</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Button Objects</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Text Objects</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Text Area Objects</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Hidden Objects</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Check Box Objects</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Radio Button Objects</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Selecting Objects</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Onchange Events</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* dom  */}
        <div id="dom" className="mb-6">
          <h2 className="text-2xl  text-purple-800 font-semibold">
            DOM Manipulation
          </h2>
          <p className="text-xl font-semibold mt-6">Selecting Elements</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            getElementById, querySelector, querySelectorAll
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Modifying Elements</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            innerHTML, textContent, style
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Adding/ Removing Classes</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Events</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Event listeners</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Event Delegation</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Form Validation</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Validating email and password
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
        {/* advanced */}
        <div id="advanced" className="mb-6">
          <h2 className="text-2xl text-purple-800 font-semibold">
            Advanced Concepts
          </h2>
          <p className="text-xl font-semibold mt-6">Closures</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">
            Prototypes and inheritance
          </p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Async and await</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Error Handling</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>

          <p className="text-xl font-semibold mt-6">Event Loop</p>
          <p className="bg-purple-100 p-4 rounded-md"></p>
        </div>
      </div>
    </div>
  );
}
export default Java;

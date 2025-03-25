import form from "../assets/form.png";
import Card from "./shared/card";
import calc from "../assets/calc.png";
import land from "../assets/29d437b93085611e5e5d121dd600151f-removebg-preview.png";
import login from "../assets/login.png";

export default function Task() {
  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center p-8 bg-gray-100 min-h-screen">
        <Card
          image={land}
          badgeText="Components"
          title="Landing page"
          description="built a dynamic, responsive landing page with interactive features that provide a smooth user experience."
          link="/ecommerce"
        />
        <Card
          image={form}
          badgeText="Local Storage"
          title="Student Form"
          description="A student form that stores data in local storage, allowing viewing, editing, and deleting on another page."
          link="/student"
        />
        <Card
          image={login}
          badgeText="Node"
          title="Student Management System"
          description="A student form that stores data in local storage, allowing viewing, editing, and deleting on another page."
          link="/loginpage"
        />

        <Card
          image={calc}
          badgeText="CSS"
          title="Calculator"
          description="A calculator built using CSS grid, showcasing the use of grid concepts  in a clean, organized manner."
          link="/calc"
        />
      </div>
    </>
  );
}

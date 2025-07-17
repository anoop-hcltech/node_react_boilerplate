import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";

jest.mock("../utils/sidebarItems", () => ({
  sidebarRouteList: {
    admin: [
      { link: "/dashboard", name: "Dashboard" },
      { link: "/settings", name: "Settings" },
    ],
    guest: [],
  },
}));

beforeEach(() => {
  localStorage.setItem(
    "user",
    JSON.stringify({ token: "fake-token", role: "admin" })
  );
});

describe("Sidebar Component", () => {
  test("renders sidebar when open", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Sidebar isOpen={true} />
      </MemoryRouter>
    );

    expect(screen.getByText("My App")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  test("applies active class to current route", () => {
    render(
      <MemoryRouter initialEntries={["/settings"]}>
        <Sidebar isOpen={true} />
      </MemoryRouter>
    );

    const activeLink = screen.getByText("Settings");
    expect(activeLink).toHaveClass("bg-white");
    expect(activeLink).toHaveClass("text-blue-700");
  });
});

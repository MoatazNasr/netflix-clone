import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../containers/signin/Signin.jsx";
import Provider from "../context/Provider.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "../App.jsx";
const MockApp = () => {
  return (
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  );
};
describe("Test Signin Component", () => {
  it("Test form password input type", () => {
    render(
      <BrowserRouter>
        <Provider>
          <Register />
        </Provider>
      </BrowserRouter>
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
  });
  it("Test form email input to have email value", () => {
    render(
      <BrowserRouter>
        <Provider>
          <Register />
        </Provider>
      </BrowserRouter>
    );
    const userEmailText = "dsadsm";
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).not.toHaveTextContent(userEmailText);
  });
  it("Test anchor link to link register component", () => {
    render(
      <BrowserRouter>
        <Provider>
          <Register />
        </Provider>
      </BrowserRouter>
    );
    const link = screen.getByRole("link", { name: "to-register" });
    expect(link).toHaveAttribute("href", "/register");
  });
  it("Tests after filling the form inputs and clicked on signin button status message appear", async () => {
    // integration test
    render(<MockApp />);
    const emailInput = screen.getByPlaceholderText("Email", {
      name: "signin-email",
    });
    const passwordInput = screen.getByPlaceholderText("Password", {
      name: "signin-password",
    });
    const signinButton = screen.getByRole("button", { name: "signin-button" });
    fireEvent.change(emailInput);
    fireEvent.change(passwordInput);
    userEvent.click(signinButton);
    expect(signinButton).toHaveTextContent("Loading...");
    const statusMessage = await waitFor(() =>
      screen.findByTitle("status-message")
    );
    expect(statusMessage).toBeInTheDocument();
    expect(statusMessage).toBeVisible();
  });
});

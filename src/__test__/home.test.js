import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Provider from "../context/Provider.jsx";
import { BrowserRouter } from "react-router-dom";
import Home from "../containers/home/Home.jsx";
const MockApp = () => {
  return (
    <BrowserRouter>
      <Provider>
        <Home />
      </Provider>
    </BrowserRouter>
  );
};
describe("Test the search input, search results and intercation between both", () => {
  it("Tests the search input visibility on clicking search button", async () => {
    // unit test
    render(<MockApp />);
    const searchButton = screen.getByRole("button", { name: "search-button" });
    fireEvent.click(searchButton);
    const searchInput = await waitFor(() =>
      screen.findByRole("textbox", { name: "search-input" })
    );
    expect(searchInput).toBeInTheDocument();
  });
  it("Tests on clicking search button the carousels should be replaced with search results", async () => {
    // integration test
    render(<MockApp />);
    const searchButton = screen.getByRole("button", { name: "search-button" });
    fireEvent.click(searchButton);
    const searchInput = await waitFor(() =>
      screen.findByRole("textbox", { name: "search-input" })
    )
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput,{target:{value:'hey'}});
    const searchResults = await screen.findByRole('region',{name:'search-results'});
    expect(searchResults).toBeVisible();
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Provider from "../context/Provider.jsx";
import MovieModal from "../components/moviemodal/MovieModal.jsx";
import FeaturedMovie from "../components/featuredmovie/FeaturedMovie.jsx";
const MockApp = () => {
  return (
    <BrowserRouter>
      <Provider>
        <FeaturedMovie />
        <MovieModal query="" />
      </Provider>
    </BrowserRouter>
  );
};

it("Tests on clicking the more info button", async () => {
  // integration test
  render(<MockApp />);
  const movieInfoButton = await screen.findByRole('button',{name:'F-movie-info'});
  expect(movieInfoButton).toBeInTheDocument();
  fireEvent.click(movieInfoButton);
  const movieModalX = await waitFor(() => screen.findByRole("div-modal"));
  expect(movieModalX).toBeInTheDocument();
  const movieModalImage = screen.getByRole('img');
  expect(movieModalImage.src).toBe('https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg');
});

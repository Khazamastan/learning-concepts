import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from './root-layout';
import { MoviesPage } from '../features/movies/movies-page';
import { MovieDetailPage } from '../features/movies/movie-detail-page';
import { CheckoutPage } from '../features/reservations/checkout-page';
import { SignInPage } from '../features/auth/sign-in-page';
import { SignUpPage } from '../features/auth/sign-up-page';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <MoviesPage /> },
        { path: 'movies/:movieId', element: <MovieDetailPage /> },
        { path: 'checkout/:reservationId', element: <CheckoutPage /> },
      ],
    },
    { path: '/signin', element: <SignInPage /> },
    { path: '/signup', element: <SignUpPage /> },
  ]);

import { IndianMoviesProvider, PopularProvider, TopRatedProvider, TrendingProvider, UpcomingProvider } from "./context/MovieContext";
import { PopularPeopleProvider, TrendingPeopleProvider } from "./context/PersonContext";
import { MovieProvider, SeriesProvider } from "./context/PersonCreditesContext";
import { PersonDetailsProvider } from "./context/PersonDetailsContext";
import { SearchProvider } from "./context/SearchContext";


export function AppProviders({ children }) {
    return (
        <SearchProvider>
            <TrendingProvider>
                <TrendingPeopleProvider>
                    <PopularPeopleProvider>
                        <UpcomingProvider>
                            <TopRatedProvider>
                                <IndianMoviesProvider>
                                    <MovieProvider>
                                        <PersonDetailsProvider>
                                            <SeriesProvider>
                                                <PopularProvider>{children}</PopularProvider>
                                            </SeriesProvider>
                                        </PersonDetailsProvider>
                                    </MovieProvider>
                                </IndianMoviesProvider>
                            </TopRatedProvider>
                        </UpcomingProvider>
                    </PopularPeopleProvider>
                </TrendingPeopleProvider>
            </TrendingProvider>
        </SearchProvider>
    );
}

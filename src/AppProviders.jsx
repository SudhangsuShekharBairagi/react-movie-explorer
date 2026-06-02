import { IndianMoviesProvider, PopularProvider, TopRatedProvider, TrendingProvider, UpcomingProvider } from "./contexts/MovieContext";
import { PopularPeopleProvider, TrendingPeopleProvider } from "./contexts/PersonContext";
import { MovieProvider, SeriesProvider } from "./contexts/PersonCreditesContext";
import { PersonDetailsProvider } from "./contexts/PersonDetailsContext";
import { SearchProvider } from "./contexts/SearchContext";


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

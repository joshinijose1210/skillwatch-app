import { StyledEmptyText, StyledSearchBox, StyledSingleSelect } from '@common';
import { PageContent } from '@components';
import TutorialCardModal from '@components/TutorialCardModal/TutorialCardModal';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Text } from '@medly-components/core';
import { CardsWrapper, FlexBoxRow } from './Tutorial.styled';
import { FILTER_OPTIONS } from './constants';
import { useTutorial } from './useTutorial';

export const Tutorial = () => {
    const { searchText, filter, setFilter, onSearchChange, onSearchClear, filteredTutorials } = useTutorial();

    return (
        <PageContent>
            <ListHeader
                title={
                    <Text textVariant="h3" style={{ fontSize: '20px' }} textWeight="Medium">
                        Tutorial Videos
                    </Text>
                }
            />

            <FlexBoxRow>
                <StyledSearchBox
                    placeholder="Search by title, description, or tag"
                    onInputChange={onSearchChange}
                    onClear={onSearchClear}
                    value={searchText}
                    size="M"
                    className="h-40"
                    minWidth="30rem"
                    data-testid="search-tutorial"
                />

                <StyledSingleSelect
                    options={FILTER_OPTIONS}
                    variant="outlined"
                    size="S"
                    placeholder="Select Category"
                    label="Select Category"
                    className="h-40"
                    value={filter}
                    isSearchable
                    minWidth="30rem"
                    onChange={val => val && setFilter(val)}
                    data-testid="filter"
                />
            </FlexBoxRow>

            <CardsWrapper>
                {filteredTutorials.length > 0 ? (
                    filteredTutorials.map((tutorial, index) => <TutorialCardModal key={index} video={tutorial} />)
                ) : (
                    <StyledEmptyText style={{ marginTop: '2rem' }}>More tutorial videos coming soon...</StyledEmptyText>
                )}
            </CardsWrapper>
        </PageContent>
    );
};

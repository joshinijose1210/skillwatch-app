import { PageLayout } from '@components/layout';
import { PageContent } from '@components/layout/PageContent/PageContent.styled';
import { ConcentricCircleLoader } from '@medly-components/loaders';
import * as Styled from './Loader.styled';

export const Loader = () => {
    return (
        <PageLayout>
            <PageContent>
                <Styled.LoaderWrapper>
                    <ConcentricCircleLoader />
                </Styled.LoaderWrapper>
            </PageContent>
        </PageLayout>
    );
};

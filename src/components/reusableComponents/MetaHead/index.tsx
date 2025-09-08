import { Helmet } from 'react-helmet-async';

const MetaHead = ({ data }: { data: { title: string; description: string } }) => {
    return (
        <Helmet>
            <title>{data.title}</title>
            <meta name="title" content={data.title} />
            <meta name="description" content={data.description} />

            <meta property="og:title" content={data.title} />
            <meta property="og:description" content={data.description} />
            <meta property="og:url" content="https://skillwatch.app/app/login" />
            <meta property="og:image" content="https://skillwatch.app/images/seo-img.png" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={data.title} />
            <meta name="twitter:description" content={data.description} />
            <meta name="twitter:image" content="https://skillwatch.app/images/seo-img.png" />
        </Helmet>
    );
};

export default MetaHead;

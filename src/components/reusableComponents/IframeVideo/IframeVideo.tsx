const IframeVideo = ({ videoId }: { videoId: string }) => {
    return (
        <iframe
            title="YouTube video"
            loading="lazy"
            allowFullScreen
            src={`https://www.youtube.com/embed/${videoId}/?controls=1&autoplay=1&rel=0`}
            style={{
                border: 'none',
                borderRadius: '10px',
                width: '100%',
                height: '100%',
                minHeight: 0,
                minWidth: 0
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
            referrerPolicy="strict-origin-when-cross-origin"
        />
    );
};

export default IframeVideo;
